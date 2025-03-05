import Image from "next/image";
import { useTranslation } from "react-i18next";
import React, { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselItem,
  CarouselApi,
  CarouselContent,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

export const Features = () => {
  const { t } = useTranslation();
  const [carouselApi, setCarouselApi] = React.useState<CarouselApi | null>(
    null
  );
  const [activeTab, setActiveTab] = React.useState(0);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    carouselApi.on("select", (e) => {
      const activeIndex = e.selectedScrollSnap();
      console.log({ e: e.selectedScrollSnap() });
      setActiveTab(activeIndex);
    });
  }, [activeTab, carouselApi]);

  const handleTabClick = (index: number) => {
    if (!carouselApi) return;

    carouselApi.scrollTo(index);
    carouselApi.plugins().autoplay.reset();
    setActiveTab(index);
  };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-full p-4 md:p-16">
      <div className="flex items-center justify-center gap-4 mb-8 overflow-x-auto">
        <Button
          variant={activeTab === 0 ? "tabActive" : "tab"}
          onClick={() => handleTabClick(0)}
        >
          {t("landing.hero.features.mindmap.title").slice(2)}
        </Button>
        <Button
          variant={activeTab === 1 ? "tabActive" : "tab"}
          onClick={() => handleTabClick(1)}
        >
          {t("landing.hero.features.summaries.title").slice(2)}
        </Button>
        <Button
          variant={activeTab === 2 ? "tabActive" : "tab"}
          onClick={() => handleTabClick(2)}
        >
          {t("landing.hero.features.quizzes.title").slice(2)}
        </Button>
      </div>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[Autoplay({ delay: 3500 })]}
        setApi={setCarouselApi}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full gap-8 md:gap-16 p-4">
              <div className="w-full max-w-[600px] h-full rounded-xl overflow-hidden shadow-primary">
                <Image
                  src="/landing/app-preview.png"
                  alt="landing background"
                  className="w-full  h-full object-cover"
                  width={900}
                  height={1080}
                  priority
                />
              </div>
              <div className="flex flex-col gap-8 w-full md:max-w-[40%]">
                <p className="text-3xl font-bold">
                  {t("landing.hero.features.mindmap.title")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.mindmap.key1")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.mindmap.key2")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.mindmap.key3")}
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full gap-8 md:gap-16 p-4">
              <div className="w-full max-w-[600px] h-full rounded-xl overflow-hidden shadow-primary">
                <Image
                  src="/landing/app-preview.png"
                  alt="landing background"
                  className="w-full  h-full object-cover"
                  width={900}
                  height={1080}
                  priority
                />
              </div>
              <div className="flex flex-col gap-8 w-full md:max-w-[40%]">
                <p className="text-3xl font-bold">
                  {t("landing.hero.features.summaries.title")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.summaries.key1")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.summaries.key2")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.summaries.key3")}
                </p>
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex flex-col-reverse md:flex-row items-center justify-center w-full h-full gap-8 md:gap-16 p-4">
              <div className="w-full max-w-[600px] h-full rounded-xl overflow-hidden shadow-primary">
                <Image
                  src="/landing/app-preview.png"
                  alt="landing background"
                  className="w-full  h-full object-cover"
                  width={900}
                  height={1080}
                  priority
                />
              </div>
              <div className="flex flex-col gap-8 w-full md:max-w-[40%]">
                <p className="text-3xl font-bold">
                  {t("landing.hero.features.quizzes.title")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.quizzes.key1")}
                </p>
                <p className="text-xl text-muted-foreground">
                  {t("landing.hero.features.quizzes.key2")}
                </p>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};
