import { defineAddon } from '@slidev/types'
import Card from './components/Card.vue'
// 使用 Iconify 图标，无需引入字体文件

export default defineAddon({
  name: 'slidev-addon-card',
  components: {
    Card
  }
})