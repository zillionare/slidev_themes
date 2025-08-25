<!--
    Interactive Jupyter Notebook Cell Component for Slidev
    
    Features:
    - Execute Python code in Jupyter notebooks
    - Toggle between code and output view
    - Support for initialization cells
    - Customizable layout and styling
    - Presenter mode warnings
    
    Usage:
    <NoteCell init class="w-50% h-full top-10% left-50%">
    ```python
    print("Hello World")
    ```
    </NoteCell>
-->

<script setup>
import { ThebeCodeCell, ThebeNotebook, ThebeServer, makeConfiguration, makeRenderMimeRegistry, setupThebeCore, shortId } from 'thebe-core';
 import { computed, onMounted, ref } from 'vue';
import MonacoEditor from './MonacoEditor.vue';
import { globals } from '../utils/globals.js';
let isCodeHidden = false;
const code = ref(null)
const inlineOutput = ref(null);
const codeStatus = {}
const editorOnOff = ref(false)
const toastMessage = ref('')
const toastVisible = ref(false)
const toastTimer = ref(null)
const toastHovered = ref(false)
const cellStatus = ref({}) // Track status for each cell
const lastErrorMessage = ref('') // Store last error message

// 如果在presenter中点击运行代码，给出提示！以避免听众看不到实际运行。
const warnPresenterMode = ref(null)

const props = defineProps({
    "init": {
        type: Boolean,
        default: false
    },
    "baseUrl": {
        type: String,
        default: "/thebe/"
    },
    "token": {
        type: String,
        default: ""
    },
    "path": {
        type: String,
        default: "/tmp/"
    },
    "output": {
        type: Object,
        default: () => ({
            "color": "black",
            "inline": true, // render output inline, else in a standalone panel (dialog)
            "position": "bottom", // 'top', 'bottom', 'left', 'right' when inline is true
            "css": JSON.stringify({
                "font-size": "1.2em",
                "line-height": "1.5em",
                "font-family": "monospace"
            })
        })
    }

})

const initCellStyle = computed(() => {
    return {
        'display': props.init ? 'none' : 'block'
    }
})

const editorOn = computed(() => {
    return {
       display: editorOnOff.value ? 'block' : 'none'
    }
})

const editorOff = computed(() => {
    return {
        display: editorOnOff.value ? 'none' : 'block'
    }
})

const codeClass = computed(() => {
    const classes = []
    if (code.value && code.value.id && cellStatus.value[code.value.id]) {
        classes.push(`status-${cellStatus.value[code.value.id]}`)
    } else if (code.value && code.value.id) {
        // Default to ready status
        classes.push('status-ready')
    }
    return classes
})

// Safe access to Slidev globals with fallbacks
const getPage = () => {
    try {
        return typeof $page !== 'undefined' && $page?.value !== undefined ? $page.value : 1;
    } catch {
        return 1;
    }
};

const getSlidevConfig = () => {
    try {
        return typeof $slidev !== 'undefined' && $slidev?.configs ? $slidev.configs : { slug: 'slidev-presentation' };
    } catch {
        return { slug: 'slidev-presentation' };
    }
};

const getRenderContext = () => {
    try {
        return typeof $renderContext !== 'undefined' && $renderContext?.value ? $renderContext.value : 'slide';
    } catch {
        return 'slide';
    }
};

const setStatus = (cellId, status, msg)=>{
    /**
     * 设置运行状态。运行状态包括: ready, running, executed, error
     * 运行状态会通过 play icon 来显示
     * 
     * Args:
     *   cellId: str, id of the cell
     *   status: str, one of 'ready', 'running', 'executed', 'error'
     *   msg: str, message to display in the status bar
     */

     // Initialize status object for this cell if not exists
     if (cellId && !cellStatus.value[cellId]) {
         cellStatus.value[cellId] = 'ready'
     }
     
     // Update cell status
     if (cellId && status) {
         cellStatus.value[cellId] = status
     }

     if (status === 'executed') {
        codeStatus[cellId] = true
     }

     if (status === 'error'){
        console.error(msg)
        if (cellId) {
            lastErrorMessage.value = msg
        }
     }
     
     // Show toast message
     if (msg) {
         showToast(msg)
     }
}

