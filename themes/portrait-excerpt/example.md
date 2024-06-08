---
theme: ./
date: 2023-12-20
lunar: 十一月初八
title: 已实现跳跃波动率
brand: 每天1分钟 轻松学量化
---

With CSS grid layout, the grid itself within its container as well as grid items can be positioned with the following 6 properties: justify-items, align-items, justify-content, align-content, justify-self, and align-self. These properties are part of the CSS box alignment module and they define a standard way to position elements with either flexbox or CSS grid.

!!! info
    Most of the alignment properties are applied on the grid container, but some are for grid items, for when you want to specify values that apply only for specific grid items.

In this article, you will explore each of the CSS grid properties.

## 二级标题

* Slide bullet text
  * Slide bullet text
  * Slide bullet text
* Slide bullet text
* Slide bullet text

---
layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# Slide Title

Colons can be used to align columns.

| Tables        |      Are      |  Cool |
| ------------- | :-----------: | ----: |
| col 3 is      | right-aligned | $1600 |
| col 2 is      |   centered    |   $12 |
| zebra stripes |   are neat    |    $1 |

---
layout: section
---

# Section Title

---
layout: statement
---

# Statement

---
layout: fact
---

# 100%
Fact information

---
layout: quote
---

# "Notable quote"
Attribution

---
layout: image-left
image: https://source.unsplash.com/collection/94734566/1920x1080
---

# Code

```ts {all|2|1-6|all}
interface User {
  id: number
  firstName: string
  lastName: string
  role: string
}

function updateUser(id: number, update: Partial<User>) {
  const user = getUser(id)
  const newUser = {...user, ...update}  
  saveUser(id, newUser)
}
```

---
layout: center
class: "text-center"
---

# Learn More

[Documentations](https://sli.dev) / [GitHub Repo](https://github.com/slidevjs/slidev)
