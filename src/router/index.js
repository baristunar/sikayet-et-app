import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
  },
  {
    path: '/profil/:id',
    name: 'ProfileEdit',
    component: () => import('../views/ProfileEdit.vue'),
  },
  {
    path: '/sikayetler',
    name: 'Complaints',
    component: () => import('../views/Complaints.vue'),
  },
  {
    path: '/sikayetler/:id',
    name: 'ComplaintDetail',
    component: () => import('../views/ComplaintDetail.vue'),
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
  {
    path: '/sikayetyaz',
    name: 'CreateComplaint',
    component: () => import('../views/CreateComplaint.vue'),
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {

  let user = null;
  const authenticatedPages = [
    "Profile",
    "CreateComplaint"
  ];

  // Is there a user in local storage?

  try {
    if (localStorage?.user) user = JSON.parse(localStorage?.user);
  }
  catch (error) {
    user = null;
  }


  if (user) store.commit("user/setUser", user);

  const isAuthenticated = store.getters["user/_isAuthenticated"];



  if (!isAuthenticated && authenticatedPages.indexOf(to.name) > -1) {
    next({ name: "Login" });
  }
  if (user?.registerType !== 1 && to.name === "CreateComplaint") {
    next("/");
  }

  if ((isAuthenticated) && (to.name === "Login" || to.name === "Register")) {
    next("/");
  }



  next();
});

export default router;