const showToast = (message) => {
    // Clear any existing timer
    if (toastTimer.value) {
        clearTimeout(toastTimer.value)
    }
    
    // Set new message and show toast
    toastMessage.value = message
    toastVisible.value = true
    toastHovered.value = false
    
    // Hide toast after 3 seconds if not hovered
    toastTimer.value = setTimeout(() => {
        if (!toastHovered.value) {
            toastVisible.value = false
        }
    }, 3000)
}

const handleStatusClick = (cellId) => {
    const status = cellStatus.value[cellId]
    
    if (status === 'error') {
        // Show last error message
        if (lastErrorMessage.value) {
            showToast(lastErrorMessage.value)
        }
    } else if (status === 'executed') {
        // Show result in output
        toggleOutput()
    } else if (status === 'ready') {
        // Run the cell
        onRunCode()
    }
}

const handleCodeClick = (event) => {
    // Only handle clicks on the status indicator (top right corner)
    if (code.value && code.value.id) {
        const rect = event.target.getBoundingClientRect()
        const clickX = event.clientX - rect.left
        const clickY = event.clientY - rect.top
        
        // Check if click is in the top right corner where the status indicator is
        if (clickX > rect.width - 30 && clickY < 30) {
            handleStatusClick(code.value.id)
        }
    }
}

const formatCode = (code) => {
    /**
     * Fix the Slidev-specific indentation issue by removing indentation from the first line only
     */
    const lines = code.split('\n')
    if (lines.length > 1) {
        lines[0] = lines[0].trim()
        return lines.join('\n')
    }
    return code
}

const createNotebook = () => {
    const nbid = `p${getPage()}`

    if (globals.jupyter[nbid]) {
        return
    }

    const slidevConfig = getSlidevConfig();
    const notebook_name = `${slidevConfig.slug}-${nbid}.ipynb`

    const config = makeConfiguration({
        useBinder: false,
        bootstrap: true,
        useJupyterLite: false,
        kernelOptions: {
            kernelName: "python3",
            path: props.path + notebook_name
        },
        serverSettings: {
            appendToken: true,
            baseUrl: props.baseUrl,
            token: props.token
        },
    })

    config.events.on('status',
        (evt, { status, message }) => console.debug(evt, status, message)
    )

    let server = new ThebeServer(config)

    const rendermime = makeRenderMimeRegistry(server.config.mathjax);
    const notebook = new ThebeNotebook(nbid, config, rendermime);
    notebook.cells = []

    globals.jupyter[nbid] = {
        server: server,
        session: null,
        notebook: notebook
    }
}

const toggleOutput = () => {
    if (isCodeHidden) {//show code
        code.value.classList.remove("hide")
        inlineOutput.value.classList.add('hide')
        isCodeHidden = false;
    } else {
        code.value.classList.add('hide')
        inlineOutput.value.classList.remove('hide')
        isCodeHidden = true;
    }
};

const promptRunInSlide = () => {
    console.log('presenter mode: prompt to run in slide')
    if (warnPresenterMode.value) {
        warnPresenterMode.value.style.transform = 'scale(1)'
        setTimeout(() => {
            warnPresenterMode.value.style.transform = 'scale(0)'
        }, 3000)
    }
}

const onRunCode = async (event) => {
    console.log('onRunCode', codeStatus, isCodeHidden)
    
    if (code.value && code.value.id in codeStatus) {
        console.log("code already executed")
        return toggleOutput()
    }

    if (getRenderContext() === 'presenter') {
        promptRunInSlide()
        return
    }
    
    try {
        await executeCell()
        
        if (props.hideOutput && inlineOutput.value) {
            inlineOutput.value.classList.add("hide")
        }
    } catch (error) {
        let msg = (`Error executing cell: ${error}`)
        setStatus('error', msg)
    }
}

