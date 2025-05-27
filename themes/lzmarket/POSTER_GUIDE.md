# 商品宣传海报设计指南

本主题提供了两种专业的商品宣传海报布局，具有惊人的视觉效果，适用于各种商品推广场景。

## 🎨 设计特色

### 视觉效果
- **4:3黄金比例** (1200px × 900px) - 适合各种展示平台
- **渐变背景** - 现代化的色彩搭配
- **几何装饰** - 增强视觉层次感
- **动画效果** - 吸引用户注意力
- **响应式设计** - 支持不同设备尺寸

### 布局特点
- **层次分明** - 主标题、价格、描述、二维码合理布局
- **视觉冲击** - 大胆的字体和色彩设计
- **信息完整** - 包含所有必要的商品信息

## 📋 布局选择

### 1. paid-article 布局
**适用场景**: 知识付费、课程推广、专业服务
**特点**: 
- 更加专业和学术化的设计风格
- 适合教育培训类产品
- 强调内容价值和专业性

### 2. product-poster 布局  
**适用场景**: 实物商品、电商促销、限时优惠
**特点**:
- 更加商业化和促销感的设计
- 突出价格和优惠信息
- 营造购买紧迫感

## 🛠️ 使用方法

### 基本配置

在Markdown文件的frontmatter中配置以下参数：

```yaml
---
layout: paid-article  # 或 product-poster
title: "您的商品标题"
price: "¥299"
description: "商品描述文字，建议控制在30字以内"
qrcode: "https://images.jieyu.ai/images/hot/quantfans.png"
---
```

### 参数说明

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `layout` | string | ✅ | 布局类型：`paid-article` 或 `product-poster` |
| `title` | string | ✅ | 主标题，建议10个字以内 |
| `price` | string | ✅ | 价格显示，支持任何货币符号 |
| `description` | string | ✅ | 购买说明，建议30个字以内 |
| `qrcode` | string | ✅ | 客服微信二维码图片URL |
| `bgImage` | string | ❌ | 背景图片URL（仅product-poster支持） |

## 📝 示例文件

### 示例1: 知识付费产品
```yaml
---
layout: paid-article
title: "AI投资策略"
price: "¥299"
description: "专业量化团队打造，历史回测年化收益率35%，风险可控"
qrcode: "https://images.jieyu.ai/images/hot/quantfans.png"
---
```

### 示例2: 电商商品
```yaml
---
layout: product-poster
title: "超值好货"
price: "¥199"
description: "精选优质商品，品质保证，限时特价优惠，数量有限"
qrcode: "https://images.jieyu.ai/images/hot/quantfans.png"
bgImage: "https://example.com/product-bg.jpg"
---
```

## 🎯 设计建议

### 文字内容
- **主标题**: 控制在10个字以内，突出核心卖点
- **价格**: 使用醒目的价格，可以包含货币符号
- **描述**: 30字左右，突出产品优势和紧迫性
- **客服信息**: 使用清晰的二维码图片

### 视觉效果
- 利用动画效果吸引注意力
- 保持色彩搭配的和谐统一
- 确保文字在各种背景下都清晰可读

### 营销策略
- 突出限时优惠、数量有限等紧迫感
- 强调产品的独特价值和优势
- 提供便捷的联系方式

## 🚀 快速开始

1. 复制示例文件 `example-poster.md` 或 `product-example.md`
2. 修改frontmatter中的配置信息
3. 使用Slidev预览效果：`npx slidev your-file.md`
4. 导出为图片：`npx slidev export your-file.md --format png`

## 💡 自定义建议

如需进一步自定义，可以：
- 修改CSS变量调整颜色主题
- 添加自定义动画效果
- 调整布局比例和间距
- 集成品牌元素和Logo

---

*设计理念：简洁而不简单，突出而不突兀，专业而不失亲和力*
