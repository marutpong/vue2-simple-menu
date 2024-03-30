import Vue from 'vue'
import App from './App.vue'

import Vue2SimpleMenu from '../src/index.js'
Vue.component('vue2-simple-menu', Vue2SimpleMenu)

new Vue({
  el: '#app',
  render: h => h(App)
})
