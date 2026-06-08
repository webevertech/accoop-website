import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import CountUp from '../components/CountUp';
import SectionNav from '../components/SectionNav';
import {
  ClipboardList,
  Search,
  ClipboardCheck,
  Handshake,
  TrendingUp,
  PiggyBank,
  Construction,
  GraduationCap,
  Briefcase,
  HeartHandshake,
  Network,
  Users,
  ChevronRight,
  Check,
} from 'lucide-react';

export const metadata = {
  title: 'Center for Social Impact | Atlantic City Community Cooperative',
  description: 'The AC COOP Center for Social Impact, powered by Ideal Institute of Technology, connects members to services, benefits, and partners through one intake and one Individual Empowerment Plan — building a stronger, healthier, and more prosperous Atlantic City.',
  alternates: { canonical: 'https://accoop.com/social-impact' },
};

export default function SocialImpactPage() {
  const steps = [
    { icon: ClipboardList, title: 'One Intake', desc: 'You share your needs through a single, simple intake.' },
    { icon: Search, title: 'Assess & Understand', desc: 'We complete Financial, Barrier, Academic & Job Readiness assessments.' },
    { icon: ClipboardCheck, title: 'Empowerment Plan', desc: "We create your Individual Empowerment Plan and identify benefits & services you're eligible for." },
    { icon: Handshake, title: 'Connect', desc: 'We connect you to trusted Impact Partners in our digital network.' },
    { icon: TrendingUp, title: 'Grow & Thrive', desc: 'You receive ongoing support to achieve stability and build generational wealth.' },
  ];

  const supportCards = [
    { icon: PiggyBank, title: 'Financial Assessment', desc: 'Understand your financial picture and get guidance toward stability.' },
    { icon: Construction, title: 'Barrier Assessment', desc: 'We identify challenges you face and connect you with resources to overcome them.' },
    { icon: GraduationCap, title: 'Academic Readiness', desc: 'Access education support, training and pathways to achieve your goals.' },
    { icon: Briefcase, title: 'Job Readiness', desc: 'Build your skills, find job opportunities and advance your career.' },
    { icon: HeartHandshake, title: 'Benefits & Services', desc: 'We identify federal, state and local benefits you may be eligible for.' },
    { icon: Network, title: 'Impact Partner Network', desc: 'We connect you to trusted providers for the services you need.' },
  ];

  const stats = [
    { end: 500, suffix: '+', label: 'Members Supported and Growing' },
    { end: 50, suffix: '+', label: 'Impact Partners in Our Network' },
    { end: 1000, suffix: '+', label: 'Services & Benefits Identified' },
    { end: 85, suffix: '%', label: 'Members See Progress Within 6 Months' },
  ];

  const partnerBenefits = [
    'Expand your reach and community impact',
    'Be part of a trusted network making a difference',
    'Collaborate with AC COOP to strengthen our community',
  ];

  return (
    <>
      {/* Hero */}
      <section id="overview" className="relative bg-primary overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[calc(100dvh-152px)] py-12 md:py-16">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] text-white">
                Center for<br />Social Impact
              </h1>
              <p className="text-xl md:text-2xl font-heading font-semibold text-accent">
                Powered by Ideal Institute of Technology
              </p>
              <div className="space-y-3 max-w-lg">
                <p className="text-lg font-heading font-semibold text-white">One intake. Every opportunity.</p>
                <p className="text-base text-white/85 leading-relaxed">
                  Connecting AC COOP members to the services, benefits, and partners that build a stronger, healthier, and more prosperous Atlantic City.
                </p>
              </div>
              <CTAButton className="bg-accent hover:bg-accent/90 text-foreground px-8 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                Get Started Today
              </CTAButton>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/front-view-happy-young-family-looking-each-other.jpg"
                  alt="A happy young family supported by the Center for Social Impact"
                  width={800}
                  height={600}
                  quality={85}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* In-page section navigation */}
      <SectionNav />

      {/* Our Mission band */}
      <section className="bg-primary-dark py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="shrink-0 w-16 h-16 rounded-2xl border-2 border-accent/60 flex items-center justify-center">
              <Users className="w-8 h-8 text-accent" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-1">Our Mission</h2>
              <p className="text-white/85 leading-relaxed">
                AC COOP is committed to supporting our prime members (those receiving public assistance and in need of support) so they can join the true middle class of America and enjoy financial freedom.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">How It Works</h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
          </div>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-cream border border-gray-100 shadow-sm flex items-center justify-center mb-4">
                    <Icon className="w-9 h-9 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {i + 1}. {step.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed max-w-[16rem]">{step.desc}</p>
                  {i < steps.length - 1 && (
                    <ChevronRight
                      className="hidden lg:block absolute top-7 -right-2 w-6 h-6 text-accent"
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Comprehensive Support */}
      <section id="support" className="py-20 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Comprehensive Support for Your Success
            </h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Powered by Ideal Institute of Technology */}
      <section id="ideal-institute" className="bg-primary scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
          <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col justify-center">
            <p className="text-sm font-heading font-semibold text-accent uppercase tracking-wider mb-2">Powered by</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-5">
              Ideal Institute of Technology
            </h2>
            <p className="text-white/85 leading-relaxed max-w-lg mb-8">
              Through innovation and technology, Ideal Institute of Technology powers the AC COOP Center for Social Impact — creating smarter connections, better outcomes, and a stronger Atlantic City.
            </p>
            <div className="bg-white/95 rounded-2xl p-4 inline-flex items-center w-fit shadow-lg">
              <Image
                src="/iitnj logo.png"
                alt="Ideal Institute of Technology"
                width={220}
                height={80}
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
          <div className="relative min-h-65 lg:min-h-full">
            <Image
              src="/building-2.webp"
              alt="Modern Ideal Institute of Technology campus building"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-bottom"
            />
          </div>
        </div>
      </section>

      {/* Impact by the Numbers */}
      <section id="impact" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Impact by the Numbers</h2>
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="bg-cream rounded-2xl p-6 text-center border border-gray-100">
                <CountUp
                  end={s.end}
                  suffix={s.suffix}
                  className="text-3xl md:text-4xl font-heading font-bold text-primary mb-2"
                />
                <p className="text-sm text-foreground/70 leading-snug">{s.label}</p>
              </div>
            ))}
            <div className="bg-primary rounded-2xl p-6 text-center flex flex-col justify-center">
              <p className="text-xl md:text-2xl font-heading font-bold text-white leading-tight mb-2">Stronger Together</p>
              <p className="text-sm text-white/80 leading-snug">Building Financial Freedom for Atlantic City</p>
            </div>
          </div>
        </div>
      </section>

      {/* You're Not Alone CTA */}
      <section id="get-started" className="bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 items-center">
          <div className="relative min-h-70 lg:min-h-105">
            <Image
              src="/si-advising.jpg"
              alt="An AC COOP navigator listening to and guiding a community member"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="px-4 sm:px-6 lg:px-12 py-14 lg:py-20">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              You&apos;re Not Alone. We&apos;re Here for You.
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed mb-8 max-w-lg">
              Take the first step toward a brighter future. Our team is ready to listen, guide and connect you to what you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2">
                Start Your Intake <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </CTAButton>
              <CTAButton className="bg-white text-primary border-2 border-primary hover:bg-primary/5 px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 inline-flex items-center justify-center">
                Learn More About Services
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Become a Services Provider / Partner */}
      <section id="partner" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
                Become a Services Provider / Partner
              </h2>
              <p className="text-lg text-foreground/70 leading-relaxed mb-3">
                Do you provide products or services that help Atlantic City residents on public assistance?
              </p>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Join our Impact Partner Digital Network and help us create opportunities that change lives.
              </p>
              <ul className="space-y-3 mb-8">
                {partnerBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                      <Check className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
                    </span>
                    <span className="text-foreground/80">{b}</span>
                  </li>
                ))}
              </ul>
              <CTAButton className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2">
                Become a Partner <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </CTAButton>
            </div>
            <div className="relative order-first lg:order-last">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/si-partner.jpg"
                  alt="An AC COOP partnership agreement sealed with a handshake"
                  width={800}
                  height={600}
                  quality={85}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
