import { definePreparserSetup } from '@slidev/types'

/**
 * GMF alerts ( > [!TIP] / > [!TIP 自定义标题] ) -> markdown-it-admon ( !!! tip 标题 )
 * 使两种语法完全等价: 输出同一套 quantide-admonition DOM / 配色 / 图标。
 * 支持: 多行引用、引用内列表、缩进、类型后自定义标题。
 */
export default definePreparserSetup(() => {
  const reOpen = /^\s*>\s*\[!(\w+)\]\s*(.*)$/
  const types = new Set([
    'note', 'summary', 'abstract', 'tldr', 'info', 'todo', 'tip', 'hint',
    'success', 'check', 'done', 'question', 'help', 'faq', 'warning',
    'attention', 'caution', 'failure', 'fail', 'missing', 'danger',
    'error', 'bug', 'example', 'snippet', 'quote', 'cite',
  ])
  const ext: SlidevPreparserExtensionLike = {
    name: 'gmf-to-admonition',
    transformRawLines(lines: string[]) {
      for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(reOpen)
        if (!m) continue
        const rawType = m[1].toLowerCase()
        const type = rawType === 'important' ? 'example' : rawType
        if (!types.has(type)) continue
        const title = m[2].trim()
        const indentMatch = lines[i].match(/^(\s*)>/)
        const indent = indentMatch ? indentMatch[1] : ''
        lines[i] = indent + '!!! ' + type + (title ? ' ' + title : '')
        let j = i + 1
        for (; j < lines.length; j++) {
          const q = lines[j].match(/^(\s*)>\s?(.*)$/)
          if (!q) break
          lines[j] = q[2].trim() === '' ? '' : q[1] + '    ' + q[2]
        }
        if (j < lines.length && lines[j].trim() !== '' && !/^\s*!!!/.test(lines[j])) {
          lines.splice(j, 0, '')
        }
        i = j
      }
    },
  }
  return [ext]
})

type SlidevPreparserExtensionLike = {
  name?: string
  transformRawLines?: (lines: string[]) => void | Promise<void>
}
