import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Manual from './views/Manual.vue'
import Water from './views/Water.vue'
import Wifi from './views/Wifi.vue'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Account from './views/auth/Account'
import firebase from 'firebase/app'
import 'firebase/auth'

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: "/Manual",
      name: "manual",
      component: Manual,
      meta: { requiresAuth: false }
    },
    {
      path: "/Water",
      name: "water",
      component: Water,
      meta: { requiresAuth: false }
    },
    {
      path: "/Wifi",
      name: "wifi",
      component: Wifi,
      meta: { requiresAuth: false }
    },
    {
      path: "/Login",
      name: "login",
      component: Login
    },
    {
      path: "/Register",
      name: "register",
      component: Register
    },
    {
      path: "/Account",
      name: "account",
      component: Account,
      meta: { requiresAuth: false }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    let user = firebase.auth().currentUser;
    
    if (user) {
      next();
    }
    else {
      next({ name: 'login' });
    }
  }
  else {
    next();
  }
})

export default router;