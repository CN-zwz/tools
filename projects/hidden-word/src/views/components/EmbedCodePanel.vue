<script setup>
import {computed, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {generateHtmlSnippet} from '../../utils/embedCode.js';
import {useAppStore} from '@/store/index.js';

const {t} = useI18n();
const store = useAppStore();

const htmlSnippet = computed(() => {
  return generateHtmlSnippet(store.inputText || 'Hidden Word 已加密此内容');
});

const copied = ref(false);
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(htmlSnippet.value);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error('复制失败:', err);
  }
};
</script>

<template>
  <div v-if="store.isEncoding"
       class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="px-5 py-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <i class="fa-solid fa-code text-indigo-500 mr-2"></i>
          <h3 class="text-indigo-900 font-medium text-sm">{{ t('embed.title') }}</h3>
        </div>

        <button :class="copied ? 'bg-green-500 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'"
                class="px-3 py-1.5 text-xs rounded-full transition-all duration-300 focus:outline-none font-medium shadow-sm flex items-center gap-1"
                @click="copyToClipboard">
          <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
          {{ copied ? t('copy.success') : t('copy.default') }}
        </button>
      </div>

      <div
          class="bg-white rounded-lg border border-indigo-100 shadow-inner p-4 min-h-[120px] relative overflow-auto transition-all duration-300 max-h-[200px]">
        <pre class="text-gray-700 text-xs whitespace-pre-wrap break-all">{{ htmlSnippet }}</pre>
      </div>

      <div class="mt-3 bg-indigo-100 border border-indigo-200 rounded-lg p-3">
        <p class="text-indigo-700 text-xs">
          <i class="fa-solid fa-circle-info mr-1"></i>
          {{ t('embed.usingInputText') }}
        </p>
      </div>

      <div class="mt-3 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
        <p class="text-indigo-700 text-xs">
          <i class="fa-solid fa-circle-info mr-1"></i>
          {{ t('embed.description') }}
        </p>
      </div>
    </div>
  </div>
</template>
