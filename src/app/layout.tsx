import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YourBrand - The Modern Solution for Your Needs",
  description:
    "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
  keywords: "your, relevant, keywords, here",
  openGraph: {
    title: "YourBrand - The Modern Solution for Your Needs",
    description:
      "Meet the modern standard for your needs. Beautiful out of the box, easy to maintain, and built to convert users.",
    images: ["/og-image.jpg"],
  },
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
