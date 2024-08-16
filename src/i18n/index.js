import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import ms from './locales/my.json';
import zh from './locales/zw.json';

function getPreferredLocale() {
	const navigatorLanguage = navigator.language || navigator.userLanguage;
	console.log('Detected browser language:', navigatorLanguage);
	return ['zh', 'ms', 'en'].includes(navigatorLanguage) ? navigatorLanguage : 'en';
}

const messages = {
	en,
	ms,
	zh
};

const i18n = createI18n({
	locale: getPreferredLocale(), // Dynamically determine locale
	fallbackLocale: 'en', // Fallback locales
	messages, // Locale messages
	legacy: false,
});

export default i18n;
