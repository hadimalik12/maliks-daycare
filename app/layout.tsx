import type { Metadata } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const googleAnalyticsId = "G-EPJBPTB7L2";

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fredoka({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malik's Daycare | Lawrenceville, GA",
  description:
    "Small, licensed home daycare in Lawrenceville, GA, with a capacity of 6 children. Warm, personal care for ages 8 weeks–4 years. Weekdays, 7:30 AM–6:00 PM. Schedule a visit.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>
    </html>
  );
}
