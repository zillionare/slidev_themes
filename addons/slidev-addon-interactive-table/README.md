# Slidev Addon: Interactive Table

一个为 Slidev 设计的交互式表格组件，支持多种高亮模式，让你的演示更加生动有趣。

## ✨ 功能特性

- 🖱️ **鼠标悬停行高亮**: 鼠标悬停时高亮整行
- ⌨️ **Shift + 悬停列高亮**: 按住 Shift 键悬停时高亮整列
- 📌 **持续单元格高亮**: Cmd/Ctrl + 点击切换单元格持续高亮
- 🎨 **响应式设计**: 自适应不同屏幕尺寸
- 🌙 **深色主题支持**: 自动适配深色模式
- 🔧 **高度可定制**: 支持自定义样式和主题

## 📦 安装

```bash
npm install slidev-addon-interactive-table
```

## 🚀 使用方法

### 基本用法

在你的 Slidev 演示文稿中使用 `InteractiveTable` 组件：

```vue
<InteractiveTable sep='|'>

```md
Name|Age|City|Occupation
Alice|25|New York|Designer
Bob|30|London|Developer
Charlie|35|Tokyo|Manager
```

</InteractiveTable>
```

### 使用逗号分隔符

```vue
<InteractiveTable sep=','>

```md
产品,价格,库存,状态
iPhone 15,999,50,有货
MacBook Pro,1999,25,有货
iPad Air,599,100,有货
```

</InteractiveTable>
```

## 🎮 交互操作

| 操作 | 效果 |
|------|------|
| 鼠标悬停单元格 | 高亮整行 |
| Shift + 鼠标悬停 | 高亮整列 |
| Cmd/Ctrl + 点击单元格 | 切换单元格持续高亮 |

## ⚙️ 配置选项

### Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `sep` | String | `','` | 数据分隔符 |
| `theme` | String | `'interactive-table'` | CSS 类名主题 |

### 示例

```vue
<InteractiveTable 
  sep='|' 
  theme='my-custom-table'
  class='w-full mt-4'
>
  <!-- 表格数据 -->
</InteractiveTable>
```

## 🎨 自定义样式

你可以通过 CSS 自定义表格的外观：

```css
/* 自定义高亮颜色 */
.interactive-table .highlight-row {
  background-color: #your-row-color !important;
}

.interactive-table .highlight-column {
  background-color: #your-column-color !important;
}

.interactive-table .highlight-persistent {
  background-color: #your-persistent-color !important;
  border-color: #your-border-color !important;
}

/* 自定义表格样式 */
.interactive-table {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

## 🌙 深色主题

组件自动支持深色主题，会根据用户的系统偏好自动切换样式。

## 📝 数据格式

表格数据应该以 Markdown 代码块的形式提供，第一行作为表头，后续行作为数据行：

```md
Header1|Header2|Header3
Data1|Data2|Data3
Data4|Data5|Data6
```

## 🔧 开发

### 本地开发

```bash
# 克隆项目
git clone <repository-url>
cd slidev-addon-interactive-table

# 安装依赖
npm install

# 运行示例
npm run dev
```

### 构建

```bash
npm run build
```

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如果你在使用过程中遇到问题，请：

1. 查看 [示例文档](./example.md)
2. 提交 [Issue](https://github.com/yourusername/slidev-addon-interactive-table/issues)
3. 参考 [Slidev 官方文档](https://sli.dev/)

---

**享受你的交互式演示体验！** 🎉