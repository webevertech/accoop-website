import Link from 'next/link';
import { TrendingUp, Award, Users, Building2, Heart, DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Corporate Sponsorship & Investment - Atlantic City Community Cooperative',
  description: 'Invest in our community cooperative and earn returns while making social impact.',
};

export default function SponsorshipPage() {
  const sponsorshipTiers = [
    {
      name: 'Silver Sponsor',
      amount: '$5,000 - $9,999',
      benefits: [
        'Logo on co-op website',
        'Social media recognition',
        'Quarterly impact reports',
        'Community event invitations',
      ],
      color: 'from-gray-400 to-gray-500',
    },
    {
      name: 'Gold Sponsor',
      amount: '$10,000 - $24,999',
      benefits: [
        'All Silver benefits',
        'Logo in store signage',
        'Featured in annual report',
        'VIP event access',
        'Naming opportunities',
      ],
      color: 'from-yellow-500 to-yellow-600',
      featured: true,
    },
    {
      name: 'Platinum Sponsor',
      amount: '$25,000+',
      benefits: [
        'All Gold benefits',
        'Board meeting participation',
        'Custom partnership opportunities',
        'Major naming rights',
        'Executive networking events',
      ],
      color: 'from-primary to-primary-dark',
    },
  ];

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: '5-8% Annual Dividends',
      desc: 'Competitive returns on your preferred stock investment',
    },
    {
      icon: Heart,
      title: 'Social Impact',
      desc: 'Support community economic development and job creation',
    },
    {
      icon: Building2,
      title: 'Tax Benefits',
      desc: 'Potential tax advantages for qualifying investments',
    },
    {
      icon: Award,
      title: 'Priority Redemption',
      desc: 'Stock redemption priority based on investment tier',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Corporate Sponsorship & Investment
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Invest in Atlantic City&apos;s future while earning competitive returns
            </p>
          </div>
        </div>
      </section>

      {/* Preferred Stock Offering */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Preferred Stock Offering
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Invest in the Atlantic City Community Cooperative through our preferred stock offering. Earn competitive annual dividends of 5-8% while supporting a transformative community initiative.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Your investment directly funds the expansion of our supermarket, social services, and job creation programs. As we grow, so does your return and your impact.
              </p>
              <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl">
                <div className="flex items-start space-x-3">
                  <DollarSign className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-semibold text-foreground mb-1">
                      Minimum Investment: $1,000
                    </p>
                    <p className="text-foreground/70">
                      Accessible entry point for individual and institutional investors
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {investmentBenefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <div
                    key={benefit.title}
                    className="bg-cream p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {benefit.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Corporate Sponsorship Tiers
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Partner with us and gain visibility while supporting community transformation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sponsorshipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 shadow-lg ${
                  tier.featured
                    ? 'bg-white ring-4 ring-accent transform scale-105'
                    : 'bg-white'
                }`}
              >
                <div className={`w-full h-2 rounded-full bg-linear-to-r ${tier.color} mb-6`}></div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  {tier.name}
                </h3>
                <div className="text-3xl font-heading font-bold text-primary mb-6">
                  {tier.amount}
                </div>

                <ul className="space-y-3">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-foreground/80">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Invest */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                How to Invest
              </h2>
              <p className="text-xl text-foreground/70">
                Simple steps to become an investor
              </p>
            </div>

            <div className="space-y-4">
              {[
                { step: '1', title: 'Review Investment Materials', desc: 'Download our investor prospectus and financial reports' },
                { step: '2', title: 'Schedule Consultation', desc: 'Meet with our investor relations team to discuss opportunities' },
                { step: '3', title: 'Complete Subscription Agreement', desc: 'Fill out the required documentation for investment' },
                { step: '4', title: 'Transfer Funds', desc: 'Complete your investment and receive stock certificates' },
              ].map((item) => (
                <div key={item.step} className="flex items-start space-x-4 bg-cream p-6 rounded-xl">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-xl shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Ready to Invest in Our Community?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Join us in building a sustainable, community-owned economy that creates jobs and transforms lives
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Contact Investor Relations
            </Link>
            <a
              href="#"
              className="bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white hover:shadow-2xl hover:scale-105"
            >
              Download Prospectus
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
