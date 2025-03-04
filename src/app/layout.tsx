import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | YourBrand",
    default: "YourBrand - The Modern Solution for Your Needs",
  },
  description:
    "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
  keywords: [
    "YourBrand",
    "solution",
    "enterprise security",
    "customizable platform",
  ],
  openGraph: {
    type: "website",
    siteName: "YourBrand",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YourBrand Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourbrand",
  },
  metadataBase: new URL("https://yourbrand.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
  authors: [{ name: "Your Brand Team" }],
  creator: "Your Brand",
  publisher: "Your Brand Inc.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
