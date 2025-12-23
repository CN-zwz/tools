import {defineStore} from 'pinia';
import {computed, ref, watch} from 'vue';
import {decode, encode} from '../utils/encoding.js';
import {useI18n} from 'vue-i18n';

/**
 * 主应用状态存储
 */
export const useAppStore = defineStore('app', () => {
    // 状态
    const mode = ref('encode'); // encode 或 decode
    const inputText = ref('');
    const carrierText = ref(''); // 载体文本
    const outputText = ref('');
    const errorText = ref('');
    const {t} = useI18n();

    // 光标位置状态
    const cursorPositions = ref({
        start: 0,
        end: 0,
    });

    const isEncoding = computed(() => mode.value === 'encode');

    function toggleMode() {
        mode.value = isEncoding.value ? 'decode' : 'encode';
        inputText.value = '';
        outputText.value = '';
        errorText.value = '';
    }

    watch([mode, inputText, carrierText], () => {
        try {
            if (isEncoding.value) {
                if (inputText.value && carrierText.value) {
                    outputText.value = encode(inputText.value, carrierText.value);
                } else {
                    outputText.value = '';
                }
            } else {
                if (inputText.value) {
                    outputText.value = decode(inputText.value);
                } else {
                    outputText.value = '';
                }
            }
            errorText.value = '';
        } catch (e) {
            outputText.value = '';
            errorText.value = isEncoding.value ? t('error.encode') : t('error.decode');
        }
    });

    function updateCursorPosition(newPosition) {
        cursorPositions.value.start = newPosition.start;
        cursorPositions.value.end = newPosition.end;
    }

    function updateCarrierText(newText) {
        carrierText.value = newText;
    }

    return {
        mode,
        inputText,
        carrierText,
        outputText,
        errorText,
        cursorPositions,
        isEncoding,
        toggleMode,
        updateCursorPosition,
        updateCarrierText
    };
});
