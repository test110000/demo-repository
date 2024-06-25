import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import my from './locales/my.json';
import zw from './locales/zw.json';

const messages = {
	en,
	my,
	zw
};

const i18n = createI18n({
	locale: 'en', // set locale
	fallbackLocale: 'en', // set fallback locale
	messages, // set locale messages
});

export default i18n;
