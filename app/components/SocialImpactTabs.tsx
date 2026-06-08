'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CTAButton from './CTAButton';
import {
  Apple,
  ClipboardList,
  Home as HomeIcon,
  Zap,
  HeartPulse,
  GraduationCap,
  Briefcase,
  Wallet,
  Store,
  Crown,
  Car,
  Baby,
  Scale,
  Users,
  HeartHandshake,
  Building2,
  ShieldCheck,
  Phone,
  Laptop,
  Target,
  Wrench,
  Hammer,
  Lightbulb,
  Award,
  Compass,
  MapPin,
  ChevronRight,
} from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'member-support', label: 'Member Support' },
  { id: 'partners', label: 'For Partners' },
  { id: 'ideal-institute', label: 'Ideal Institute' },
  { id: 'faq', label: 'FAQ' },
];

const whatCenterDoes = [
  { icon: Apple, title: 'Food Access & Nutrition Support', desc: 'Fresh food access, grocery support, Boardwalk Basket delivery support, nutrition education, SNAP/EBT guidance, healthy cooking workshops, and emergency food referrals.' },
  { icon: ClipboardList, title: 'Benefits & Public Assistance Navigation', desc: 'Support identifying and connecting with available federal, state, county, local, nonprofit, and community-based benefits and services.' },
  { icon: HomeIcon, title: 'Housing & Utility Support', desc: 'Referrals for housing stability, rental assistance, utility support, weatherization, eviction prevention, and related community resources.' },
  { icon: HeartPulse, title: 'Healthcare & Wellness Navigation', desc: 'Connection to healthcare providers, Medicaid/Medicare resources, primary and dental care, behavioral health, preventive screenings, and wellness partners.' },
  { icon: GraduationCap, title: 'Education & Job Readiness', desc: 'Academic assessment, digital literacy, career readiness, resume and interview prep, credential training, and pathways through Ideal Institute of Technology.' },
  { icon: Wallet, title: 'Financial Empowerment', desc: 'Financial assessment, budgeting, credit readiness, savings planning, banking access, tax referrals, benefits cliff awareness, and long-term planning.' },
  { icon: Store, title: 'Entrepreneurship & Small Business Support', desc: 'Business idea review, Boardwalk Basket vendor pathway, cloud kitchen opportunities, marketing support, licensing referrals, and small business coaching.' },
  { icon: Crown, title: 'Co-op Ownership & Community Leadership', desc: 'Pathways to become a Community Owner Member, block captain, vendor, youth ambassador, service partner, sponsor, or community leader.' },
];

const howItWorks = [
  { title: 'Join or Connect With the Co-op', desc: 'Begin as a co-op member, Prime Member, community resident, service provider referral, block captain referral, or partner referral.' },
  { title: 'Complete the Social Impact Intake', desc: 'The intake helps us understand your household, benefits, barriers, food needs, housing, employment, education goals, health access, and financial condition.' },
  { title: 'Complete Four Assessments', desc: 'Members may receive a Financial Assessment, Barrier Assessment, Academic Assessment, and Job Readiness Assessment.' },
  { title: 'Receive an Individual Empowerment Plan', desc: 'A personalized roadmap with immediate needs, referrals, benefits to explore, training, job readiness steps, financial goals, and ownership opportunities.' },
  { title: 'Get Connected to Trusted Partners', desc: 'The Center connects members to service providers, agencies, nonprofits, healthcare organizations, workforce partners, employers, and small business support.' },
  { title: 'Follow Up and Move Forward', desc: 'The Center tracks referrals, follows up, and helps each person move from support to stability, income, and ownership.' },
];

const empowermentPlan = [
  'Immediate food, housing, healthcare, transportation, or utility needs',
  'Benefits and services to apply for',
  'Provider referrals',
  'Food access plan',
  'Financial empowerment plan',
  'Education and training pathway',
  'Job readiness and employment pathway',
  'Entrepreneurship or vendor pathway',
  'Co-op ownership pathway',
  '30-day, 90-day, 6-month, and 12-month goals',
  'Follow-up schedule with a navigator',
];

const primeMemberBenefits = [
  'One-on-one navigation support',
  'Benefits and resource screening',
  'Individual Empowerment Plan',
  'Food access support',
  'Boardwalk Basket delivery support where available',
  'Financial assessment and coaching',
  'Barrier assessment and referral support',
  'Academic and job readiness assessment',
  'Training pathway through Ideal Institute of Technology',
  'Work-based learning and job readiness support',
  'Referrals to trusted providers',
  'Follow-up support',
  'Co-op ownership education',
];

