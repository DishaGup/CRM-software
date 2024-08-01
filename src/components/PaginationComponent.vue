<!-- src/components/PaginationComponent.vue -->

<template>
    <div class="pagination">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    modelValue: {
      type: Number,
      required: true,
    },
  });
  
  const emits = defineEmits(['update:modelValue', 'page-changed']);
  
  const currentPage = computed(() => props.modelValue);
  const totalPages = computed(() => Math.ceil(props.total / props.perPage));
  
  const changePage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      emits('update:modelValue', page);
      emits('page-changed', page);
    }
  };
  </script>
  
  <style scoped>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    margin: 0 5px;
  }
  </style>
  