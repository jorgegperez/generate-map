"use client";

import { useEffect } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import i18n from "@/lib/i18n-client";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore((state) => state.locale);

  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale]);

  return children;
}
