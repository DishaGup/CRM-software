<!-- src/views/UserView.vue -->

<template>
  <div>
    <span
      @click="
        () => {
          router.back()
        }
      "
      class="fs-3 fw-bold"
    >
      Back</span
    >
  </div>
  <div class="container">
    <div v-if="user" class="card p-2 d-flex flex-column justify-content-start">
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">Name:</b>
        <p class="fw-normal fs-4">{{ user?.name || '-' }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">Email:</b>
        <p class="fw-normal fs-4">{{ user?.email || '-' }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">Role:</b>
        <p class="fw-normal fs-4">{{ user?.role?.name || '-' }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">DOB:</b>
        <p class="fw-normal fs-4">{{ user?.dob || '-' }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">Gender:</b>
        <p class="fw-normal fs-4">{{ user?.gender_text || '-' }}</p>
      </div>
      <div class="d-flex justify-space-between">
        <b class="fw-bold fs-5 me-4">status:</b>
        <p class="fw-normal fs-4">{{ user?.status_text || '-' }}</p>
      </div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/modules/user'

const route = useRoute()
const userStore = useUserStore()
const user = ref(null)
const router = useRouter()
onMounted(async () => {
  const id = route.params.id as string
  let userr = await userStore.fetchUser(id)
  user.value = userr?.data || {}
})
</script>
