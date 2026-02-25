import Link from 'next/link';
import { Bike, Users, DollarSign, MapPin, CheckCircle2, Briefcase } from 'lucide-react';

export const metadata = {
  title: 'Block Captain Program - Atlantic City Community Cooperative',
  description: 'Join our Block Captain program and earn income while serving your community.',
};

export default function BlockCaptainPage() {
  const responsibilities = [
    'Help neighbors place grocery orders and coordinate deliveries',
    'Connect community members to co-op social services',
    'Lead membership drives in your neighborhood',
    'Provide feedback on community needs and preferences',
    'Serve as a liaison between the co-op and residents',
  ];

  const benefits = [
    { icon: DollarSign, title: 'Competitive Pay', desc: 'Earn income serving your community' },
    { icon: Bike, title: 'Flexible Hours', desc: 'Work on your own schedule' },
    { icon: Users, title: 'Community Impact', desc: 'Make a real difference locally' },
    { icon: Briefcase, title: 'Training Provided', desc: 'Full onboarding and ongoing support' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Block Captain Program
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Earn income while empowering your neighbors and strengthening our community
            </p>
          </div>
        </div>
      </section>

      {/* Who Are Block Captains */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Who Are Block Captains?
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Block Captains are local residents hired to be the face of the co-op in their neighborhoods. They help community members access our supermarket and social services while earning competitive income.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                As a Block Captain, you&apos;ll use eco-friendly electric bikes or vehicles to deliver groceries, connect neighbors to resources, and build stronger community bonds.
              </p>
              <div className="flex items-start space-x-3 bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground mb-1">
                    Neighborhood-Based Work
                  </p>
                  <p className="text-foreground/70">
                    Serve the blocks and areas you know best, building trust and relationships
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-primary-light/20 to-primary/20 rounded-3xl p-12">
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Bike className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground text-center mb-4">
                  Join Our Team
                </h3>
                <p className="text-foreground/70 text-center mb-6">
                  We&apos;re looking for enthusiastic community members who want to make a difference
                </p>
                <Link
                  href="#apply"
                  className="block w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-full font-heading font-semibold text-center transition-all duration-300 hover:scale-105"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsibilities */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
                Your Responsibilities
              </h2>
              <p className="text-xl text-foreground/70">
                What you&apos;ll do as a Block Captain
              </p>
            </div>

            <div className="space-y-4">
              {responsibilities.map((responsibility, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-foreground/80 leading-relaxed flex-1">
                    {responsibility}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Block Captain Benefits
            </h2>
            <p className="text-xl text-foreground/70">
              Why join our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-cream p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
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

      {/* Application Form Placeholder */}
      <section id="apply" className="py-20 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-6 text-center">
              Apply to Become a Block Captain
            </h2>
            <div className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-8 text-center">
              <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
              <p className="text-lg text-foreground/80 mb-4">
                Ready to make a difference in your community?
              </p>
              <p className="text-foreground/70 mb-6">
                Our application system is coming soon. For now, please contact us to express your interest.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Contact Us to Apply
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
