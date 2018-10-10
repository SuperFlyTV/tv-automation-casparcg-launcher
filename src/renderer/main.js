import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueChatScroll from 'vue-chat-scroll'
import {ipcRenderer} from 'electron'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App'
import router from './router'
import store from './store'

import smoothscroll from 'smoothscroll-polyfill'
smoothscroll.polyfill()

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

const ids = ['casparcg', 'media-scanner', 'elgato']
ids.forEach(id => {
  store.dispatch('init', {id})
  ipcRenderer.on(id + '.log', (e, data) => {
    store.dispatch('logLine', { id: id, data: JSON.parse(data) })
  })
  ipcRenderer.on(id + '.status', (e, status) => {
    store.dispatch('setStatus', { id, status })
  })
})

Vue.use(BootstrapVue)
Vue.use(VueChatScroll)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
