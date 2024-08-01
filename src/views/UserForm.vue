<!-- src/views/UserForm.vue -->

<template>
    <div class="user-form">
      <form @submit.prevent="handleSubmit">
        <div>
          <label for="name">Name</label>
          <input type="text" v-model="user.name" required />
        </div>
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="user.email" required />
        </div>
        <button type="submit" :disabled="!isValid">Save</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';
  import { useUserStore } from '../stores/modules/user';
  import { useRouter, useRoute } from 'vue-router';
  
  export default defineComponent({
    name: 'UserForm',
    setup() {
      const userStore = useUserStore();
      const router = useRouter();
      const route = useRoute();
      const user = ref({ name: '', email: '' });
      const isValid = ref(false);
  
      const validateForm = () => {
        isValid.value = user.value.name && user.value.email;
      };
  
      onMounted(() => {
        const id = route.params.id as string;
        if (id) {
          userStore.fetchUser(id).then(() => {
            user.value = userStore.user;
          });
        }
      });
  
      const handleSubmit = () => {
        const id = route.params.id as string;
        if (id) {
          userStore.updateUser(user.value);
        } else {
          userStore.addUser(user.value);
        }
        router.push('/users');
      };
  
      watch(
        () => user.value,
        validateForm,
        { deep: true }
      );
  
      return {
        user,
        isValid,
        handleSubmit,
        validateForm,
      };
    },
  });
  </script>
  