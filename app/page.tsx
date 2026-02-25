import Link from 'next/link';
import Image from 'next/image';
import { Users, ShoppingCart, Heart, DollarSign, Apple, Beef, Wheat, Pill, Bike, Store, ClipboardList, Briefcase, Home as HomeIcon, Baby, ArrowRight } from 'lucide-react';
import CountUp from './components/CountUp';

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[85vh] py-16 md:py-20">
            {/* Left: Text Content */}
            <div className="space-y-6 animate-fadeInUp">
              <div className="inline-flex items-center gap-2 bg-white/25 text-white px-4 py-2 rounded-full text-sm font-medium">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Community-Owned Cooperative
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-white">
                Empowering
                <br />
                Atlantic City
                <br />
                <span className="text-accent">Together.</span>
              </h1>

              <p className="text-lg text-white/80 max-w-md leading-relaxed">
                Fresh food, fair prices, and real social impact — built by and for our community.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link
                  href="/membership"
                  className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg w-full sm:w-auto text-center"
                >
                  Become a Member
                </Link>
                <Link
                  href="/marketplace"
                  className="bg-transparent hover:bg-white/10 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border border-white/30 w-full sm:w-auto text-center"
                >
                  Explore Marketplace
                </Link>
              </div>

              {/* Stats row */}
              <div className="flex gap-8 pt-6 border-t border-white/20">
                <div>
                  <CountUp end={2500} suffix="+" className="text-2xl font-heading font-bold text-white" />
                  <p className="text-sm text-white/60">Members</p>
                </div>
                <div>
                  <CountUp end={50} suffix="+" className="text-2xl font-heading font-bold text-white" />
                  <p className="text-sm text-white/60">Local Vendors</p>
                </div>
                <div>
                  <CountUp end={15} suffix="+" className="text-2xl font-heading font-bold text-white" />
                  <p className="text-sm text-white/60">Services</p>
                </div>
              </div>
            </div>

            {/* Right: Image Collage */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square">
                {/* Main image */}
                <div className="absolute top-[5%] right-0 w-[75%] aspect-3/4 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/hero-grocery.jpg"
                    alt="Woman carrying a grocery basket of vegetables picking up a boxed water"
                    width={1200}
                    height={1600}
                    quality={85}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Secondary image */}
                <div className="absolute bottom-[10%] left-0 w-[55%] aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-primary">
                  <Image
                    src="/hero-produce.jpg"
                    alt="Fresh produce at the cooperative"
                    width={800}
                    height={800}
                    quality={80}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Accent shape */}
                <div className="absolute top-0 left-[10%] w-20 h-20 bg-accent/30 rounded-full -z-10" />
                <div className="absolute bottom-[5%] right-[10%] w-14 h-14 bg-white/10 rounded-full -z-10" />
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
              { title: 'Social Services', icon: Heart, href: '/social-impact', desc: 'Get support' },
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
                A Community-Owned<br />
                <span className="text-primary">Supermarket & Social Hub</span>
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                The Atlantic City Community Cooperative is building a cooperative economy where community members are owners, employees, and beneficiaries. We provide access to fresh food, economic opportunities, and essential services for all Atlantic City residents.
              </p>
              <ul className="space-y-3">
                {[
                  'Fresh, affordable groceries from local vendors',
                  'Comprehensive social services & support',
                  'Job training & career development',
                  'Democratic member ownership & governance',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <svg className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
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
                  src="/community-collab.jpg"
                  alt="Community members collaborating together"
                  width={800}
                  height={600}
                  quality={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-accent text-white p-6 rounded-2xl shadow-xl">
                <CountUp
                  end={2500}
                  suffix="+"
                  className="text-4xl font-heading font-bold"
                />
                <div className="text-sm font-medium">Community Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Preview */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our Community Marketplace
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto">
              Shop fresh, local products and support Atlantic City&apos;s economy
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {[
              { title: 'Grocery & Fresh Produce', icon: Apple, desc: 'Farm-fresh vegetables, fruits, and pantry essentials' },
              { title: 'Meat, Seafood & Deli', icon: Beef, desc: 'Quality proteins from trusted local suppliers' },
              { title: 'Bakery & Specialty', icon: Wheat, desc: 'Fresh-baked goods and artisanal products' },
              { title: 'Health & Pharmacy', icon: Pill, desc: 'Medications and wellness essentials' },
              { title: 'Home Delivery', icon: Bike, desc: 'EV bikes & cars delivering to your door' },
              { title: 'Local Vendors', icon: Store, desc: 'Supporting Atlantic City small businesses' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group">
                  <div className="w-14 h-14 mb-4 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/marketplace"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Explore the Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Social Impact Center */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square rounded-3xl shadow-2xl overflow-hidden">
                <Image
                  src="/community-hands.jpg"
                  alt="Hands joining together in community support"
                  width={800}
                  height={800}
                  quality={80}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground">
                Social Impact Center
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Beyond groceries, we provide comprehensive services to empower our community members and create lasting positive change.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { title: 'Individual Empowerment Plans', icon: ClipboardList },
                  { title: 'Job Training & Career Support', icon: Briefcase },
                  { title: 'Housing & Re-Entry Services', icon: HomeIcon },
                  { title: 'Childcare & Family Support', icon: Baby },
                  { title: 'Financial Assistance & Food Pantry', icon: Heart },
                ].map((service) => {
                  const Icon = service.icon;
                  return (
                    <div key={service.title} className="flex items-center space-x-4 bg-cream p-4 rounded-xl hover:bg-primary/10 transition-colors duration-300 group">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shrink-0">
                        <Icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="font-heading font-medium text-foreground">{service.title}</span>
                    </div>
                  );
                })}
              </div>

              <Link
                href="/social-impact"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg"
              >
                Explore Our Services
              </Link>
            </div>
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
