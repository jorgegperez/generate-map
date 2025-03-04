"use client";

import { useEffect, useState } from "react";
import { useLocaleStore } from "@/store/useLocaleStore";
import i18n from "@/lib/i18n-client";
import { i18n as i18nConfig } from "@/lib/i18n-config";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocaleStore(
    (state) => state.locale || i18nConfig.defaultLocale
  );
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  if (!isClient) {
    return null;
  }

  return children;
}
