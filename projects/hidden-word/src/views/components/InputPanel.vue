<script setup>
import {useI18n} from 'vue-i18n';
import ClearableTextarea from '../../components/ClearableTextarea.vue';
import CleanHiddenTextButton from '../../components/CleanHiddenTextButton.vue';
import CopyButton from '../../components/CopyButton.vue';
import {useAppStore} from '@/store/index.js';

const {t} = useI18n();
const store = useAppStore();

const handleCleanText = (cleanedText) => {
  store.inputText = cleanedText;
};
</script>

<template>
  <div
      class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="px-5 py-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <i :class="store.isEncoding ? 'fa-solid fa-keyboard text-indigo-500' : 'fa-solid fa-magnifying-glass text-indigo-500'"
             class="mr-2"></i>
          <h3 class="text-indigo-900 font-medium text-sm">
            {{ store.isEncoding ? t('input.encodeTitle') : t('input.decodeTitle') }}
          </h3>
        </div>

        <div class="flex items-center gap-2">
          <CopyButton v-if="store.inputText" :textToCopy="store.inputText"/>
          <CleanHiddenTextButton v-if="!store.isEncoding && store.inputText" :onClean="handleCleanText"
                                 :text="store.inputText"/>
        </div>
      </div>

      <ClearableTextarea v-model="store.inputText"
                         :placeholder="store.isEncoding ? t('input.encodePlaceholder') : t('input.decodePlaceholder')"
                         min-height="120px"/>
    </div>
  </div>
</template>
