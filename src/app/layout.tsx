import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = "https://margin.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Margin: the AI that thinks in the margin of your notes",
    template: "%s · Margin",
  },
  description:
    "Apple gave your notes a better pen. Margin gives them a mind. A quiet AI agent that reads what you're working on and thinks with you. One keystroke, anywhere on your Mac.",
  keywords: [
    "Margin",
    "AI notes",
    "Apple Notes AI",
    "AI assistant macOS",
    "second brain",
    "marginalia",
  ],
  openGraph: {
    title: "Margin: the AI that thinks in the margin of your notes",
    description:
      "The best ideas were never in the text. They were in the margin. A quiet AI agent for your Mac.",
    url: SITE_URL,
    siteName: "Margin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Margin: the AI that thinks in the margin of your notes",
    description:
      "The best ideas were never in the text. They were in the margin.",
  },
  icons: {
    icon: "/brand/icon-master.svg",
    apple: "/brand/icon_256x256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
