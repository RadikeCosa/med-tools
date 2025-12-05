import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "med-tools",
  description:
    "med-tools es un proyecto personal para crear y mostrar herramientas digitales en mi portfolio. Aquí practico y demuestro habilidades técnicas.",
  openGraph: {
    title: "med-tools",
    description:
      "Proyecto personal de herramientas digitales para portfolio y práctica profesional.",
    url: "https://github.com/RadikeCosa/med-tools",
    siteName: "med-tools",
  },
  twitter: {
    card: "summary",
    title: "med-tools",
    description:
      "Proyecto personal de herramientas digitales para portfolio y práctica profesional.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1 w-full flex flex-col items-center justify-start px-4 py-8 sm:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
