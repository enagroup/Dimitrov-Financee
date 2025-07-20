// i18n конфигурация
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'bg',
    resources: {
      bg: { translation: { contact: {}, footer: {} }},
      en: { translation: { contact: {}, footer: {} }},
      tr: { translation: { contact: {}, footer: {} }}
    }
  });

export default i18n;
