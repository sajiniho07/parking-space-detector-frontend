<template>
  <Menu></Menu>
  <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Fetch Media Data</h1>
      <button @click="fetchMediaData" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Fetch Data
      </button>

      <div v-if="loading" class="mt-4">Loading...</div>

      <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>

      <div v-if="mediaData" class="mt-4 p-4 border border-gray-300 rounded">
          <h2 class="text-xl font-semibold">Media Data:</h2>
          <pre>{{ mediaData }}</pre>
      </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const mediaData = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchMediaData = async () => {
  loading.value = true;
  error.value = null;

  try {
      const response = await $fetch('/api/media/type/3');
      mediaData.value = response;
  } catch (err) {
      error.value = 'Failed to fetch data';
      console.error(err);
  } finally {
      loading.value = false;
  }
};
</script>
