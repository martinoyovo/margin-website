import type { Metadata } from "next";
import { Inter, Newsreader, JetBrains_Mono, Spectral } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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

const kicker = Spectral({
  variable: "--font-kicker",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = "https://margin9.com";
const TITLE = "Margin: Apple Notes, finally powerful";
const DESCRIPTION =
  "Margin is the power layer for Apple Notes: real search that understands meaning, connected notes, and one-keystroke actions across Notes, Reminders, and Calendar. For people who live in the Apple ecosystem.";
const SHARE_DESCRIPTION =
  "Real search, connected notes, and actions across Notes, Reminders, and Calendar. Apple Notes, finally powerful.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · Margin",
  },
  description: DESCRIPTION,
  applicationName: "Margin",
  category: "productivity",
  keywords: [
    "Margin",
    "AI notes",
    "Apple Notes AI",
    "AI assistant macOS",
    "second brain",
    "marginalia",
    "knowledge graph notes",
  ],
  alternates: { canonical: "/" },
  authors: [{ name: "Margin" }],
  creator: "Margin",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    title: TITLE,
    description: SHARE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Margin",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SHARE_DESCRIPTION,
  },
  icons: {
    icon: "/brand/icon-master.svg",
    apple: "/brand/icon_256x256.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const themeScript = `(function(){try{var p=localStorage.getItem('theme')||'dark';var s=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.classList.add(p==='auto'?s:p);}catch(e){document.documentElement.classList.add('dark');}})();`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Margin",
    applicationCategory: "ProductivityApplication",
    operatingSystem: "macOS",
    description: DESCRIPTION,
    url: SITE_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable} ${kicker.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
