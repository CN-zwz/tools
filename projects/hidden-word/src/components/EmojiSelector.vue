<script setup>
const props = defineProps({
  onEmojiSelect: {
    type: Function,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  emojiList: {
    type: Array,
    required: true
  },
  onShowEmojiPicker: {
    type: Function,
    default: null
  }
});

const handleEmojiClick = (emoji) => {
  if (emoji === '...' && props.onShowEmojiPicker) {
    props.onShowEmojiPicker();
  } else {
    props.onEmojiSelect(emoji);
  }
};
</script>

<template>
  <div class="flex flex-wrap gap-1.5">
    <button v-for="emoji in emojiList" :key="emoji"
            :class="{ 'text-xs font-bold': emoji === '...' }"
            :disabled="disabled"
            class="w-8 h-8 flex items-center justify-center rounded-lg border border-indigo-100 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-50 transition-all duration-300 text-base shadow-sm hover:shadow cursor-pointer disabled:cursor-not-allowed transform hover:scale-110"
            @click="handleEmojiClick(emoji)">
      {{ emoji }}
    </button>
  </div>
</template>
