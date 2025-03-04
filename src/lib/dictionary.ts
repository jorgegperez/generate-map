import { useLocaleStore } from "@/store/useLocaleStore";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  es: () => import("../dictionaries/es.json").then((module) => module.default),
} as const;

export type Dictionary = Awaited<
  ReturnType<(typeof dictionaries)[keyof typeof dictionaries]>
>;

export const getDictionary = async () => {
  const locale = useLocaleStore.getState().locale;

  try {
    return dictionaries[locale]?.() ?? dictionaries.en();
  } catch (error) {
    console.error("Failed to load dictionary:", error);
    return dictionaries.en();
  }
};
