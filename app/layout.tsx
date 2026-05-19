import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FormModal from "./components/FormModal";

const BASE_URL = "https://accoop.com";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#3a7350",
};

export const metadata: Metadata = {
  title: {
    default: "Atlantic City Community Cooperative | Community-Owned Supermarket & Social Impact Hub",
    template: "%s | Atlantic City Community Cooperative",
  },
  description:
    "Atlantic City Community Cooperative is building a community-owned supermarket, sustainable delivery network, and social impact center in Atlantic City, NJ. Become a member, vendor, or investor today.",
  keywords: [
    "community cooperative",
    "Atlantic City",
    "Pleasantville NJ",
    "grocery store",
    "food co-op",
    "community-owned supermarket",
    "social impact",
    "local food",
    "South Jersey",
    "fresh produce",
    "job training",
    "social services",
    "Atlantic County",
    "cooperative membership",
    "local vendors",
  ],
  authors: [{ name: "Atlantic City Community Cooperative" }],
  creator: "Atlantic City Community Cooperative",
  publisher: "Atlantic City Community Cooperative",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://accoop.com",
    siteName: "Atlantic City Community Cooperative",
    title: "Atlantic City Community Cooperative | Community-Owned Supermarket & Social Impact Hub",
    description:
      "Atlantic City Community Cooperative is building a community-owned supermarket, sustainable delivery network, and social impact center in Atlantic City, NJ.",
    images: [
      {
        url: "/community-collab.jpg",
        width: 800,
        height: 600,
        alt: "Atlantic City Community Cooperative - Community members collaborating",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atlantic City Community Cooperative",
    description:
      "Building a community-owned supermarket, sustainable delivery network, and social impact center in Atlantic City, NJ.",
    images: ["/community-collab.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.json",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": ["GroceryStore", "Organization"],
  "@id": `${BASE_URL}/#organization`,
  name: "Atlantic City Community Cooperative",
  alternateName: "ACCOOP",
  description:
    "A community-owned supermarket and social impact hub providing fresh food, economic opportunities, and essential services to Atlantic City, NJ.",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/logo.png`,
    width: 240,
    height: 96,
  },
  image: `${BASE_URL}/community-collab.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "7 South Carolina Ave",
    addressLocality: "Atlantic City",
    addressRegion: "NJ",
    postalCode: "08401",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.3898,
    longitude: -74.5241,
  },
  telephone: "+16093188011",
  email: "info@accoop.com",
  areaServed: [
    { "@type": "City", name: "Atlantic City" },
    { "@type": "City", name: "Pleasantville" },
    { "@type": "AdministrativeArea", name: "Atlantic County" },
  ],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61581595171934",
  ],
  foundingDate: "2023",
  nonprofitStatus: "Cooperative",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Atlantic City Community Cooperative",
  url: BASE_URL,
  publisher: { "@id": `${BASE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://links.webevertech.com" />
        <link rel="dns-prefetch" href="https://links.webevertech.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
      </head>
      <body className={`${outfit.variable} ${sourceSans.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-200 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="min-h-screen">
          {children}
        </main>
        <Footer />
        <FormModal />
      </body>
    </html>
  );
}
