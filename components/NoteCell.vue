<!--
    see https://thebe.readthedocs.io/en/stable/start.html

每一张slides都有自己的惟一的notebook，不同的slides之间，notebook不共享

在代码区，按住cmd + 单击运行代码，否则，双击为放大、还原
在输出区，双击切换放大或者还原

在有多个组件时，请使用scale动画，以避免彼此干扰捕获鼠标

color: 用以指定输出文本的颜色

<NoteCell init class="w-50% h-full top-10% left-50%">
```python
init_result = 5
print("hello world")
```
</NoteCell>

<NoteCell class="w-50% h-full top-10% left-50%" hideOutput color="red"
        :enter="{scale: 0}"
        :click-1="{scale: 1}"
        :click-2="{scale: 0}">

```python
import numpy as np
np.random.seed(78)
if 1:
    print(np.random.rand(3))
    print(init_result)
    print("hello world")
```

</NoteCell>

<NoteCell class="w-50% h-full top-10% left-50%"
        :enter="{scale: 0}"
        :click-2="{scale: 1}">

```python
print("the sceond call")
```
</NoteCell>

-->

<script setup>
import { ThebeCodeCell, ThebeNotebook, ThebeServer, makeConfiguration, makeRenderMimeRegistry, setupThebeCore, shortId } from 'thebe-core';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { globals } from './utils'
// import { useScriptTag } from '@vueuse/core'

// useScriptTag(
//     'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.4/require.min.js',
//     (el) => {
//         console.log("requirejs is loaded")
//     }
// )

// useScriptTag(
//     'https://cdn.plot.ly/plotly-2.35.2.min.js',
//     (el) => {
//         console.log("plotly is loaded")
//     }
// )

// useScriptTag(
//     'https://unpkg.com/thebe@latest/lib/index.js',
//     (el) => {
//         console.log("thebe client is loaded", el)
//     }
// )

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
        default: "http://192.168.100.101:5180/teacher_fa/"
    },
    "token": {
        type: String,
        default: "Qu@ntide2024"
    },
    "path": {
        type: String,
        default: "/home/teacher_fa/notebooks/"
    },
    "hideOutput": { // 是否立即显示输出，还是需要双击两次显示
        type: Boolean,
        default: false
    },
    "color": {
        type: String,
        default: "pulse"
    }
})

const style = computed(() => {
    return {
        'opacity': props.init ? 0 : 1
    }
})

const isCommandKeyPressed = ref(false);
let isCodeHidden = false;
const code = ref(null)
const outputWrapper = ref(null);
const codeStatus = {

}

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
    const nbid = `p${$page.value}`

    if (globals.jupyter[nbid]) {
        // console.log(`notebook ${nbid} already exists`)
        return
    }

    const notebook_name = `${$slidev.configs.slug}-${nbid}.ipynb`

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
        // outputWrapper.value.style.display = 'none'
        // outputWrapper.value.style.height = 0
    } else {
        // outputWrapper.value.style.display = 'block'
        // outputWrapper.value.style.height = '500px'
        code.value.classList.add('hide')
        outputWrapper.value.classList.remove('hide')
        isCodeHidden = true;
    }
};

const promptRunInSlide = () => {
    console.log('presenter mode: prompt to run in slide')
    warnPresenterMode.value.style.opacity = 1
    setTimeout(() => {
        warnPresenterMode.value.style.opacity = 0
    }, 3000)
}
const onRunCode = async (event) => {
    console.log('onRunCode', codeStatus, isCodeHidden)
    // window.thebe.bootstrap()
    if (code.value.id in codeStatus) {
        console.log("code already executed")
        return toggleOutput()
    }

    if ($renderContext.value === 'presenter') {
        promptRunInSlide()
        return
    }
    code.value.style.setProperty('--pseudo-before-content', "'running'")
    document.body.style.cursor = 'wait'

    const nbid = `p${$page.value}`
    const cellId = code.value.id
    // console.log(`running cell ${cellId}`, code.value.textContent)

    const notebook = globals.jupyter[nbid].notebook

    const cell = notebook.getCellById(cellId)
    await executeCell(cell)

    if (props.hideOutput) {
        outputWrapper.value.classList.add("hide")
    }

    document.body.style.cursor = 'default'
    code.value.style.setProperty('--pseudo-before-content', "'runnable'")

    codeStatus[code.value.id] = true
}

const executeCell = async (cell) => {
    const nbid = `p${$page.value}`

    const server = globals.jupyter[nbid].server

    if (globals.jupyter[nbid].session == null) {
        await server.connectToJupyterServer();
        const rendermime = makeRenderMimeRegistry(server.config.mathjax);
        let session = await server.startNewSession(rendermime);

        if (session == null) {
            console.error('could not start thebe jupyter session')
            return
        }

        // console.log(`started new session ${session.id}, notebook is ${nbid}`)

        globals.jupyter[nbid].session = session
    }

    cell.session = globals.jupyter[nbid].session
    console.log(`executing ${cell.id}:\n${cell.source}`)
    await cell.execute()
}

const initNotebook = async () => {
    const nbid = `p${$page.value}`
    const initCellId = `${nbid}-initial-cell`

    const jupyter = globals.jupyter[nbid]
    const notebook = jupyter.notebook
    const cell = notebook.getCellById(initCellId)

    await executeCell(cell)
    setTimeout(() => {
        outputWrapper.value.style.opacity = 0
    }, 5000)
}
const createCodeCell = async (codeEl, outputWrapper, isInitCell) => {
    const pageno = $page.value
    const nbid = `p${pageno}`
    const config = globals.jupyter[nbid].server.config
    const notebook = globals.jupyter[nbid].notebook

    const metadata = {}
    const cid = isInitCell ? `${nbid}-initial-cell` : `${nbid}-${shortId()}`

    codeEl.id = cid

    const cell = new ThebeCodeCell(cid, nbid, codeEl.textContent, config, metadata)

    outputWrapper.id = `${cid}-output`
    cell.attachToDOM(outputWrapper)

    if (isInitCell) {
        setTimeout(() => {
            initNotebook()
        }, 500)
    }

    notebook.cells.push(cell)

    const total = notebook.numCells()
    console.info(`created Cell: ${cid}, total cells: ${total}, code is: \n${codeEl.textContent}`)
}

onMounted(() => {
    if (!globals.jupyter) {
        setupThebeCore();

        globals.jupyter = {
        }
    }

    if ($renderContext.value === 'slide') {
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
        <div class="wrapper-all" @dblclick="onRunCode">
            <div ref="code" :style="style" class="thebe-code">
                <slot></slot>
            </div>
            <div ref="outputWrapper" class="output-wrapper" :style="{ '--output-text-color': props.color }" />
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
    /* position: absolute; */
    width: 100%;
    height: 100%;
}

.output-wrapper {
    flex-grow: 1;
    width: 100%;
    height: 100vh;
    /* background-color: #fefefe; */
    font-size: 0.8rem;
    overflow: auto;
    /* display: none; */
    padding-top: 15px;
    scrollbar-width: none;
    color: var(--output-text-color);
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
    position: fixed;
    padding: 2rem;
    top: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    text-align: center;
    font-size: 2rem;
}
</style>
