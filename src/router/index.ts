import { createRouter, createWebHistory } from 'vue-router'
import Themes from '../views/Themes.vue'
import Settings from '../views/Settings.vue'
import Prices from '../views/Prices.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'themes',
      component: Themes
    },
    {
      path: '/themes',
      name: 'themes',
      component: Themes
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/prices',
      name: 'prices',
      component: Prices
    }
  ]
})

export default router
