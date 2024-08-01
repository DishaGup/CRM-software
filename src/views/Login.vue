<template>
  <div class="w-100 d-flex align-items-center justify-content-center flex-column">
    <div class="heading">
      <span>Log In </span>
    </div>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="formData.email" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" v-model="formData.password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/modules/auth'
import { useRouter } from 'vue-router'
interface FormData {
  email: string
  password: string | number
}
const formData = ref<FormData>({
  email: 'admin@gmail.com',
  password: 123456
})
const errors = ref({
  email: null,
  password: null
})
const authStore = useAuthStore()
const router = useRouter()
onMounted(() => {})
const handleLogin = async () => {
  let payload = {
    email: formData.value.email,
    password: formData.value.password
  }
  await authStore
    .login(payload)
    .then(() => {})
    .catch(() => { router.push('/users')})
 
}
</script>
