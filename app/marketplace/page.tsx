import Link from 'next/link';
import Image from 'next/image';
import { Apple, Beef, Wheat, Pill, Store, Bike, ShoppingCart, Smartphone, PackageCheck, Zap, Users, Leaf, ShoppingBag, GraduationCap, Hotel, Home as HomeIcon, Sparkles, Heart, Car, ClipboardList, UtensilsCrossed } from 'lucide-react';

export const metadata = {
  title: 'Atlantic City Supermarket | Fresh Produce, Groceries & Local Vendors',
  description: 'At Boardwalk Basket, shop fresh groceries, pharmacy essentials, bakery, meat, seafood, and local products at Atlantic City Community Coop\'s digital marketplace "Boardwalk Basket".',
};

export default function MarketplacePage() {
  const departments = [
    { icon: ShoppingBag, title: 'Groceries Delivery', desc: 'Fresh groceries delivered to your door' },
    { icon: GraduationCap, title: 'Education & Training', desc: 'Workforce development and skills training' },
    { icon: Hotel, title: 'Hotel Booking', desc: 'Local hotel reservations and travel' },
    { icon: Store, title: 'Retail', desc: 'Shop local retail and everyday essentials' },
    { icon: HomeIcon, title: 'Home Services', desc: 'Repairs, cleaning, and maintenance' },
    { icon: ShoppingCart, title: 'Local Vendors', desc: 'Supporting Atlantic City small businesses' },
    { icon: Pill, title: 'Pharmacy on Demand', desc: 'Medications and health essentials delivered' },
    { icon: Sparkles, title: 'Beauty & Wellness', desc: 'Salons, spas, and self-care services' },
    { icon: Heart, title: 'Social Services', desc: 'Community support and resources' },
    { icon: Car, title: 'Automotive Services', desc: 'Car repair, detailing, and maintenance' },
    { icon: ClipboardList, title: 'Professional Services', desc: 'Legal, financial, and business services' },
    { icon: UtensilsCrossed, title: 'Food Delivery', desc: 'Local restaurant meals delivered' },
  ];

  const orderMethods = [
    { icon: Store, title: 'Shop at Our Store', desc: 'Visit our full-service supermarket in Atlantic City' },
    { icon: Smartphone, title: 'Our Mobile App', desc: 'Order groceries on the go with the Boardwalk Basket app' },
    { icon: Users, title: 'Block Captains Network', desc: 'Community-powered ordering and delivery assistance' },
    { icon: ShoppingCart, title: 'Online Ordering', desc: 'Future integration for web-based shopping' },
  ];

  const localSupport = [
    { icon: Leaf, title: 'Local Farmers', desc: 'Fresh produce sourced directly from regional farms' },
    { icon: Store, title: 'Small Businesses', desc: 'Shelf space and visibility for neighborhood shops' },
    { icon: Users, title: 'Minority-Owned Enterprises', desc: 'Dedicated support for underrepresented business owners' },
    { icon: Beef, title: 'Food Entrepreneurs', desc: 'Launch and grow food brands through our marketplace' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Boardwalk Basket: Atlantic City&apos;s Digital Marketplace
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Shop Fresh. Shop Local. Shop Community-Owned.
            </p>
          </div>
        </div>
      </section>

      {/* Community-Owned Digital Supermarket */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
              Community-Owned Digital Supermarket in Atlantic City
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed">
              AC Coop offers a full-service grocery delivery experience including:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.title}
                  className="bg-cream rounded-2xl p-5 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-foreground/70">
                    {dept.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <p className="text-center text-lg text-foreground/70 font-medium">
            We prioritize affordability, quality, and local sourcing.
          </p>
        </div>
      </section>

      {/* Sustainable Home Delivery */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Sustainable Home Delivery Services in Atlantic City
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                Order via:
              </p>
              <div className="space-y-4">
                {orderMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.title} className="flex items-start space-x-4 bg-white p-5 rounded-xl shadow-sm">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">{method.title}</h4>
                        <p className="text-sm text-foreground/70">{method.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-xl text-center">
              <Image
                src="/boardwalk-basket-logo.png"
                alt="Boardwalk Basket"
                width={160}
                height={160}
                className="mx-auto mb-6 w-32 h-32 object-contain"
              />
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                Boardwalk Basket
              </h3>
              <p className="text-foreground/70 mb-6">
                Deliveries powered by electric vehicles and electric bikes across Atlantic City, NJ.
              </p>
              <div className="space-y-3">
                <p className="text-sm text-foreground/50 font-heading font-semibold">
                  Download the App — Coming July 2026
                </p>
                <Link
                  href="/vendors"
                  className="block w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-full font-heading font-semibold transition-all duration-300 hover:scale-105"
                >
                  Become a Vendor
                </Link>
                <Link
                  href="/block-captain"
                  className="inline-block text-primary font-heading font-semibold hover:text-primary-dark transition-colors text-sm"
                >
                  Learn about Block Captains →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Local */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Support Local & Specialty Products
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                AC Coop provides digital shelf space and marketing support for local vendors and entrepreneurs.
              </p>
              <Link
                href="/vendors"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Become a Vendor
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {localSupport.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-cream rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-sm">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-foreground/70">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Ready to Shop with Us?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Fresh food, fair prices, and community ownership — all in one place
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Become a Member
            </Link>
            <Link
              href="/vendors"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:shadow-2xl hover:scale-105"
            >
              Become a Vendor
            </Link>
            <Link
              href="/contact"
              className="text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-[#eeb171] hover:shadow-2xl hover:scale-105"
              style={{ backgroundColor: '#eeb171' }}
            >
              Invest / Sponsor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
