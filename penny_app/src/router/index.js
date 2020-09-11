import Vue from 'vue'
import VueRouter from 'vue-router'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import firebase from 'firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            next();
          } else {
            next('/Login')
          }
        })
      }
    }
  ]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