const serviceCategories = [
  { icon: Apple, title: 'Food & Nutrition' },
  { icon: ClipboardList, title: 'Public Benefits' },
  { icon: HomeIcon, title: 'Housing' },
  { icon: Zap, title: 'Utilities & Energy' },
  { icon: HeartPulse, title: 'Healthcare' },
  { icon: GraduationCap, title: 'Education' },
  { icon: Briefcase, title: 'Employment' },
  { icon: Wallet, title: 'Financial Stability' },
  { icon: Car, title: 'Transportation' },
  { icon: Baby, title: 'Childcare & Family Support' },
  { icon: Scale, title: 'Reentry & Legal Support' },
  { icon: Store, title: 'Entrepreneurship' },
];

const partnerCategories = [
  { title: 'Social Service Providers', desc: 'Organizations serving residents through public benefits, emergency assistance, family support, case management, senior services, disability support, or community programs.' },
  { title: 'Healthcare Providers', desc: 'Primary care, dental, behavioral health, substance recovery, community health, preventive care, wellness, Medicaid/Medicare support, pharmacies, and health education.' },
  { title: 'Housing and Utility Providers', desc: 'Housing agencies, rental assistance providers, eviction prevention partners, housing counselors, utility assistance programs, and weatherization providers.' },
  { title: 'Education and Workforce Providers', desc: 'Training providers, schools, colleges, apprenticeship programs, career services, adult education, digital literacy programs, and employer partners.' },
  { title: 'Financial Empowerment Providers', desc: 'Banks, credit unions, CDFIs, financial coaches, tax preparers, credit counselors, debt support providers, insurance professionals, and homeownership counselors.' },
  { title: 'Food and Nutrition Providers', desc: 'Food pantries, farms, nutrition educators, meal providers, grocery partners, food access organizations, community gardens, and healthy food providers.' },
  { title: 'Transportation and Mobility Providers', desc: 'Transportation providers, mobility services, delivery partners, senior transportation, medical transportation, and access-to-work transportation.' },
  { title: 'Legal and Reentry Providers', desc: 'Legal aid, reentry support, expungement support, ID/document assistance, immigration support, court navigation, and justice-involved resident support.' },
  { title: 'Childcare and Family Support Providers', desc: 'Childcare providers, youth programs, family service agencies, parenting support programs, early childhood providers, and school support organizations.' },
  { title: 'Small Businesses & Professional Services', desc: 'Businesses offering discounted, sponsored, or preferred services for COOP members — accounting, insurance, home repair, technology, wellness, and more.' },
];

const partnerBenefits = [
  { title: 'Reach More Eligible Residents', desc: 'Connect with Atlantic City residents and co-op members who may already qualify for your services.' },
  { title: 'Receive Better Referrals', desc: "COOP's intake and assessment process helps identify member needs before referrals are made." },
  { title: 'Improve Follow-Up', desc: 'Our navigator team can support members with documentation, appointment reminders, and follow-up.' },
  { title: 'Build Trust in the Community', desc: 'Work through a resident-centered cooperative model rooted in local ownership, dignity, and accountability.' },
  { title: 'Join a Digital Partner Network', desc: 'A coordinated referral network designed to connect members with the right service at the right time.' },
  { title: 'Demonstrate Impact', desc: 'Participate in shared impact reporting, community events, service days, workshops, and funder-facing outcome stories.' },
  { title: "Support Economic Mobility", desc: 'Help residents move from benefits to stability, from stability to income, and from income to ownership.' },
];

const partnerLevels = [
  { tier: 'Tier 1', name: 'Listed Resource Partner', desc: 'For organizations that want to be included in the COOP service directory.', items: ['Directory listing', 'Program/service description', 'Eligibility criteria', 'Contact information', 'Referral instructions'] },
  { tier: 'Tier 2', name: 'Referral Partner', desc: 'For organizations ready to accept referrals from COOP navigators.', items: ['Digital referral participation', 'Service category listing', 'Referral contact person', 'Follow-up coordination', 'Quarterly partner check-ins'] },
  { tier: 'Tier 3', name: 'Strategic Impact Partner', desc: 'For organizations ready for formal collaboration and shared outcomes.', items: ['MOU or partner agreement', 'Priority service pathway', 'Closed-loop referrals', 'Joint workshops', 'Shared impact metrics', 'Co-branded outreach'] },
  { tier: 'Tier 4', name: 'Preferred Member Service Provider', desc: 'For businesses offering discounted, sponsored, or priority services to members.', items: ['Preferred provider listing', 'Member benefit description', 'Discount/special access terms', 'Member referral pathway', 'Opportunity to sponsor Prime Members'] },
];

