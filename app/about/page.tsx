import Link from 'next/link';
import { Target, Eye, Users, Briefcase, HandshakeIcon, BookOpen, Building2, Heart, Vote } from 'lucide-react';

export const metadata = {
  title: 'About Atlantic City Community Cooperative | Community-Owned Digital Supermarket NJ',
  description: 'Learn about Atlantic City Community Cooperative\'s mission, vision, leadership, and cooperative principles. Discover how we are building a local cooperative economy in Atlantic City.',
};

export default function AboutPage() {
  const cooperativePrinciples = [
    { title: 'Voluntary & Open Membership', desc: 'Open to all persons able to use our services', icon: Users },
    { title: 'Democratic Member Control', desc: 'Members actively participate in decision-making', icon: Vote },
    { title: 'Member Economic Participation', desc: 'Members contribute equitably and benefit fairly', icon: HandshakeIcon },
    { title: 'Autonomy & Independence', desc: 'Member-controlled with democratic governance', icon: Building2 },
    { title: 'Education, Training & Information', desc: 'Providing education for members and community', icon: BookOpen },
    { title: 'Cooperation Among Cooperatives', desc: 'Working together to strengthen the movement', icon: Heart },
    { title: 'Concern for Community', desc: 'Sustainable development of our communities', icon: Users },
  ];

  const teamExpertise = [
    'Community development',
    'Workforce training',
    'Cooperative governance',
    'Retail operations',
    'Social impact services',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              About Atlantic City Community Cooperative
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Atlantic City&apos;s community-owned economy where everyone thrives together
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
                <p>
                  The Atlantic City Community Cooperative was created to address critical challenges in Atlantic City, including:
                </p>
                <ul className="space-y-2 pl-1">
                  {[
                    'Food insecurity',
                    'Limited access to affordable groceries',
                    'Economic leakage to outside corporations',
                    'Lack of community-owned infrastructure',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  By transforming underutilized property into a vibrant community hub, AC Coop is creating a replicable model for urban revitalization and cooperative economic development in New Jersey.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-primary-light/20 to-primary/20 rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-heading font-bold text-primary">Community-Owned</div>
                  <div className="text-foreground/70 font-medium">100% Member Governed</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-heading font-bold text-primary">Opening Fall 2026</div>
                  <div className="text-foreground/70 font-medium">Atlantic City, NJ</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="text-4xl font-heading font-bold text-primary">Local</div>
                  <div className="text-foreground/70 font-medium">Atlantic City Focus</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Our Mission
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                To create a community-owned marketplace and social impact hub that provides access to fresh food, economic opportunities, and essential services for Atlantic City residents.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
                Our Vision
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                A self-sustaining cooperative model where community members are:
              </p>
              <ul className="space-y-2 text-lg text-foreground/80">
                {['Owners', 'Employees', 'Entrepreneurs', 'Long-term beneficiaries'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
              Our Team
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-8">
              The Atlantic City Community Cooperative is led by experienced professionals in:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {teamExpertise.map((area) => (
                <span
                  key={area}
                  className="px-5 py-3 bg-cream rounded-full font-heading font-semibold text-foreground/80 text-sm sm:text-base border border-gray-100"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cooperative Principles */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Cooperative Principles
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              AC Coop follows the internationally recognized Cooperative Principles
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {cooperativePrinciples.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <div className="flex items-start space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading font-semibold text-foreground mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-foreground/70 text-sm">
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
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
