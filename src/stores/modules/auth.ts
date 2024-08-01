// src/stores/auth.ts

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { base_url } from '@/utils/variable'
import JwtService from '@/utils/JwtService'
import { isEmpty } from 'lodash'
import axios from 'axios'
export interface User {
  name: string
  email: string
  api_token?: string
}
export interface UserRole {
  id: number
  meta: Object
  role_name: string
  isAdmin: boolean
}
export const useAuthStore = defineStore('auth', () => {
  const errors = ref({})
  const user = ref<User>({} as User)
  const userRole = ref<UserRole>({} as UserRole)
  const isAuthenticated = ref(!!JwtService.getToken())
  function setAuth(authUser: User) {
    isAuthenticated.value = true
    user.value = authUser
    errors.value = {}
    localStorage.setItem('auth', JSON.stringify(authUser))
    //JwtService.saveToken(user.value.api_token);
  }
  function updateAuth(authUser: User) {
    if (authUser && !isEmpty(authUser)) {
      delete (authUser as any).token
      const userData = { ...getAuthData.value, ...authUser }
      user.value = userData
      localStorage.setItem('auth', JSON.stringify(userData))
    }
  }
  const getAuthData = computed(() => {
    return !isEmpty(user.value) ? user.value : JSON.parse(localStorage.getItem('auth') || '{}')
  })

  const getAuthRole = computed(() => {
    return !isEmpty(userRole.value)
      ? userRole.value
      : JSON.parse(localStorage.getItem('userRole') || '{}')
  })

  function purgeAuth() {
    isAuthenticated.value = false
    user.value = {} as User
    errors.value = []
    JwtService.destroyToken()
  }

  function login(credentials: User) {
    return axios
      .post(`${base_url}/login`, credentials)
      .then(({ data }) => {
        const datas = data?.data
        const payload = {
          name: datas?.name || 'user',
          email: datas?.email || 'admin@gmail.com',
          api_token: datas?.authorization
        }
        setAuth(payload)
        JwtService.saveToken(datas?.authorization)
      })
      .catch(({ error }) => {
      })
  }

  function logout() {
    purgeAuth()
    localStorage.removeItem('auth')
    localStorage.removeItem('location')
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      axios
        .post('verify_token', { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data)
        })
        .catch(({ error }) => {
          purgeAuth()
        })
    } else {
      purgeAuth()
    }
  }

  return {
    errors,
    user,
    isAuthenticated,
    userRole,
    login,
    setAuth,
    updateAuth,
    logout,
    verifyAuth,
    getAuthData,
    getAuthRole
  }
})
