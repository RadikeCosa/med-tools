import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { siteConfig } from "./config/site.config";

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.url,
    siteName: siteConfig.seo.siteName,
  },
  twitter: {
    card: "summary",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full flex flex-col items-center justify-start px-4 py-8 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
