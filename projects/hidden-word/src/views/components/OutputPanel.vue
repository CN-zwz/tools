<script setup>
import {useI18n} from 'vue-i18n';
import CopyButton from '../../components/CopyButton.vue';
import {useAppStore} from '@/store/index.js';

const {t} = useI18n();
const store = useAppStore();
</script>

<template>
  <div
      class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="px-5 py-4">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center">
          <i :class="store.isEncoding ? 'fa-solid fa-lock text-indigo-500' : 'fa-solid fa-unlock text-indigo-500'"
             class="mr-2"></i>
          <h3 class="text-indigo-900 font-medium text-sm">
            {{ store.isEncoding ? t('output.encodeTitle') : t('output.decodeTitle') }}
          </h3>
        </div>

        <CopyButton v-if="store.outputText"/>
      </div>

      <div
          class="bg-white rounded-lg border border-indigo-100 shadow-inner p-4 min-h-[120px] relative overflow-hidden transition-all duration-300">
        <pre v-if="store.outputText"
             class="text-gray-700 text-sm whitespace-pre-wrap break-all max-h-[120px] overflow-y-auto">{{
            store.outputText
          }}</pre>
        <div v-else class="text-indigo-300 italic text-sm flex items-center justify-center h-full absolute inset-0">
          <span>{{ t('output.placeholder') }}</span>
        </div>
      </div>

      <!-- 错误信息 -->
      <div
          v-if="store.errorText"
          class="mt-3 bg-red-50 border border-red-100 rounded-lg p-3 text-center"
      >
        <p class="text-red-500 text-sm font-medium">
          <i class="fa-solid fa-triangle-exclamation mr-2"></i>
          {{ store.errorText }}
        </p>
      </div>
    </div>
  </div>
</template>
