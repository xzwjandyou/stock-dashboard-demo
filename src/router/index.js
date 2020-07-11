import Vue from 'vue'
import Router from 'vue-router'
import stockDashboard from '@/components/stockDashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'stockDashboard',
      component: stockDashboard
    }
  ]
})