const partnerExpectations = [
  'Serve COOP members with dignity and respect',
  'Provide clear service descriptions and eligibility criteria',
  'Identify a reliable point of contact',
  'Respond to referrals in a reasonable timeframe',
  'Notify COOP when a referral is accepted, pending, or unable to be served',
  'Participate in follow-up when appropriate',
  'Keep service information current',
  'Protect member privacy and confidentiality',
  'Participate in partner meetings or service days when possible',
  'Support the broader mission of community stability and economic mobility',
];

const programPathways = [
  { icon: Laptop, label: 'Digital Literacy' },
  { icon: Target, label: 'Career Readiness' },
  { icon: Wrench, label: 'Job Training' },
  { icon: Briefcase, label: 'Paid Work-Based Learning' },
  { icon: Hammer, label: 'Apprenticeships' },
  { icon: Lightbulb, label: 'Entrepreneurship Training' },
  { icon: Store, label: 'Small Business Support' },
  { icon: Award, label: 'Youth Leadership' },
  { icon: Compass, label: 'Community Navigator Training' },
  { icon: MapPin, label: 'Block Captain Training' },
];

const faqs = [
  { q: 'What is the Center for Social Impact?', a: "The Center for Social Impact is COOP's member-support hub. It helps members complete one intake, receive assessments, build an Individual Empowerment Plan, and connect with trusted service providers." },
  { q: 'Who can use the Center?', a: 'The Center is designed for COOP members and Atlantic City residents, with priority support for Prime Members receiving public assistance or facing barriers to stability.' },
  { q: 'What is a Prime Member?', a: 'A Prime Member is a COOP member receiving public assistance or facing significant barriers such as food insecurity, housing instability, unemployment, health needs, transportation challenges, or financial hardship.' },
  { q: 'Does COOP provide all services directly?', a: 'No. COOP provides intake, assessment, navigation, planning, referrals, and follow-up. Many services are delivered through trusted service providers and impact partners.' },
  { q: 'How can my organization become a service provider?', a: 'Complete the Partner Application. COOP will review your services, eligibility requirements, contact process, and partnership fit.' },
  { q: 'What types of providers can join?', a: 'Nonprofits, public agencies, healthcare providers, employers, workforce providers, financial institutions, housing organizations, legal aid, food access partners, transportation providers, childcare providers, and businesses serving Atlantic City residents.' },
  { q: 'Can businesses become preferred service providers?', a: 'Yes. Businesses that provide useful, ethical, affordable, discounted, sponsored, or priority services to COOP members can apply to become Preferred Member Service Providers.' },
  { q: 'Is this only for people receiving public assistance?', a: 'No. The Center can serve all COOP members, but Prime Members receiving public assistance or facing serious barriers receive priority navigation and support.' },
];

function SectionHeading({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">{children}</h2>
      <div className="w-16 h-1 bg-accent rounded-full mt-4" />
      {sub && <p className="text-lg text-foreground/70 leading-relaxed mt-5 max-w-3xl">{sub}</p>}
    </div>
  );
}

