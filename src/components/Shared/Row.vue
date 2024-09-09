<script setup lang="ts">
withDefaults(
  defineProps<{
    gap?: number
    justify?: 'START' | 'CENTER' | 'SPACE_BETWEEN'
    align?: 'CENTER'
  }>(),
  {
    gap: 0,
    justify: 'START',
    align: 'CENTER'
  }
)

const justifyContent = {
  START: 'start',
  CENTER: 'center',
  SPACE_BETWEEN: 'space-between'
}

const alignItems = {
  CENTER: 'center'
}
</script>

<template>
  <div
    class="row"
    :style="{
      gap: `${gap}px`,
      justifyContent: justifyContent[justify],
      alignItems: alignItems[align]
    }"
  >
    <slot></slot>
  </div>
</template>

<style scoped>
.row {
  display: flex;
}
</style>
