<script setup>
import {useI18n} from 'vue-i18n';

const {t} = useI18n();

// 社交平台链接配置
const socialLinks = [
  {
    name: 'GitHub',
    icon: 'fa-brands fa-github',
    url: 'https://github.com/Ackites'
  },
  {
    name: 'Twitter',
    icon: 'fa-brands fa-twitter',
    url: 'https://x.com/actkites'
  }
];
</script>

<template>
  <div class="mt-8 pt-6 border-t border-indigo-100/50 text-center">
    <div class="flex items-center justify-center gap-3">
      <i class="fa-brands fa-github text-indigo-400"></i>
      <span class="text-indigo-400 text-sm">{{ t('footer.description') }}</span>

      <a
          class="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 flex items-center gap-1 text-sm"
          href="https://github.com/Ackites/hidden-word"
          rel="noopener noreferrer"
          target="_blank"
          title="GitHub 仓库"
      >
        <span>GitHub</span>
      </a>
    </div>

    <div class="mt-3 text-xs text-indigo-300 flex justify-center items-center gap-2">
      <span>Made with</span>
      <i class="fa-solid fa-heart text-pink-500 animate-pulse"></i>
      <span>and</span>
      <i class="fa-brands fa-vuejs text-green-500"></i>
      <span>by</span>
      <a
          class="text-indigo-500 hover:text-indigo-700 transition-colors duration-300 flex items-center gap-1"
          href="https://github.com/Ackites"
          rel="noopener noreferrer"
          target="_blank"
      >
        <i class="fa-brands fa-github"></i>
        <span>Ackites</span>
      </a>
    </div>

    <!-- 社交平台链接 -->
    <div class="mt-4 flex justify-center items-center gap-4">
      <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          :title="link.name"
          class="text-indigo-400 hover:text-indigo-600 transition-colors duration-300"
          rel="noopener noreferrer"
          target="_blank"
      >
        <i :class="link.icon"></i>
      </a>
    </div>
  </div>
</template>
