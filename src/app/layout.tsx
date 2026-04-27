import type { Metadata, Viewport } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yup.app"),
  title: "YUP — иди. покори. повтори.",
  description:
    "Один маршрут к твоей вершине. AI собирает план — ты идёшь. Язык, тело, знания, привычки, голова. Без распыления, без отмазок.",
  openGraph: {
    title: "YUP — иди. покори. повтори.",
    description:
      "Платформа для тех, кто берёт вершину, а не складирует мотивацию. Цель → маршрут → шаг → пик.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${display.variable}`}
    >
      <body className="min-h-dvh">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
