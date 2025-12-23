<script setup>
import {useI18n} from 'vue-i18n';
import {onMounted} from 'vue';

const {t, locale} = useI18n();

const changeLocale = (lang) => {
  locale.value = lang;
  localStorage.setItem('locale', lang);
};

onMounted(() => {
  const savedLocale = localStorage.getItem('locale');

  if (savedLocale) {
    locale.value = savedLocale;
  } else {
    const systemLang = navigator.language || navigator.userLanguage;
    const defaultLang = systemLang.startsWith('zh') ? 'zh' : 'en';
    locale.value = defaultLang;
    localStorage.setItem('locale', defaultLang);
  }
});
</script>

<template>
  <div
      class="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-indigo-100/50 transition-all duration-300 hover:shadow-lg">
    <span class="text-xs text-indigo-500 mr-2 font-medium">{{ t('language.title') }}:</span>

    <button
        :class="locale === 'zh' ? 'bg-indigo-500 text-white shadow-md' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'"
        class="px-3 py-1 text-xs rounded-full transition-all duration-300 focus:outline-none mx-1"
        @click="changeLocale('zh')"
    >
      {{ t('language.zh') }}
    </button>

    <button
        :class="locale === 'en' ? 'bg-indigo-500 text-white shadow-md' : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'"
        class="px-3 py-1 text-xs rounded-full transition-all duration-300 focus:outline-none mx-1"
        @click="changeLocale('en')"
    >
      {{ t('language.en') }}
    </button>
  </div>
</template>
