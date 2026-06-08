import Image from 'next/image';
import {
  Apple,
  Handshake,
  Briefcase,
  GraduationCap,
  Store,
  Building2,
  Award,
  Users,
  Heart,
  Gift,
  ShoppingCart,
  Truck,
  Sprout,
  UtensilsCrossed,
  Download,
  Phone,
  Check,
  ChevronDown,
  ArrowRight,
  Mail,
  Globe,
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import SponsorInterestForm from '../components/SponsorInterestForm';

export const metadata = {
  title: 'Become a Sponsor | Atlantic City Community Cooperative',
  description:
    'Sponsor the future of food, ownership, and opportunity in Atlantic City. Support a community-owned supermarket, delivery network, and social impact hub through founding, program, and in-kind sponsorships.',
  alternates: { canonical: 'https://accoop.com/sponsorship' },
};

const infrastructure = [
  { title: 'Healthy Food Access', icon: Apple, desc: 'A community-centered grocery model focused on affordable, accessible, and nutritious food for Atlantic City residents.' },
  { title: 'Community Ownership', icon: Handshake, desc: 'A cooperative structure that allows residents to participate as members, not just customers.' },
  { title: 'Workforce Development', icon: Briefcase, desc: 'Training and employment opportunities in grocery retail, customer service, logistics, food handling, urban agriculture, entrepreneurship, and cooperative business operations.' },
  { title: 'Youth Opportunity', icon: GraduationCap, desc: 'Paid work-based learning, career exposure, and hands-on experience for young people in Atlantic City.' },
  { title: 'Small Business Growth', icon: Store, desc: 'A marketplace for local vendors, food entrepreneurs, growers, makers, and community-based businesses.' },
  { title: 'Neighborhood Revitalization', icon: Building2, desc: 'A visible, mission-driven anchor that activates community space and supports local economic development.' },
];

const whyProvides = [
  { icon: ShoppingCart, text: 'Affordable access to healthy and culturally relevant groceries' },
  { icon: Users, text: 'Community ownership opportunities for Atlantic City residents' },
  { icon: GraduationCap, text: 'Paid work-based learning and job training' },
  { icon: Store, text: 'Support for local vendors, food entrepreneurs, and small businesses' },
  { icon: Truck, text: 'Delivery access for seniors and residents with transportation barriers' },
  { icon: Heart, text: 'Nutrition education, community events, and outreach' },
  { icon: Building2, text: 'A local platform for nonprofits and service organizations to connect with residents' },
];

const tiers = [
  {
    name: 'Founding Legacy Sponsor',
    price: '$100,000+',
    icon: Award,
    iconBg: 'bg-primary',
    border: 'border-t-primary',
    desc: 'For anchor institutions, major corporations, philanthropic foundations, hospitals, banks, casinos, universities, and regional employers that want to play a leadership role in launching the Co-Op.',
    benefits: [
      'Premier recognition as a Founding Legacy Sponsor',
      'Prominent logo placement on website and sponsor materials',
      'Recognition in launch announcements and media materials',
      'Recognition at launch events and community briefings',
      'Featured sponsor spotlight story or video',
      'Logo placement in the Co-Op facility, subject to final design',
      'Invitation to sponsor advisory roundtables',
      'Quarterly impact updates',
      'Annual impact report recognition',
      'Potential naming opportunity for a major program area',
    ],
  },
  {
    name: 'Community Ownership Sponsor',
    price: '$50,000',
    icon: Users,
    iconBg: 'bg-primary-dark',
    border: 'border-t-primary-dark',
    desc: 'Supports resident membership, community outreach, and cooperative ownership education.',
    support: [
      'Resident membership assistance',
      'Community ownership education',
      'Neighborhood outreach',
      'Member sign-up campaigns',
      'Resident ambassador activities',
    ],
    benefits: [
      'Recognition on website and sponsor materials',
      'Logo placement at launch events',
      'Sponsor recognition in annual impact report',
      'Social media and email recognition',
      'Opportunity to support a Community Ownership Day',
    ],
  },
  {
    name: 'Healthy Food Access Sponsor',
    price: '$25,000',
    icon: Apple,
    iconBg: 'bg-primary-light',
    border: 'border-t-primary-light',
    desc: 'Supports affordable groceries, nutrition access, delivery, and food security programming.',
    support: [
      'Grocery affordability initiatives',
      'Produce discounts',
      'Senior grocery access',
      'Family food packages',
      'SNAP/EBT outreach',
      'Nutrition education',
      'Community cooking demonstrations',
    ],
    benefits: [
      'Logo recognition on website',
      'Recognition in healthy food access campaign materials',
      'Social media recognition',
      'Annual impact report listing',
      'Opportunity to co-host a food access or wellness event',
    ],
  },
  {
    name: 'Workforce & Youth Opportunity Sponsor',
    price: '$15,000',
    icon: Briefcase,
    iconBg: 'bg-yellow-500',
    border: 'border-t-yellow-500',
    desc: 'Supports paid work-based learning, job training, and career pathways for Atlantic City residents and youth.',
    support: [
      'Youth employment stipends',
      'Job readiness training',
      'Retail and customer service training',
      'Food handling certification support',
      'Delivery and logistics training',
      'Career coaching',
      'Work-based learning experiences',
    ],
    benefits: [
      'Recognition on workforce program materials',
      'Logo placement on sponsor page',
      'Recognition at youth and workforce events',
      'Annual impact report listing',
      'Opportunity to host a career session or employer talk',
    ],
  },
  {
    name: 'Small Business & Vendor Sponsor',
    price: '$10,000',
    icon: Store,
    iconBg: 'bg-orange-500',
    border: 'border-t-orange-500',
    desc: 'Supports local vendors, food entrepreneurs, makers, and small businesses that want to sell through or partner with the Co-Op.',
    support: [
      'Vendor onboarding',
      'Food business training',
      'Packaging and labeling support',
      'Product photography',
      'Business licensing support',
      'Pop-up market opportunities',
      'Local vendor showcase events',
    ],
    benefits: [
      'Recognition on vendor development materials',
      'Website logo listing',
      'Social media recognition',
      'Annual impact report listing',
      'Opportunity to co-host a small business workshop',
    ],
  },
  {
    name: 'Neighborhood Partner Sponsor',
    price: '$5,000',
    icon: Heart,
    iconBg: 'bg-blue-500',
    border: 'border-t-blue-500',
    desc: 'Supports community outreach, events, resident engagement, and neighborhood-based programming.',
    support: [
      'Community events',
      'Resident sign-up drives',
      'Printed outreach materials',
      'Volunteer activities',
      'Family food days',
      'Neighborhood listening sessions',
    ],
    benefits: [
      'Logo or name recognition on website',
      'Social media thank-you',
      'Recognition at community events',
      'Annual impact report listing',
      'Invitation to sponsor/community events',
    ],
  },
];

const communityFriend = {
  support: ['Resident memberships', 'Grocery gift cards', 'Community meals', 'Youth stipends', 'Outreach materials', 'Volunteer supplies'],
  benefits: ['Name listing on website', 'Social media recognition', 'Community supporter certificate', 'Invitation to launch and community events'],
};

const inKindExamples = [
  'Refrigeration equipment', 'Shelving and fixtures', 'Grocery bags and packaging', 'Printing and signage',
  'Marketing and design support', 'Legal, accounting, or consulting services', 'Technology and software',
  'Laptops, tablets, or point-of-sale systems', 'Delivery support', 'Food donations', 'Volunteer teams',
  'Construction materials', 'Cleaning supplies', 'Security systems', 'Professional training',
];

const impactAreas = [
  { title: 'Resident Membership Fund', icon: Users, desc: 'Help Atlantic City residents become members and owners of the Co-Op.' },
  { title: 'Healthy Grocery Access Fund', icon: ShoppingCart, desc: 'Help families access affordable fruits, vegetables, staple foods, and culturally relevant groceries.' },
  { title: 'Youth Work-Based Learning Fund', icon: GraduationCap, desc: 'Support paid learning opportunities for youth and young adults.' },
  { title: 'Senior and Family Delivery Access', icon: Truck, desc: 'Help provide delivery options for seniors, residents with disabilities, and families with limited transportation.' },
  { title: 'Local Vendor and Food Entrepreneur Fund', icon: Store, desc: 'Help local entrepreneurs bring their products to market.' },
  { title: 'Urban Agriculture and Sustainability', icon: Sprout, desc: 'Support local growing, aquaponics, vertical farming, and food system innovation.' },
  { title: 'Community Kitchen and Nutrition Education', icon: UtensilsCrossed, desc: 'Support cooking demonstrations, healthy meal education, wellness workshops, and family nutrition programming.' },
];

const whoShouldSponsor = [
  'Corporations', 'Casinos and hospitality companies', 'Banks and financial institutions',
  'Hospitals and healthcare organizations', 'Insurance companies', 'Universities and colleges', 'Foundations',
  'Local businesses', 'Real estate developers', 'Utility companies', 'Restaurants and food businesses',
  'Professional service firms', 'Nonprofits and community organizations', 'Faith-based organizations',
  'Civic associations', 'Individual community supporters',
];

const whatSponsorsReceive = [
  'Website recognition', 'Logo placement', 'Social media recognition', 'Email newsletter recognition',
  'Launch event recognition', 'Community event visibility', 'Sponsor spotlight stories',
  'Press and media recognition opportunities', 'Annual impact report listing', 'Facility recognition',
  'Program naming opportunities', 'Volunteer engagement opportunities', 'Sponsor roundtable invitations',
  'Quarterly impact updates', 'Customized impact reporting for major sponsors',
];

const sponsorshipImpact = [
  'Number of residents reached', 'Number of Co-Op members enrolled', 'Number of families receiving grocery support',
  'Number of youth and adults trained', 'Number of paid work-based learning opportunities created',
  'Number of local vendors supported', 'Number of community events hosted', 'Number of delivery access households served',
  'Amount of local purchasing supported', 'Community education and wellness participation',
];

function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
      <CTAButton formType="sponsor" label="Become a Sponsor" className="bg-accent hover:bg-accent/90 text-foreground px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2">
        Become a Sponsor <ArrowRight className="w-4 h-4" />
      </CTAButton>
      <CTAButton formType="sponsor" label="Download Packet" className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2">
        Download Packet <Download className="w-4 h-4" />
      </CTAButton>
      <CTAButton formType="sponsor" label="Schedule a Call" className="bg-white/10 hover:bg-white/20 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/50 inline-flex items-center justify-center gap-2">
        Schedule a Call <Phone className="w-4 h-4" />
      </CTAButton>
    </div>
  );
}

