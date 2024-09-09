<script setup lang="ts">
import type { DropdownOption } from '@/types'
import ErrorMessage from './ErrorMessage.vue'
import InputLabel from './InputLabel.vue'

const model = defineModel()

withDefaults(
  defineProps<{
    label: string
    name: string
    error?: string
    options: DropdownOption[]
  }>(),
  {
    error: ''
  }
)

const emit = defineEmits(['change'])

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('change', target.value)
}
</script>

<template>
  <div class="form-wrapper">
    <InputLabel :id="name" :label="label" />

    <select
      :id="name"
      :name="name"
      v-model="model"
      @change="onChange"
      class="dropdown"
      :data-error="!!error"
    >
      <option disabled value="" selected>Select an option</option>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <ErrorMessage :error="error" />
  </div>
</template>

<style scoped>
.dropdown {
  height: 36px;
  width: 100%;
  border-radius: 6px;
  padding: 6px 10px;
  border: 1px solid rgb(107, 114, 128);
}

.dropdown[data-error='true'] {
  border-color: rgb(240, 82, 82);
}

.form-wrapper {
  margin-bottom: 16px;
}
</style>
