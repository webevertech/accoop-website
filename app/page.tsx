import Link from 'next/link';
import Image from 'next/image';
import { Users, ShoppingCart, Heart, DollarSign, Apple, Beef, Wheat, Pill, Bike, Store, ShoppingBag, Briefcase, Building2, Handshake, ArrowRight, Smartphone, GraduationCap, Hotel, Home as HomeIcon, Sparkles, Car, ClipboardList, UtensilsCrossed } from 'lucide-react';

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-20">
            {/* Left: Text Content */}
            <div className="space-y-5 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/25 text-white px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Community-Owned Cooperative
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-white">
                Atlantic City Owned.
                <br />
                Atlantic City Built.
                <br />
                <span className="text-accent">Atlantic City Powered.</span>
              </h1>

              <p className="text-lg text-white/85 max-w-lg leading-relaxed">
                <span className="font-semibold text-white">Community wealth requires community ownership.</span>
                {' '}We&apos;re building a community-owned supermarket, delivery network, and social impact center that:
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-white/70 text-sm max-w-lg">
                {[
                  'Addresses food insecurity',
                  'Creates local jobs',
                  'Supports small businesses',
                  'Revitalizes vacant property',
                  'Keeps wealth in AC',
                ].map((item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 bg-accent rounded-full shrink-0" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <Link
                  href="/membership"
                  className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-center"
                >
                  Become a Member
                </Link>
                <Link
                  href="/vendors"
                  className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 w-full sm:w-auto text-center"
                >
                  Become a Vendor
                </Link>
                <Link
                  href="/sponsorship"
                  className="bg-accent hover:bg-accent/90 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-center"
                >
                  Invest / Sponsor
                </Link>
              </div>

              {/* Membership Goals */}
              <div className="flex gap-8 pt-4 border-t border-white/20">
                <div>
                  <p className="text-2xl font-heading font-bold text-white">1,000</p>
                  <p className="text-sm text-white/60">member-owners in 2026</p>
                </div>
                <div>
                  <p className="text-2xl font-heading font-bold text-white">2,500</p>
                  <p className="text-sm text-white/60">member-owners by 2027</p>
                </div>
              </div>
            </div>

            {/* Right: Boardwalk Basket App Image */}
            <div className="relative hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-lg">
                <Image
                  src="/boardwalk-basket.jpg"
                  alt="Boardwalk Basket - Atlantic City's Own Digital Marketplace app"
                  width={800}
                  height={1000}
                  quality={90}
                  priority
                  className="object-contain w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="relative -mt-10 z-10 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { title: 'Membership', icon: Users, href: '/membership', desc: 'Join our community' },
              { title: 'Shop', icon: ShoppingCart, href: '/marketplace', desc: 'Fresh local products' },
              { title: 'Become a Vendor', icon: Store, href: '/vendors', desc: 'Sell with us' },
              { title: 'Invest', icon: DollarSign, href: '/sponsorship', desc: 'Support the co-op' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-white p-5 sm:p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100"
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg sm:text-xl text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/60 hidden sm:block">{item.desc}</p>
                  <div className="flex items-center gap-1 text-primary text-sm font-medium mt-2 group-hover:gap-2 transition-all duration-300">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground">
                What Is Atlantic City<br />
                <span className="text-primary">Community Co-op?</span>
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                AC Community Co-op is a consumer-owned cooperative developing:
              </p>
              <ul className="space-y-3">
                {[
                  'A full-service supermarket',
                  'A digital marketplace (Boardwalk Basket)',
                  'A Social Impact & Resource Center',
                  'Workforce and entrepreneurship pathways',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
              <p className="text-lg font-heading font-semibold text-foreground">
                We are not just a supermarket — we are building community wealth infrastructure.
              </p>
              <Link
                href="/about"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Learn More About Us
              </Link>
            </div>

            <div className="relative">
              <div className="aspect-4/3 rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/04.png"
                  alt="7 South Carolina Ave building - future home of ACCOOP"
                  width={800}
                  height={600}
                  quality={85}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl">
                <div className="text-2xl font-heading font-bold">Opening</div>
                <div className="text-sm font-medium">Fall 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview - Boardwalk Basket */}
      <section className="py-20 bg-cream relative overflow-hidden">
        {/* Boardwalk Basket logo watermark - bottom right on desktop */}
        <div className="absolute bottom-8 right-8 pointer-events-none hidden lg:block">
          <Image
            src="/boardwalk-basket-logo.png"
            alt=""
            width={300}
            height={300}
            className="opacity-[0.08] object-contain w-56 h-auto"
            aria-hidden="true"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-4">
            <p className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-2">Boardwalk Basket</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Atlantic City&apos;s Digital Marketplace
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Atlantic City&apos;s own digital supermarket &amp; social impact hub
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {[
              { title: 'Groceries Delivery', icon: ShoppingBag, desc: 'Fresh groceries delivered to your door' },
              { title: 'Education & Training', icon: GraduationCap, desc: 'Workforce development and skills training' },
              { title: 'Hotel Booking', icon: Hotel, desc: 'Local hotel reservations and travel' },
              { title: 'Retail', icon: Store, desc: 'Shop local retail and everyday essentials' },
              { title: 'Home Services', icon: HomeIcon, desc: 'Repairs, cleaning, and maintenance' },
              { title: 'Local Vendors', icon: ShoppingCart, desc: 'Supporting Atlantic City small businesses' },
              { title: 'Pharmacy on Demand', icon: Pill, desc: 'Medications and health essentials delivered' },
              { title: 'Beauty & Wellness', icon: Sparkles, desc: 'Salons, spas, and self-care services' },
              { title: 'Social Services', icon: Heart, desc: 'Community support and resources' },
              { title: 'Automotive Services', icon: Car, desc: 'Car repair, detailing, and maintenance' },
              { title: 'Professional Services', icon: ClipboardList, desc: 'Legal, financial, and business services' },
              { title: 'Food Delivery', icon: UtensilsCrossed, desc: 'Local restaurant meals delivered' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="w-12 h-12 mb-3 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-4">
              <Image
                src="/boardwalk-basket-logo.png"
                alt="Boardwalk Basket"
                width={80}
                height={80}
                className="w-16 h-16 object-contain"
              />
              <div>
                <p className="font-heading font-bold text-foreground text-lg">Boardwalk Basket</p>
                <p className="text-sm text-foreground/60">Atlantic City&apos;s Own Delivery Network</p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.boardwalkbasket.com/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Explore the Market
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <div className="flex items-center gap-2 text-foreground/60">
                <Smartphone className="w-5 h-5" />
                <span className="text-sm font-medium">Download the App — Coming July 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Model */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our Impact Model
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              More than a supermarket — we are building a comprehensive model for community transformation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { title: 'Food Access', icon: ShoppingCart, desc: 'Affordable fresh food in a full-service supermarket' },
              { title: 'Job Creation', icon: Briefcase, desc: 'Local hiring with workforce pathways' },
              { title: 'Small Business Support', icon: Store, desc: 'Vendor incubation and digital marketplace access' },
              { title: 'Center for Social Impact', icon: Building2, desc: 'Comprehensive services to empower our community members and create lasting positive change' },
              { title: 'Community Ownership', icon: Handshake, desc: 'Residents become owners — not just customers' },
            ].map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="flex items-start space-x-4 bg-cream p-6 rounded-2xl hover:bg-primary/10 transition-colors duration-300 group">
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{service.title}</h3>
                    <p className="text-sm text-foreground/70">{service.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/social-impact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Partners & Supporters */}
      <section className="py-12 bg-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-heading font-semibold text-foreground/50 uppercase tracking-wider mb-8">
            Our Partners & Supporters
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-10">
            {[
              { src: '/logo-300x114-1 (2).png', alt: 'NJEDA' },
              { src: '/logo.png', alt: 'Atlantic City Community Cooperative' },
              { src: '/iitnj logo.png', alt: 'Ideal Institute' },
              { src: '/CG-Transparent.png', alt: 'Common Ground' },
            ].map((partner) => (
              <div key={partner.alt} className="w-48 h-28 sm:w-60 sm:h-32 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-5">
                <Image src={partner.src} alt={partner.alt} width={220} height={100} className="max-h-full max-w-full object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold">
            Invest in Atlantic City&apos;s Future
          </h2>
          <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Join us as a vendor, sponsor, or investor. Help build a sustainable, community-owned economy that creates jobs, provides essential services, and transforms lives.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/vendors"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl w-full sm:w-auto text-center"
            >
              Become a Vendor
            </Link>
            <Link
              href="/sponsorship"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl w-full sm:w-auto text-center"
            >
              Invest in the Co-Op
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
