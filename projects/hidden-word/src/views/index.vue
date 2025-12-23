<script setup>
import {useI18n} from 'vue-i18n';
import ModeToggle from './components/ModeToggle.vue';
import CarrierTextPanel from './components/CarrierTextPanel.vue';
import EmojiPanel from './components/EmojiPanel.vue';
import InputPanel from './components/InputPanel.vue';
import OutputPanel from './components/OutputPanel.vue';
import EmbedCodePanel from './components/EmbedCodePanel.vue';
import FooterSection from './components/FooterSection.vue';
import LanguageSelector from '../components/LanguageSelector.vue';

const {t} = useI18n();
</script>

<template>
  <div class="min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100 font-sans py-8 px-4 sm:px-6 md:py-12">
    <div class="max-w-6xl mx-auto">
      <!-- 头部区域 -->
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-serif font-bold text-indigo-900 mb-3 tracking-tight">
          {{ t('appTitle') }}
          <span class="inline-block ml-2 transform hover:rotate-12 transition-transform duration-300">🎭</span>
        </h1>
        <p class="text-indigo-700/80 max-w-2xl mx-auto text-sm md:text-base">{{ t('appDescription') }}</p>

        <!-- 语言选择器 -->
        <div class="mt-4 flex justify-center">
          <LanguageSelector/>
        </div>
      </div>

      <!-- 主内容区域 -->
      <div
          class="bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/80 overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
        <div class="p-6 md:p-8">
          <!-- 模式切换 -->
          <ModeToggle class="mb-8"/>

          <!-- 主要内容区域 -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <!-- 左侧面板 -->
            <div class="space-y-6 lg:col-span-1">
              <CarrierTextPanel/>
              <EmojiPanel/>
            </div>

            <!-- 右侧面板 -->
            <div class="space-y-6 lg:col-span-2">
              <InputPanel/>
              <OutputPanel/>
              <EmbedCodePanel/>
            </div>
          </div>

          <!-- 页脚 -->
          <FooterSection/>
        </div>
      </div>
    </div>
  </div>
</template>
