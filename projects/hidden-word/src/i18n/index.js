import {createI18n} from 'vue-i18n';
import zh from './locales/zh.js';
import en from './locales/en.js';

const i18n = createI18n({
    legacy: false, // 使用组合式API
    locale: localStorage.getItem('locale') || 'zh', // 默认语言
    fallbackLocale: 'zh', // 回退语言
    messages: {
        zh,
        en
    }
});

export default i18n;
