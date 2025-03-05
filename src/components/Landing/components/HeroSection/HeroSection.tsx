import { Trans } from "react-i18next";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { WishlistCard } from "./WishlistCard";
import { Features } from "./Features";

export function HeroSection() {
  const { t } = useTranslation();

  return (
    <div className="pt-10 sm:pt-24  text-center xs:px-4 sm:px-0 flex flex-col gap-2 relative">
      <h1 className="text-[60px] md:text-6xl font-bold text-foreground mb-2 max-w-4xl mx-auto px-4 md:px-10">
        <Trans
          i18nKey="landing.hero.title"
          components={{
            emphasis: <span className="text-primary" />,
          }}
        />
      </h1>
      <p className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 px-4 md:px-10">
        {t("landing.hero.description")}
      </p>
      <WishlistCard />
      <div className="relative flex flex-col gap-4">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/45 to-transparent z-2" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-transparent z-2" />
        <Image
          src="/landing/bg-pic1.png"
          alt="landing background"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
          priority
        />
        <Features />
      </div>
    </div>
  );
}
