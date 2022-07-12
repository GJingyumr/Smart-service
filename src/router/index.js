import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login')
  },
  {
    path: '/',
    name: 'layout',
    redirect: '/consoles',
    component: () => import('../layout'),
    children: [
      {
        path: '/consoles',
        name: 'consoles',
        component: () => import('../views/consoles')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import('../views/user')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import('../views/role')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () => import('../views/menu')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
