<!--
    see https://thebe.readthedocs.io/en/stable/start.html

在代码区，按住cmd + 双击运行代码，否则，双击为放大、还原
在输出区，双击切换放大或者还原

<Thebe init class="w-50% h-full top-10% left-50%">
```python
init_result = 5
print("hello world")
```
</Thebe>

<Thebe class="w-50% h-full top-10% left-50%"
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

</Thebe>

<Thebe class="w-50% h-full top-10% left-50%"
        :enter="{scale: 0}"
        :click-2="{scale: 1}">

```python
print("the sceond call")
```
</Thebe>

-->

<script setup>
import { onMounted, ref, computed, onUnmounted } from 'vue';
import { setupThebeCore, makeConfiguration, ThebeNotebook, ThebeServer, shortId, makeRenderMimeRegistry } from 'thebe-core';

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
        default: "/home/teacher_fa/notebooks/thebe.ipynb"
    }
})

const cellId = `_${shortId()}`

const style = computed(() => {
    return {
        'opacity': props.init ? 0 : 1
    }
})

let isModifierKeyPressed = false;

let isBusy = false;
const code = ref(null)
const isCodeZoomIn = ref(false);

const output = ref(null)
const outputWrapper = ref(null);
const isOutputZoomIn = ref(false);
const thebe = {}
const config = makeConfiguration({
    useBinder: false,
    bootstrap: true,
    useJupyterLite: false,
    kernelOptions: {
        kernelName: "python3",
        path: props.path
    },
    serverSettings: {
        appendToken: true,
        baseUrl: props.baseUrl,
        token: props.token
    },
})

const handleKeyDown = (event) => {
    if (event.key === 'Meta' || event.ctrlKey) {
        isModifierKeyPressed = true;
    }
};

const handleKeyUp = (event) => {
    if (event.key === 'Meta' || event.ctrlKey) {
        isModifierKeyPressed = false;
    }
};

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

const executeCell = async () => {
    if (isModifierKeyPressed) {
        if (isBusy) {
            console.log("busy")
            return
        }
        const cell = thebe.notebook.getCellById(cellId)
        code.value.style.cursor = 'wait'
        isBusy = true;
        await cell.execute();
        code.value.style.cursor = 'default'
        isBusy = false
    } else {
        toggleCodeZoom();
    }
};

onMounted(async () => {
    if ($renderContext.value === 'slide') {
        setupThebeCore();

        thebe.server = new ThebeServer(config);
        thebe.server.connectToJupyterServer();
        const rendermime = makeRenderMimeRegistry(thebe.server.config.mathjax);
        thebe.session = await thebe.server.startNewSession(rendermime);

        thebe.notebook = ThebeNotebook.fromCodeBlocks(
            [{ id: cellId, source: code.value.textContent }],
            config,
            rendermime
        )

        if (thebe.session == null) {
            console.error('could not start thebe session')
            return
        }

        thebe.notebook.attachSession(thebe.session)

        // fron-end and the notebook share same id
        const cell = thebe.notebook.getCellById(cellId)
        cell.attachToDOM(output.value)
        if (props.init) {
            cell.execute()
            setTimeout(() => {
                outputWrapper.value.style.opacity = 0
            }, 5000)
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    }
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
});
</script>

<template>
    <div :id="cellId" :class="[$attrs.class, 'abs', 'flex', 'flex-col']" v-motion v-bind="$attrs">
        <div ref="code" :style="style" class="thebe-code" @dblclick="executeCell">
            <slot></slot>
        </div>
        <div ref="outputWrapper" class="output-wrapper flex-1" @dblclick="toggleOutputZoom">
            <div ref="output" />
        </div>
    </div>

</template>
<style scoped>
.output-wrapper {
    /* border: 1px solid #ccc; */
    /* padding-top: 1.5rem; */
    position: relative;
    overflow-y: auto;
    width: 100%;
    background-color: #fefefe;
    padding-top: 0.5rem;
}

.thebe-code {
    position: relative;
    max-height: 50%;
    overflow-y: auto;
}
</style>
