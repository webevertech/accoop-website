import Link from 'next/link';
import { DollarSign } from 'lucide-react';

export const metadata = {
  title: 'Invest in Atlantic City Community Cooperative | Become Impact Sponsor/Investor',
  description: 'Invest in Atlantic City\'s community-owned supermarket. Become an impact investor, earn dividends, and support local economic revitalization.',
};

export default function SponsorshipPage() {
  const sponsorshipTiers = [
    {
      name: 'Silver Sponsor',
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

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Invest in the Future of Atlantic City
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Support community-owned business growth and earn returns while making a lasting impact
            </p>
          </div>
        </div>
      </section>

      {/* Investment Opportunity - Coming Soon */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-accent/10 border-l-4 border-accent p-6 rounded-r-xl text-center">
            <DollarSign className="w-10 h-10 text-accent mx-auto mb-3" />
            <p className="font-heading font-bold text-xl text-foreground mb-2">
              Investment Opportunity Coming Soon
            </p>
            <p className="text-foreground/70">
              Details on our preferred stock offering will be available shortly. Contact us to express interest.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Express Interest
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Sponsorship Tiers
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Each tier includes branding visibility and community recognition
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
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  {tier.name}
                </h3>

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
            <Link
              href="/membership"
              className="bg-white/15 hover:bg-white/25 text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:shadow-2xl hover:scale-105"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
