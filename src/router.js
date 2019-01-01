import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Manual from './views/Manual.vue'
import Water from './views/Water.vue'
import Wifi from './views/Wifi.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/Nanual',
      name: 'manual',
      component: Manual
    },
    {
      path: '/Water',
      name: 'water',
      component: Water
    },
    {
      path: '/Wifi',
      name: 'wifi',
      component: Wifi
    }
  ]
})
