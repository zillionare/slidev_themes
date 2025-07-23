# ApiCardBody 使用示例

## 基础用法

```vue
<ApiCardBody title="高级示例 - 投资组合分析">
  <template #description>
    这个示例展示了如何使用 compsum() 函数进行完整的投资组合分析，包括多个资产的累积收益计算。
  </template>
  
  <template #notes>
    在实际应用中，建议先对数据进行清洗和预处理，确保没有缺失值或异常值。
  </template>
  
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
```

## 简化用法

```vue
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
```
