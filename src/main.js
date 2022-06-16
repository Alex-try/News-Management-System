import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/index.css'
import api from './api/index'
Vue.prototype.$api = api;
import './router/permission'
import './utils/localStorage'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
