import Link from 'next/link';
import { Target, Eye } from 'lucide-react';
import CountUp from '../components/CountUp';

export const metadata = {
  title: 'About Us - Atlantic City Community Cooperative',
  description: 'Learn about our story, mission, vision, team, and cooperative principles.',
};

export default function AboutPage() {
  const cooperativePrinciples = [
    { title: 'Voluntary & Open Membership', desc: 'Open to all persons able to use our services' },
    { title: 'Democratic Member Control', desc: 'Members actively participate in decision-making' },
    { title: 'Member Economic Participation', desc: 'Members contribute equitably and benefit fairly' },
    { title: 'Autonomy & Independence', desc: 'Member-controlled with democratic governance' },
    { title: 'Education & Training', desc: 'Providing education for members and community' },
    { title: 'Cooperation Among Cooperatives', desc: 'Working together to strengthen the movement' },
    { title: 'Concern for Community', desc: 'Sustainable development of our communities' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              About Us
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Building a community-owned economy where everyone thrives together
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
                  The Atlantic City Community Cooperative was born from a vision to create lasting economic change in our community. We recognized that Atlantic City residents needed more than just another supermarket – they needed ownership, opportunity, and empowerment.
                </p>
                <p>
                  Founded by community leaders and residents who believed in the power of cooperative economics, we set out to build something unprecedented: a full-service supermarket combined with a comprehensive social impact center, all owned and governed by the people it serves.
                </p>
                <p>
                  Today, we&apos;re building a model that demonstrates how communities can take control of their economic future while providing essential services, creating jobs, and supporting local businesses.
                </p>
              </div>
            </div>
            <div className="bg-linear-to-br from-primary-light/20 to-primary/20 rounded-3xl p-8 lg:p-12">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <CountUp
                    end={2500}
                    suffix="+"
                    className="text-4xl font-heading font-bold text-primary"
                  />
                  <div className="text-foreground/70 font-medium">Community Members</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <CountUp
                    end={100}
                    suffix="%"
                    className="text-4xl font-heading font-bold text-primary"
                  />
                  <div className="text-foreground/70 font-medium">Community Owned</div>
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
              <p className="text-lg text-foreground/80 leading-relaxed">
                A self-sustaining cooperative model where community members are owners, employees, and beneficiaries, creating generational wealth and opportunity for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperative Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              7 Cooperative Principles
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              We follow the internationally recognized cooperative principles that guide cooperatives worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cooperativePrinciples.map((principle, index) => (
              <div
                key={principle.title}
                className="bg-cream p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group"
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
              href="/membership"
              className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white hover:shadow-2xl hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
