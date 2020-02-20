import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Drag from '@/views/testDraggable'

import Element from 'element-ui'
// import '../element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Drag',
      name: 'Drag',
      component: Drag
    }
  ]
})