export default function SocialImpactTabs() {
  const [active, setActive] = useState('overview');
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setStuck(!e.isIntersecting), { threshold: 0 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const selectTab = (id: string) => {
    setActive(id);
    const wrap = contentRef.current;
    if (!wrap) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const y = wrap.getBoundingClientRect().top + window.scrollY - 60;
    window.scrollTo({ top: y, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  // WAI-ARIA tabs keyboard pattern: arrow keys / Home / End move and activate.
  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const i = TABS.findIndex((t) => t.id === active);
    let n = i;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') n = (i + 1) % TABS.length;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') n = 0;
    else if (e.key === 'End') n = TABS.length - 1;
    else return;
    e.preventDefault();
    setActive(TABS[n].id);
    tabRefs.current[n]?.focus();
  };

  const panel = (id: string) => ({
    role: 'tabpanel' as const,
    id: `panel-${id}`,
    'aria-labelledby': `tab-${id}`,
    tabIndex: 0,
    hidden: active !== id,
  });

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />

      {/* Secondary navbar = tab switcher */}
      <nav
        aria-label="Center for Social Impact sections"
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-y border-gray-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <Link
            href="/"
            aria-label="Atlantic City Community Cooperative — home"
            className={`shrink-0 transition-all duration-300 ${stuck ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}
          >
            <Image src="/logo.png" alt="Atlantic City Community Cooperative" width={160} height={64} className="h-10 w-auto" />
          </Link>
          <div role="tablist" aria-label="Sections" onKeyDown={onTabKeyDown} className="flex-1 flex justify-start lg:justify-center gap-1 sm:gap-2 overflow-x-auto -mb-px [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map((tab, idx) => {
              const isActive = active === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[idx] = el; }}
                  type="button"
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  className={`shrink-0 inline-flex items-center px-3 sm:px-4 py-4 text-sm font-heading font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${
                    isActive ? 'text-primary border-primary' : 'text-foreground/70 border-transparent hover:text-primary hover:border-primary/40'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div ref={contentRef} className="scroll-mt-16">
        {/* OVERVIEW */}
        <div {...panel('overview')}>
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Because Support Should Be Easier to Access</SectionHeading>
              <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
                <p>Many Atlantic City residents face more than one challenge at the same time: food insecurity, housing pressure, transportation barriers, healthcare needs, unemployment, underemployment, public benefit complexity, and limited access to trusted support.</p>
                <p className="font-heading font-semibold text-foreground">The Center for Social Impact was created to simplify that journey.</p>
                <p>Instead of sending residents from office to office, website to website, and agency to agency, COOP is building one trusted front door where members can complete one intake, understand their needs, connect with available services, and receive a practical plan for long-term stability and financial freedom.</p>
                <p>Atlantic City&apos;s food access challenge is directly connected to social and economic mobility. The COOP model responds by connecting food access with social services, workforce development, local business growth, and community ownership.</p>
              </div>
            </div>
          </section>
          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Building a Stronger Atlantic City Through Cooperative Power</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">The COOP Center for Social Impact is not a traditional charity program. It is a cooperative social care and economic mobility hub.</p>
              <p className="text-xl font-heading font-semibold text-primary leading-relaxed">Assess the member. Build the plan. Connect the provider. Track the result. Train the person. Grow the income. Build ownership.</p>
              <p className="text-foreground/70 leading-relaxed">Together, members, service providers, businesses, sponsors, and community partners can build a stronger Atlantic City where residents do not only receive help — they become owners, leaders, workers, entrepreneurs, and builders of the city&apos;s future.</p>
              <div className="pt-2">
                <CTAButton className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Complete Social Impact Intake
                </CTAButton>
              </div>
            </div>
          </section>
        </div>

        {/* HOW IT WORKS */}
        <div {...panel('how-it-works')}>
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Your Pathway Starts With One Intake</SectionHeading>
              <div className="space-y-6">
                {howItWorks.map((s, i) => (
                  <div key={s.title} className="flex gap-5 items-start">
                    <div className="shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">{i + 1}</div>
                    <div className="pt-1">
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{s.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="Every Prime Member can receive an Individual Empowerment Plan — a practical roadmap designed around the member's real household needs and long-term goals.">
                Your Personalized Plan for Stability, Income & Ownership
              </SectionHeading>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {empowermentPlan.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <ClipboardList className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-lg font-heading font-semibold text-foreground bg-primary/5 rounded-2xl p-6 mt-6">
                We do not just give members a list of phone numbers. We help assess the need, build the plan, connect the provider, track the result, and support the next step.
              </p>
            </div>
          </section>
        </div>

        {/* MEMBER SUPPORT */}
        <div {...panel('member-support')}>
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="The Center helps members identify their needs, understand available resources, connect with trusted providers, and build a step-by-step plan toward stability and economic mobility.">
                One Place to Start. Many Pathways to Support.
              </SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whatCenterDoes.map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.title} className="bg-cream p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                      <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                      </div>
                      <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                      <p className="text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Special Support for Prime Members</SectionHeading>
              <div className="grid lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-foreground/80 leading-relaxed">
                  <p>Prime Members are COOP members who receive public assistance or face significant barriers to stability, employment, education, food access, healthcare, housing, transportation, or financial independence.</p>
                  <p>COOP is committed to helping Prime Members move toward the true middle class of America through support, education, employment, entrepreneurship, and cooperative ownership.</p>
                  <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-md mt-4">
                    <Image src="/si-advising.jpg" alt="A navigator supporting a Prime Member" fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Prime Members May Receive</h3>
                  <ul className="space-y-2.5">
                    {primeMemberBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="The Center works with service providers, public agencies, nonprofits, healthcare partners, businesses, and community organizations to help members access support across these areas:">
                Services We Help Members Access
              </SectionHeading>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {serviceCategories.map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.title} className="bg-cream rounded-2xl p-5 shadow-sm flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <span className="font-heading font-semibold text-sm text-foreground">{c.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <Users className="w-12 h-12 mx-auto text-primary" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Need Help? Start With One Intake.</h2>
              <p className="text-lg text-foreground/70 leading-relaxed">If you are a COOP member or Atlantic City resident who needs support, the Center can help you understand your needs, identify available services, and build a plan for your next step. You do not need to know which agency to call first. Start here.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <CTAButton className="bg-primary hover:bg-primary-dark text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Complete Social Impact Intake
                </CTAButton>
                <CTAButton className="bg-white text-primary border-2 border-primary hover:bg-primary/5 px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 inline-flex items-center justify-center">
                  Become a Co-op Member
                </CTAButton>
              </div>
            </div>
          </section>
        </div>

        {/* PARTNERS */}
        <div {...panel('partners')}>
          <section className="py-16 md:py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <Building2 className="w-12 h-12 mx-auto text-accent" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Become a Service Provider / Impact Partner</h2>
              <p className="text-xl text-white/90 font-heading font-medium">Help COOP members access the services, products, benefits, and support they need to build stable households and financially free futures.</p>
              <p className="text-white/80 leading-relaxed">COOP is building an Impact Partner Digital Network for organizations, agencies, businesses, healthcare providers, nonprofits, professionals, and service providers that offer products or services to Atlantic City residents — especially residents receiving public assistance or facing barriers to stability.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <CTAButton className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Apply to Become a Service Provider
                </CTAButton>
                <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
                  Schedule a Partner Meeting
                </CTAButton>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>We Welcome Partners Across Every Area of Community Support</SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerCategories.map((c) => (
                  <div key={c.title} className="bg-cream p-6 rounded-2xl">
                    <h3 className="font-heading font-semibold text-foreground mb-2">{c.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="The Center helps service providers reach the residents who need their support most, while reducing fragmentation and strengthening measurable community impact.">
                Why Partner With COOP?
              </SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partnerBenefits.map((b) => (
                  <div key={b.title} className="bg-white p-6 rounded-2xl shadow-sm">
                    <h3 className="font-heading font-semibold text-foreground mb-2">{b.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Ways to Partner</SectionHeading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {partnerLevels.map((level) => (
                  <div key={level.tier} className="bg-cream rounded-2xl p-6 flex flex-col border-t-4 border-primary">
                    <p className="text-xs font-heading font-bold text-primary uppercase tracking-wider mb-1">{level.tier}</p>
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{level.name}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed mb-4">{level.desc}</p>
                    <ul className="space-y-1.5 mt-auto">
                      {level.items.map((it) => (
                        <li key={it} className="text-xs text-foreground/70 flex items-start gap-1.5">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-cream">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="To protect members and create a trusted network, COOP asks partners to commit to respectful, reliable, and member-centered service.">
                What We Ask From Partners
              </SectionHeading>
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <ul className="grid sm:grid-cols-2 gap-2.5">
                  {partnerExpectations.map((e) => (
                    <li key={e} className="flex items-start gap-2.5 text-sm text-foreground/80">
                      <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-xl order-last lg:order-first">
                  <Image src="/si-partner.jpg" alt="An Impact Partner agreement sealed with a handshake" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="text-center lg:text-left space-y-6">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">Apply to Join the Impact Partner Network</h2>
                  <p className="text-lg text-foreground/70 leading-relaxed">If your organization provides products, programs, benefits, or services for Atlantic City residents — especially residents receiving public assistance or facing barriers to stability — we invite you to apply.</p>
                  <CTAButton className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                    Submit Partner Application
                  </CTAButton>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* IDEAL INSTITUTE */}
        <div {...panel('ideal-institute')}>
          <section className="bg-primary text-white">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2">
              <div className="px-4 sm:px-6 lg:px-8 py-16 lg:py-20 flex flex-col justify-center">
                <p className="text-sm font-heading font-semibold text-accent uppercase tracking-wider mb-2">Powered by</p>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">Powered by Education, Employment & Entrepreneurship</h2>
                <div className="space-y-4 text-white/85 leading-relaxed max-w-lg">
                  <p>The Center for Social Impact is powered by Ideal Institute of Technology, bringing education, workforce training, career coaching, apprenticeships, entrepreneurship, and paid work-based learning into the COOP member support model.</p>
                  <p>This makes the Center more than a referral office. It becomes a pathway to skills, credentials, jobs, business ownership, and long-term financial mobility — including hands-on training in construction, logistics, urban farming, and entrepreneurship.</p>
                </div>
                <div className="bg-white/95 rounded-2xl p-4 inline-flex items-center w-fit shadow-lg mt-8">
                  <Image src="/iitnj logo.png" alt="Ideal Institute of Technology" width={220} height={80} className="h-12 w-auto object-contain" />
                </div>
              </div>
              <div className="p-4 sm:p-6 lg:p-8 flex items-stretch">
                <div className="relative w-full min-h-65 lg:min-h-full rounded-3xl overflow-hidden bg-primary-dark shadow-lg">
                  <Image src="/ideal-building.webp" alt="Ideal Institute of Technology building in Atlantic City" fill sizes="(max-width:1024px) 100vw, 50vw" className="object-contain p-4" />
                </div>
              </div>
            </div>
          </section>
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading sub="From your first digital skill to running your own business — Ideal Institute powers every step of the journey.">
                Program Pathways
              </SectionHeading>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programPathways.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.label}
                      tabIndex={0}
                      className="group flex items-center gap-4 bg-cream rounded-2xl p-5 border border-gray-100 transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:shadow-xl focus-visible:-translate-y-1 focus-visible:bg-primary focus-visible:shadow-xl focus:outline-none"
                    >
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:bg-white/20 group-focus-visible:bg-white/20">
                        <Icon className="w-6 h-6 text-primary transition-colors duration-300 group-hover:text-white group-focus-visible:text-white" aria-hidden="true" />
                      </div>
                      <span className="font-heading font-semibold text-foreground transition-colors duration-300 group-hover:text-white group-focus-visible:text-white">
                        {p.label}
                      </span>
                      <ChevronRight className="ml-auto w-4 h-4 shrink-0 text-primary/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white group-focus-visible:translate-x-1 group-focus-visible:text-white" aria-hidden="true" />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* FAQ */}
        <div {...panel('faq')}>
          <section className="py-16 md:py-20 bg-white">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading>Frequently Asked Questions</SectionHeading>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.q} className="bg-cream rounded-2xl p-6 group">
                    <summary className="font-heading font-semibold text-foreground cursor-pointer list-none flex items-center justify-between gap-4">
                      {faq.q}
                      <span className="text-primary text-xl group-open:rotate-45 transition-transform">+</span>
                    </summary>
                    <p className="text-foreground/70 text-sm leading-relaxed mt-3">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 md:py-20 bg-primary text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
              <HeartHandshake className="w-12 h-12 mx-auto text-accent" aria-hidden="true" />
              <h2 className="text-3xl md:text-4xl font-heading font-bold">Sponsor Prime Member Support</h2>
              <p className="text-lg text-white/90 leading-relaxed">Businesses, hospitals, foundations, employers, professional service firms, and community sponsors can support Prime Members by funding food access, transportation, benefits clinics, health events, financial coaching, job readiness, youth block captains, digital access, and training pathways.</p>
              <p className="text-white/80 leading-relaxed">Your sponsorship helps Atlantic City residents move from public assistance to stability, income, ownership, and financial freedom.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <CTAButton formType="sponsor" className="bg-accent hover:bg-accent/90 text-foreground px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Become a Sponsor
                </CTAButton>
                <CTAButton formType="sponsor" label="Request Sponsorship Packet" className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Request Sponsorship Packet
                </CTAButton>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
