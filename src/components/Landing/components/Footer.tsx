import Link from "next/link";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();

  return (
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
  );
}
