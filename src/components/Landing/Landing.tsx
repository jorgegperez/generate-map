"use client";

import { Session } from "next-auth";
import { useTranslation } from "react-i18next";
import "@/lib/i18n-client";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useEffect, useState } from "react";
import { i18n as i18nConfig } from "@/lib/i18n-config";
import Loading from "@/app/loading";
import Footer from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import CtaSection from "./components/CtaSection";
import Header from "./components/Header";

export default function Landing({ session }: { session: Session | null }) {
  const { i18n } = useTranslation();
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
  }, [locale, i18n]);

  if (!isClient) return <Loading />;

  return (
    <div
      className="min-h-screen bg-background flex flex-col items-center relative"
      suppressHydrationWarning
    >
      <Header session={session} />
      <main className="flex-1">
        <div>
          <HeroSection />
          <CtaSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
