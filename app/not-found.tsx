import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  HandHeart,
  Home,
  Mail,
  Newspaper,
  ShoppingBasket,
  Store,
  Users,
  type LucideIcon,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you were looking for could not be found. Explore Atlantic City Community Cooperative.',
  // Overrides the layout's index/follow so the 404 carries a single, consistent robots directive.
  robots: { index: false, follow: true },
};

const POPULAR_PAGES: { href: string; title: string; desc: string; icon: LucideIcon }[] = [
  { href: '/membership', title: 'Membership', desc: 'Join the Co-op and help build a community-owned future.', icon: Users },
  { href: '/boardwalk-basket', title: 'Boardwalk Basket', desc: 'Shop local businesses with Atlantic City’s own delivery app.', icon: ShoppingBasket },
  { href: '/social-impact', title: 'Social Impact', desc: 'Find support, resources, and community services.', icon: HandHeart },
  { href: '/vendors', title: 'Vendors', desc: 'Sell your products and grow your business locally.', icon: Store },
  { href: '/news', title: 'News & Events', desc: 'See what’s happening across the cooperative.', icon: Newspaper },
  { href: '/contact', title: 'Contact Us', desc: 'Questions? Our team is happy to help.', icon: Mail },
];

export default function NotFound() {
  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-primary-dark via-primary-dark to-primary py-20 text-white md:py-28">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="font-heading text-8xl font-extrabold leading-none tracking-tight text-accent md:text-9xl">
            404
          </p>
          <h1 className="mt-6 font-heading text-4xl font-bold md:text-5xl">This page took a different route</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90">
            The page you’re looking for may have moved or no longer exists. Let’s get you back to the boardwalk.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 font-heading text-lg font-semibold text-primary transition-all duration-300 hover:bg-cream hover:shadow-lg"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              Back to Home
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border-2 border-white/70 px-7 py-3.5 font-heading text-lg font-semibold text-white transition-colors duration-300 hover:bg-white/15"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold text-foreground md:text-4xl">
            Popular pages
          </h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {POPULAR_PAGES.map(({ href, title, desc, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex h-full items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="flex items-center gap-1.5 font-heading text-lg font-semibold text-foreground group-hover:text-primary">
                      {title}
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block leading-relaxed text-foreground/75">{desc}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