function TierDetails({ support, benefits }: { support?: string[]; benefits: string[] }) {
  return (
    <details className="group mt-auto">
      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden mt-5 w-full border border-primary/30 text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors duration-300 inline-flex items-center justify-center gap-2">
        <span className="group-open:hidden">View Benefits</span>
        <span className="hidden group-open:inline">Hide Benefits</span>
        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="mt-5 text-left space-y-5">
        {support && (
          <div>
            <p className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground/50 mb-2">
              Your sponsorship may support
            </p>
            <ul className="space-y-1.5">
              {support.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground/50 mb-2">
            Sponsor benefits may include
          </p>
          <ul className="space-y-1.5">
            {benefits.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </details>
  );
}

export default function SponsorshipPage() {
  return (
    <>
      {/* ============ HERO ============ */}
      <section className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-white/15 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                Become a Sponsor
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-bold leading-[1.1] mb-6">
                Sponsor the Future of Food, Ownership, and Opportunity in{' '}
                <span className="text-accent">Atlantic City</span>
              </h1>
              <p className="text-lg text-white/90 leading-relaxed mb-5">
                Atlantic City Community Co-Op is building more than a grocery store. We are creating a
                community-owned food access hub where residents, businesses, nonprofits, and institutions
                can work together to strengthen food security, create jobs, support local entrepreneurs,
                and keep more economic value circulating inside Atlantic City.
              </p>
              <p className="text-base font-heading font-semibold text-white mb-8">
                Become a Founding Sponsor and help build a stronger, healthier, community-owned Atlantic City.
              </p>
              <HeroButtons />
            </div>

            <div className="relative h-72 sm:h-96 lg:h-130 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Image
                src="/hero-building.webp"
                alt="7 South Carolina Avenue — future home of the Atlantic City Community Co-Op"
                fill
                priority
                quality={85}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary-dark/40 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ WHY SPONSOR ============ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: heading + intro + callout */}
            <div>
              <p className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-3">
                Why Sponsor
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 leading-tight">
                Why Sponsor the Atlantic City Community Co-Op?
              </h2>
              <p className="text-lg text-foreground/75 leading-relaxed mb-8">
                Atlantic City needs a long-term solution that connects food access with local ownership,
                employment, entrepreneurship, and community wealth-building. The Atlantic City Community
                Co-Op is designed to serve as a neighborhood-centered model that provides:
              </p>

              <div className="relative bg-primary text-white rounded-2xl p-6 sm:p-7 overflow-hidden">
                <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full" aria-hidden="true" />
                <p className="relative text-lg sm:text-xl font-heading font-semibold leading-snug">
                  Your sponsorship helps move Atlantic City from food assistance to{' '}
                  <span className="text-accent">food ownership</span>.
                </p>
              </div>
            </div>

            {/* Right: provides list */}
            <div className="space-y-3">
              {whyProvides.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.text}
                    className="group flex items-center gap-4 bg-cream hover:bg-primary/10 border border-transparent hover:border-primary/15 rounded-2xl p-4 sm:p-5 transition-colors duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <p className="text-foreground/85 font-medium">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMMUNITY INFRASTRUCTURE ============ */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              A Community Infrastructure Project, Not Just a Store
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The Atlantic City Community Co-Op is being developed as a multi-purpose community asset. It will support:
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructure.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STRONGER AC STATS ============ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary/5 border border-primary/10 rounded-3xl p-8 md:p-12 grid lg:grid-cols-[1.2fr_2fr] gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-3">
                A Stronger Atlantic City Starts With Us
              </h2>
              <p className="text-foreground/70">
                Together, we can create a future where residents have access to healthy food, meaningful
                work, and ownership opportunities.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:border-l lg:border-primary/15 lg:pl-8">
              {[
                { stat: '100%', label: 'Community Owned' },
                { stat: 'Local', label: 'Focused on Atlantic City Residents' },
                { stat: 'Jobs', label: 'Training & Employment Opportunities' },
                { stat: 'Stronger', label: 'Building Community Wealth' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl md:text-3xl font-heading font-bold text-primary mb-1">{s.stat}</p>
                  <p className="text-sm text-foreground/70 leading-snug">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SPONSORSHIP LEVELS ============ */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-heading font-semibold text-primary uppercase tracking-wider mb-2">
              Sponsorship Opportunities
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Sponsorship Levels
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We offer multiple sponsorship levels so organizations of all sizes can participate. Choose
              the level that aligns with your organization&apos;s goals and community impact.
            </p>
          </div>

          {/* 6 tier cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {tiers.map((tier) => {
              const Icon = tier.icon;
              return (
                <div
                  key={tier.name}
                  className={`bg-white rounded-3xl p-7 shadow-md border-t-4 ${tier.border} flex flex-col text-center items-center`}
                >
                  <div className={`w-16 h-16 rounded-full ${tier.iconBg} flex items-center justify-center mb-4 shadow-sm`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-foreground mb-1 leading-tight">{tier.name}</h3>
                  <p className="text-2xl font-heading font-bold text-primary mb-3">{tier.price}</p>
                  <p className="text-sm text-foreground/70 mb-2">{tier.desc}</p>
                  <TierDetails support={tier.support} benefits={tier.benefits} />
                  <CTAButton formType="sponsor" className="mt-4 w-full bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors duration-300">
                    Become a Sponsor
                  </CTAButton>
                </div>
              );
            })}
          </div>

          {/* Community Friend Sponsor bar */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7 mb-6">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Handshake className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <h3 className="text-lg font-heading font-bold text-foreground">Community Friend Sponsor</h3>
                  <span className="text-primary font-bold">$1,000 to $2,500</span>
                </div>
                <p className="text-sm text-foreground/70 mb-3">
                  An accessible sponsorship level for small businesses, families, civic groups, faith-based
                  organizations, and individual supporters.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                      Your sponsorship may support
                    </p>
                    <ul className="space-y-1.5">
                      {communityFriend.support.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground/50 mb-2">
                      Sponsor benefits may include
                    </p>
                    <ul className="space-y-1.5">
                      {communityFriend.benefits.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <CTAButton formType="sponsor" label="Become a Sponsor" className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors duration-300 shrink-0 self-start whitespace-nowrap">
                Learn More
              </CTAButton>
            </div>
          </div>

          {/* In-Kind or Service Sponsor */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-7">
            <div className="flex flex-col md:flex-row gap-5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-heading font-bold text-foreground mb-1">In-Kind or Service Sponsor</h3>
                <p className="text-sm text-foreground/70 mb-4">
                  Organizations may also support the Co-Op through donated goods, services, equipment, or
                  professional expertise. Examples include:
                </p>
                <ul className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5 mb-4">
                  {inKindExamples.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-foreground/75">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-foreground/60 italic">
                  In-kind sponsors will receive recognition based on the estimated value and impact of their contribution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SPONSOR A SPECIFIC IMPACT AREA ============ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Sponsor a Specific Impact Area
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Sponsors may also choose to direct support toward a specific program area.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {impactAreas.map((area, i) => {
              const Icon = area.icon;
              const isLast = i === impactAreas.length - 1;
              return (
                <div
                  key={area.title}
                  className={`group bg-cream p-6 rounded-2xl hover:bg-primary/10 transition-colors duration-300 flex items-start gap-4 w-full sm:w-[calc(50%-0.75rem)] ${
                    isLast ? 'lg:w-full' : 'lg:w-[calc(33.333%-1rem)]'
                  }`}
                >
                  <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{area.title}</h3>
                    <p className="text-sm text-foreground/70">{area.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ WHO SHOULD SPONSOR ============ */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            Who Should Become a Sponsor?
          </h2>
          <p className="text-lg text-foreground/70 mb-8">We welcome sponsorship from:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {whoShouldSponsor.map((who) => (
              <span
                key={who}
                className="bg-white border border-gray-200 text-foreground/80 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
              >
                {who}
              </span>
            ))}
          </div>
          <p className="text-foreground/70 max-w-3xl mx-auto">
            Whether your organization is large or small, your support can help create a visible and
            lasting impact in Atlantic City.
          </p>
        </div>
      </section>

      {/* ============ WHAT SPONSORS RECEIVE + IMPACT ============ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div className="bg-cream rounded-3xl p-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">What Sponsors Receive</h2>
            <p className="text-foreground/70 mb-6">Sponsorship benefits may include:</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
              {whatSponsorsReceive.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-foreground/60 italic">
              Final benefits may vary based on sponsorship level, timing, and sponsorship agreement.
            </p>
          </div>

          <div className="bg-cream rounded-3xl p-8">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Our Sponsorship Impact</h2>
            <p className="text-foreground/70 mb-6">
              Your sponsorship helps us build a stronger community food system while supporting measurable
              outcomes. Potential impact areas include:
            </p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
              {sponsorshipImpact.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-foreground/60 italic">
              Sponsors will receive updates showing how their support is helping move the project forward.
            </p>
          </div>
        </div>
      </section>

      {/* ============ BECOME A FOUNDING SPONSOR (CTA BAND) ============ */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <div className="absolute inset-0">
          <Image src="/community-hands.jpg" alt="" fill className="object-cover opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-linear-to-r from-primary-dark via-primary-dark/95 to-primary" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-5">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold">Become a Founding Sponsor</h2>
          <p className="text-white/90 leading-relaxed">
            This is an opportunity to support a community-owned model that connects food, health, jobs,
            entrepreneurship, and neighborhood revitalization. Atlantic City Community Co-Op is not just
            asking for sponsorship. We are inviting partners to help build a permanent community asset.
          </p>
          <p className="text-lg font-heading font-semibold">
            Sponsor the Atlantic City Community Co-Op and help create a future where Atlantic City residents
            have access to healthy food, meaningful work, local ownership, and economic opportunity.
          </p>
          <div className="flex justify-center pt-2">
            <HeroButtons />
          </div>
        </div>
      </section>

      {/* ============ SPONSOR INTEREST FORM ============ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Sponsor Interest Form
            </h2>
            <p className="text-lg text-foreground/70">
              Please complete the form below and a member of our team will contact you.
            </p>
          </div>
          <SponsorInterestForm />
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">Contact</h2>
          <p className="text-foreground/70 mb-6">For sponsorship inquiries, please contact:</p>
          <p className="font-heading font-semibold text-foreground mb-4">
            Atlantic City Community Co-Op Sponsorship Team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-foreground/80">
            <a href="mailto:info@accoop.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Mail className="w-5 h-5 text-primary" /> info@accoop.com
            </a>
            <a href="tel:6093188011" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="w-5 h-5 text-primary" /> (609) 318-8011
            </a>
            <a href="https://beta.accoop.com" className="inline-flex items-center gap-2 hover:text-primary transition-colors">
              <Globe className="w-5 h-5 text-primary" /> beta.accoop.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
