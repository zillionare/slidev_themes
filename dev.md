---
theme: default
title: notecell
addons:
  - /Users/aaronyang/workspace/slidev_themes/addons/slidev-addon-notecell
clicks: 3
---

<NoteCell init baseUrl="http://192.168.66.65:8080/course/fa/aaron/">


```python
import pandas as pd

df = pd.DataFrame({
    "Name": "Aaron",
    "score": [100] * 5
})
```
</NoteCell>

<NoteCell class="abs" baseUrl="http://192.168.66.65:8080/course/fa/aaron/" 
          :output='{
              "css": {
                "font-size": "0.8em",
                "color": "red",
                "img": {
                    "width": "10%",
                    "transform": "rotateZ(45deg)"
                }
              }
            }'>

```python{all|1|2-4}{lines: true}
df.plot(kind="bar")
```
</NoteCell>
