<script setup lang="ts">
defineProps<{
  label: string
  id: string
}>()
</script>

<template>
  <label :for="id" class="label">{{ label }}</label>
</template>

<style scoped>
.label {
  display: block;
  font-weight: 500;
  margin-bottom: 8px;
}
</style>
