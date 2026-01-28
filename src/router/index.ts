import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  //重定向到/index页面
  {
    path: '/',  
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../views/index.vue')
  },
    {
    path: '/chart',
    name: 'chart',
    component: () => import('../views/chart.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router