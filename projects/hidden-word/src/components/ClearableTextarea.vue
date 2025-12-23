<script setup>
import {computed, useTemplateRef} from 'vue';

const modelValue = defineModel('modelValue');

const props = defineProps({
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  minHeight: {
    type: String,
    default: '60px'
  }
});

const emit = defineEmits(['select', 'click']);

const textareaRef = useTemplateRef('textarea');

const clearText = () => {
  modelValue.value = '';
  if (textareaRef.value) {
    textareaRef.value.focus();
  }
}

const showClearButton = computed(() => {
  return modelValue.value && modelValue.value.length > 0 && !props.disabled;
});

const handleSelect = (event) => {
  emit('select', event);
};

const handleClick = (event) => {
  emit('click', event);
};
</script>

<template>
  <div class="relative">
    <textarea ref="textarea" v-model="modelValue" :disabled="disabled" :placeholder="placeholder"
              :style="{ minHeight: minHeight }"
              class="w-full px-4 py-3 bg-white border border-indigo-100 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 resize-none transition-all duration-300 text-gray-700 text-sm placeholder:text-indigo-200 placeholder:text-sm"
              @click="handleClick" @select="handleSelect"></textarea>

    <button v-if="showClearButton"
            class="absolute right-3 top-3 text-indigo-400 hover:text-indigo-600 focus:outline-none transition-all duration-300 w-6 h-6 flex items-center justify-center rounded-full hover:bg-indigo-100 z-10 opacity-90 hover:opacity-100 shadow-sm"
            title="清空文本"
            type="button"
            @click="clearText">
      <i class="fa-solid fa-xmark"></i>
    </button>
  </div>
</template>
