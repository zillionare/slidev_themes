import re

with open('layouts/cards.vue', 'r') as f:
    content = f.read()

# Replace .card-area-wrapper CSS
old_css = """
.card-area-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.card-area-wrapper :deep(.card-wrapper) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: column;
}

.card-area-wrapper :deep(.card-container) {
  width: 100% !important;
  height: 100% !important;
  display: flex !important;
  flex-direction: row; /* Default for landscape */
  flex: 1;
}"""

new_css = """
.card-area-wrapper {
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
}

.card-area-wrapper :deep(.card-wrapper) {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: column;
}

.card-area-wrapper :deep(.card-container) {
  width: 100% !important;
  height: 100% !important;
  min-height: 0 !important;
  min-width: 0 !important;
  display: flex !important;
  flex-direction: row; /* Default for landscape */
  flex: 1;
}

.card-area-wrapper :deep(.card-content) {
  overflow-y: auto !important;
}"""

content = content.replace(old_css, new_css)

with open('layouts/cards.vue', 'w') as f:
    f.write(content)
