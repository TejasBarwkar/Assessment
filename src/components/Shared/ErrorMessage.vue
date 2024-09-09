<script setup lang="ts">
defineProps<{
  error: string | undefined
}>()
</script>

<template>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<style scoped>
.error {
  color: rgb(240, 82, 82);
  margin-top: 8px;
}
</style>
