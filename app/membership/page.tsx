import Link from 'next/link';
import { Check, ShoppingBag, Vote, DollarSign, Users, HelpCircle } from 'lucide-react';

export const metadata = {
  title: 'Membership - Atlantic City Community Cooperative',
  description: 'Join the co-op and enjoy exclusive benefits, discounts, and voting rights.',
};

export default function MembershipPage() {
  const benefits = [
    { icon: ShoppingBag, title: 'Exclusive Discounts', desc: 'Members-only pricing on select products' },
    { icon: DollarSign, title: 'Patronage Refunds', desc: 'Share in annual surplus based on purchases' },
    { icon: Vote, title: 'Voting Rights', desc: 'Democratic say in co-op governance' },
    { icon: Users, title: 'Community Access', desc: 'Priority access to social services & support programs' },
  ];

  const membershipTiers = [
    {
      name: 'Consumer Member',
      price: '$2,400/year',
      period: 'in purchases',
      features: [
        'Shopping discounts & special promotions',
        'Access to all co-op services',
        'Voting rights in governance',
        'Patronage refund eligibility',
        'Social services access',
      ],
      cta: 'Join as Consumer',
      featured: true,
    },
    {
      name: 'Vendor Member',
      price: '$1,000/year',
      period: 'annual fee',
      features: [
        'Sell products in our marketplace',
        'Marketing & promotion support',
        'Business development resources',
        'Voting rights in governance',
        'Member networking opportunities',
      ],
      cta: 'Become a Vendor',
      href: '/vendors',
    },
  ];

  const faqs = [
    {
      question: 'Who can join the co-op?',
      answer: 'Anyone who supports our mission can join! We welcome all Atlantic City residents and community members who want to be part of a cooperative economy.',
    },
    {
      question: 'How do I shop as a member?',
      answer: 'Members can shop in-store at our supermarket, order online through our mobile app, or use our Block Captain delivery service for home delivery.',
    },
    {
      question: 'What are patronage refunds?',
      answer: 'Patronage refunds are a share of the co-op\'s annual surplus, distributed to members based on their purchases throughout the year.',
    },
    {
      question: 'Can I cancel my membership?',
      answer: 'Yes, members can request to cancel at any time. Membership shares are redeemable based on our bylaws and available capital.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Join the Co-Op
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Become an owner and help build a stronger, more sustainable Atlantic City
            </p>
          </div>
        </div>
      </section>

      {/* Member Benefits */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Member Benefits
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              As a co-op member, you&apos;re not just a customer – you&apos;re an owner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Membership Options
            </h2>
            <p className="text-xl text-foreground/70">
              Choose the membership that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membershipTiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-3xl p-8 shadow-lg ${
                  tier.featured
                    ? 'bg-linear-to-br from-primary to-primary-dark text-white ring-4 ring-accent'
                    : 'bg-cream'
                }`}
              >
                <h3 className={`text-2xl font-heading font-bold mb-2 ${tier.featured ? 'text-white' : 'text-foreground'}`}>
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <div className={`text-4xl font-heading font-bold ${tier.featured ? 'text-white' : 'text-primary'}`}>
                    {tier.price}
                  </div>
                  <div className={`text-sm ${tier.featured ? 'text-white/80' : 'text-foreground/70'}`}>
                    {tier.period}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className={`w-5 h-5 mr-3 shrink-0 mt-0.5 ${tier.featured ? 'text-accent' : 'text-primary'}`} />
                      <span className={tier.featured ? 'text-white/90' : 'text-foreground/80'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.href || '/membership#register'}
                  className={`block w-full py-3 px-6 rounded-full font-heading font-semibold text-center transition-all duration-300 hover:scale-105 ${
                    tier.featured
                      ? 'bg-white text-primary hover:bg-cream'
                      : 'bg-primary text-white hover:bg-primary-dark'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Placeholder */}
      <section id="register" className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
              Member Registration
            </h2>
            <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-8 text-center">
              <p className="text-lg text-foreground/80 mb-4">
                Ready to become a member? Our registration system is coming soon.
              </p>
              <p className="text-foreground/70 mb-6">
                For now, please contact us directly to start your membership.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Contact Us to Join
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-cream rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-foreground/70 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
