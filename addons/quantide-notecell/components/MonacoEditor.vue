<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'

interface Props {
  modelValue: string
  language?: string
  theme?: string
  readonly?: boolean
  height?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  language: 'python',
  theme: 'vs',
  readonly: false,
  height: '200px'
})

const emit = defineEmits<Emits>()

const editorContainer = ref<HTMLElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null

const initEditor = () => {
  if (!editorContainer.value) return

  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language,
    theme: props.theme,
    readOnly: props.readonly,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    fontSize: 14,
    lineNumbers: 'on',
    automaticLayout: true,
    wordWrap: 'on',
    folding: false,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    glyphMargin: false,
    contextmenu: false,
    selectOnLineNumbers: true,
    roundedSelection: false,
    cursorStyle: 'line',
    cursorWidth: 2,
    renderLineHighlight: 'line',
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8
    }
  })

  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    if (editor) {
      const value = editor.getValue()
      emit('update:modelValue', value)
      emit('change', value)
    }
  })

  // 设置编辑器高度
  editorContainer.value.style.height = props.height
}

// 监听 modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue)
  }
})

// 监听只读状态变化
watch(() => props.readonly, (newReadonly) => {
  if (editor) {
    editor.updateOptions({ readOnly: newReadonly })
  }
})

// 获取编辑器值的方法
const getValue = () => {
  return editor?.getValue() || ''
}

// 设置编辑器值的方法
const setValue = (value: string) => {
  if (editor) {
    editor.setValue(value)
  }
}

// 聚焦编辑器
const focus = () => {
  if (editor) {
    editor.focus()
  }
}

// 暴露方法给父组件
defineExpose({
  getValue,
  setValue,
  focus,
  editor: () => editor
})

onMounted(() => {
  initEditor()
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
    editor = null
  }
})
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  border: none;
  border-radius: 4px;
  overflow: hidden;
  background: transparent;
}

.monaco-editor-container :deep(.monaco-editor) {
  background-color: #ffffff !important;
}

.monaco-editor-container :deep(.monaco-editor .margin) {
  background-color: #ffffff !important;
}

.monaco-editor-container :deep(.monaco-editor .monaco-editor-background) {
  background-color: #ffffff !important;
}

.monaco-editor-container :deep(.monaco-editor .view-lines) {
  background-color: #ffffff !important;
}
</style>