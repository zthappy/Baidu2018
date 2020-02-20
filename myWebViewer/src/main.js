// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router'

// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })

import Vue from 'vue'
import App from './App'
import router from './router'

import 'element-ui/lib/theme-chalk/index.css'
// import '../static/css/reset.css'
import '@/styles/global.scss'
// import '@/assets/icons/index.css'
// import '@/assets/icons/iconfont.css'

Vue.config.productionTip = false

// import './mock'
import './mount'

const app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

