<!--
    see https://thebe.readthedocs.io/en/stable/start.html

每一张slides都有自己的惟一的notebook，不同的slides之间，notebook不共享

在代码区，按住cmd + 双击运行代码，否则，双击为放大、还原
在输出区，双击切换放大或者还原

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
import { computed, onMounted, ref } from 'vue';
import { globals } from './utils'

const notebook_name = `${$slidev.configs.slug}-p${$page.value}.ipynb`

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

const runButton = ref(null)
const code = ref(null)
const isCodeZoomIn = ref(false);

const outputWrapper = ref(null);
const isOutputZoomIn = ref(false);

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
        isOutputZoomIn.value = true;
    }
};

const toggleCodeZoom = () => {
    if (isCodeZoomIn.value) {
        // 恢复原始样式
        code.value.style.position = 'relative';
        code.value.style.maxHeight = '50%';
        code.value.style.width = '';
        code.value.style.height = '';
        code.value.style.left = '';
        code.value.style.top = '';
        isCodeZoomIn.value = false;
    } else {
        // 设置缩放样式
        code.value.style.maxHeight = '100%';
        code.value.style.width = '100%';
        code.value.style.height = '100%';
        code.value.style.left = 0;
        code.value.style.top = 0;
        isCodeZoomIn.value = true;
    }
}

config.events.on('status',
    (evt, { status, message }) => console.debug(evt, status, message)
)

const onRunCode = async (event) => {
    runButton.value.disabled = true
    const nbid = `p${$page.value}`
    const notebook = globals.jupyter.notebooks[nbid]

    console.log("onRuncode: notebook is ", nbid, ",cell id is ", event.target.id)

    const cell = notebook.getCellById(event.target.id)
    document.body.style.cursor = 'wait'
    notebook.attachSession(globals.jupyter.session)
    await cell.execute();
    document.body.style.cursor = 'default'
    runButton.value.disabled = false
}

const createCodeCell = (codeEl, config, outputWrapper, isInitCell) => {
    const nbid = `p${$page.value}`
    const metadata = {}
    const cid = isInitCell ? `p${$page}-initial-cell` : shortId()

    // 将runButton与cell绑定
    console.log("bind runButton to cell", cid)
    runButton.value.id = cid

    const cell = new ThebeCodeCell(cid, nbid, codeEl.textContent, config, metadata)

    // 创建output
    const output = document.createElement("div")
    output.id = isInitCell ? `p${$page}-initial-output` : cid + "-output"
    output.style = {
        width: '100%',
        height: '100%'
    }

    outputWrapper.appendChild(output)

    cell.attachToDOM(output)

    console.info(`created ${cid} with output ${output.id}, src is`, codeEl)
    if (isInitCell) {
        cell.execute()
        setTimeout(() => {
            outputWrapper.removeChild(output)
        }, 5000)
    }

    let notebook = globals.jupyter.notebooks[nbid]
    notebook.cells.push(cell)
}

onMounted(async () => {
    if ($renderContext.value === 'slide') {
        if (!globals.jupyter) {
            setupThebeCore();

            let server = new ThebeServer(config)
            server.connectToJupyterServer();
            const rendermime = makeRenderMimeRegistry(server.config.mathjax);
            let session = await server.startNewSession(rendermime);
            if (session == null) {
                console.error('could not start thebe jupyter session')
                return
            }

            globals.jupyter = {
                server: server,
                session: session,
                rendermime: rendermime,
                notebooks: {}
            }
        } else {
            console.log("thebe server already started", globals.jupyter)
        }

        const nbid = `p${$page.value}`

        if (!(nbid in globals.jupyter.notebooks)) {
            const notebook = new ThebeNotebook($page.value, config, globals.jupyter.rendermime);
            notebook.cells = []
            notebook.attachSession(globals.jupyter.session)
            globals.jupyter.notebooks[nbid] = notebook;
        }

        createCodeCell(code.value, config, outputWrapper.value, props.init)
    }
})

</script>

<template>
    <div :class="[$attrs.class, 'abs', 'flex', 'flex-col']" v-motion v-bind="$attrs">
        <div ref="runButton" @click="onRunCode" class="thebe-run-button">run</div>

        <div ref="code" :style="style" class="thebe-code" @dblclick="toggleCodeZoom">
            <slot></slot>
        </div>
        <div ref="outputWrapper" class="output-wrapper" @dblclick="toggleOutputZoom"></div>
    </div>

</template>
<style scoped>
.output-wrapper {
    /* border: 1px solid #ccc; */
    /* padding-top: 1.5rem; */
    position: relative;
    overflow-y: auto;
    width: 100%;
    /* background-color: #fefefe; */
    padding: 0.5rem 1rem 0 0.5rem;
    font-size: 0.8rem;
}

.thebe-code {
    position: relative;
    max-height: 50%;
    overflow-y: auto;
}

.thebe-run-button {
    background-color: rgba(240, 180, 50);
    width: 4rem;
    padding: auto;
    text-align: center;
    border-radius: 10px;
    height: 1.3rem;
    position: absolute;
    z-index: 1;
    top: -1rem;
    font-size: 0.9rem;
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
