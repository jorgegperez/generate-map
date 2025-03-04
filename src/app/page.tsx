import { getServerSession } from "next-auth/next";
import { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import Loading from "./loading";
import { HomeContent } from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "The Solution You Need, Effortlessly",
  description:
    "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
  openGraph: {
    title: "The Solution You Need, Effortlessly",
    description:
      "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
  },
};

export default async function Home() {
  const session = await getServerSession();

  await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <>
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "YourBrand",
              description:
                "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
              url: "https://yourbrand.com",
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              itemListElement: [
                {
                  "@type": "Article",
                  position: 1,
                  name: "Lightning Fast",
                  description:
                    "Experience blazing fast performance with our optimized infrastructure.",
                },
                {
                  "@type": "Article",
                  position: 2,
                  name: "Fully Customizable",
                  description:
                    "Adapt every aspect to match your brand and requirements.",
                },
                {
                  "@type": "Article",
                  position: 3,
                  name: "Enterprise Security",
                  description:
                    "Bank-grade security to keep your data safe and protected.",
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://yourbrand.com",
                },
              ],
            },
          ]),
        }}
      />

      <Suspense fallback={<Loading />}>
        <HomeContent session={session} />
      </Suspense>
    </>
  );
}
