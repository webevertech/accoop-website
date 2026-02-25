import Link from 'next/link';
import { Store, TrendingUp, Users, Megaphone, Package, HandshakeIcon } from 'lucide-react';

export const metadata = {
  title: 'Vendor & Business Partners - Atlantic City Community Cooperative',
  description: 'Sell your products in our community marketplace and grow your business.',
};

export default function VendorsPage() {
  const benefits = [
    {
      icon: Users,
      title: 'Access to 2,500+ Members',
      desc: 'Reach a dedicated customer base actively looking to support local businesses',
    },
    {
      icon: Store,
      title: 'Prime Marketplace Space',
      desc: 'Showcase your products in our high-traffic community supermarket',
    },
    {
      icon: Megaphone,
      title: 'Marketing Support',
      desc: 'Benefit from co-op marketing efforts and promotional campaigns',
    },
    {
      icon: TrendingUp,
      title: 'Business Growth',
      desc: 'Scale your business with consistent orders and community support',
    },
    {
      icon: Package,
      title: 'Logistics Support',
      desc: 'Access our delivery network to reach more customers',
    },
    {
      icon: HandshakeIcon,
      title: 'Fair Partnership',
      desc: 'Transparent terms and equitable profit-sharing arrangements',
    },
  ];

  const vendorTypes = [
    'Local farmers & produce suppliers',
    'Bakeries & specialty food producers',
    'Meat & seafood suppliers',
    'Health & wellness product makers',
    'Artisan & craft producers',
    'Small business owners',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Vendor & Business Partners
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Grow your business by partnering with Atlantic City&apos;s community-owned marketplace
            </p>
          </div>
        </div>
      </section>

      {/* Become a Vendor */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Why Partner With Us?
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                The Atlantic City Community Cooperative offers local businesses and producers a unique opportunity to reach engaged customers who prioritize supporting their community.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Unlike traditional retail partnerships, we work collaboratively with our vendors to ensure mutual success. As a cooperative, we believe in fair terms, transparent processes, and building long-term relationships.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl">
                <p className="font-heading font-semibold text-foreground mb-2">
                  Low-Cost Market Entry
                </p>
                <p className="text-foreground/70">
                  Affordable vendor fees make it easy for small businesses to get started
                </p>
              </div>
            </div>

            <div className="bg-linear-to-br from-primary-light/20 to-primary/20 rounded-3xl p-8">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                Who Can Become a Vendor?
              </h3>
              <ul className="space-y-3">
                {vendorTypes.map((type) => (
                  <li key={type} className="flex items-start space-x-3 bg-white p-4 rounded-xl">
                    <div className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-0.5">
                      <Store className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-foreground/80">{type}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Vendor Benefits Grid */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Vendor Benefits
            </h2>
            <p className="text-xl text-foreground/70">
              What you get as a co-op vendor partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-cream p-6 rounded-2xl hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                How to Become a Vendor
              </h2>
              <p className="text-xl text-foreground/70">
                Simple steps to start selling at our marketplace
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Apply', desc: 'Submit your vendor application with product details' },
                { step: '2', title: 'Review', desc: 'Our team reviews your application and products' },
                { step: '3', title: 'Onboard', desc: 'Sign agreement and complete vendor training' },
                { step: '4', title: 'Launch', desc: 'Start selling to our community members' },
              ].map((item) => (
                <div key={item.step} className="bg-white rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-foreground/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Placeholder */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-linear-to-br from-primary/5 to-primary-light/10 rounded-3xl shadow-xl p-8 md:p-12 border-2 border-primary/10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-2xl flex items-center justify-center">
                <Store className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Ready to Join Our Marketplace?
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Start selling your products to our engaged community of 2,500+ members
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Apply to Become a Vendor
              </Link>
              <p className="text-sm text-foreground/60 mt-4">
                Questions? Contact our vendor relations team
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
