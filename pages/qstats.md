---
title: 收益怎么算？
seq: Quantstats系列
motto: 红云逐浪起 争知去路遥
---

---

<FuncCard category="基础统计" title="compsum()">
  <template #description>
    计算滚动复合收益率（累积乘积）- 将收益率序列转换为累积财富指数
  </template>
  <template #signature>
    compsum(returns)
  </template>
  <template #returns>
    pd.Series - 累积复合收益率序列
  </template>
  <template #params>
returns: 收益率序列
benchmark: 对照
  </template>
  <template #example>
```python
returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
cumulative = qs.stats.compsum(returns)
# 输出: [0.01, -0.0098, 0.0207, 0.0105, 0.0307]
returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
cumulative = qs.stats.compsum(returns)
# 输出: [0.01, -0.0098, 0.0207, 0.0105, 0.0307]
returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
cumulative = qs.stats.compsum(returns)
# 输出: [0.01, -0.0098, 0.0207, 0.0105, 0.0307]
returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
cumulative = qs.stats.compsum(returns)
# 输出: [0.01, -0.0098, 0.0207, 0.0105, 0.0307]
```
</template>
</FuncCard>

---

续前一页。
续前一页。
续前一页。
续前一页。

```python


returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
```

<FuncCard category="类别" title="函数名">
<template #description>
 函数简要说明
</template>
<template #signature>
 函数签名
</template>
<template #returns>
 返回值
</template>
<template #params>
 参数1
</template>
<template #example>
```python
#示例代码
```
</template>
</FuncCard><FuncCard category="类别" title="函数名">
<template #description>
 函数简要说明
</template>
<template #signature>
 函数签名
</template>
<template #returns>
 返回值
</template>
<template #params>
 参数1
</template>
<template #example>
```python
 #示例代码
```
</template>
</FuncCard>

---

这也会在pre code 中？
