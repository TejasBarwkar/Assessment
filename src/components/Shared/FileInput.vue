<script setup lang="ts">
import { ref } from 'vue'
import ErrorMessage from './ErrorMessage.vue'
import InputLabel from './InputLabel.vue'

const emit = defineEmits(['change'])

defineProps<{
  label: string
  name: string
  error?: string
  accept: string
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const selectedFileName = ref<string | null>(null)

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const onChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files ? target.files[0] : null

  if (file) {
    selectedFileName.value = file.name
    emit('change', file)
  }
}

const resetFileInput = () => {
  if (fileInput.value) {
    fileInput.value.value = ''
    selectedFileName.value = null
  }
}

defineExpose({ resetFileInput })
</script>

<template>
  <div class="form-wrapper">
    <InputLabel :id="name" :label="label" />

    <button :data-error="!!error" type="button" @click="triggerFileUpload" class="upload-button">
      {{ selectedFileName || 'Upload File' }}
    </button>

    <input
      ref="fileInput"
      :id="name"
      class="input"
      type="file"
      :name="name"
      @change="onChange"
      :accept="accept"
    />

    <ErrorMessage :error="error" />
  </div>
</template>

<style scoped>
.form-wrapper {
  margin-bottom: 16px;
}

.upload-button {
  padding: 6px 12px;
  border: 1px solid rgb(107, 114, 128);
  border-radius: 6px;
  cursor: pointer;
  transition: 0.15s all;
  height: 36px;
  width: 100%;
  background: #fff;
  text-align: left;
}

.upload-button[data-error='true'] {
  border-color: rgb(240, 82, 82);
}

.upload-button:hover {
  background: rgb(243, 244, 246);
}

.input {
  display: none;
}
</style>
