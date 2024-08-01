// src/stores/user.ts

import { defineStore } from 'pinia';
import { ref } from 'vue';
import axiosInstance from '@/utils/axiosInstance';
export const useUserStore = defineStore('user', () => {
  const users = ref([]);
  const singleUser = ref({});
  const loading = ref(false);

  async function fetchUsers(params = {}) {
    loading.value = true;
    try {
      const response = await axiosInstance.get('/users', { params });
      users.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      loading.value = false;
    }
  }

  async function fetchUser(id: string) {
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      singleUser.value = response.data;
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  }

  async function deleteUser(id: string) {
    try {
      await axiosInstance.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  return {
    users,
    singleUser,
    loading,
    fetchUsers,
    fetchUser,
    deleteUser,
  };
});
