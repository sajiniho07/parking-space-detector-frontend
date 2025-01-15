<template>
  <div>
    <h1>Grandparent Component</h1>
    <p>Message from Child: {{ message }}</p>
    <Parent @update-message="updateMessage" />
  </div>
</template>
  
  <script setup>
import { ref } from "vue";
import Parent from "./Parent.vue";

const message = ref("No message yet");

function updateMessage(newMessage) {
  message.value = newMessage;
}
</script>