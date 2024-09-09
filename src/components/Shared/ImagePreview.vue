<script setup lang="ts">
import { ref, watch } from 'vue'

const { file } = defineProps<{
  file: File | null
}>()

const preview = ref<string | null>(null)

const onFileChange = (newValue: File | null) => {
  if (!newValue) {
    preview.value = null
    return
  }

  const reader = new FileReader()
  reader.readAsDataURL(newValue)
  reader.onload = () => {
    preview.value = reader.result as string
  }
}

watch(
  () => file,
  (newValue) => {
    onFileChange(newValue)
  }
)
</script>

<template>
  <div v-if="preview" class="preview">
    <img :src="preview" alt="Image preview" />
  </div>
</template>

<style scoped>
.preview {
  margin: 8px 0;
}

.preview img {
  width: 100px;
}
</style>
