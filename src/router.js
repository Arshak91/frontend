import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/HomeView.vue'
import Login from './views/LoginView.vue'
import Register from './views/RegistrationView.vue'
import Account from './views/AccountView.vue'

const router = createRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/account',
      name: 'account',
      component: Account,
      meta: {
        requiresAuth: true
      }
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('user'))
    // console.log(authUser);
    // console.log(authUser.access_token);
    if (!authUser) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
  next()
})

export default router
