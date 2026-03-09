import Link from 'next/link';
import { ClipboardList, Briefcase, Home as HomeIcon, Baby, Heart, Calendar, Phone, ExternalLink, Zap, Apple, Scale, Brain, ShieldCheck, Users } from 'lucide-react';
import CountUp from '../components/CountUp';

export const metadata = {
  title: 'Ideal Center for Social Impact | Employment : Education : Entrepreneurship',
  description: 'Ideal Center for Social Impact offers access to job training, housing support, childcare services, financial assistance, and food pantry programs through our impact partners at Atlantic City Community Cooperative.',
};

export default function SocialImpactPage() {
  const services = [
    {
      icon: ClipboardList,
      title: 'Individual Empowerment Plans',
      desc: 'Personalized case management and goal-setting to help members achieve self-sufficiency and economic stability.',
    },
    {
      icon: Briefcase,
      title: 'Job Training & Career Support',
      desc: 'Employment readiness programs, skills training, resume building, and job placement assistance.',
    },
    {
      icon: HomeIcon,
      title: 'Housing & Re-Entry Services',
      desc: 'Rent assistance, housing search, shelters, subsidized rentals, and re-entry support.',
    },
    {
      icon: Baby,
      title: 'Childcare & Family Support',
      desc: 'Child care referrals, expense assistance, parent programs, and family support centers.',
    },
    {
      icon: Heart,
      title: 'Financial Assistance & Food Pantry',
      desc: 'Food pantries, home-delivered meals, emergency financial aid, and financial literacy education.',
    },
    {
      icon: Zap,
      title: 'Utilities Assistance',
      desc: 'Electric and gas payment assistance, disconnection protection, and weatherization programs.',
    },
    {
      icon: ShieldCheck,
      title: 'Health Services',
      desc: 'Community clinics, diabetes management, prenatal and postnatal services, and Medicaid enrollment.',
    },
    {
      icon: Brain,
      title: 'Mental Health & Crisis Support',
      desc: 'Crisis hotlines, community counseling agencies, and domestic violence support.',
    },
    {
      icon: Scale,
      title: 'Legal Aid & Advocacy',
      desc: 'Legal aid, benefits assistance, immigration services, and victim support programs.',
    },
    {
      icon: Users,
      title: 'Substance Use & Recovery',
      desc: 'Treatment program referrals, counseling, support groups, and recovery hotlines.',
    },
  ];

  const steps = [
    'Become Coop member / owner',
    'Complete online intake form',
    'Schedule case management appointment',
    'Develop personalized support plan',
    'Access coordinated services',
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Empowering Our Community
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              The Ideal Center for Social Impact — Employment, Education, and Entrepreneurship pathways for Atlantic City
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              What We Offer
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              The Ideal Center for Social Impact provides:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-5">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-cream rounded-2xl p-5 hover:shadow-xl transition-all duration-300 group w-full sm:w-[calc(50%-10px)] lg:w-[calc(25%-15px)]"
                >
                  <div className="w-14 h-14 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/membership"
              className="bg-primary hover:bg-primary-dark text-white px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-center min-w-[220px]"
            >
              Become a Member
            </Link>
            <Link
              href="/vendors"
              className="bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 hover:shadow-lg hover:scale-105 text-center min-w-[220px]"
            >
              Become a Service Provider
            </Link>
            <Link
              href="/sponsorship"
              className="text-white px-10 py-4 rounded-full font-heading font-bold text-lg transition-all duration-300 border-2 border-[#eeb171] hover:shadow-lg hover:scale-105 text-center min-w-[220px]"
              style={{ backgroundColor: '#eeb171' }}
            >
              Invest / Sponsor
            </Link>
          </div>
        </div>
      </section>

      {/* How to Access Services */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                How to Access Services
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                Getting support is simple. Follow these steps to access our comprehensive services.
              </p>

              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-5 bg-white p-5 rounded-xl shadow-sm">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-foreground/80 font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                  Schedule an Appointment
                </h3>
                <p className="text-foreground/70">
                  Book a time to meet with our case management team
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-cream p-4 rounded-xl">
                  <div className="flex items-center space-x-3 text-foreground/80">
                    <Phone className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <div className="text-sm font-medium text-foreground/60">Call us</div>
                      <div className="font-semibold">(609) XXX-XXXX</div>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contact"
                  className="block w-full bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-full font-heading font-semibold text-center transition-all duration-300 hover:scale-105"
                >
                  Contact Us Today
                </Link>

                <p className="text-sm text-foreground/70 text-center">
                  Walk-ins welcome during business hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Making a Real Difference
            </h2>
            <p className="text-xl text-foreground/70">
              Our impact in the Atlantic City community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { number: 500, suffix: '+', label: 'Families Served Annually' },
              { number: 75, suffix: '%', label: 'Job Placement Rate' },
              { number: 1000, suffix: '+', label: 'Hours of Training Provided' },
            ].map((stat) => (
              <div key={stat.label} className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-8 text-center">
                <CountUp
                  end={stat.number}
                  suffix={stat.suffix}
                  className="text-5xl font-heading font-bold text-primary mb-2"
                />
                <div className="text-foreground/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Partners */}
      <section className="py-12 bg-cream border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Impact Partners
            </h2>
            <p className="text-foreground/70 mb-8">
              Partner logos coming soon — pending approval
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Join Our Community
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Access services, support, and opportunities through community ownership
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
              Become a Service Provider
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
