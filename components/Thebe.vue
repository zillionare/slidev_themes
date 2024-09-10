<!--
    see https://thebe.readthedocs.io/en/stable/start.html

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
import { onMounted, ref, computed, useAttrs } from 'vue';
import { setupThebeCore, makeConfiguration, ThebeNotebook, ThebeServer, shortId, makeRenderMimeRegistry } from 'thebe-core';

const props = defineProps({
    "init": {
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
    }
})

const cellId = `_${shortId()}`

const style = computed(() => {
    return {
        'opacity': props.init ? 0 : 1
    }
})


const code = ref(null)
const thebe = {}
const config = makeConfiguration({
    useBinder: false,
    bootstrap: true,
    useJupyterLite: false,
    serverSettings: {
        appendToken: true,
        baseUrl: props.baseUrl,
        token: props.token
    },
})

config.events.on('status',
    (evt, { status, message }) => console.debug(evt, status, message)
)

onMounted(async () => {
    if ($renderContext.value === 'slide') {
        setupThebeCore();
    }

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
    const output = document.querySelector(`#${cellId} > .output`)
    cell.attachToDOM(output)
    if (props.init) {
        cell.execute()
        setTimeout(() => {
            output.style.opacity = 0
        }, 5000)
    } else {
        // 其它cell需要手动运行
        const el = code.value;

        el.addEventListener('click', () => {
            cell.execute()
        })
    }
})
</script>

<template>
    <div :id="cellId" :class="[$attrs.class, 'abs', 'flex', 'flex-col']" v-motion v-bind="$attrs">
        <div ref="code" :style="style" class="thebe-code">
            <slot></slot>
        </div>
        <div :class="[$attrs.class, 'output', 'flex-1']" />
    </div>

</template>
<style scoped>
.output {
    /* border: 1px solid #ccc; */
    /* padding-top: 1.5rem; */
    overflow-y: scroll;
    width: 100%;
}

.button-run {
    @apply flex items-center justify-center w-60px h-25px bg-gray-100 ml-auto;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
}

.thebe-code {
    position: relative;
}

.thebe-code::before {
    content: "run";
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #f0ad4e;
    color: white;
    border-radius: 5px;
    width: 60px;
    height: 25px;
    cursor: pointer;
    text-align: center;
    padding-bottom: 5px;
    z-index: 1;
}
</style>
