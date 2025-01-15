<template>
    <div>
        <h3>Child Component</h3>
        <div class="w-full max-w-sm min-w-[200px]">
            <input v-model="inputMessage" @input="sendMessage" placeholder="Type a message" 
                class="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow" />
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineEmits } from "vue";

const emit = defineEmits();
const inputMessage = ref("");

function sendMessage() {
    emit("send-message", inputMessage.value);
}
</script>