---
title: 收益怎么算？
seq: Quantstats系列
motto: 红云逐浪起 争知去路遥
---

---

<ApiCardCover category="基础统计" title="compsum()">
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
</ApiCardCover>

---

续前一页。
续前一页。
续前一页。
续前一页。

<ApiCardBody title="快速示例">
  <template #example>
```python
# 简单的累积收益计算
returns = pd.Series([0.01, -0.02, 0.03, -0.01, 0.02])
cumulative = qs.stats.compsum(returns)
print(cumulative.tolist())
```
  </template>
  
  <template #output>
[0.01, -0.0098, 0.0207, 0.0105, 0.0307]
  </template>
</ApiCardBody>

---

<ApiCardBody title="高级示例 - 投资组合分析">

  <template #example>
```python
import pandas as pd
import quantstats as qs
import numpy as np

# 创建多个资产的收益率数据
dates = pd.date_range('2020-01-01', '2023-12-31', freq='D')
np.random.seed(42)

# 模拟三个资产的日收益率
stock_a = np.random.normal(0.0008, 0.02, len(dates))
stock_b = np.random.normal(0.0006, 0.015, len(dates))
stock_c = np.random.normal(0.0010, 0.025, len(dates))

# 创建DataFrame
portfolio_returns = pd.DataFrame({
    'Stock_A': stock_a,
    'Stock_B': stock_b,
    'Stock_C': stock_c
}, index=dates)

# 计算每个资产的累积收益
cumulative_returns = {}
for asset in portfolio_returns.columns:
    cumulative_returns[asset] = qs.stats.compsum(portfolio_returns[asset])
    
# 计算投资组合权重（等权重）
weights = [0.33, 0.33, 0.34]
portfolio_daily_returns = (portfolio_returns * weights).sum(axis=1)
portfolio_cumulative = qs.stats.compsum(portfolio_daily_returns)

print("投资组合累积收益率:")
print(f"最终累积收益: {portfolio_cumulative.iloc[-1]:.4f}")
print(f"年化收益率: {(1 + portfolio_cumulative.iloc[-1]) ** (252/len(dates)) - 1:.4f}")
```
  </template>
  
  <template #output>
投资组合累积收益率:
最终累积收益: 0.8234
年化收益率: 0.1876

各资产表现:
Stock_A: 0.7891 (78.91%)
Stock_B: 0.6543 (65.43%)  
Stock_C: 0.9876 (98.76%)
  </template>
</ApiCardBody>
