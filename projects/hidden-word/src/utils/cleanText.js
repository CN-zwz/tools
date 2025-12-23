/**
 * 清除文本中的隐藏内容（变体选择器）
 * @param {string} text - 包含隐藏内容的文本
 * @returns {string} - 清除隐藏内容后的文本
 */
export function cleanHiddenText(text) {
    if (!text) return '';

    const VARIATION_SELECTOR_START = 0xfe00;
    const VARIATION_SELECTOR_END = 0xfe0f;
    const VARIATION_SELECTOR_SUPPLEMENT_START = 0xe0100;
    const VARIATION_SELECTOR_SUPPLEMENT_END = 0xe01ef;

    const chars = Array.from(text);
    let result = '';

    for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        const codePoint = char.codePointAt(0);

        // 添加非变体选择器字符到结果中
        if (!(
            (codePoint >= VARIATION_SELECTOR_START && codePoint <= VARIATION_SELECTOR_END) ||
            (codePoint >= VARIATION_SELECTOR_SUPPLEMENT_START && codePoint <= VARIATION_SELECTOR_SUPPLEMENT_END)
        )) {
            result += char;
        }
    }

    return result;
}