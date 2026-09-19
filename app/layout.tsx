import type { Metadata } from "next";
import { DM_Sans, Fredoka } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { business, siteUrl } from "./site-config";

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
  metadataBase: new URL(`${siteUrl}/`),
  title: "Licensed Home Daycare in Lawrenceville, GA | Malik's Daycare",
  description:
    "Licensed home daycare in Lawrenceville, GA, offering warm, personal infant, toddler, and preschool care for ages 8 weeks–4 years. Schedule a visit.",
  alternates: {
    canonical: `${siteUrl}/`,
  },
  openGraph: {
    type: "website",
    url: `${siteUrl}/`,
    siteName: business.name,
    title: "Licensed Home Daycare in Lawrenceville, GA | Malik's Daycare",
    description:
      "Warm, personal infant, toddler, and preschool care in a licensed Lawrenceville home daycare with a capacity of 6 children.",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/playroom-wide.jpg`,
        width: 2048,
        height: 1536,
        alt: "Bright playroom at Malik's Daycare in Lawrenceville, Georgia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Licensed Home Daycare in Lawrenceville, GA | Malik's Daycare",
    description:
      "Warm, personal infant, toddler, and preschool care for ages 8 weeks–4 years.",
    images: [`${siteUrl}/images/playroom-wide.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@type": ["ChildCare", "LocalBusiness"],
  "@id": `${siteUrl}/#business`,
  name: business.name,
  url: `${siteUrl}/`,
  telephone: business.telephone,
  description:
    "Licensed home daycare in Lawrenceville, Georgia, providing infant, toddler, and preschool care for children ages 8 weeks through 4 years.",
  image: [
    `${siteUrl}/images/playroom-wide.jpg`,
    `${siteUrl}/images/outdoor-play-area.jpg`,
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: business.locality,
    addressRegion: business.region,
    addressCountry: business.country,
  },
  areaServed: {
    "@type": "City",
    name: "Lawrenceville, Georgia",
  },
  openingHoursSpecification: business.openingHours.days.map((day) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: day,
    opens: business.openingHours.opens,
    closes: business.openingHours.closes,
  })),
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
        <script
          id="local-business-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessStructuredData).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
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
