<!-- src/views/UserList.vue -->

<template>
  <div class="user-list">
    <button @click="goToAddUser">Add User</button>
    <button @click="exportUsers">Export to CSV</button>
    <input v-model="searchQuery" @input="fetchUsers" placeholder="Search users..." />
    <select v-model="roleFilter" @change="fetchUsers">
      <option value="">All Roles</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
    <table v-if="!loading">
      <thead>
        <tr>
          <th @click="sort('name')">Name</th>
          <th @click="sort('email')">Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="goToEditUser(user.id)">Edit</button>
            <button @click="deleteUser(user.id)">Delete</button>
            <button @click="viewUser(user.id)">View</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>Loading...</div>
    <NormalModal></NormalModal>
    <pagination-component
      :total="totalUsers"
      :per-page="perPage"
      v-model:page="currentPage"
      @page-changed="fetchUsers"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useUserStore } from '../stores/modules/user'
import { useRouter } from 'vue-router'
import { exportToCSV } from '../utils/csvExport'

const userStore = useUserStore()
const router = useRouter()
const searchQuery = ref('')
const roleFilter = ref('')
const sortColumn = ref('')
const sortOrder = ref('asc')
const currentPage = ref(1)
const perPage = ref(10)

const fetchUsers = () => {
  const params = {
    search: searchQuery.value,
    role: roleFilter.value,
    sort: sortColumn.value,
    order: sortOrder.value,
    page: currentPage.value,
    per_page: perPage.value
  }
  userStore.fetchUsers(params)
}

watch([searchQuery, roleFilter, currentPage, perPage], fetchUsers)

onMounted(() => {
  fetchUsers()
})

const goToAddUser = () => {
  router.push('/users/add')
}

const goToEditUser = (id: string) => {
  router.push(`/users/edit/${id}`)
}

const viewUser = (id: string) => {
  router.push(`/users/view/${id}`)
}

const deleteUser = (id: string) => {
  userStore.deleteUser(id)
}

const sort = (column: string) => {
  if (sortColumn.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortOrder.value = 'asc'
  }
  fetchUsers()
}

const exportUsers = () => {
  exportToCSV(userStore.users, 'users.csv')
}

const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)
const totalUsers = computed(() => userStore.users.length)
</script>