const executeCell = async (cell) => {
    const nbid = `p${getPage()}`
    const server = globals.jupyter[nbid].server

    /* if the cell is init cell, then it's possible be called by other cells
     * in such case, we'll need the cell param passed in; otherwise, use null
     * to to indicate current cell
    */
    const cellId = cell ? cell.id : (code.value ? code.value.id : null)

    // If cell wasn't passed as parameter, get it from notebook
    if (!cell) {
        cell = notebook.getCellById(cellId)
    }
    
    if (!cell) {
        let msg = `Cell ${cellId} not found`
        setStatus(cellId, 'error', msg)
        return
    }

    if (!cellId) {
        let msg = 'Code element not available'
        setStatus(null, 'error', msg)
        return
    }

    // Check if jupyter object exists for this page
    if (!globals.jupyter || !globals.jupyter[nbid]) {
        let msg = `Jupyter object for ${nbid} not initialized`
        setStatus(cellId, 'error', msg)
        return
    }

    const jupyter = globals.jupyter[nbid]
    
    // Check if notebook exists
    if (!jupyter.notebook) {
        let msg = `Notebook for ${nbid} not initialized`
        setStatus(cellId, 'error', msg)
        return
    }

    const notebook = jupyter.notebook

    setStatus(cellId, 'running')
    if (globals.jupyter[nbid].session == null) {
        try {
            await server.connectToJupyterServer();
            const rendermime = makeRenderMimeRegistry(server.config.mathjax);
            let session = await server.startNewSession(rendermime);

            if (session == null) {
                let errorMsg = 'Could not start thebe jupyter session'
                setStatus(cellId, 'error', errorMsg)
                return
            }

            globals.jupyter[nbid].session = session
        } catch (error) {
            let errorMsg = `Failed to connect to Jupyter server: ${error.message || error}`
            setStatus(cellId, 'error', errorMsg)
            return
        }
    }

    cell.session = globals.jupyter[nbid].session
    console.log(`executing ${cell.id}:\n${cell.source}`)
    
    try {
        await cell.execute()
    } catch (error) {
        let errorMsg = `Failed to execute cell: ${error.message || error}`
        setStatus(cellId, 'error', errorMsg)
        return
    }

    // 如果设置了图片缩放，则对图片进行缩放
    const imgElements = inlineOutput.value.querySelectorAll('img');
    imgElements.forEach(img => {
        img.style.transform = `scale(${props.scaleImg})`;
    });

    setStatus(cellId, 'executed')
}

const initNotebook = async () => {
    const nbid = `p${getPage()}`
    const initCellId = `${nbid}-initial-cell`

    // Check if jupyter object exists
    if (!globals.jupyter[nbid]) {
        console.warn(`Jupyter object for ${nbid} not initialized`)
        return
    }

    const jupyter = globals.jupyter[nbid]
    const notebook = jupyter.notebook
    
    // Check if notebook and cell exist
    if (!notebook) {
        console.warn(`Notebook for ${nbid} not initialized`)
        return
    }
    
    const cell = notebook.getCellById(initCellId)
    if (!cell) {
        console.warn(`Initial cell ${initCellId} not found`)
        return
    }

    await executeCell(cell)
    setTimeout(() => {
        if (inlineOutput.value) {
            inlineOutput.value.style.opacity = 0
        }
    }, 5000)
}

const createCodeCell = async (codeEl, outputWrapper, isInitCell) => {
    /**
     * Create a new code cell bound to this component
     * Each code cell (in web page domain) is associated with a notebook cell (in notebook domain) and a output element.
     */
    const pageno = getPage()
    const nbid = `p${pageno}`
    const config = globals.jupyter[nbid].server.config
    const notebook = globals.jupyter[nbid].notebook

    const metadata = {}
    const cid = isInitCell ? `${nbid}-initial-cell` : `${nbid}-${shortId()}`

    // Check for duplicate init cell
    if (isInitCell && notebook.getCellById(`${nbid}-initial-cell`)) {
        const errorMsg = `Slide ${pageno} already has an init NoteCell. Only one init NoteCell is allowed per slide.`
        setStatus(cid, 'error', errorMsg)
        return
    }

    codeEl.id = cid

    let codeContent = formatCode(codeEl.textContent)
    
    const cell = new ThebeCodeCell(cid, nbid, codeContent, config, metadata)

    outputWrapper.id = `${cid}-output`
    cell.attachToDOM(outputWrapper)
    // TODO: createResultElement and bind with cell

    if (isInitCell) {
        setTimeout(() => {
            initNotebook()
        }, 500)
    }

    //TODO: add setInterval/callback, to change status once initCell is executed
    notebook.cells.push(cell)

    const total = notebook.numCells()
    console.info(`created Cell: ${cid}, total cells: ${total}, code is: \n${codeContent}`)
}

