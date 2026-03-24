---
theme: default
class: text-center
highlighter: shiki
lineNumbers: false
info: |
  ## Interactive Table Addon Example
  
  Demonstration of the interactive table features
drawings:
  persist: false
transition: slide-left
title: Interactive Table Demo
mdc: true
---
<style>
.interactive-table {
  --row-highlight-color: #202020;
  --column-highlight-color: #f3e5f5;
  --persistent-highlight-color: #fff3e0;
  --border-color: #fff;
}
</style>

# Interactive Table Addon

一个支持交互式高亮的表格组件

---

# 基本用法

<InteractiveTable class="w-20%" sep='|'>

```md
Name|Age|City|Occupation
Alice|25|New York|Designer
Bob|30|London|Developer
Charlie|35|Tokyo|Manager
Diana|28|Paris|Artist
Eve|32|Berlin|Engineer
```

</InteractiveTable>

---

# 功能演示

## 🖱️ 交互功能

- **鼠标悬停**: 高亮整行
- **Shift + 鼠标悬停**: 高亮整列  
- **Cmd/Ctrl + 点击**: 切换单元格持续高亮

---

# 数据表格示例

<InteractiveTable sep=','>

```md
产品,价格,库存,状态
iPhone 15,999,50,有货
MacBook Pro,1999,25,有货
iPad Air,599,100,有货
Apple Watch,399,75,缺货
AirPods Pro,249,200,有货
```

</InteractiveTable>

---

# 使用说明

## 安装

```bash
npm install slidev-addon-interactive-table
```

## 在 Slidev 中使用

````vue
<InteractiveTable sep='|'>
```md
Header1|Header2|Header3
Data1|Data2|Data3
```
</InteractiveTable>
````

---

# 自定义样式

可以通过 CSS 变量自定义表格样式：

```css
.interactive-table {
  --row-highlight-color: #e3f2fd;
  --column-highlight-color: #f3e5f5;
  --persistent-highlight-color: #fff3e0;
  --border-color: #ddd;
}
```

---

# 感谢使用！

🎉 Interactive Table Addon 让你的演示更加生动有趣

- 支持多种高亮模式
- 响应式设计
- 深色主题支持
- 易于使用和自定义
