import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.filter('round', function(value){
  if(!value || typeof value != 'number') return ''
  return Math.round(value * 10)/10;
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
