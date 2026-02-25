import type { Metadata, Viewport } from "next";
import { Outfit, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
    default: "Atlantic City Community Cooperative | Community-Owned Grocery & Social Hub in Pleasantville, NJ",
    template: "%s | Atlantic City Community Cooperative",
  },
  description:
    "Atlantic City Community Cooperative is a community-owned supermarket and social impact hub in Pleasantville, NJ. Fresh groceries, local vendors, job training, social services, and more for Atlantic City and South Jersey residents.",
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
  metadataBase: new URL("https://accoop.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://accoop.com",
    siteName: "Atlantic City Community Cooperative",
    title: "Atlantic City Community Cooperative | Community-Owned Grocery & Social Hub",
    description:
      "Fresh food, fair prices, and real social impact — built by and for our community in Pleasantville, NJ.",
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
      "Community-owned supermarket & social impact hub in Pleasantville, NJ. Fresh groceries, local vendors, and essential services.",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "GroceryStore",
  name: "Atlantic City Community Cooperative",
  description:
    "A community-owned supermarket and social impact hub providing fresh food, economic opportunities, and essential services.",
  url: "https://accoop.com",
  logo: "https://accoop.com/logo.png",
  image: "https://accoop.com/community-collab.jpg",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pleasantville",
    addressRegion: "NJ",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 39.3898,
    longitude: -74.5241,
  },
  areaServed: [
    { "@type": "City", name: "Atlantic City" },
    { "@type": "City", name: "Pleasantville" },
  ],
  email: "info@accoop.com",
  sameAs: [],
  priceRange: "$$",
  openingHoursSpecification: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${outfit.variable} ${sourceSans.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
