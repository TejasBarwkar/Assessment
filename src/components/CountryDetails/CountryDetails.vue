<script setup lang="ts">
import { type ICountry } from '../../types/Country'
import { BASE_URL } from '@/constants'
import Row from '../Shared/Row.vue'

const { country } = defineProps<{
  country: ICountry | null
}>()
</script>

<template>
  <div v-if="country">
    <Row :gap="24">
      <div class="flag-container">
        <img :src="BASE_URL + '/' + country.flag" alt="Flag" class="flag" />
      </div>

      <div>
        <p class="title">{{ country.name }}</p>
        <p class="subtitle">Rank: {{ country.rank }}</p>
      </div>
    </Row>
  </div>
</template>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin: 0;
}

.subtitle {
  font-size: 15px;
  font-weight: 500;
  color: rgb(107, 114, 128);
  margin: 8px 0 0 0;
}

.flag-container {
  width: 200px;
  height: 100px;
  display: flex;
}

.flag {
  object-fit: contain;
}
</style>
