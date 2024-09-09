import { createRouter, createWebHistory } from 'vue-router'
import CountryView from '../views/CountryView.vue'

const routes = [
  {
    path: '/',
    component: CountryView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
