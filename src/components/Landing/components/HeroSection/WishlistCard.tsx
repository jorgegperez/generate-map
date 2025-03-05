import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function WishlistCard() {
  const { t } = useTranslation();

  return (
    <div className="flex gap-2 max-w-lg mx-auto rounded-lg border border-border border-2 shadow-primary shadow-md py-3 px-6 animate-glow hover:animate-none my-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col justify-start items-start">
          <p className="text-xlb font-bold">{t("landing.hero.joinWishlist")}</p>
          <p className="text-sm text-muted-foreground text-left">
            {t("landing.hero.wishlistTitle")}
          </p>
        </div>
        <Input
          icon={<MailIcon className="w-4 h-4 text-primary" />}
          type="text"
          className="w-full"
          placeholder={t("landing.hero.inputPlaceholder")}
        />
      </div>
      <div className="flex flex-col justify-end items-end">
        <Button>{t("landing.hero.join")}</Button>
      </div>
    </div>
  );
}
