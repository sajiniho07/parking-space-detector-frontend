<template>
  <div>
    <h2>Parent Component</h2>
    <Child @send-message="handleMessage" />
  </div>
</template>
  
<script setup>
import Child from "./Child.vue";
import { defineEmits } from "vue";

const emit = defineEmits();
function handleMessage(message) {
  emit("update-message", message);
}
</script>