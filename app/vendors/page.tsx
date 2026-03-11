import Link from 'next/link';
import { Store, TrendingUp, Users, Megaphone, Package, HandshakeIcon, Bike, DollarSign, Globe, Smartphone, ShoppingBag, GraduationCap, Hotel, Home as HomeIcon, Pill, Sparkles, Heart, Car, ClipboardList, UtensilsCrossed } from 'lucide-react';
import VendorForm from '../components/VendorForm';

export const metadata = {
  title: 'Become a Vendor in Atlantic City | Sell at AC COOP Supermarket',
  description: 'Local businesses can sell products through Atlantic City Community Cooperative\'s digital marketplace platform Boardwalk Basket.',
};

export default function VendorsPage() {
  const vendorBenefits = [
    {
      icon: Users,
      title: 'Access to Co-op Members & 20M Visitors',
      desc: 'Reach Atlantic City\'s co-op members and millions of annual visitors',
    },
    {
      icon: Globe,
      title: 'Digital Marketplace Exposure',
      desc: 'Sell through Boardwalk Basket — Atlantic City\'s digital marketplace',
    },
    {
      icon: Bike,
      title: 'Sustainable Delivery Services',
      desc: 'Low-cost or no-cost delivery everywhere in Atlantic City',
    },
    {
      icon: Megaphone,
      title: 'Marketing & Promotional Support',
      desc: 'Receive $500 digital advertising funding (match funding) to promote your business',
    },
    {
      icon: Smartphone,
      title: 'Free Website & App Onboarding',
      desc: 'Get set up on our digital platform at no cost',
    },
    {
      icon: DollarSign,
      title: 'Affordable Market Entry',
      desc: 'Low-cost entry into a high-impact community market',
    },
  ];

  const serviceProviders = [
    { name: 'Groceries & Fresh Produce Suppliers', icon: ShoppingBag },
    { name: 'Education & Training Providers', icon: GraduationCap },
    { name: 'Hotel & Hospitality Partners', icon: Hotel },
    { name: 'Retail Vendors', icon: Store },
    { name: 'Home Service Providers', icon: HomeIcon },
    { name: 'Local Vendors & Small Businesses', icon: Users },
    { name: 'Pharmacy & Health Essentials', icon: Pill },
    { name: 'Beauty & Wellness Professionals', icon: Sparkles },
    { name: 'Social Service Organizations', icon: Heart },
    { name: 'Automotive Service Providers', icon: Car },
    { name: 'Professional Services (Legal, Financial, Business)', icon: ClipboardList },
    { name: 'Food Delivery & Restaurant Partners', icon: UtensilsCrossed },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Become a Vendor at Atlantic City Community Cooperative
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Access Atlantic City&apos;s delivery network and grow your business through our cooperative marketplace
            </p>
          </div>
        </div>
      </section>

      {/* Why Partner with AC Coop */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Why Become a Vendor or Service Provider?
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
              Receive $500 digital advertising funding (match funding) to promote your business on Boardwalk Basket
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendorBenefits.map((benefit) => {
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

      {/* Service Provider Network */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div>
            <div className="text-center mb-8">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Service Provider Network
              </h2>
              <p className="text-lg text-foreground/80">
                We collaborate with a wide range of local service providers and businesses
              </p>
            </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {serviceProviders.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <div key={provider.name} className="bg-white p-3 rounded-xl flex items-center gap-2.5 hover:shadow-md transition-all duration-300 group">
                      <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <Icon className="w-4 h-4 text-primary group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-foreground/80 text-sm font-medium leading-tight">{provider.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12 max-w-2xl mx-auto">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">
                  Join Our Network
                </h3>
                <VendorForm />
              </div>
          </div>
        </div>
      </section>

      {/* How to Become a Vendor */}
      <section className="py-20 bg-white">
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
                <div key={item.step} className="bg-cream rounded-2xl p-6 text-center">
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

            {/* Vendor Application Form */}
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
                Ready to Get Started? Fill Out the Form Below
              </h3>
              <p className="text-foreground/70 mb-8">
                Complete this application form to begin your vendor onboarding process
              </p>
              <div className="p-4 overflow-hidden">
                <iframe
                  src="https://links.webevertech.com/widget/form/M9VwTfO8cObWYS6emE6T"
                  style={{ border: 'none', overflow: 'hidden' }}
                  className="w-full"
                  height="1750"
                  scrolling="no"
                  title="Vendor Application Form"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Ready to Join Our Marketplace?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Start selling your products to Atlantic City&apos;s engaged community
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Apply to Become a Vendor
            </Link>
            <Link
              href="/membership"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:shadow-2xl hover:scale-105"
            >
              Become a Member
            </Link>
            <Link
              href="/sponsorship"
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