onMounted(() => {
    if (!globals.jupyter) {
        setupThebeCore();
        globals.jupyter = {}
    }

    if (getRenderContext() === 'slide') {
        createNotebook()
        createCodeCell(code.value, inlineOutput.value, props.init)
        
        // Initialize cell status
        if (code.value && code.value.id) {
            cellStatus.value[code.value.id] = 'ready'
        }
    }
})
</script>

<template>
    <div :class="$attrs.class" v-motion>
        <div class="wrapper-all" :class="{ 'horizontal-layout': layout === 'horizontal' }" :style="initCellStyle">
            <div 
                ref="code" 
                class="thebe-code" 
                :class="codeClass"
                :style="editorOff"
                @click="handleCodeClick"
            >
                <slot></slot>
            </div>
            <div :style="editorOn">
                <MonacoEditor 
                    ref="monacoEditor" 
                    v-model="editorContent"
                    language="python"
                    :options="{minimap: {enabled: false}}"
                    />
            </div>
            <div ref="inlineOutput" class="output-wrapper" > <!-- render result inline --></div>
            <teleport to="body">
                <!-- render result in a dialog-->
            </teleport>
        </div>
        <teleport to="body">
            <RenderWhen context="presenter">
                <div ref="warnPresenterMode" class="warnPresnterMode">请在演示模式下运行！</div>
            </RenderWhen>
        </teleport>
        <teleport to="body">
            <!-- toast message-->
            <div 
                v-if="toastVisible"
                class="notecell-toast"
                @mouseenter="toastHovered = true"
                @mouseleave="toastHovered = false"
            >
                {{ toastMessage }}
            </div>
        </teleport>
    </div>
</template>

<style scoped>
.wrapper-all {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-flow: column;
    overflow: auto;
    max-height: 450px;
    scrollbar-width: none;
}

.thebe-code {
    width: 100%;
    height: 100%;
}

.output-wrapper {
    flex-grow: 1;
    width: 100%;
    height: 100vh;
    font-size: 0.8rem;
    overflow: auto;
    padding-top: 15px;
    scrollbar-width: none;
    color: var(--output-text-color);
    margin-top: var(--margin-top);
    margin-left: var(--margin-left);
}

.thebe-code:before {
    padding: 0rem 0.5rem;
    text-align: center;
    border-radius: 10px;
    height: 1.3rem;
    font-size: 0.9rem;
    z-index: 10;
    position: absolute;
    right: 0;
}

.warnPresnterMode {
    width: 100%;
    height: 6rem;
    margin: auto;
    position: fixed;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    transform: scale(0);
    text-align: center;
    font-size: 2rem;
}

.horizontal-layout {
    flex-flow: row;
}

.horizontal-layout .thebe-code {
    flex-grow: 1;
    width: auto;
    margin-right: 1rem;
    margin-top: 0.5rem;
}

.horizontal-layout .output-wrapper {
    width: var(--output-width);
}

.hide {
    display: none;
}

.notecell-toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10000;
    max-width: 400px;
    word-wrap: break-word;
}

/* Status indicator styles */
.thebe-code.status-ready:before {
    content: "▶";
    color: green;
    cursor: pointer;
}

.thebe-code.status-running:before {
    content: "◐";
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.thebe-code.status-error:before {
    content: "!";
    color: white;
    padding: 0rem 0.5rem;
    text-align: center;
    border-radius: 10px;
    height: 1.3rem;
    font-size: 0.9rem;
    z-index: 10;
    position: absolute;
    right: 0;
    cursor: pointer;
}

.thebe-code.status-executed:before {
    content: "✓";
    padding: 0rem 0.5rem;
    text-align: center;
    border-radius: 10px;
    height: 1.3rem;
    font-size: 0.9rem;
    z-index: 10;
    position: absolute;
    right: 0;
    cursor: pointer;
}
</style>