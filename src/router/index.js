import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/sikayetler',
    name: 'Complaints',
    component: () => import('../views/Complaints.vue'),
  },
  {
    path: '/markalar',
    name: 'Trademarks',
    component: () => import('../views/Trademarks.vue'),
  },
  {
    path: '/kayit',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  }, {
    path: '/giris',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
