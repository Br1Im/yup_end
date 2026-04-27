import type { Metadata, Viewport } from "next";
import { Manrope, Lora, Press_Start_2P } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yup.app"),
  title: "YUP — спокойное саморазвитие с AI-наставником",
  description:
    "Один план для всех сфер роста: язык, тело, знания, привычки, психология. AI собирает тропу, ты идёшь шаг за шагом.",
  openGraph: {
    title: "YUP — спокойное саморазвитие с AI",
    description:
      "Объединяем все способы саморазвития в одну тёплую платформу. Восхождение к лучшей версии себя.",
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5efe3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${manrope.variable} ${lora.variable} ${pressStart.variable}`}
    >
      <body className="min-h-dvh">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}
