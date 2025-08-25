<!--
    Interactive Jupyter Notebook Cell Component for Slidev
    
    Features:
    - Execute Python code in Jupyter notebooks
    - Toggle between code and output view
    - Support for initialization cells
    - Customizable styling
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
import { Icon } from '@iconify/vue';
import MonacoEditor from './MonacoEditor.vue';
import { globals } from '../utils/globals.js';
let isCodeHidden = false;
const code = ref(null)
const inlineOutput = ref(null);
const editorOnOff = ref(false)
const sharedCodeContent = ref('') // 共享的代码内容，作为唯一数据源
const originalCodeContent = ref('') // 原始代码内容，用于恢复功能
const isEdited = ref(false) // 标记是否已编辑
const toastMessage = ref('')
const toastVisible = ref(false)
const toastTimer = ref(null)
const toastHovered = ref(false)
const cellStatus = ref({}) // Track status for each cell
const lastErrorMessage = ref('') // Store last error message

// Result dialog state
const resultDialogVisible = ref(false)
const resultDialogContent = ref('')
const resultDialogCellId = ref('')
const resultDialogMaximized = ref(false)

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
            "inline": true, // render output inline, else in a standalone panel (dialog)
            "position": "bottom", // 'top', 'bottom', 'left', 'right' when inline is true
            "css": {
            }
        })
    },


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

// Merge default output configuration with user-provided configuration
const mergedOutput = computed(() => {
    const defaultOutput = {
        inline: true,
        position: "bottom",
        css: {}
    }
    
    // Deep merge user configuration with defaults
    return {
        ...defaultOutput,
        ...props.output,
        css: {
            ...defaultOutput.css,
            ...(props.output.css || {})
        }
    }
})

// Parse output CSS from object or JSON string
const parsedOutputCSS = computed(() => {
    try {
        if (mergedOutput.value.css) {
            let cssData = mergedOutput.value.css
            
            // Convert camelCase to kebab-case for CSS properties
            const cssObject = {}
            for (const [key, value] of Object.entries(cssData)) {
                const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                cssObject[kebabKey] = value
            }
            return cssObject
        }
        return {}
    } catch (error) {
        console.warn('Failed to parse output.css:', error)
        return {
        }
    }
})

// Generate inline styles for output elements
const outputStyles = computed(() => {
    return parsedOutputCSS.value
})

// Generate unique CSS class name for custom styling
const customCssClass = computed(() => {
    // Generate a unique class name based on component instance
    const instanceId = Math.random().toString(36).substr(2, 9)
    return `notecell-output-${instanceId}`
})

// Generate dynamic CSS rules for nested selectors
const dynamicCssRules = computed(() => {
    if (!mergedOutput.value.css || Object.keys(mergedOutput.value.css).length === 0) {
        return ''
    }

    const cssData = mergedOutput.value.css
    const className = customCssClass.value
    let cssRules = ''

    // Process CSS object to generate rules
    const generateCssRules = (obj, selector = `.${className}`) => {
        let rules = ''
        const properties = []
        const nestedSelectors = {}

        // Separate direct properties from nested selectors
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null) {
                // This is a nested selector (e.g., 'img', 'pre', etc.)
                nestedSelectors[key] = value
            } else {
                // This is a direct CSS property
                const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
                properties.push(`  ${kebabKey}: ${value};`)
            }
        }

        // Generate rules for direct properties
        if (properties.length > 0) {
            rules += `${selector} {\n${properties.join('\n')}\n}\n`
        }

        // Generate rules for nested selectors
        for (const [nestedKey, nestedValue] of Object.entries(nestedSelectors)) {
            const nestedSelector = `${selector} ${nestedKey}`
            rules += generateCssRules(nestedValue, nestedSelector)
        }

        return rules
    }

    cssRules = generateCssRules(cssData)
    return cssRules
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

const setStatus = (cellId, status, msg) => {
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

    if (status === 'error') {
        console.error(msg)
        if (cellId) {
            lastErrorMessage.value = msg
        }
    }

    if (status === 'executed') {
        console.info(`✅ ${cellId} 运行成功`)
    }

    if (msg) {
        showToast(msg)
    }
}

