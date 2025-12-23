<script setup>
import {useI18n} from 'vue-i18n';
import {useAppStore} from '@/store/index.js';

const {t} = useI18n();
const store = useAppStore();
</script>

<template>
  <div class="flex justify-center">
    <div
        class="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-indigo-100/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <span
          :class="{'text-indigo-900 font-medium': !store.isEncoding, 'text-indigo-400': store.isEncoding}"
          class="mr-3 text-sm transition-colors duration-300"
      >
        {{ t('mode.decode') }}
      </span>

      <button
          :class="store.isEncoding ? 'bg-indigo-500' : 'bg-gray-300'"
          class="relative w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300 focus:outline-none"
          @click="store.toggleMode()"
      >
        <span
            :class="store.isEncoding ? 'translate-x-7' : 'translate-x-0.5'"
            class="absolute bg-white w-5 h-5 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center"
        >
          <i :class="store.isEncoding ? 'fa-solid fa-lock text-indigo-500 text-xs' : 'fa-solid fa-unlock text-gray-400 text-xs'"></i>
        </span>
      </button>

      <span
          :class="{'text-indigo-900 font-medium': store.isEncoding, 'text-indigo-400': !store.isEncoding}"
          class="ml-3 text-sm transition-colors duration-300"
      >
        {{ t('mode.encode') }}
      </span>
    </div>
  </div>
</template>
