<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useCountryStore } from '@/stores/countries'
import { useToast } from 'vue-toastification'
import Button from '@/components/Shared/Button.vue'
import Input from '@/components/Shared/Input.vue'
import Dropdown from '@/components/Shared/Dropdown.vue'
import FileInput from '@/components/Shared/FileInput.vue'
import type { ICountryForm, ICountryFormError } from './types'
import { validateCountry } from './validators'
import { COUNTRY_FORM_INITIAL_DATA, COUNTRY_FORM_ERROR_INITIAL_DATA } from './constants'
import ImagePreview from '../Shared/ImagePreview.vue'
import Row from '../Shared/Row.vue'
import Heading from '../Shared/Heading.vue'

const toast = useToast()
const countryStore = useCountryStore()
const formRef = ref<HTMLFormElement | null>(null)
const fileUploadRef = ref<InstanceType<typeof FileInput> | null>(null)

const country = ref({
  ...COUNTRY_FORM_INITIAL_DATA
})

const errors = ref<ICountryFormError>({
  ...COUNTRY_FORM_ERROR_INITIAL_DATA
})

onMounted(() => {
  countryStore.getContinents()
})

const onFileChange = (file: File) => {
  country.value.flag = file
}

const addCountry = async () => {
  const { hasError, validationErrors } = validateCountry(country.value)
  errors.value = validationErrors

  if (hasError) {
    return
  }

  const data = await countryStore.addCountry(country.value)

  if (data) {
    if (data.success) {
      country.value = {
        ...COUNTRY_FORM_INITIAL_DATA
      }

      fileUploadRef.value?.resetFileInput()

      toast.success('Country added successfully!')
    } else {
      errors.value = data.errors
    }
  }
}

const resetForm = () => {
  formRef.value?.reset()
  fileUploadRef.value?.resetFileInput()

  country.value = {
    ...COUNTRY_FORM_INITIAL_DATA
  }

  errors.value = {
    ...COUNTRY_FORM_ERROR_INITIAL_DATA
  }
}

// Reset error messages on value change
const fields = computed(() => ({
  name: country.value.name,
  continent: country.value.continent,
  rank: country.value.rank,
  flag: country.value.flag
}))

watch(
  fields,
  (newValues, oldValues) => {
    for (const key in newValues) {
      let field = key as keyof ICountryForm

      if (newValues[field] !== oldValues[field]) {
        errors.value[field] = ''
      }
    }
  },
  { deep: true }
)
</script>

<template>
  <div>
    <Heading heading="Add Country" />
    <form @submit.prevent="addCountry" ref="formRef">
      <Input
        type="text"
        label="Name *"
        name="name"
        v-model.trim="country.name"
        :error="errors.name"
      />

      <FileInput
        label="Flag *"
        name="flag"
        accept="image/jpeg, image/png"
        @change="onFileChange"
        :error="errors.flag"
        ref="fileUploadRef"
      />

      <ImagePreview :file="country.flag" />

      <Dropdown
        label="Select Continent *"
        name="continent"
        v-model="country.continent"
        :options="countryStore.continentOptions"
        :error="errors.continent"
      />

      <Input
        type="number"
        label="Rank *"
        name="rank"
        v-model.number="country.rank"
        :error="errors.rank"
      />

      <Row :gap="8" justify="CENTER">
        <Button
          label="Add Country"
          type="submit"
          :disabled="countryStore.isCreating"
          :loader="countryStore.isCreating"
        />

        <Button
          variant="secondary"
          label="Reset"
          :disabled="countryStore.isCreating"
          @click="resetForm"
        />
      </Row>
    </form>
  </div>
</template>

<style scoped></style>
