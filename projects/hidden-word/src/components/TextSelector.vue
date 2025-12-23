<script setup>
const props = defineProps({
  textList: {
    type: Array,
    required: true
  },
  onTextSelect: {
    type: Function,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex flex-wrap gap-1.5">
    <button v-for="(text, index) in textList" :key="index" :disabled="disabled"
            class="px-2.5 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-xs hover:bg-indigo-100 hover:border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-medium transform hover:scale-105 cursor-pointer shadow-sm"
            @click="onTextSelect(text)">
      {{ text }}
    </button>
  </div>
</template>
