"use client";

import { Session } from "next-auth";
import { useTranslation, Trans } from "react-i18next";
import UserMenu from "@/components/UserMenu";
import Link from "next/link";
import "@/lib/i18n-client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useEffect, useState } from "react";
import { i18n as i18nConfig } from "@/lib/i18n-config";

export function HomeContent({ session }: { session: Session | null }) {
  const { t, i18n } = useTranslation();
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

  // Return a loading state or simplified content during SSR
  if (!isClient) {
    return <div suppressHydrationWarning>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      suppressHydrationWarning
    >
      {/* Header */}
      <header className="fixed w-full bg-card/80 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-foreground">YourBrand</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/documentation"
                className="text-muted-foreground hover:text-foreground"
              >
                {t("landing.navigation.documentation")}
              </Link>
              <Link
                href="/resources"
                className="text-muted-foreground hover:text-foreground"
              >
                {t("landing.navigation.resources")}
              </Link>
              <Link
                href="/pricing"
                className="text-muted-foreground hover:text-foreground"
              >
                Pricing
              </Link>
              <LanguageSwitcher />
              {session ? (
                <UserMenu userName={session.user?.name} />
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pt-32 pb-20 text-center">
            <h1 className="text-[60px] md:text-6xl font-bold text-foreground mb-6">
              <Trans
                i18nKey="landing.hero.title"
                components={{
                  emphasis: <span className="text-primary" />,
                }}
              />
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              {t("landing.hero.subtitle")}
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/get-started"
                className="bg-primary text-primary-foreground px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary/90"
              >
                {t("landing.hero.getStarted")}
              </Link>
              <Link
                href="/demo"
                className="bg-card text-foreground border border-border px-6 py-3 rounded-md text-lg font-semibold hover:bg-card/80"
              >
                {t("landing.hero.getDemo")}
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <section
            aria-label={t("landing.features.title")}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16"
          >
            <article className="bg-card rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("landing.features.lightning.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.lightning.description")}
              </p>
            </article>

            <article className="bg-card rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("landing.features.customizable.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.customizable.description")}
              </p>
            </article>

            <article className="bg-card rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t("landing.features.security.title")}
              </h3>
              <p className="text-muted-foreground">
                {t("landing.features.security.description")}
              </p>
            </article>
          </section>

          {/* CTA Section */}
          <section aria-label="Call to Action" className="py-16">
            <div className="bg-card rounded-2xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("landing.cta.title")}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("landing.cta.subtitle")}
              </p>
              <Link
                href="/signup"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-md text-lg font-semibold hover:bg-primary/90 inline-block"
              >
                {t("landing.cta.button")}
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-foreground font-semibold mb-4">
                {t("landing.footer.product.title")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.product.features")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.product.pricing")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/documentation"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.product.documentation")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-semibold mb-4">
                {t("landing.footer.company.title")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.company.about")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.company.blog")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.company.careers")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-semibold mb-4">
                {t("landing.footer.resources.title")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/community"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.resources.community")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.resources.contact")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/status"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.resources.status")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground font-semibold mb-4">
                {t("landing.footer.legal.title")}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.legal.privacy")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.legal.terms")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {t("landing.footer.legal.security")}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
