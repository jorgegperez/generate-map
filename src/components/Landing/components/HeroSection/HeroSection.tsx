import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import { WishlistCard } from "./WishlistCard";
import { Features } from "./Features";
import Benefits from "../Benefits";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";
const IMG_SIZE = 400;

export function HeroSection() {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="pt-10 sm:pt-24  text-center xs:px-4 sm:px-0 flex flex-col gap-2 relative">
      <div className="flex items-center  max-w-6xl mx-auto gap-2 pr-4">
        <Image
          src={
            theme === "light" ? "/landing/main-light.png" : "/landing/main.png"
          }
          alt="Hero Image"
          className="hidden md:block translate-x-28"
          width={IMG_SIZE}
          height={IMG_SIZE}
        />
        <div className="flex flex-col gap-2 z-10">
          <h1 className="text-[60px] md:text-6xl font-bold text-foreground mb-2 max-w-4xl mx-auto px-4 md:px-10 md:text-right">
            <Trans
              i18nKey="landing.hero.title"
              components={{
                emphasis: <span className="text-primary" />,
              }}
            />
          </h1>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 px-4 md:px-10 md:text-right">
            {t("landing.hero.description")}
          </p>
        </div>
      </div>
      <WishlistCard />
      <div
        className=" relative flex flex-col gap-4 h-full"
        style={{
          backgroundImage: "url('/landing/bg-pic1.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-0" />
        <div className="relative z-1">
          <Features />
          <Benefits />
        </div>
      </div>
    </div>
  );
}
