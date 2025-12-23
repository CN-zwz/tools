<script setup>
import {ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {cleanHiddenText} from '../utils/cleanText.js';

const {t} = useI18n();

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  onClean: {
    type: Function,
    required: true
  }
});

const cleaned = ref(false);

const cleanText = () => {
  if (!props.text) return;

  const cleanedText = cleanHiddenText(props.text);
  props.onClean(cleanedText);

  // 显示成功状态
  cleaned.value = true;

  setTimeout(() => {
    cleaned.value = false;
  }, 2000);
};
</script>

<template>
  <button :class="cleaned ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'"
          class="px-3 py-1.5 text-xs rounded-full transition-all duration-300 focus:outline-none font-medium shadow-sm flex items-center gap-1"
          @click="cleanText">
    <i :class="cleaned ? 'fa-solid fa-check' : 'fa-solid fa-broom'"></i>
    {{ cleaned ? t('clean.success') : t('clean.default') }}
  </button>
</template>
