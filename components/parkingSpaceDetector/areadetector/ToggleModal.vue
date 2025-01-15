<template>
    <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div class="flex flex-col items-center justify-center bg-white p-6 rounded shadow-lg text-center">
        <p class="text-lg font-medium mb-4">Set parking slot status</p>
        <label class="m-2 inline-flex items-center space-x-3">
          <span class="text-gray-700">Is Empty:</span>
          <input type="checkbox" v-model="value" class="toggle-checkbox" @change="handleSwitchChange" />
        </label>
        <button @click="handleSwitchChange"
            class="m-2 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
            type="button">
            cancel
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      initialValue: Boolean,
    },
    data() {
      return {
        value: this.initialValue,
      };
    },
    methods: {
      handleSwitchChange() {
        this.$emit("update-value", this.value);
      },
    },
  };
  </script>
  
  <style>
  .toggle-checkbox {
    appearance: none;
    background-color: #ddd;
    width: 2.5rem;
    height: 1.25rem;
    border-radius: 9999px;
    position: relative;
    transition: background-color 0.3s ease;
    outline: none;
    cursor: pointer;
  }
  .toggle-checkbox:checked {
    background-color: #10b981; /* Green when checked */
  }
  .toggle-checkbox:before {
    content: "";
    position: absolute;
    width: 1rem;
    height: 1rem;
    background-color: white;
    border-radius: 50%;
    top: 2px;
    left: 2px;
    transition: transform 0.3s ease;
  }
  .toggle-checkbox:checked:before {
    transform: translateX(1.25rem); /* Move right when checked */
  }
  </style>
  