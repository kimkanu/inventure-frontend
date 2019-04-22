import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import detectBrowserLanguage from 'detect-browser-language';
import * as TRANSLATIONS from './translations';

i18n.use(initReactI18next).init({
  resources: TRANSLATIONS,

  ns: ['app'],
  defaultNS: 'app',

  lng: detectBrowserLanguage(),
  fallbackLng: 'en',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
