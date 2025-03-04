"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/dictionaries/en.json";
import es from "@/dictionaries/es.json";
import { i18n as i18nConfig } from "@/lib/i18n-config";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: i18nConfig.defaultLocale,
    fallbackLng: i18nConfig.defaultLocale,
    interpolation: {
      escapeValue: false,
    },
  });
}

export default i18n;
