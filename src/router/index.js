import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import User from '../views/User'
// import NotFound from '../views/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/user/:id',
      component: User
    },
    {
      path: '*',
      component: Login
    }
  ]
})
