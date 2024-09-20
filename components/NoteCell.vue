<!--
    see https://thebe.readthedocs.io/en/stable/start.html

每一张slides都有自己的惟一的notebook，不同的slides之间，notebook不共享

在代码区，按住cmd + 单击运行代码，否则，双击为放大、还原
在输出区，双击切换放大或者还原

在有多个组件时，请使用scale动画，以避免彼此干扰捕获鼠标

<NoteCell init class="w-50% h-full top-10% left-50%">
```python
init_result = 5
print("hello world")
```
</NoteCell>

<NoteCell class="w-50% h-full top-10% left-50%"
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
        default: "M@cao123"
    },
    "path": {
        type: String,
        default: "/home/teacher_fa/notebooks/"
    }
})

const style = computed(() => {
    return {
        'opacity': props.init ? 0 : 1
    }
})

const isCommandKeyPressed = ref(false);

const code = ref(null)
const isCodeZoomIn = ref(false);

const outputWrapper = ref(null);
const isOutputZoomIn = ref(false);

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


const toggleOutputZoom = () => {
    if (isOutputZoomIn.value) {
        // 恢复原始样式
        outputWrapper.value.style.position = 'relative';
        outputWrapper.value.style.width = '';
        outputWrapper.value.style.height = '';
        outputWrapper.value.style.left = '';
        outputWrapper.value.style.top = '';
        isOutputZoomIn.value = false;
    } else {
        // 设置全屏样式
        outputWrapper.value.style.position = 'fixed';
        outputWrapper.value.style.width = '100%';
        outputWrapper.value.style.height = '100%';
        outputWrapper.value.style.left = 0;
        outputWrapper.value.style.top = 0;
        outputWrapper.value.style.overflowY = 'auto';
        isOutputZoomIn.value = true;
    }
};

const toggleCodeZoom = () => {
    if (isCodeZoomIn.value) {
        // 恢复原始样式
        code.value.style.maxHeight = '80%';
        code.value.style.width = '';
        code.value.style.height = '';
        code.value.style.left = '';
        code.value.style.top = '';
        isCodeZoomIn.value = false;
    } else {
        // 设置缩放样式
        code.value.style.maxHeight = '50%';
        code.value.style.width = '100%';
        code.value.style.height = '100%';
        code.value.style.left = 0;
        code.value.style.top = 0;
        isCodeZoomIn.value = true;
    }
}

const onRunCode = async (event) => {
    if (isCommandKeyPressed.value) {
        code.value.style.setProperty('--pseudo-before-content', "'running'")
        document.body.style.cursor = 'wait'

        const nbid = `p${$page.value}`
        const cellId = code.value.id
        // console.log(`running cell ${cellId}`, code.value.textContent)

        const notebook = globals.jupyter[nbid].notebook

        const cell = notebook.getCellById(cellId)
        await executeCell(cell)

        document.body.style.cursor = 'default'
        code.value.style.setProperty('--pseudo-before-content', "'runnable'")
    } else {
        event.stopPropagation()
    }

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
    const initCellId = `${nbid}-initial-cell`
    const nbid = `p${$page.value}`

    const notebook = globals.jupyter[nbid]
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
        }, 100)
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
    <div :class="$attrs.class" v-motion v-bind="$attrs">
        <div ref="code" :style="style" class="thebe-code" @click="onRunCode" @dblclick="toggleCodeZoom">
            <slot></slot>
        </div>
        <div ref="outputWrapper" class="output-wrapper" @dblclick="toggleOutputZoom" />
    </div>

</template>
<style scoped>
.output-wrapper {
    /* border: 1px solid #ccc; */
    width: 100%;
    background-color: #fefefe;
    padding: 1rem 0rem 2rem 0.5rem;
    font-size: 0.8rem;
    display: flex;
}

.thebe-output {
    width: 100% !important;
}

.thebe-code {
    position: relative;
    overflow-y: auto;
    max-height: 80%;
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

.thebe-run-button:hover {
    cursor: pointer;
    transform: scale(1.1);
}

.thebe-run-button:disabled {
    background-color: #ccc;
    opacity: 0.5;
}
</style>
