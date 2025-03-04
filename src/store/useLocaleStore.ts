import { create } from "zustand";
import { persist } from "zustand/middleware";
import { i18n as i18nConfig } from "@/lib/i18n-config";
import i18n from "@/lib/i18n-client";

interface LocaleStore {
  locale: string;
  setLocale: (locale: string) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: i18nConfig.defaultLocale,
      setLocale: (locale: string) => {
        i18n.changeLanguage(locale);
        set({ locale });
      },
    }),
    {
      name: "locale-storage",
    }
  )
);
