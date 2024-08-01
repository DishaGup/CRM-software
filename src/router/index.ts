// src/router.ts

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import UserList from '@/views/UserList.vue'
import UserForm from '@/views/UserForm.vue'
import UserView from '@/views/UserView.vue'
import { useAuthStore } from '@/stores/modules/auth'
const routes = [
  { path: '/login', component: Login },
  { path: '/users', component: UserList, meta: { requiresAuth: true } },
  { path: '/users/add', component: UserForm, meta: { requiresAuth: true } },
  { path: '/users/edit/:id', component: UserForm, meta: { requiresAuth: true } },
  { path: '/users/view/:id', component: UserView, meta: { requiresAuth: true } },
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!authStore.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
