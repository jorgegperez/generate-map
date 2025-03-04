"use client";

import { useLocaleStore } from "@/store/useLocaleStore";
import { i18n } from "@/lib/i18n-config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocaleStore();

  return (
    <Select
      value={locale}
      onValueChange={(value) => setLocale(value)}
      defaultValue={i18n.defaultLocale}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((loc) => (
          <SelectItem key={loc} value={loc}>
            {`${loc.toUpperCase()} ${loc.toUpperCase() === "ES" ? "🇪🇸" : "🇺🇸"}`}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
