import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function CtaSection() {
  const { t } = useTranslation();

  return (
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
  );
}
