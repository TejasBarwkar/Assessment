<script setup lang="ts">
import { computed } from 'vue'
import Spinner from './Spinner.vue'

const emit = defineEmits(['click'])

const props = withDefaults(
  defineProps<{
    label: string
    type?: 'button' | 'submit'
    disabled?: boolean
    loader?: boolean
    variant?: 'primary' | 'secondary'
  }>(),
  {
    type: 'button',
    disabled: false,
    loader: false,
    variant: 'primary'
  }
)

const buttonClasses = computed(() => {
  return {
    'primary-button': props.variant === 'primary',
    'secondary-button': props.variant === 'secondary'
  }
})

const onButtonClick = (e: MouseEvent) => {
  emit('click', e)
}
</script>

<template>
  <button
    :disabled="disabled"
    :class="buttonClasses"
    class="button"
    :type="type"
    @click="onButtonClick"
  >
    <Spinner :isLoading="loader" />
    <span v-if="!loader">{{ label }}</span>
  </button>
</template>

<style scoped>
.button {
  background: rgb(79, 70, 229);
  height: 36px;
  font-weight: 500;
  border-radius: 6px;
  box-shadow: none;
  cursor: pointer;
  padding: 8px 12px;
  border: none;
  min-width: 100px;
  transition: 0.15s all;
}

.primary-button:disabled {
  background: #2f3642;
  cursor: not-allowed;
}

.primary-button {
  background-color: rgb(79, 70, 229);
  color: #fff;
}

.primary-button:hover {
  background-color: rgb(60, 52, 218);
}

.secondary-button {
  background-color: rgb(243, 244, 246);
  color: #171717;
}

.secondary-button:hover {
  background-color: rgb(225, 226, 227);
}

.secondary-button:disabled {
  cursor: not-allowed;
}
</style>
