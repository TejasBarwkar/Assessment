<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import InputLabel from './InputLabel.vue'

const model = defineModel()

withDefaults(
  defineProps<{
    label: string
    placeholder?: string
    name: string
    type: 'text' | 'number'
    error?: string
  }>(),
  {
    placeholder: '',
    type: 'text'
  }
)
</script>

<template>
  <div class="form-wrapper">
    <InputLabel :id="name" :label="label" />

    <input
      :data-error="!!error"
      :id="name"
      class="input"
      :placeholder="placeholder"
      :type="type"
      :name="name"
      v-model="model"
    />

    <ErrorMessage :error="error" />
  </div>
</template>

<style scoped>
.form-wrapper {
  margin-bottom: 16px;
}

.input {
  border-radius: 6px;
  border: 1px solid rgb(107, 114, 128);
  width: 100%;
  padding: 6px 12px;
  height: 36px;
}

.input[data-error='true'] {
  border-color: rgb(240, 82, 82);
}
</style>
