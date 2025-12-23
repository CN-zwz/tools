<script setup>
import {useI18n} from 'vue-i18n';
import {nextTick, onUnmounted, ref, useTemplateRef} from 'vue';
import EmojiSelector from '../../components/EmojiSelector.vue';
import {ALPHABET_LIST, EMOJI_LIST} from '@/utils/emoji.js';
import {useAppStore} from '@/store/index.js';
import {useCursorPosition} from '@/composables/useCursorPosition.js';
import data from '@emoji-mart/data'
import {Picker} from 'emoji-mart'

const {t} = useI18n();
const store = useAppStore();
const showEmojiPicker = ref(false);
const pickerContainer = useTemplateRef('pickerContainer');
let pickerInstance = null;

const {
  insertTextAtCursor
} = useCursorPosition();

const handleEmojiSelect = (emoji) => {
  if (emoji && emoji.native) {
    insertTextAtCursor(emoji.native);
  }
};

const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;

  if (showEmojiPicker.value) {
    nextTick(() => {
      if (pickerContainer.value) {
        if (pickerInstance) {
          if (pickerContainer.value.contains(pickerInstance)) {
            pickerContainer.value.removeChild(pickerInstance);
          }
          pickerInstance = null;
        }

        pickerInstance = new Picker({
          data,
          onEmojiSelect: handleEmojiSelect,
          autoFocus: true,
          locale: localStorage.getItem('locale') || 'zh',
          emojiButtonSize: 36,
          emojiSize: 24,
          perLine: 8,
          previewPosition: 'none'
        });

        pickerInstance.classList.add(
            'w-72',
            'h-auto',
            'max-h-[320px]'
        );
        pickerContainer.value.appendChild(pickerInstance);
      }
    });
  } else {
    if (pickerInstance && pickerContainer.value) {
      if (pickerContainer.value.contains(pickerInstance)) {
        pickerContainer.value.removeChild(pickerInstance);
      }
      pickerInstance = null;
    }
  }
};

onUnmounted(() => {
  if (pickerInstance) {
    if (pickerContainer.value && pickerContainer.value.contains(pickerInstance)) {
      pickerContainer.value.removeChild(pickerInstance);
    }
    pickerInstance = null;
  }
});
</script>

<template>
  <div
      :class="{ 'opacity-75 hover:opacity-100': !store.isEncoding }"
      class="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
    <div class="px-5 py-4">
      <div class="flex items-center mb-3">
        <i class="fa-regular fa-face-smile text-yellow-500 mr-2"></i>
        <h3 class="text-indigo-900 font-medium text-sm">{{ t('emoji.title') }}</h3>
      </div>

      <div class="bg-indigo-50/50 rounded-lg p-3 mb-4">
        <EmojiSelector :disabled="!store.isEncoding" :emojiList="EMOJI_LIST" :onEmojiSelect="insertTextAtCursor"
                       :onShowEmojiPicker="toggleEmojiPicker"/>
      </div>

      <div class="flex items-center mb-2">
        <i class="fa-solid fa-keyboard text-indigo-400 mr-2 text-xs"></i>
        <h4 class="text-indigo-700 font-medium text-xs">{{ t('emoji.alphabet') }}</h4>
      </div>

      <div class="bg-indigo-50/50 rounded-lg p-3">
        <EmojiSelector :disabled="!store.isEncoding" :emojiList="ALPHABET_LIST" :onEmojiSelect="insertTextAtCursor"/>
      </div>

      <!-- Emoji Picker Modal -->
      <div v-if="showEmojiPicker" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <button
            class="absolute right-2 top-2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-500 hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            @click="showEmojiPicker = false">
          <i class="fa-solid fa-times"></i>
        </button>
        <div class="relative bg-white rounded-xl shadow-xl overflow-hidden">
          <div ref="pickerContainer" class="p-2"></div>
        </div>
      </div>
    </div>
  </div>
</template>
