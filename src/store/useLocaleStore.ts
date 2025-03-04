import { create } from "zustand";
import { persist } from "zustand/middleware";
import { i18n, type Locale } from "@/lib/i18n-config";

interface LocaleStore {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleStore>()(
  persist(
    (set) => ({
      locale: i18n.defaultLocale,
      setLocale: (locale: Locale) => set({ locale }),
    }),
    {
      name: "locale-storage",
    }
  )
);
