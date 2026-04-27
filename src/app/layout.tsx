import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yup.app"),
  title: "YUP — путь к твоей вершине",
  description:
    "Один план на все сферы роста: язык, тело, знания, привычки, голова. AI собирает маршрут, ты идёшь шаг за шагом — пока цель не возьмёшь.",
  openGraph: {
    title: "YUP — путь к твоей вершине",
    description:
      "Серьёзная платформа для саморазвития. Цель → маршрут → восхождение. Без распыления.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#14151a",
  colorScheme: "dark light",
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
