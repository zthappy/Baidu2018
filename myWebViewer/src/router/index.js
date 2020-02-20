import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

const importView = name => require(`@/views/${name}/index.vue`).default

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/dragReport',
      name: 'dragReport',
      component: importView('dragReport')
    },
  ]
})