const getStatus = (cellId) => {
    if (cellId in cellStatus.value) {
        return cellStatus.value[cellId]
    } else {
        return "error"
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

const showResultDialog = (cellId) => {
    // Get the output content from the inline output element
    if (inlineOutput.value) {
        const content = inlineOutput.value.innerHTML
        if (content && content.trim() !== '') {
            resultDialogContent.value = content
            resultDialogCellId.value = cellId
            resultDialogVisible.value = true
        } else {
            // If no content, show a message
            resultDialogContent.value = '<p>No output available for this cell.</p>'
            resultDialogCellId.value = cellId
            resultDialogVisible.value = true
        }
    } else {
        // If no output element, show error message
        resultDialogContent.value = '<p>Output element not found.</p>'
        resultDialogCellId.value = cellId
        resultDialogVisible.value = true
    }
}

const closeResultDialog = () => {
    resultDialogVisible.value = false
    resultDialogContent.value = ''
    resultDialogCellId.value = ''
    resultDialogMaximized.value = false
}

const toggleMaximize = () => {
    resultDialogMaximized.value = !resultDialogMaximized.value
}

const handleStatusClick = (cellId) => {
    const status = cellStatus.value[cellId]

    if (status === 'error') {
        // Show last error message
        if (lastErrorMessage.value) {
            showToast(lastErrorMessage.value)
        }
    } else if (status === 'executed') {
        // Always show result in dialog when clicking status button
        showResultDialog(cellId)
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

const toggleEditor = () => {
    if (!editorOnOff.value) {
        // 切换到编辑模式
        editorOnOff.value = true
    } else {
        // 切换到只读模式
        editorOnOff.value = false
    }
}

const revertToOriginal = () => {
    // 恢复到原始代码内容
    sharedCodeContent.value = originalCodeContent.value
    isEdited.value = false
    // revert 就是 close，直接关闭编辑器
    editorOnOff.value = false
}

const onEditorChange = (value) => {
    // 更新 sharedCodeContent 以同步显示区域
    sharedCodeContent.value = value
    
    // 检查是否与原始内容不同，标记编辑状态
    isEdited.value = value !== originalCodeContent.value
    
    // 当编辑器内容变化时，如果当前状态是 executed，则重置为 ready
    if (code.value && code.value.id && cellStatus.value[code.value.id] === 'executed') {
        cellStatus.value[code.value.id] = 'ready'
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
    let cellId = code.value.id
    
    // 直接使用 sharedCodeContent，无需同步操作
    
    let status = getStatus(code.value.id)
    console.log('onRunCode', status)

    if (status === 'running') {
        let msg = "waiting for previous run to finish"
        setStatus(code.value.id, msg)
        return
    }

    if (status === "executed") {
        showResultDialog(cellId)
        return
    }

    if (getRenderContext() === 'presenter') {
        promptRunInSlide()
        return
    }

    try {
        await executeCell()
    } catch (error) {
        let msg = (`Error executing cell: ${error}`)
        setStatus(cellId, 'error', msg)
    }
}

const executeCell = async (cell) => {
    const nbid = `p${getPage()}`
    const jupyter = globals.jupyter[nbid]
    const server = jupyter.server
    const notebook = jupyter.notebook

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

    // Check if notebook exists
    if (!jupyter.notebook) {
        let msg = `Notebook for ${nbid} not initialized`
        setStatus(cellId, 'error', msg)
        return
    }

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
    
    // 更新 cell.source 为最新的 sharedCodeContent 值
    cell.source = sharedCodeContent.value
    
    console.log(`executing ${cell.id}:\n${cell.source}`)

    try {
        await cell.execute()
        setStatus(cellId, 'executed')
    } catch (error) {
        let errorMsg = `Failed to execute cell: ${error.message || error}`
        setStatus(cellId, 'error', errorMsg)
        return
    }


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

    let codeContent = formatCode(sharedCodeContent.value)

    const cell = new ThebeCodeCell(cid, nbid, codeContent, config, metadata)

    outputWrapper.id = `${cid}-output`
    cell.attachToDOM(outputWrapper)

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
        // 初始化 sharedCodeContent，从 slot 内容获取代码
        if (code.value && code.value.textContent) {
            const formattedCode = formatCode(code.value.textContent)
            sharedCodeContent.value = formattedCode
            originalCodeContent.value = formattedCode // 保存原始代码内容
        }
        
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
        <div class="wrapper-all" :style="initCellStyle">
            <!-- 按钮容器，移动到代码段上方 -->
            <div class="notecell-buttons">
                <!-- Status 图标，显示当前状态，executed时变为view result图标 -->
                <div class="status-icon" :data-status="code && code.id ? cellStatus[code.id] : 'ready'" @click.stop="handleStatusClick(code?.id)">
                    <Icon icon="mdi:play" v-if="!code || !code.id || cellStatus[code.id] === 'ready'" />
                    <Icon icon="mdi:loading" v-else-if="cellStatus[code.id] === 'running'" />
                    <Icon icon="mdi:alert-circle" v-else-if="cellStatus[code.id] === 'error'" />
                    <Icon icon="mdi:eye" v-else-if="cellStatus[code.id] === 'executed'" />
                </div>
                <!-- Edit/Revert 图标，用于切换编辑器或恢复代码 -->
                <div class="modify-icon" @click.stop="editorOnOff && isEdited ? revertToOriginal() : toggleEditor()" :title="editorOnOff && isEdited ? 'Revert to original' : editorOnOff ? 'Close editor' : 'Edit code'">
                    <Icon icon="mdi:undo" v-if="editorOnOff && isEdited" />
                    <Icon icon="mdi:close" v-else-if="editorOnOff && !isEdited" />
                    <Icon icon="mdi:pencil" v-else />
                </div>
            </div>
            <div ref="code" class="thebe-code" :class="codeClass" :style="editorOff" @click="handleCodeClick">
                <slot></slot>
            </div>
            <div :style="editorOn" class="monaco-editor-container">
                <MonacoEditor ref="monacoEditor" v-model="sharedCodeContent" language="python"
                    :options="{ 
                        minimap: { enabled: false },
                        selectOnLineNumbers: true,
                        automaticLayout: true,
                        readOnly: false,
                        selectionHighlight: true,
                        occurrencesHighlight: true,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        contextmenu: true,
                        selectAll: true,
                        theme: 'custom-theme',
                        colorDecorators: true
                    }" @change="onEditorChange" />
            </div>
            <div ref="inlineOutput" class="output-wrapper" :class="[{ 'hide': !mergedOutput.inline }, customCssClass]" :style="outputStyles"> <!-- render result inline --></div>
            <teleport to="#slideshow">
                <!-- Result Dialog -->
                <div v-if="resultDialogVisible" class="result-dialog-overlay" @click="closeResultDialog">
                    <div class="result-dialog" :class="{ 'maximized': resultDialogMaximized }" @click.stop>
                        <div class="result-dialog-header">
                            <h3 class="dialog-title">{{ resultDialogCellId }}</h3>
                            <div class="dialog-buttons">
                                <button class="maximize-button" @click="toggleMaximize" :title="resultDialogMaximized ? 'Restore' : 'Maximize'">
                                    <Icon icon="mdi:window-minimize" v-if="resultDialogMaximized" />
                                    <Icon icon="mdi:window-maximize" v-else />
                                </button>
                                <button class="close-button" @click="closeResultDialog">
                                    <Icon icon="mdi:close" />
                                </button>
                            </div>
                        </div>
                        <div class="result-dialog-content" :class="customCssClass" :style="outputStyles" v-html="resultDialogContent"></div>
                    </div>
                </div>
            </teleport>
        </div>
        <teleport to="#slideshow">
            <RenderWhen context="presenter">
                <div ref="warnPresenterMode" class="warnPresnterMode">请在演示模式下运行！</div>
            </RenderWhen>
        </teleport>
        <teleport to="#slideshow">
            <!-- toast message-->
            <div v-if="toastVisible" class="notecell-toast" @mouseenter="toastHovered = true"
                @mouseleave="toastHovered = false">
                {{ toastMessage }}
            </div>
        </teleport>
        
        <!-- Dynamic CSS styles -->
        <component :is="'style'" v-if="dynamicCssRules">{{ dynamicCssRules }}</component>
    </div>
</template>

<style scoped>
.wrapper-all {
    width: 100%;
    display: flex;
    flex-flow: column;
    max-height: 450px;
    overflow: auto;
    scrollbar-width: none;
}

.thebe-code {
    width: 100%;
    height: 100%;
}

.output-wrapper {
    flex-grow: 1;
    width: 100%;
    max-height: 200px;
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
.thebe-code {
    position: relative;
}

/* 按钮容器，现在在 wrapper-all 层级 */
.wrapper-all {
    position: relative;
}

.notecell-buttons {
    display: flex;
    gap: 4px;
    justify-content: flex-end;
    margin-bottom: 4px;
    z-index: 10;
}

.notecell-buttons .status-icon,
.notecell-buttons .modify-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.9);
    transition: all 0.2s ease;
}

.notecell-buttons .status-icon:hover,
.notecell-buttons .modify-icon:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
}

/* 状态样式，现在按钮在代码段之前，使用相邻选择器 */
.wrapper-all .notecell-buttons .status-icon {
    color: #059669;
}

.wrapper-all .thebe-code.status-running + .notecell-buttons .status-icon,
.wrapper-all .notecell-buttons .status-icon[data-status="running"] {
    color: #059669;
    animation: spin 1s linear infinite;
}

.wrapper-all .thebe-code.status-error + .notecell-buttons .status-icon,
.wrapper-all .notecell-buttons .status-icon[data-status="error"] {
    color: #dc2626;
    background-color: rgba(220, 38, 38, 0.1);
}

.wrapper-all .thebe-code.status-executed + .notecell-buttons .status-icon,
.wrapper-all .notecell-buttons .status-icon[data-status="executed"] {
    color: #059669;
}

/* Status 图标在 executed 状态时的样式（现在显示为 eye 图标）*/
.notecell-buttons .status-icon[data-status="executed"] {
    color: #3b82f6;
}

.notecell-buttons .status-icon[data-status="executed"]:hover {
    color: #1d4ed8;
}

/* Modify 图标样式 */
.notecell-buttons .modify-icon {
    color: #8b5cf6;
}

.notecell-buttons .modify-icon:hover {
    color: #7c3aed;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Result Dialog Styles */
.result-dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10001;
}

.result-dialog {
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    max-width: 80vw;
    max-height: 80vh;
    width: 600px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    transition: all 0.3s ease;
}

.result-dialog.maximized {
    width: 90%;
    height: 100%;
    max-width: 90%;
    max-height: 100%;
}

.result-dialog-header {
    padding: 8px 16px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f9fa;
    min-height: 32px;
}

.dialog-title {
    margin: 0;
    font-size: 0.6em;
    color: #666;
    font-weight: normal;
    padding: 4px 8px;
    min-height: 24px;
}

.dialog-buttons {
    display: flex;
    gap: 8px;
    align-items: center;
}

.maximize-button,
.close-button {
    background: none;
    border: none;
    font-size: 16px;
    cursor: pointer;
    color: #666;
    padding: 4px;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.maximize-button:hover,
.close-button:hover {
    background-color: #e9ecef;
    color: #333;
}

.close-button {
    font-size: 20px;
}

.result-dialog-content {
    padding: 20px;
    overflow: auto;
    flex: 1;
    font-family: monospace;
    font-size: 0.9em;
    line-height: 1.5;
}

.result-dialog-content img {
    max-width: 100%;
    height: auto;
}

.result-dialog-content pre {
    background-color: #f8f9fa;
    padding: 12px;
    border-radius: 4px;
    overflow-x: auto;
}

.result-dialog-content table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
}

.result-dialog-content th,
.result-dialog-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.result-dialog-content th {
    background-color: #f2f2f2;
}
</style>
