import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Crown,
  GraduationCap,
  Handshake,
  HeartHandshake,
  HeartPulse,
  Hotel,
  MapPin,
  ShoppingBag,
  ShoppingBasket,
  Sparkles,
  TicketPercent,
  Users,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import AppStoreBadges, { DownloadQr, DownloadStrip } from './AppStoreBadges';
import FaqAccordion, { type FaqItem } from './FaqAccordion';
import StickyGetApp from './StickyGetApp';
import { DOWNLOAD_ANCHOR } from './appLinks';

const PAGE_URL = 'https://accoop.com/boardwalk-basket';
const SOCIAL_TITLE = 'Boardwalk Basket: Atlantic City, Delivered.';
const SOCIAL_DESCRIPTION =
  "Shop local businesses, discover services, and connect with community resources through Atlantic City's own digital marketplace.";
const OG_IMAGE = {
  url: '/marketplace/og-boardwalk-basket-app.jpg',
  width: 1200,
  height: 630,
  alt: 'Boardwalk Basket app screens: a local store, shopping categories, and the cart',
};

export const metadata: Metadata = {
  title: { absolute: 'Boardwalk Basket | Atlantic City Shopping & Delivery' },
  description:
    'A digital marketplace for Atlantic City only. Shop local businesses, order groceries and meals, discover local services, and connect with community support.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: PAGE_URL,
    siteName: 'Atlantic City Community Cooperative',
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: SOCIAL_TITLE,
    description: SOCIAL_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

interface Category {
  icon: LucideIcon;
  title: string;
  desc: string;
  /**
   * true = ordering/booking verified live in the Boardwalk Basket Customer app.
   * false = card is shown with a "Coming soon" label. Flip to true once the app team
   * confirms the category is live (launch checklist: displayed categories must match the app).
   * Verified against the public App Store / Google Play listings, Nov 2026: the app supports
   * shopping and delivery of products from local stores; service booking is not yet listed.
   */
  available: boolean;
}

const CATEGORIES: Category[] = [
  {
    icon: ShoppingBasket,
    title: 'Groceries & Everyday Essentials',
    desc: 'Shop for fresh food, pantry staples, household supplies, and personal care products from participating local stores.',
    available: true,
  },
  {
    icon: UtensilsCrossed,
    title: 'Restaurants & Prepared Meals',
    desc: 'Discover neighborhood favorites and order meals from participating Atlantic City restaurants and food businesses.',
    available: false,
  },
  {
    icon: ShoppingBag,
    title: 'Shopping & Local Retail',
    desc: 'Find products, gifts, and everyday necessities while supporting local merchants and entrepreneurs.',
    available: true,
  },
  {
    icon: Sparkles,
    title: 'Beauty & Wellness',
    desc: 'Explore salons, barbers, spas, and wellness providers. View available services and appointment options.',
    available: false,
  },
  {
    icon: Wrench,
    title: 'Home, Auto & Professional Services',
    desc: 'Connect with participating providers for cleaning, repairs, automotive care, and professional services.',
    available: false,
  },
  {
    icon: HeartPulse,
    title: 'Health Essentials',
    desc: 'Find available over-the-counter products and personal wellness essentials from participating sellers.',
    available: true,
  },
  {
    icon: Hotel,
    title: 'Hotels, Entertainment & Experiences',
    desc: 'Discover participating hospitality and entertainment providers and explore available booking options.',
    available: false,
  },
  {
    icon: GraduationCap,
    title: 'Education & Community Resources',
    desc: 'Connect with organizations offering training, employment assistance, entrepreneurship support, and other community services.',
    available: false,
  },
];

const STEPS = [
  {
    title: 'Download the app',
    desc: 'Get Boardwalk Basket for your iPhone or Android device and follow the account setup instructions.',
  },
  {
    title: 'Find what you need',
    desc: 'Enter your location and explore available products, businesses, services, and community resources.',
  },
  {
    title: 'Order or connect',
    desc: "Place an available order, follow a provider's booking instructions, or connect with a community resource. Review prices, fees, and service details before confirming.",
  },
];

const RESIDENT_BENEFITS = [
  'Access participating local stores and restaurants from your phone.',
  'Request delivery to eligible Atlantic City addresses.',
  'Discover available promotions and member offers.',
  'Find providers for everyday services.',
  'Connect with community organizations and support resources.',
  'Support local businesses and employment opportunities.',
];

const VIP_SUPPORT = [
  { label: 'Food and nutrition', desc: 'Food assistance, community distributions, and available grocery support.' },
  { label: 'Transportation', desc: 'Connections to eligible transportation programs and delivery assistance.' },
  { label: 'Housing and utilities', desc: 'Referrals for housing stability and household support.' },
  { label: 'Health and wellness', desc: 'Connections to healthcare, mental health, and wellness providers.' },
  { label: 'Education and employment', desc: 'Career training, job readiness, and work-based learning opportunities.' },
  { label: 'Entrepreneurship', desc: 'Business education, guidance, and pathways to participate as a vendor.' },
  { label: 'Family and everyday needs', desc: 'Connections to other available government, nonprofit, and community programs.' },
];

const VIP_FLOW = ['Complete the Social Impact Intake', 'Receive an eligibility review', 'Connect with relevant resources'];

const VISITOR_LIST = [
  'Explore local restaurants and retailers.',
  'Find groceries, snacks, and personal essentials.',
  'Discover participating services and visitor offers.',
  'Check delivery availability for your hotel or accommodation.',
];

const VENDOR_BENEFITS = [
  {
    title: 'Reach customers through another channel',
    desc: "Make your business easier to discover through Atlantic City's community marketplace.",
  },
  {
    title: 'Showcase your products and services',
    desc: 'Help customers understand what you offer and how to purchase, book, or connect.',
  },
  {
    title: 'Explore local delivery opportunities',
    desc: 'Connect eligible orders with the Boardwalk Basket delivery network.',
  },
  {
    title: 'Participate in promotions',
    desc: 'Introduce offers and take part in available marketplace campaigns.',
  },
  {
    title: 'Build community relationships',
    desc: 'Connect with Co-op members, local customers, visitors, and other participating businesses.',
  },
];

const VENDOR_STEPS = [
  'Submit your business or organization application.',
  'Complete the review and participation agreement.',
  'Set up approved products, services, or listings.',
  'Complete onboarding and launch your participation.',
];

const MEMBERSHIP_OPTIONS = [
  {
    icon: Users,
    title: 'Join as a Patron Member',
    desc: 'Start with a free first-year membership and stay connected to the Co-op.',
  },
  {
    icon: HeartHandshake,
    title: 'Apply for VIP Membership',
    desc: 'Request an eligibility review for community support membership.',
  },
  {
    icon: Crown,
    title: 'Explore Community Ownership',
    desc: 'Learn how eligible individuals and businesses can become Community Owner Members.',
  },
];

const linkInText = 'font-semibold underline decoration-2 underline-offset-2';

const FAQS: FaqItem[] = [
  {
    q: 'Who is Boardwalk Basket for?',
    a: 'Boardwalk Basket is designed for people who live, work, or visit Atlantic City, along with the businesses and organizations that serve them.',
  },
  {
    q: 'Does Boardwalk Basket serve all of Atlantic County?',
    a: "The platform's current focus is Atlantic City. Check your address in the app for available delivery coverage.",
  },
  {
    q: 'What can I order or access?',
    a: 'Explore participating sellers for groceries, restaurant meals, retail products, and everyday essentials. You can also discover available local services and community resources. Offerings vary by provider.',
  },
  {
    q: 'Do I need to purchase ownership shares to use the app?',
    a: "No. Community ownership is a separate participation option. Follow the app's account setup requirements to get started.",
  },
  {
    q: 'Are deliveries free?',
    a: 'Delivery charges and available discounts depend on the order, location, and applicable offers. Review the total before confirming your purchase.',
  },
  {
    q: 'How do I apply for VIP Membership?',
    a: 'Use the “Apply for VIP Membership” button to begin the Social Impact Intake. Our team will review your eligibility and help identify potential support connections.',
  },
  {
    q: 'Can I receive an order at my hotel?',
    a: "Check your address in the app. Hotel deliveries depend on service availability and the property's delivery and access rules.",
  },
  {
    q: 'How can my business or organization participate?',
    a: 'Submit the vendor application or community service partner inquiry. Our team will explain the requirements and next steps.',
  },
  {
    q: 'Need help getting started?',
    a: (
      <>
        Email{' '}
        <a href="mailto:info@accoop.com" className={`${linkInText} text-primary`}>
          info@accoop.com
        </a>{' '}
        or call{' '}
        <a href="tel:+16093188011" className={`${linkInText} text-primary`}>
          (609) 318-8011
        </a>
        .
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Shared styles                                                       */
/* ------------------------------------------------------------------ */

const container = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8';
const h2 = 'font-heading text-3xl font-bold leading-tight text-foreground md:text-4xl';
const h3Lead = 'mt-3 font-heading text-xl font-semibold text-primary md:text-2xl';
const body = 'text-lg leading-relaxed text-foreground/80';
const fineprint = 'text-sm italic leading-relaxed text-foreground/65';
const btnPrimary =
  'inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 font-heading text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg';
const btnOnDark =
  'inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/70 px-6 py-3 font-heading font-semibold text-white transition-colors duration-300 hover:bg-white/15';

function CheckList({ items, className = '' }: { items: string[]; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Check className="h-4 w-4 text-primary" aria-hidden="true" />
          </span>
          <span className="leading-relaxed text-foreground/85">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function BoardwalkBasketPage() {
  return (
    <>
      {/* 1. Hero — text left / app screens right on desktop; on mobile: headline, short description, badges, then image */}
      <section className="relative overflow-hidden bg-linear-to-br from-primary-dark via-primary-dark to-primary text-white">
        <div className={`${container} py-12 md:py-16 lg:py-20`}>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12">
            {/* display:contents on mobile lets the three text blocks be reordered around the badges */}
            <div className="contents lg:flex lg:flex-col lg:gap-6">
              <div className="order-1 lg:order-0">
                <div className="flex items-center gap-4 md:gap-5">
                  {/* Brand mark — alt="" because the H1 beside it already names it */}
                  <Image
                    src="/marketplace/boardwalk-basket-logo.webp"
                    alt=""
                    width={240}
                    height={240}
                    priority
                    className="h-20 w-20 shrink-0 rounded-full shadow-xl ring-4 ring-white/15 sm:h-28 sm:w-28 lg:h-32 lg:w-32"
                  />
                  {/* Stacked two-line lockup beside the logo; the text content stays "Boardwalk Basket" */}
                  <h1 className="font-heading text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-[4.25rem]">
                    <span className="block">Boardwalk</span> <span className="block">Basket</span>
                  </h1>
                </div>
                <p className="mt-2 font-heading text-2xl font-semibold text-accent md:text-3xl">
                  Atlantic City, delivered.
                </p>
                <p className="mt-5 text-lg font-bold md:text-xl">
                  Shop local. Find services. Connect with community support.
                </p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Groceries, restaurant meals, everyday essentials, local services, and community resources—connected
                  through Atlantic City’s own digital marketplace.
                </p>
              </div>

              <div className="order-3 space-y-3 text-lg leading-relaxed text-white/90 lg:order-0">
                <p>
                  Created by <strong className="text-white">Atlantic City Community Cooperative</strong>, Boardwalk
                  Basket brings together the people who live, work, and visit here with the businesses and
                  organizations that serve our city.
                </p>
                <p>
                  Find what you need. Support local businesses. Help more community spending stay in Atlantic City.
                </p>
              </div>

              <div className="order-2 lg:order-0">
                <div className="flex flex-wrap items-center gap-6">
                  <AppStoreBadges placement="hero" />
                  <DownloadQr dark />
                </div>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <CTAButton membershipType="patron" className={btnOnDark}>
                    Join AC Co-op
                  </CTAButton>
                  <Link href="/vendors#vendor-application" className={btnOnDark}>
                    Become a Vendor
                  </Link>
                </div>
                <p className="mt-4 text-sm italic text-white/80">
                  Serving Atlantic City. Products, services, delivery coverage, and offers vary by participating
                  provider.
                </p>
              </div>
            </div>

            {/* Authentic app screens (no member data) — fixed aspect box reserves space to prevent layout shift */}
            <div className="order-4 lg:order-0">
              <div className="relative mx-auto aspect-25/23 w-full max-w-140">
                <div
                  aria-hidden="true"
                  className="absolute inset-[12%] rounded-full bg-accent/25 blur-3xl"
                />
                <Image
                  src="/marketplace/app-store.webp"
                  alt="Boardwalk Basket app showing a local Atlantic City store and its products"
                  width={600}
                  height={1257}
                  className="absolute left-[3%] top-[11%] w-[36%] -rotate-6 drop-shadow-2xl"
                />
                <Image
                  src="/marketplace/app-cart.webp"
                  alt="Boardwalk Basket app cart with coupons, offers, and delivery address options"
                  width={600}
                  height={1257}
                  className="absolute right-[3%] top-[11%] w-[36%] rotate-6 drop-shadow-2xl"
                />
                <Image
                  src="/marketplace/app-categories.webp"
                  alt="Boardwalk Basket app categories screen: bakery, produce, dairy, pantry, health and wellness, and more"
                  width={600}
                  height={1257}
                  priority
                  className="absolute left-1/2 top-0 w-[42%] -translate-x-1/2 drop-shadow-2xl"
                />
              </div>
              <p className="mx-auto mt-5 flex w-fit items-center gap-1.5 rounded-full bg-white/10 px-4 py-2.5 text-center font-heading text-sm font-semibold text-white ring-1 ring-white/20 min-[400px]:text-base sm:gap-2 sm:px-5">
                <MapPin className="h-4 w-4 shrink-0 text-accent sm:h-5 sm:w-5" aria-hidden="true" />
                A digital marketplace for Atlantic City only.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Marketplace categories */}
      <section className="bg-white py-16 md:py-20">
        <div className={container}>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className={h2}>Your everyday needs. Your local community.</h2>
            <p className={`mt-4 ${body}`}>
              Explore participating businesses and service providers in one convenient place.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {CATEGORIES.map(({ icon: Icon, title, desc, available }) => (
              <li
                key={title}
                className={`flex flex-col rounded-2xl border p-4 sm:p-6 ${
                  available ? 'border-primary/10 bg-cream' : 'border-dashed border-primary/25 bg-white'
                }`}
              >
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 sm:mb-4">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
                      available ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
                    }`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  {!available && (
                    <span className="whitespace-nowrap rounded-full bg-accent/35 px-2.5 py-1 text-xs font-semibold text-foreground">
                      Coming soon
                    </span>
                  )}
                </div>
                <h3 className="font-heading text-base font-semibold leading-snug text-foreground sm:text-lg">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75 sm:text-base">{desc}</p>
              </li>
            ))}
          </ul>

          <p className={`mt-8 text-center ${fineprint}`}>
            Check the app for currently available categories, providers, and ordering or booking options.
          </p>
          <DownloadStrip placement="categories" className="mt-6" />
        </div>
      </section>

      {/* 3. Getting started — stable app-download section (#download-app) */}
      <section id={DOWNLOAD_ANCHOR} className="scroll-mt-4 bg-primary/5 py-16 md:py-20">
        <div className={container}>
          <h2 className={`${h2} text-center`}>Getting started is simple</h2>

          <ol className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <span
                  aria-hidden="true"
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-primary font-heading text-xl font-bold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/80">{step.desc}</p>
              </li>
            ))}
          </ol>

          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-relaxed text-foreground/85">
            <strong className="text-foreground">Already an AC Co-op member?</strong> Download the app to begin
            exploring. For help connecting your membership,{' '}
            <Link href="/contact" className={`${linkInText} text-primary`}>
              contact our team
            </Link>
            .
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
            <AppStoreBadges placement="getting-started" />
            <DownloadQr />
          </div>
        </div>
      </section>

      {/* 4. Residents and workers */}
      <section className="bg-white py-16 md:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
          <div>
            <h2 className={h2}>For Atlantic City residents and workers</h2>
            <h3 className={h3Lead}>Make everyday purchases part of a stronger local economy.</h3>
            <p className={`mt-4 ${body}`}>
              Boardwalk Basket helps you shop closer to home—even when you cannot make the trip yourself.
            </p>
          </div>
          <div className="rounded-3xl border border-primary/10 bg-cream p-6 sm:p-8">
            <CheckList items={RESIDENT_BENEFITS} />
            <p className="mt-6 font-heading text-lg font-bold text-foreground">
              Join the Co-op. Stay connected. Participate in Atlantic City’s future.
            </p>
            <p className="mt-2 leading-relaxed text-foreground/80">
              Patron Membership is free for your first year. Explore membership options, available benefits, and
              renewal terms on our{' '}
              <Link href="/membership" className={`${linkInText} text-primary`}>
                membership page
              </Link>
              .
            </p>
            <CTAButton membershipType="patron" className={`${btnPrimary} mt-6`}>
              Join AC Co-op
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 5. VIP Membership — visually distinct panel, one prominent application button */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className={container}>
          <div className="relative overflow-hidden rounded-3xl bg-primary-dark p-6 text-white shadow-xl sm:p-10 lg:p-14">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-sm font-semibold text-foreground">
                  <HeartHandshake className="h-4 w-4" aria-hidden="true" />
                  Free for approved applicants
                </span>
                <h2 className="mt-4 font-heading text-3xl font-bold md:text-4xl">VIP Membership</h2>
                <h3 className="mt-3 font-heading text-xl font-semibold text-accent md:text-2xl">
                  Support starts with being seen, heard, and connected.
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/90">
                  If you live in Atlantic City and receive public assistance or are facing financial hardship, you may
                  qualify for free VIP Membership.
                </p>
                <p className="mt-3 text-lg leading-relaxed text-white/90">
                  Through AC Co-op’s{' '}
                  <Link href="/social-impact" className={`${linkInText} text-white`}>
                    Center for Social Impact
                  </Link>{' '}
                  and participating partner network, we help you identify resources that fit your circumstances and
                  take the next steps toward accessing support.
                </p>

                {/* VIP coupon — ticket shape: the side notches are panel-coloured circles */}
                <div className="relative mt-8 flex max-w-md rounded-2xl bg-accent text-foreground shadow-xl">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-dark"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute right-0 top-1/2 h-8 w-8 -translate-y-1/2 translate-x-1/2 rounded-full bg-primary-dark"
                  />
                  <div className="flex-1 py-6 pl-8 pr-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/70">
                      New VIP Member coupon
                    </p>
                    <p className="mt-1 font-heading text-5xl font-extrabold leading-none tracking-tight sm:text-6xl">
                      $100 <span className="text-3xl sm:text-4xl">OFF</span>
                    </p>
                    <p className="mt-2 text-sm font-semibold leading-snug">
                      A Boardwalk Basket welcome offer for new VIP Members.
                    </p>
                  </div>
                  <div className="flex w-20 shrink-0 flex-col items-center justify-center gap-1.5 border-l-2 border-dashed border-foreground/30 pr-3 pl-2 sm:w-24">
                    <TicketPercent className="h-8 w-8" aria-hidden="true" />
                    <span className="font-heading text-sm font-bold uppercase tracking-widest">VIP</span>
                  </div>
                </div>
                <p className="mt-3 text-sm italic text-white/70">
                  Terms apply. Available to newly approved VIP Members only.
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-5 ring-1 ring-white/15 sm:p-6">
                <h3 className="font-heading text-xl font-semibold">Explore support for:</h3>
                <ul className="mt-4 space-y-3">
                  {VIP_SUPPORT.map((s) => (
                    <li key={s.label} className="flex items-start gap-3">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="leading-relaxed text-white/90">
                        <strong className="text-white">{s.label}:</strong> {s.desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative mt-10 border-t border-white/15 pt-10">
              <h3 className="font-heading text-xl font-semibold">One place to begin</h3>
              <ol className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
                {VIP_FLOW.map((stepText, i) => (
                  <li key={stepText} className="flex items-center gap-3 md:flex-1">
                    <span className="flex flex-1 items-center gap-3 rounded-xl bg-white/10 px-4 py-3 font-semibold">
                      <span
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-foreground"
                      >
                        {i + 1}
                      </span>
                      {stepText}
                    </span>
                    {i < VIP_FLOW.length - 1 && (
                      <ArrowRight className="hidden h-5 w-5 shrink-0 text-accent md:block" aria-hidden="true" />
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-5 leading-relaxed text-white/90">
                Our team helps identify potentially relevant services from participating providers using information
                you choose to share.
              </p>
              <p className="mt-4 font-heading text-xl font-bold">
                You deserve dignity, opportunity, and a clear place to start.
              </p>
              <div className="mt-8 text-center">
                <CTAButton
                  membershipType="premium"
                  label="Apply for VIP Membership"
                  className="inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-8 py-4 font-heading text-lg font-bold text-foreground transition-all duration-300 hover:bg-white hover:shadow-lg"
                >
                  Apply for VIP Membership
                </CTAButton>
                <p className="mx-auto mt-3 max-w-3xl text-sm italic leading-relaxed text-white/80">
                  VIP Membership is free for approved applicants. Individual programs determine their own eligibility
                  and availability. Membership and referrals do not guarantee benefits, funding, or service approval.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Visitors */}
      <section className="bg-white py-16 md:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-x-16 lg:gap-y-12`}>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/marketplace/ac-boardwalk.webp"
              alt="Families and friends strolling the Atlantic City Boardwalk beside the beach and ocean on a summer afternoon"
              width={1264}
              height={848}
              className="h-auto w-full"
            />
          </div>
          <div>
            <h2 className={h2}>Visiting Atlantic City?</h2>
            <h3 className={h3Lead}>Experience the city. Support the people who make it special.</h3>
            <p className={`mt-4 ${body}`}>
              Whether you are here for a convention, a weekend getaway, a family vacation, or an extended stay,
              Boardwalk Basket helps you connect with Atlantic City businesses.
            </p>
            <p className={`mt-3 ${body}`}>
              Order a local meal. Pick up everyday essentials through available delivery options. Discover shops,
              wellness services, and experiences offered by participating providers.
            </p>
            <CheckList items={VISITOR_LIST} className="mt-6" />
            <p className="mt-6 font-heading text-lg font-bold text-foreground">
              Make your visit count for the local community.
            </p>
            <p className={`mt-4 ${fineprint}`}>
              Hotel and accommodation deliveries depend on service coverage, property access rules, and designated
              handoff locations.
            </p>
          </div>

          {/* Full-width download strip spanning both columns */}
          <DownloadStrip placement="visitors" className="lg:col-span-2" />
        </div>
      </section>

      {/* 7. Vendors — benefits grid, onboarding steps, prominent application button */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className={container}>
          <div className="max-w-3xl">
            <h2 className={h2}>Atlantic City businesses: join the marketplace</h2>
            <h3 className={h3Lead}>Bring your business to the people who live, work, and visit here.</h3>
            <p className={`mt-4 ${body}`}>
              Boardwalk Basket welcomes local retailers, restaurants, product sellers, service providers, and
              community organizations.
            </p>
            <p className={`mt-3 ${body}`}>
              Whether you sell groceries, prepare meals, provide repairs, operate a salon, or connect residents with
              essential services, there is an opportunity to participate.
            </p>
          </div>

          <h3 className="mt-12 font-heading text-2xl font-semibold text-foreground">Why join?</h3>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {VENDOR_BENEFITS.map((b) => (
              <li key={b.title} className="rounded-2xl bg-white p-6 shadow-sm">
                <h4 className="font-heading text-lg font-semibold text-foreground">{b.title}</h4>
                <p className="mt-2 leading-relaxed text-foreground/80">{b.desc}</p>
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-heading text-2xl font-semibold text-foreground">How to become a vendor</h3>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {VENDOR_STEPS.map((s, i) => (
              <li key={s} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-heading text-lg font-bold text-white"
                >
                  {i + 1}
                </span>
                <span className="leading-relaxed text-foreground/85">{s}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 text-center">
            <Link href="/vendors#vendor-application" className={`${btnPrimary} px-9 py-4`}>
              Apply to Become a Vendor
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <p className={`mt-4 ${fineprint}`}>
              Participation options, fees, promotions, and delivery arrangements are explained during onboarding.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Community service partners — separate panel from the commercial vendor application */}
      <section className="bg-white py-16 md:py-20">
        <div className={container}>
          <div className="flex flex-col gap-8 rounded-3xl border-2 border-accent bg-accent/10 p-6 sm:p-10 lg:flex-row lg:items-center lg:gap-14">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-accent text-foreground">
              <Handshake className="h-8 w-8" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <h2 className={h2}>Serve the community? Join our resource network.</h2>
              <h3 className={h3Lead}>Help residents find your organization when they need you.</h3>
              <p className={`mt-4 ${body}`}>
                We invite nonprofits, public agencies, healthcare organizations, education providers, workforce
                programs, and other community-serving organizations to participate.
              </p>
              <p className={`mt-3 ${body}`}>
                Help members discover your services, understand eligibility requirements, and connect with the
                appropriate next step.
              </p>
              <CTAButton
                formType="vendor"
                label="Become a Community Service Partner"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-foreground px-7 py-3.5 font-heading text-lg font-semibold text-white transition-all duration-300 hover:bg-primary-dark hover:shadow-lg"
              >
                Become a Community Service Partner
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Block Captains */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16`}>
          <div>
            <h2 className={h2}>Local delivery. Local youth. Local opportunity.</h2>
            <h3 className={h3Lead}>Connecting Atlantic City, neighborhood by neighborhood.</h3>
            <p className={`mt-4 ${body}`}>
              Our delivery model includes trained local youth and community team members. Through the Block Captain
              program, young adults help residents learn about the Co-op, use Boardwalk Basket, and connect with
              available resources. Those assigned to delivery roles also help bring eligible orders to customers.
            </p>
            <p className="mt-5 font-heading text-lg font-bold text-foreground">
              Our commitment is to build delivery access that reaches every corner of Atlantic City.
            </p>
            <p className={`mt-3 ${body}`}>
              Check the app for current coverage, operating hours, delivery fees, and estimated delivery times.
            </p>
            <Link href="/block-captain" className={`${btnPrimary} mt-6`}>
              Meet the Block Captain Program
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <Image
              src="/man-carrying-groceries.webp"
              alt="A Block Captain carrying a bag of fresh groceries for delivery"
              width={1600}
              height={1067}
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* 10. Membership — Patron, VIP, Community Owner */}
      <section className="bg-white py-16 md:py-20">
        <div className={container}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className={h2}>Join the Co-op. Help shape what comes next.</h2>
            <p className={`mt-4 ${body}`}>
              Boardwalk Basket is part of a larger community effort to connect food access, local business growth,
              employment, and ownership.
            </p>
            <p className="mt-3 text-lg font-semibold text-foreground">Choose how you want to participate:</p>
          </div>

          <ul className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {MEMBERSHIP_OPTIONS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="rounded-2xl border border-primary/10 bg-cream p-6 text-center sm:p-8">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground">{title}</h3>
                <p className="mt-2 leading-relaxed text-foreground/80">{desc}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link href="/membership" className={btnPrimary}>
              Explore Membership Options
            </Link>
            <p className={`mx-auto mt-5 max-w-3xl ${fineprint}`}>
              Shopping through Boardwalk Basket or joining as a Patron or VIP Member does not automatically provide
              stock ownership or voting rights. Community ownership is subject to eligibility and the Co-op’s governing
              documents.
            </p>
          </div>
        </div>
      </section>

      {/* 11. FAQs */}
      <section className="bg-primary/5 py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className={`${h2} mb-8 text-center`}>Frequently asked questions</h2>
          <FaqAccordion items={FAQS} />
        </div>
      </section>

      {/* 12. Final CTA — both store badges + secondary participation links */}
      <section className="bg-linear-to-br from-primary-dark to-primary py-16 text-white md:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">Our city. Our community. Our Boardwalk Basket.</h2>
          <p className="mt-4 text-lg font-bold md:text-xl">
            Download the app. Discover local businesses. Connect with opportunity.
          </p>
          <AppStoreBadges placement="final-cta" className="mt-8 justify-center" />
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            <CTAButton membershipType="patron" className={btnOnDark}>
              Join AC Co-op
            </CTAButton>
            <Link href="/vendors#vendor-application" className={btnOnDark}>
              Become a Vendor
            </Link>
            <CTAButton membershipType="premium" label="Apply for VIP Membership" className={btnOnDark}>
              Apply for VIP Membership
            </CTAButton>
          </div>
          <p className="mt-10 font-heading font-bold text-white/95">
            Boardwalk Basket — a platform of Atlantic City Community Cooperative.
          </p>
        </div>
      </section>

      <StickyGetApp />
    </>
  );
}
