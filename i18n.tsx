import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { en, kr } from "./locales";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    kr: {
      translation: kr,
    },
  },
  lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  fallbackLng: "en", // use en if detected lng is not available
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
