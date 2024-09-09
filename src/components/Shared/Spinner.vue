<script setup lang="ts">
withDefaults(
  defineProps<{
    isLoading: boolean
    size?: number
    border?: string
  }>(),
  {
    size: 20,
    border: '3px'
  }
)
</script>

<template>
  <div
    v-if="isLoading"
    class="spinner"
    :style="{ width: `${size}px`, height: `${size}px`, borderWidth: border }"
  ></div>
</template>

<style scoped>
.spinner {
  border-radius: 50%;
  border: 3px solid #f3f3f3;
  border-top: 3px solid rgb(79, 70, 229);
  animation: spin 1s linear infinite;
  margin: auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
