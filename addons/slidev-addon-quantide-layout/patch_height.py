import re

with open('layouts/cards.vue', 'r') as f:
    content = f.read()

# Replace height: '100%' with height: 'calc(100% - ' + marginTop + ')'
# Actually, since it has flex: 1 and the parent is a flex container, 
# we can just remove height: '100%' or change it to minHeight: 0

# Wait, the inline style is:
#         gap: '20px',
#         height: '100%',
#         flex: 1

content = content.replace("height: '100%',\n        flex: 1", "minHeight: 0,\n        flex: 1")

with open('layouts/cards.vue', 'w') as f:
    f.write(content)
