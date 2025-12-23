<script setup>
import {computed, ref} from 'vue';
import {useAppStore} from '@/store/index.js';
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const store = useAppStore();

const props = defineProps({
  successText: {
    type: String,
    default: undefined
  },
  defaultText: {
    type: String,
    default: undefined
  },
  textToCopy: {
    type: String,
    required: false,
    default: undefined
  }
});

const successTextValue = computed(() => props.successText || t('copy.success'));
const defaultTextValue = computed(() => props.defaultText || t('copy.default'));

const copied = ref(false);
const buttonText = ref(defaultTextValue.value);

const copyToClipboard = async () => {
  try {
    const textToWrite = props.textToCopy !== undefined ? props.textToCopy : store.outputText;
    await navigator.clipboard.writeText(textToWrite);
    buttonText.value = successTextValue.value;
    copied.value = true;

    setTimeout(() => {
      buttonText.value = defaultTextValue.value;
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error(t('copy.error', '复制失败:'), err);
  }
};
</script>

<template>
  <button :class="copied ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'"
          class="px-3 py-1.5 text-xs rounded-full transition-all duration-300 focus:outline-none font-medium shadow-sm flex items-center gap-1"
          @click="copyToClipboard">
    <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
    {{ buttonText }}
  </button>
</template>
