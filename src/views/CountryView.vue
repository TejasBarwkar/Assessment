<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountryStore } from '@/stores/countries'
import { storeToRefs } from 'pinia'
import CountryDetails from '@/components/CountryDetails/CountryDetails.vue'
import Dropdown from '@/components/Shared/Dropdown.vue'
import AddCountryForm from '@/components/AddCountry/AddCountryForm.vue'
import Heading from '@/components/Shared/Heading.vue'
import Divider from '@/components/Shared/Divider.vue'
import Spinner from '@/components/Shared/Spinner.vue'

const countryStore = useCountryStore()
const { country } = storeToRefs(countryStore)

const selectedCountry = ref<string | null>(null)

const onCountryChange = () => {
  if (!selectedCountry.value) return
  countryStore.getCountryById(selectedCountry.value)
}

onMounted(() => {
  countryStore.getCountries()
})
</script>

<template>
  <div class="container">
    <Heading heading="Select Country" />

    <Dropdown
      label=""
      name="country"
      v-model="selectedCountry"
      :options="countryStore.countryOptions"
      @change="onCountryChange"
    />

    <Spinner :isLoading="countryStore.isLoading" :size="40" border="5px" />

    <div v-if="!countryStore.isLoading">
      <CountryDetails :country="country" />
    </div>

    <Divider />

    <AddCountryForm />
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  background: #fff;
  border: 1px solid #ddd;
  padding: 32px;
  border-radius: 8px;
}
</style>
