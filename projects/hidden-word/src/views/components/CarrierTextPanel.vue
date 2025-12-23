<script setup>
import {useI18n} from 'vue-i18n';
import TextSelector from '../../components/TextSelector.vue';
import ClearableTextarea from '../../components/ClearableTextarea.vue';
import CopyButton from '../../components/CopyButton.vue';
import {CARRIER_TEXT_LIST} from '@/utils/emoji.js';
import {useCursorPosition} from '@/composables/useCursorPosition.js';
import {useAppStore} from '@/store/index.js';

const {t} = useI18n();
const store = useAppStore();

const {
  handleTextareaSelect,
  insertTextAtCursor
} = useCursorPosition();
</script>

<template>
  <div :class="{ 'opacity-75 hover:opacity-100': !store.isEncoding }"
       class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="px-5 py-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <i class="fa-solid fa-font text-indigo-500 mr-2"></i>
          <h3 class="text-indigo-900 font-medium text-sm">{{ t('carrier.title') }}</h3>
        </div>

        <CopyButton v-if="store.carrierText" :textToCopy="store.carrierText"/>
      </div>

      <ClearableTextarea v-model="store.carrierText" :disabled="!store.isEncoding"
                         :placeholder="t('carrier.placeholder')" class="mb-3 carrierTextarea" min-height="60px"
                         @click="handleTextareaSelect" @select="handleTextareaSelect"/>

      <div class="mt-3">
        <div class="flex items-center mb-2">
          <i class="fa-solid fa-list-ul text-indigo-400 mr-2 text-xs"></i>
          <p class="text-xs text-indigo-400 font-medium">{{ t('carrier.presets') }}</p>
        </div>
        <TextSelector :disabled="!store.isEncoding" :onTextSelect="insertTextAtCursor" :textList="CARRIER_TEXT_LIST"/>
      </div>
    </div>
  </div>
</template>
