import {nextTick} from 'vue';
import {useAppStore} from '@/store/index.js';

/**
 * 用于管理文本输入区域的光标位置和文本插入功能的组合式函数
 * @param {Object} options 配置选项
 * @param {string} [options.selector] 用于选择textarea元素的CSS选择器，默认为'.carrierTextarea textarea'
 * @param {Object} [options.modelValue] defineModel返回的响应式对象
 * @param {Function} [options.onPositionChange] 可选的光标位置变化回调函数
 * @returns {Object} 包含光标位置状态和处理方法的对象
 */
export function useCursorPosition(options) {
    const {selector = '.carrierTextarea textarea', modelValue, onPositionChange} = options || {};
    const store = useAppStore();

    const textareaRef = {
        get value() {
            return document.querySelector(selector);
        }
    };

    const handleTextareaSelect = (event) => {
        const newPosition = {
            start: event.target.selectionStart,
            end: event.target.selectionEnd
        };

        store.updateCursorPosition(newPosition);

        if (onPositionChange) {
            onPositionChange(newPosition);
        }
    };

    const getCurrentText = () => {
        if (modelValue !== undefined) {
            return modelValue.value;
        }
        return store.carrierText;
    };

    const updateCurrentText = (newText) => {
        if (modelValue !== undefined) {
            modelValue.value = newText;
            return;
        }
        store.updateCarrierText(newText);
    };

    const insertTextAtCursor = (text) => {
        const currentText = getCurrentText();
        const position = store.cursorPositions;
        const textarea = textareaRef.value;

        if (position.start !== undefined && position.end !== undefined) {
            const before = currentText.substring(0, position.start);
            const after = currentText.substring(position.end);
            updateCurrentText(before + text + after);

            const newPosition = position.start + text.length;

            store.updateCursorPosition({
                start: newPosition,
                end: newPosition
            });

            nextTick(() => {
                if (textarea && typeof textarea.focus === 'function' && typeof textarea.setSelectionRange === 'function') {
                    textarea.focus();
                    textarea.setSelectionRange(newPosition, newPosition);
                }
            });
        } else {
            updateCurrentText(currentText + text);

            nextTick(() => {
                const newPosition = currentText.length + text.length;
                if (textarea && typeof textarea.focus === 'function' && typeof textarea.setSelectionRange === 'function') {
                    textarea.focus();
                    textarea.setSelectionRange(newPosition, newPosition);
                }
            });
        }
    };

    return {
        textareaRef,
        handleTextareaSelect,
        insertTextAtCursor
    };
}
