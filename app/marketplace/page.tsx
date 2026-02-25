import Link from 'next/link';
import { Apple, Beef, Wheat, Pill, Store, Bike, ShoppingCart, Smartphone, PackageCheck } from 'lucide-react';

export const metadata = {
  title: 'Our Marketplace - Atlantic City Community Cooperative',
  description: 'Shop fresh, local products from our community supermarket with home delivery options.',
};

export default function MarketplacePage() {
  const departments = [
    {
      icon: Apple,
      title: 'Grocery & Fresh Produce',
      desc: 'Farm-fresh vegetables, fruits, and organic options sourced from local farms and trusted suppliers.',
      features: ['Organic options', 'Local produce', 'Seasonal specials'],
    },
    {
      icon: Beef,
      title: 'Meat, Seafood & Deli',
      desc: 'Premium quality proteins, fresh seafood, and deli selections prepared by experienced butchers.',
      features: ['Fresh cuts daily', 'Custom orders', 'Local seafood'],
    },
    {
      icon: Wheat,
      title: 'Bakery & Specialty',
      desc: 'Fresh-baked breads, pastries, and artisanal products made daily in our bakery.',
      features: ['Baked fresh daily', 'Gluten-free options', 'Custom cakes'],
    },
    {
      icon: Pill,
      title: 'Pharmacy & Health',
      desc: 'Full-service pharmacy with prescriptions, over-the-counter medications, and wellness products.',
      features: ['Prescription filling', 'Health consultations', 'Wellness products'],
    },
    {
      icon: Store,
      title: 'Local Vendor Products',
      desc: 'Unique products from Atlantic City small businesses and local entrepreneurs.',
      features: ['Local makers', 'Artisan goods', 'Community crafts'],
    },
    {
      icon: PackageCheck,
      title: 'Home Goods & More',
      desc: 'Household essentials, cleaning supplies, and general merchandise for everyday needs.',
      features: ['Eco-friendly options', 'Bulk items', 'Everyday essentials'],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Our Marketplace
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Fresh, affordable groceries and essentials from your community-owned supermarket
            </p>
          </div>
        </div>
      </section>

      {/* Supermarket Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                A Full-Service Community Supermarket
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                More than just a grocery store, our marketplace is designed to serve the complete needs of Atlantic City families while supporting local businesses and farmers.
              </p>
              <ul className="space-y-3">
                {[
                  'Fresh products delivered daily',
                  'Competitive prices for members',
                  'Supporting 50+ local vendors',
                  'Sustainable & eco-friendly practices',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <PackageCheck className="w-6 h-6 text-primary mr-3 shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-linear-to-br from-primary-light/20 to-primary/20 rounded-3xl p-12">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ShoppingCart className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground">
                  Coming Soon: Online Shopping
                </h3>
                <p className="text-foreground/70">
                  Order groceries through our mobile app and website for convenient pickup or delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => {
              const Icon = dept.icon;
              return (
                <div
                  key={dept.title}
                  className="bg-cream rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {dept.title}
                  </h3>
                  <p className="text-foreground/70 mb-4">
                    {dept.desc}
                  </p>
                  <ul className="space-y-1">
                    {dept.features.map((feature) => (
                      <li key={feature} className="text-sm text-primary font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Home Delivery */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-12 shadow-xl text-center">
                <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Bike className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                  Eco-Friendly Delivery
                </h3>
                <p className="text-foreground/70 mb-6">
                  Our Block Captains deliver using electric bikes and vehicles, reducing our carbon footprint while serving the community.
                </p>
                <Link
                  href="/block-captain"
                  className="inline-block text-primary font-heading font-semibold hover:text-primary-dark transition-colors"
                >
                  Learn about Block Captains →
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Home Delivery Services
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Can&apos;t make it to the store? No problem. Our innovative delivery system brings fresh groceries right to your door.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Smartphone, title: 'Order via App or Block Captain', desc: 'Multiple convenient ordering options' },
                  { icon: Bike, title: 'Eco-Friendly Delivery', desc: 'EV bikes and cars for sustainable service' },
                  { icon: PackageCheck, title: 'Same-Day Options', desc: 'Fast delivery across Atlantic City' },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="flex items-start space-x-4 bg-white p-4 rounded-xl">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                        <p className="text-sm text-foreground/70">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
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
            Become a member today and start enjoying fresh, local products at great prices
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Join as a Member
            </Link>
            <Link
              href="/vendors"
              className="bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white hover:shadow-2xl hover:scale-105"
            >
              Become a Vendor
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
