import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { Session } from "next-auth";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Header({ session }: { session: Session | null }) {
  const { t } = useTranslation();
  const { isMobile } = useIsMobile();

  return (
    <header className="sticky top-2 sm:max-w-7xl lg:max-w-[900px] mx-auto bg-card/80 backdrop-blur-sm z-50 shadow-sm rounded-lg sm:mt-2 w-full">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-foreground">YourBrand</h1>
          </div>
          {isMobile ? (
            // Menú móvil
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {session ? (
                <UserMenu userName={session.user?.name} />
              ) : (
                <Link
                  href="/login"
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90"
                >
                  {t("landing.navigation.login")}
                </Link>
              )}
            </div>
          ) : (
            // Menú desktop
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
          )}
        </div>
      </div>
    </header>
  );
}
