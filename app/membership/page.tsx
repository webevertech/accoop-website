import Link from 'next/link';
import { Check, ShoppingBag, Vote, DollarSign, Users, HelpCircle, Heart, ClipboardList } from 'lucide-react';

export const metadata = {
  title: 'Join Atlantic City Community Cooperative | Become a Member-Owner',
  description: 'Become a member of Atlantic City\'s community-owned supermarket. Access discounts, social services, voting rights, and cooperative ownership benefits.',
};

export default function MembershipPage() {
  const benefits = [
    { icon: ShoppingBag, title: 'Grocery Discounts', desc: 'Grocery discounts and special promotions' },
    { icon: Heart, title: 'Social Services', desc: 'Access to social services and financial support' },
    { icon: DollarSign, title: 'Patronage Refunds', desc: 'Patronage refunds when profitable' },
    { icon: Vote, title: 'Voting Rights', desc: 'Voting rights in cooperative governance' },
    { icon: Users, title: 'Community Voice', desc: 'Participation in community decision-making' },
  ];

  const membershipTypes = [
    {
      name: 'Consumer Member',
      subtitle: 'Atlantic City Residents',
      desc: 'Active shoppers and community owners.',
    },
    {
      name: 'Vendor Member',
      subtitle: 'Local Businesses',
      desc: 'Local businesses offering products in the cooperative marketplace.',
    },
    {
      name: 'Corporate Sponsor Member',
      subtitle: 'Organizations',
      desc: 'Organizations supporting economic revitalization and community ownership.',
    },
  ];

  const steps = [
    'Complete the online registration form',
    'Select membership category',
    'Submit equity contribution',
    'Receive confirmation and member credentials',
  ];

  const faqs = [
    {
      question: 'Who can join the Atlantic City Community Cooperative as a member/owner?',
      answer: 'Atlantic City residents, Atlantic City business owners, and anyone who works in Atlantic City.',
    },
    {
      question: 'How do members shop?',
      answer: 'In-store, via mobile app, or through Block Captain assistance.',
    },
    {
      question: 'Do I have to become a member to shop?',
      answer: 'No, anyone can shop at the co-op or Boardwalk Basket (our digital marketplace).',
    },
    {
      question: 'What is the difference between Consumer and Vendor Membership?',
      answer: 'Consumer members shop and vote; vendor members sell products and access distribution.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Become a Member of Atlantic City Community Cooperative
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Become an owner and help build a stronger, more sustainable Atlantic City
            </p>
          </div>
        </div>
      </section>

      {/* Membership Benefits */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Membership Benefits
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              As a co-op member, you&apos;re not just a customer – you&apos;re an owner
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-center group w-full sm:w-[calc(50%-12px)] lg:w-[calc(20%-20px)]"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Membership Types
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membershipTypes.map((type) => (
              <div
                key={type.name}
                className="bg-cream rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <h3 className="text-2xl font-heading font-bold text-foreground mb-1">
                  {type.name}
                </h3>
                <p className="text-primary font-heading font-semibold text-sm mb-4">
                  {type.subtitle}
                </p>
                <p className="text-foreground/70 leading-relaxed">
                  {type.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              How to Join
            </h2>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center gap-5 bg-white rounded-2xl p-6 shadow-sm">
                <div className="shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">
                  {index + 1}
                </div>
                <p className="text-lg text-foreground/80 font-medium">{step}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              Register Now
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Membership FAQs
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

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Join Our Community
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Become part of a movement that&apos;s transforming Atlantic City through cooperative ownership
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
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
