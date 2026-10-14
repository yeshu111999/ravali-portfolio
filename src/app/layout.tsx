import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ravali Salakala · Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 7+ years building fast, accessible, enterprise-scale web apps with React, Next.js and TypeScript.",
  openGraph: {
    title: "Ravali Salakala · Senior Frontend Engineer",
    description: "React · Next.js · TypeScript. Fast, accessible, delightful interfaces.",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${playfair.variable} ${manrope.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
