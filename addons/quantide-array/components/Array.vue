<!--
  Array Component for Slidev
  
  Display an array of data with customizable layout and styling
  
  Usage:
  <Array data="1,2,3,4,5" class="mt-10 w-90px h-400px" label="Array Example" labelPos="left" cell="custom-cell" flag="vertical"/>
-->
<template>
  <div :class="['array-container', `direct-${props.labelPos}`]">
    <div :class="[`${props.flag}-cells`, 'cells']">
      <span 
        v-for="(item, index) in arrayData" 
        :key="index" 
        :class="[props.cell, 'cell']"
        :data-index="index"
      >
        {{ item }}
      </span>
    </div>
    <div v-if="label && labelPos === 'top'" :class="['label', props.labelPos]">{{ label }}</div>
    <div v-if="label && labelPos === 'bottom'" :class="['label', props.labelPos]">{{ label }}</div>
    <div v-if="label && labelPos === 'left'" :class="['label', props.labelPos]">{{ label }}</div>
    <div v-if="label && labelPos === 'right'" :class="['label', props.labelPos]">{{ label }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /**
   * Comma-separated string of array data
   * @example "1,2,3,4,5" or "apple,banana,cherry"
   */
  data: {
    type: String,
    required: true
  },
  /**
   * Label text to display alongside the array
   */
  label: {
    type: String,
    required: false,
    default: ''
  },
  /**
   * Layout direction of the array
   * @values 'horizontal', 'vertical'
   */
  flag: {
    type: String,
    default: 'horizontal',
    validator: (value) => ['horizontal', 'vertical'].includes(value)
  },
  /**
   * Position of the label relative to the array
   * @values 'top', 'bottom', 'left', 'right'
   */
  labelPos: {
    type: String,
    default: 'left',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  /**
   * CSS class name for individual array cells
   */
  cell: {
    type: String,
    default: 'default-cell'
  }
})

/**
 * Parse the comma-separated data string into an array
 */
const arrayData = computed(() => 
  props.data.split(',').map(item => item.trim()).filter(item => item !== '')
)
</script>

<style scoped>
.array-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Label positioning */
.direct-top {
  flex-direction: column-reverse;
}

.direct-left {
  flex-direction: row-reverse;
}

.direct-right {
  flex-direction: row;
}

.direct-bottom {
  flex-direction: column;
}

.label {
  font-weight: 600;
  color: var(--slidev-theme-primary, #3b82f6);
  user-select: none;
}

.top,
.bottom {
  text-align: center;
  margin: 0.5rem 0;
}

.left,
.right {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  margin: 0 0.5rem;
}

/* Array cells container */
.cells {
  display: grid;
  gap: 0.5rem;
  width: 100%;
}

.horizontal-cells {
  grid-auto-flow: column;
  grid-auto-columns: minmax(3rem, 1fr);
  grid-template-rows: minmax(2.5rem, auto);
}

.vertical-cells {
  grid-auto-flow: row;
  grid-template-columns: minmax(3rem, 1fr);
  grid-auto-rows: minmax(2.5rem, auto);
}

/* Individual cell styling */
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px solid var(--slidev-theme-primary, #3b82f6);
  border-radius: 0.375rem;
  background: var(--slidev-theme-background, #ffffff);
  color: var(--slidev-theme-text, #1f2937);
  font-weight: 500;
  transition: all 0.2s ease;
  box-sizing: border-box;
  min-height: 2.5rem;
  padding: 0.5rem;
}

.cell:hover {
  background: var(--slidev-theme-primary, #3b82f6);
  color: var(--slidev-theme-background, #ffffff);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* Default cell style */
.default-cell {
  /* Uses the base .cell styles */
}

/* Animation for array items */
.cell {
  animation: slideIn 0.3s ease-out;
  animation-delay: calc(var(--index, 0) * 0.1s);
  animation-fill-mode: both;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive design */
@media (max-width: 768px) {
  .array-container {
    gap: 0.5rem;
  }
  
  .cell {
    min-height: 2rem;
    padding: 0.25rem;
    font-size: 0.875rem;
  }
  
  .horizontal-cells {
    grid-auto-columns: minmax(2.5rem, 1fr);
  }
  
  .vertical-cells {
    grid-template-columns: minmax(2.5rem, 1fr);
  }
}
</style>