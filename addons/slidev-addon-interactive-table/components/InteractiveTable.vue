<!--
  Interactive Table Component for Slidev
  
  Features:
  - Mouse hover: highlight entire row
  - Shift + mouse hover: highlight entire column
  - Cmd/Win + click: toggle persistent cell highlight
  
  Usage:
  <InteractiveTable sep='|'>
  ```md
  Name|Age|City
  Alice|25|New York
  Bob|30|London
  Charlie|35|Tokyo
  ```
  </InteractiveTable>
-->

<script setup>
import { onMounted, ref, reactive } from 'vue'

const data = ref(null)
const body = ref([])
const head = ref([])
const tableRef = ref(null)

// 状态管理
const state = reactive({
    hoveredRow: -1,
    hoveredCol: -1,
    isShiftPressed: false,
    persistentCells: new Set() // 存储持续高亮的单元格
})

const props = defineProps({
    theme: {
        default: 'interactive-table',
    },
    sep: {
        type: String,
        default: ','
    }
})

// 键盘事件监听
const handleKeyDown = (e) => {
    if (e.key === 'Shift') {
        state.isShiftPressed = true
    }
}

const handleKeyUp = (e) => {
    if (e.key === 'Shift') {
        state.isShiftPressed = false
        state.hoveredCol = -1
    }
}

// 鼠标事件处理
const handleCellMouseEnter = (rowIndex, colIndex) => {
    if (state.isShiftPressed) {
        state.hoveredCol = colIndex
        state.hoveredRow = -1
    } else {
        state.hoveredRow = rowIndex
        state.hoveredCol = -1
    }
}

const handleCellMouseLeave = () => {
    if (!state.isShiftPressed) {
        state.hoveredRow = -1
    }
    state.hoveredCol = -1
}

const handleCellClick = (e, rowIndex, colIndex) => {
    if (e.metaKey || e.ctrlKey) { // Cmd on Mac, Ctrl on Windows/Linux
        e.preventDefault()
        const cellKey = `${rowIndex}-${colIndex}`

        if (state.persistentCells.has(cellKey)) {
            state.persistentCells.delete(cellKey)
        } else {
            state.persistentCells.add(cellKey)
        }
    }
}

// 判断单元格是否应该高亮
const isCellHighlighted = (rowIndex, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`

    // 持续高亮的单元格
    if (state.persistentCells.has(cellKey)) {
        return 'persistent'
    }

    // 行高亮
    if (state.hoveredRow === rowIndex && state.hoveredCol === -1) {
        return 'row'
    }

    // 列高亮
    if (state.hoveredCol === colIndex && state.hoveredRow === -1) {
        return 'column'
    }

    return ''
}

// 判断表头是否应该高亮
const isHeaderHighlighted = (colIndex) => {
    if (state.hoveredCol === colIndex && state.hoveredRow === -1) {
        return 'column'
    }
    return ''
}

onMounted(() => {
    const content = data.value.textContent.trim()
    const lines = content.split('\n').filter(line => line.trim())

    if (lines.length > 0) {
        // 第一行作为表头
        head.value = lines[0].split(props.sep)
        // 其余行作为表体
        body.value = lines.slice(1)
    }

    // 添加键盘事件监听
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
})

// 组件卸载时清理事件监听
import { onUnmounted } from 'vue'
onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
    document.removeEventListener('keyup', handleKeyUp)
})
</script>

<template>
    <div :class="$attrs.class" v-bind="$attrs">
        <div ref="data" style="display:none">
            <slot />
        </div>

        <table ref="tableRef" :class="props.theme">
            <thead>
                <th v-for="(item, colIndex) in head" :key="colIndex" :class="{
                    'highlight-column': isHeaderHighlighted(colIndex) === 'column'
                }">
                    {{ item }}
                </th>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in body" :key="rowIndex">
                    <td v-for="(text, colIndex) in row.split(props.sep)" :key="colIndex" :class="{
                        'highlight-row': isCellHighlighted(rowIndex, colIndex) === 'row',
                        'highlight-column': isCellHighlighted(rowIndex, colIndex) === 'column',
                        'highlight-persistent': isCellHighlighted(rowIndex, colIndex) === 'persistent'
                    }" @mouseenter="handleCellMouseEnter(rowIndex, colIndex)" @mouseleave="handleCellMouseLeave"
                        @click="handleCellClick($event, rowIndex, colIndex)">
                        {{ text }}
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- 使用说明 -->
        <div class="usage-hint">
            <small>
                💡 悬停高亮行 | Shift+悬停高亮列 | Cmd/Ctrl+点击持续高亮单元格
            </small>
        </div>
    </div>
</template>

<style scoped>
.interactive-table {
    border-collapse: collapse;
    border-width: 0;
    width: 100%;
    margin: 1rem 0;
    font-family: inherit;
}

.interactive-table th,
.interactive-table td {
  border: none;
  padding: 8px 12px;
  text-align: left;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

.interactive-table th {
    background-color: #f5f5f5;
    font-weight: bold;
}

/* 行高亮 */
.highlight-row {
    background-color: #e3f2fd !important;
}

/* 列高亮 */
.highlight-column {
    background-color: #f3e5f5 !important;
}

/* 持续高亮 */
.highlight-persistent {
    background-color: #fff3e0 !important;
    border: 2px solid #ff9800 !important;
    position: relative;
}

.highlight-persistent::after {
    content: '📌';
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 10px;
    opacity: 0.7;
}

/* 悬停效果 */
.interactive-table td:hover {
    background-color: #f0f0f0;
}

.interactive-table th:hover {
    background-color: #e0e0e0;
}

/* 使用说明样式 */
.usage-hint {
    margin-top: 0.5rem;
    color: #666;
    font-style: italic;
}

.usage-hint small {
    font-size: 0.8rem;
}

/* 深色主题支持 */
@media (prefers-color-scheme: dark) {
    .interactive-table th {
        background-color: #2d2d2d;
        color: #fff;
    }

    .interactive-table th,
  .interactive-table td {
    border: none;
    color: #fff;
  }

    .highlight-row {
        background-color: #1a237e !important;
    }

    .highlight-column {
        background-color: #4a148c !important;
    }

    .highlight-persistent {
        background-color: #e65100 !important;
        border-color: #ff9800 !important;
    }

    .interactive-table td:hover {
        background-color: #333;
    }

    .interactive-table th:hover {
        background-color: #444;
    }

    .usage-hint {
        color: #aaa;
    }
}
</style>
