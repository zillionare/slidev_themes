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
import { ThebeCodeCell, ThebeNotebook, ThebeServer, makeConfiguration, makeRenderMimeRegistry, setupThebeCore, shortId } from 'thebe-core/dist/esm/index.js';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { globals } from '../utils/globals.js';

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

const props = defineProps({
    "init": {
        type: Boolean,
        default: false
    },
    "maxOutput": {
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
    "hideOutput": { // 是否立即显示输出，还是需要双击两次显示
        type: Boolean,
        default: false
    },
    "color": {
        type: String,
        default: "black"
    },
    "animation": {
        type: String,
        default: "pulse"
    },
    "layout": {
        type: String,
        default: "vertical"
    },
    "outputMt": {
        type: String,
        default: "-3.2rem"
    },
    "outputMl": {
        type: String,
        default: "0"
    },
    "outputWidth": {
        type: String,
        default: "50%"
    },
    "scaleImg": {
        type: String,
        default: "100%"
    },
})

const codeStyle = computed(() => {
    return {
        'opacity': props.init ? 0 : 1
    }
})

const isCommandKeyPressed = ref(false);
let isCodeHidden = false;
const code = ref(null)
const outputWrapper = ref(null);
const codeStatus = {}

// 如果在presenter中点击运行代码，给出提示！以避免听众看不到实际运行。
const warnPresenterMode = ref(null)

// 监听 keydown 事件
function checkCommandKey(event) {
    if (event.key === 'Meta') {
        isCommandKeyPressed.value = true;
    }
}

// 监听 keyup 事件
function uncheckCommandKey(event) {
    if (event.key === 'Meta') {
        isCommandKeyPressed.value = false;
    }
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
        outputWrapper.value.classList.add('hide')
        isCodeHidden = false;
    } else {
        code.value.classList.add('hide')
        outputWrapper.value.classList.remove('hide')
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
    
    if (code.value) {
        code.value.style.setProperty('--pseudo-before-content', "'running'")
    }
    document.body.style.cursor = 'wait'

    const nbid = `p${getPage()}`
    const cellId = code.value ? code.value.id : null

    if (!cellId) {
        console.error('Code element not available')
        document.body.style.cursor = 'default'
        return
    }

    // Check if jupyter object exists for this page
    if (!globals.jupyter || !globals.jupyter[nbid]) {
        console.error(`Jupyter object for ${nbid} not initialized`)
        document.body.style.cursor = 'default'
        if (code.value) {
            code.value.style.setProperty('--pseudo-before-content', "'error'")
        }
        return
    }

    const jupyter = globals.jupyter[nbid]
    
    // Check if notebook exists
    if (!jupyter.notebook) {
        console.error(`Notebook for ${nbid} not initialized`)
        document.body.style.cursor = 'default'
        if (code.value) {
            code.value.style.setProperty('--pseudo-before-content', "'error'")
        }
        return
    }

    const notebook = jupyter.notebook
    const cell = notebook.getCellById(cellId)
    
    if (!cell) {
        console.error(`Cell ${cellId} not found`)
        document.body.style.cursor = 'default'
        if (code.value) {
            code.value.style.setProperty('--pseudo-before-content', "'error'")
        }
        return
    }
    
    try {
        await executeCell(cell)
        
        if (props.hideOutput && outputWrapper.value) {
            outputWrapper.value.classList.add("hide")
        }
    } catch (error) {
        console.error('Error executing cell:', error)
        if (code.value) {
            code.value.style.setProperty('--pseudo-before-content', "'error'")
        }
    } finally {
        document.body.style.cursor = 'default'
        if (code.value) {
            code.value.style.setProperty('--pseudo-before-content', "'runnable'")
        }

        codeStatus[cellId] = true
    }
}

const executeCell = async (cell) => {
    const nbid = `p${getPage()}`
    const server = globals.jupyter[nbid].server

    if (globals.jupyter[nbid].session == null) {
        await server.connectToJupyterServer();
        const rendermime = makeRenderMimeRegistry(server.config.mathjax);
        let session = await server.startNewSession(rendermime);

        if (session == null) {
            console.error('could not start thebe jupyter session')
            return
        }

        globals.jupyter[nbid].session = session
    }

    cell.session = globals.jupyter[nbid].session
    console.log(`executing ${cell.id}:\n${cell.source}`)
    await cell.execute()

    // 如果设置了图片缩放，则对图片进行缩放
    const imgElements = outputWrapper.value.querySelectorAll('img');
    imgElements.forEach(img => {
        img.style.transform = `scale(${props.scaleImg})`;
    });
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
        if (outputWrapper.value) {
            outputWrapper.value.style.opacity = 0
        }
    }, 5000)
}

const createCodeCell = async (codeEl, outputWrapper, isInitCell) => {
    const pageno = getPage()
    const nbid = `p${pageno}`
    const config = globals.jupyter[nbid].server.config
    const notebook = globals.jupyter[nbid].notebook

    const metadata = {}
    const cid = isInitCell ? `${nbid}-initial-cell` : `${nbid}-${shortId()}`

    codeEl.id = cid

    // Fix the Slidev-specific indentation issue by removing indentation from the first line only
    let codeContent = codeEl.textContent
    codeContent = codeContent.replace(/^\s+/, '')
    
    const cell = new ThebeCodeCell(cid, nbid, codeContent, config, metadata)

    outputWrapper.id = `${cid}-output`
    cell.attachToDOM(outputWrapper)

    if (isInitCell) {
        setTimeout(() => {
            initNotebook()
        }, 500)
    }

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
        createCodeCell(code.value, outputWrapper.value, props.init)
    }

    document.body.addEventListener('keydown', checkCommandKey)
    document.body.addEventListener('keyup', uncheckCommandKey)
    code.value.style.setProperty('--pseudo-before-content', "'runnable'");
})

onUnmounted(() => {
    document.body.removeEventListener('keydown', checkCommandKey)
    document.body.removeEventListener('keyup', uncheckCommandKey)
})

</script>

<template>
    <div :class="$attrs.class" v-motion>
        <div class="wrapper-all" :class="{ 'horizontal-layout': layout === 'horizontal' }" @dblclick="onRunCode">
            <div ref="code" :style="codeStyle" class="thebe-code">
                <slot></slot>
            </div>
            <div ref="outputWrapper" class="output-wrapper" :style="{
        '--output-text-color': props.color,
        '--margin-top': props.outputMt,
        '--margin-left': props.outputMl,
        '--output-width': props.outputWidth
    }" />
            <RenderWhen context="presenter">
                <div ref="warnPresenterMode" class="warnPresnterMode">请在演示模式下运行！</div>
            </RenderWhen>
        </div>
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
    content: var(--pseudo-before-content, 'runnable');
    background-color: rgba(240, 180, 50);
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
</style>