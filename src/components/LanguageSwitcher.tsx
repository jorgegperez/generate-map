"use client";

import { useLocaleStore } from "@/store/useLocaleStore";
import { i18n } from "@/lib/i18n-config";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <div className="flex gap-2">
      {i18n.locales.map((loc) => (
        <button
          key={loc}
          onClick={(e) => {
            e.preventDefault();
            setLocale(loc);
          }}
          className={`px-2 py-1 rounded ${
            locale === loc
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {loc.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
