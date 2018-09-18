// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import VueQuillEditor from 'vue-quill-editor'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/iconfont.css'
import '../static/css/home.css'
import '../static/css/main.css'
import '../static/font/iconfont.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import http from './api/http.js'

import App from './App'
import router from './router'
import axios from 'axios'
import * as filters from './filters'
import './config/constants'


Vue.use(ElementUI)
Vue.use(VueQuillEditor)

Vue.filter('date', filters.dateFilter)
Vue.filter('numberFilter', filters.numberFilter)
Vue.filter('numbersFilter', filters.numbersFilter)
Vue.filter('fonts',filters.fontFilter);
Vue.filter('numThousand', filters.numThousand);
Vue.filter('hundredMillion', filters.hundredMillion);

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  render: h => h(App)
}).$mount('#app')
