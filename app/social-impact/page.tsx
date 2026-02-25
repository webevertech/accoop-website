import Link from 'next/link';
import { ClipboardList, Briefcase, Home as HomeIcon, Baby, Heart, Calendar, Phone } from 'lucide-react';
import CountUp from '../components/CountUp';

export const metadata = {
  title: 'Social Impact Center - Atlantic City Community Cooperative',
  description: 'Comprehensive social services including job training, housing support, childcare, and financial assistance.',
};

export default function SocialImpactPage() {
  const services = [
    {
      icon: ClipboardList,
      title: 'Individual Empowerment Plans',
      desc: 'Personalized case management and goal-setting to help members achieve self-sufficiency and economic stability.',
      features: ['One-on-one counseling', 'Goal tracking', 'Resource coordination'],
    },
    {
      icon: Briefcase,
      title: 'Job Training & Career Support',
      desc: 'Employment readiness programs, skills training, resume building, and job placement assistance.',
      features: ['Resume workshops', 'Interview prep', 'Job placement'],
    },
    {
      icon: HomeIcon,
      title: 'Housing & Re-Entry Services',
      desc: 'Housing assistance, landlord mediation, and re-entry support for those transitioning from incarceration.',
      features: ['Housing search', 'Rental assistance', 'Re-entry support'],
    },
    {
      icon: Baby,
      title: 'Childcare & Family Support',
      desc: 'Affordable childcare options, parenting classes, and family strengthening programs.',
      features: ['Childcare resources', 'Parenting classes', 'Family counseling'],
    },
    {
      icon: Heart,
      title: 'Financial Assistance & Food Pantry',
      desc: 'Emergency financial aid, food pantry access, and financial literacy education.',
      features: ['Emergency aid', 'Food pantry', 'Financial literacy'],
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Social Impact Center
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Empowering our community through comprehensive services and support programs
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
              Beyond groceries, we provide wraparound services designed to help community members achieve economic stability and improve quality of life
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="bg-cream rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-14 h-14 mb-4 bg-white rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  <ul className="space-y-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="text-sm text-primary font-medium flex items-center">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            <div className="bg-linear-to-br from-accent/20 to-accent/10 rounded-2xl p-6 border-2 border-accent/30">
              <div className="w-14 h-14 mb-4 bg-accent/20 rounded-xl flex items-center justify-center">
                <Heart className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
                More Services Coming
              </h3>
              <p className="text-foreground/70">
                We&apos;re continuously expanding our services to meet community needs. Contact us to learn more.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Access Services */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                How to Access Our Services
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-8">
                Getting support is simple. Our dedicated case managers are here to help you navigate our services and create a personalized plan for success.
              </p>

              <div className="space-y-4">
                {[
                  { step: '1', title: 'Contact Us', desc: 'Reach out via phone, email, or visit our center' },
                  { step: '2', title: 'Initial Assessment', desc: 'Meet with a case manager to discuss your needs' },
                  { step: '3', title: 'Create Your Plan', desc: 'Develop a personalized empowerment plan' },
                  { step: '4', title: 'Access Services', desc: 'Begin receiving support and track your progress' },
                ].map((item) => (
                  <div key={item.step} className="flex items-start space-x-4 bg-white p-4 rounded-xl">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-heading font-semibold text-foreground">{item.title}</h4>
                      <p className="text-sm text-foreground/70">{item.desc}</p>
                    </div>
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

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            We&apos;re Here to Help
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            No matter what challenges you&apos;re facing, our team is ready to support you on your journey to success
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </>
  );
}
