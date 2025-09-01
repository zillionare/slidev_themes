<template>
  <div 
    v-if="shouldShowLogo" 
    class="lhfy-badge"
  >
    <!-- Quantide Logo Badge -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

// 控制 logo 显示的逻辑
const shouldShowLogo = computed(() => {
  // 可以根据需要添加显示条件
  // 例如：特定布局、特定页面等
  return true
})
</script>

<style scoped>
.lhfy-badge {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMwMDcwRjMiLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01aDNWOGg0djRoM2wtNSA1eiIvPgo8L3N2Zz4KPC9zdmc+');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  transition: all 0.3s ease;
  animation: flipY 2s ease-in-out infinite alternate;
}

.lhfy-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

@keyframes flipY {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .lhfy-badge {
    width: 45px;
    height: 45px;
    top: 15px;
    right: 15px;
  }
}

@media (max-width: 480px) {
  .lhfy-badge {
    width: 35px;
    height: 35px;
    top: 10px;
    right: 10px;
  }
}
</style>