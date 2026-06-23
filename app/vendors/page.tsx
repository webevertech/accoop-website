import Script from 'next/script';
import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import { Store, Users, Megaphone, Bike, DollarSign, Globe, Smartphone, ShoppingBag, GraduationCap, Hotel, Home as HomeIcon, Pill, Sparkles, Heart, Car, ClipboardList, UtensilsCrossed } from 'lucide-react';

export const metadata = {
  title: 'Become a Vendor | Atlantic City Community Cooperative',
  description: 'Sell your products through Boardwalk Basket, Atlantic City Community Cooperative\'s digital marketplace. Reach local shoppers, grow your business, and support community wealth.',
  alternates: { canonical: 'https://accoop.com/vendors' },
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
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
                Become a Vendor at Atlantic City Community Cooperative
              </h1>
              <p className="text-xl text-white/90 leading-relaxed mb-8 animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                Access Atlantic City&apos;s delivery network and grow your business through our cooperative marketplace
              </p>
              <div className="animate-fadeInUp" style={{ animationDelay: '200ms' }}>
                <CTAButton formType="vendor" className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
                  Become a Vendor
                </CTAButton>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end animate-fadeInUp" style={{ animationDelay: '150ms' }}>
              <Image
                src="/boardwalk-basket-logo.png"
                alt="Boardwalk Basket"
                width={460}
                height={460}
                priority
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
              />
            </div>
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

          <div className="mt-12 text-center">
            <CTAButton formType="vendor" className="bg-primary text-white hover:bg-primary-dark px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Vendor
            </CTAButton>
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
                  src="https://links.webevertech.com/widget/form/pSwAZdIkkquNvtVjpeOd"
                  style={{ width: '100%', border: 'none', borderRadius: '3px' }}
                  id="inline-pSwAZdIkkquNvtVjpeOd"
                  height="1689"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="AC COOP BOARDWALK BASKET / VENDOR SIGN UP"
                  data-height="1689"
                  data-layout-iframe-id="inline-pSwAZdIkkquNvtVjpeOd"
                  data-form-id="pSwAZdIkkquNvtVjpeOd"
                  title="AC COOP BOARDWALK BASKET / VENDOR SIGN UP"
                  loading="lazy"
                />
                <Script src="https://links.webevertech.com/js/form_embed.js" strategy="lazyOnload" />
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
            <CTAButton formType="vendor" className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Apply to Become a Vendor
            </CTAButton>
            <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Member
            </CTAButton>
            <CTAButton formType="sponsor" className="text-foreground px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-[#eeb171] hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center" style={{ backgroundColor: '#eeb171' }}>
              Become A Sponsor
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
