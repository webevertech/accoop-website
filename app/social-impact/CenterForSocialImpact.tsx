'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBasket, BadgeCheck, Home as HomeIcon, HeartPulse, GraduationCap, Wallet,
  Store, Users, Zap, Bus, Scale, Baby, Briefcase, Check, ArrowRight, Menu, X,
  Phone, Heart, Clock, LineChart, DollarSign, Star, Building2,
  type LucideIcon,
} from 'lucide-react';

/* ---------------- data (from the design source) ---------------- */
const NAV = [
  { id: 'what', label: 'What We Do' },
  { id: 'how', label: 'How It Works' },
  { id: 'plan', label: 'Empowerment Plan' },
  { id: 'services', label: 'Services' },
  { id: 'partner', label: 'Partners' },
  { id: 'faq', label: 'FAQ' },
];

const ICONS: Record<string, LucideIcon> = {
  food: ShoppingBasket, benefits: BadgeCheck, housing: HomeIcon, health: HeartPulse,
  edu: GraduationCap, finance: Wallet, biz: Store, coop: Users, utility: Zap,
  transport: Bus, legal: Scale, childcare: Baby, work: Briefcase,
};
const chipTone: Record<string, string> = {
  green: 'bg-primary-light/15 text-primary', gold: 'bg-accent/20 text-[#b27d10]',
  navy: 'bg-primary-dark/15 text-primary-dark', '': 'bg-primary/10 text-primary',
};

const SERVICES = [
  { ic: 'food', cl: 'green', t: 'Food Access & Nutrition', d: 'Fresh food access, grocery support, Boardwalk Basket delivery, SNAP/EBT guidance, healthy cooking workshops, and emergency food referrals.', s: '186k', sl: 'deliveries' },
  { ic: 'benefits', cl: '', t: 'Benefits Navigation', d: 'Support identifying and connecting with available federal, state, county, local, nonprofit, and community-based benefits and services.', s: '$3.8M', sl: 'secured' },
  { ic: 'housing', cl: 'gold', t: 'Housing & Utility Support', d: 'Referrals for housing stability, rental assistance, utility support, weatherization, and eviction prevention resources.', s: '24', sl: 'partners' },
  { ic: 'health', cl: 'green', t: 'Healthcare & Wellness', d: 'Connection to primary, dental, behavioral health, preventive screenings, Medicaid/Medicare support, and wellness partners.', s: '31', sl: 'clinics' },
  { ic: 'edu', cl: '', t: 'Education & Job Readiness', d: 'Academic assessment, digital literacy, career readiness, resume support, credential training, and work-based learning.', s: '870+', sl: 'placements' },
  { ic: 'finance', cl: 'gold', t: 'Financial Empowerment', d: 'Financial assessment, budgeting, credit readiness, savings, banking access, benefits-cliff awareness, and freedom planning.', s: '62%', sl: 'avg. progress' },
  { ic: 'biz', cl: 'green', t: 'Entrepreneurship Support', d: 'Business idea review, Boardwalk Basket vendor pathway, cloud-kitchen opportunities, licensing referrals, and coaching.', s: '64', sl: 'launched' },
  { ic: 'coop', cl: '', t: 'Co-op Ownership', d: 'Pathways to become a Community Owner Member, block captain, vendor, youth ambassador, sponsor, or community leader.', s: '1.2k', sl: 'members' },
];

const ECO = [
  { ic: 'food', cl: 'green', t: 'Food & Nutrition', sub: 'Fresh, affordable, walkable', d: 'Fresh groceries, emergency food, nutrition education, food budgeting, healthy cooking, SNAP support, senior grocery access, and delivery support.', tags: ['Groceries', 'Emergency food', 'SNAP', 'Senior access', 'Delivery'] },
  { ic: 'benefits', cl: '', t: 'Public Benefits', sub: 'Navigate every program', d: 'SNAP, TANF, Medicaid, Medicare support referrals, disability support, unemployment, childcare assistance, senior assistance, and benefit navigation.', tags: ['SNAP', 'TANF', 'Medicaid', 'Disability', 'Childcare'] },
  { ic: 'housing', cl: 'gold', t: 'Housing', sub: 'Stability & prevention', d: 'Rental assistance, eviction prevention, shelter referrals, housing counseling, homeownership readiness, and supportive housing referrals.', tags: ['Rental aid', 'Eviction prevention', 'Counseling', 'Homeownership'] },
  { ic: 'utility', cl: 'gold', t: 'Utilities & Energy', sub: 'Keep the lights on', d: 'Utility assistance, LIHEAP, USF, weatherization, energy support, shutoff prevention, and home energy resources.', tags: ['LIHEAP', 'USF', 'Weatherization', 'Shutoff prevention'] },
  { ic: 'health', cl: 'green', t: 'Healthcare', sub: 'Whole-person care', d: 'Primary care, dental, vision, behavioral health, substance recovery, preventive care, maternal health, senior wellness, and insurance navigation.', tags: ['Primary care', 'Dental', 'Behavioral health', 'Recovery', 'Insurance'] },
  { ic: 'edu', cl: '', t: 'Education', sub: 'Learn & credential', d: 'Adult education, digital literacy, high-school completion, career training, certification programs, apprenticeship readiness, and college pathways.', tags: ['Adult ed', 'Digital literacy', 'Certifications', 'College path'] },
  { ic: 'work', cl: '', t: 'Employment', sub: 'From search to start', d: 'Resume support, interview prep, job-search assistance, paid work-based learning, apprenticeships, employer referrals, and job placement.', tags: ['Resume', 'Interview prep', 'Apprenticeships', 'Placement'] },
  { ic: 'finance', cl: 'gold', t: 'Financial Stability', sub: 'Build & protect', d: 'Budgeting, credit readiness, debt support referrals, banking access, tax filing referrals, savings planning, and benefits-cliff counseling.', tags: ['Budgeting', 'Credit', 'Banking', 'Tax filing', 'Savings'] },
  { ic: 'transport', cl: '', t: 'Transportation', sub: 'Access to work & care', d: 'Transportation referrals, mobility support, delivery options, access-to-work support, and medical transportation referrals.', tags: ['Mobility', 'Access-to-work', 'Medical transport'] },
  { ic: 'childcare', cl: 'green', t: 'Childcare & Family', sub: 'Support the whole household', d: 'Childcare referrals, family stability resources, school support, parent resources, youth programs, and family case coordination.', tags: ['Childcare', 'Youth programs', 'Parent resources', 'School support'] },
  { ic: 'legal', cl: 'navy', t: 'Reentry & Legal', sub: 'A fair second chance', d: 'Legal-aid referrals, reentry support, document replacement, expungement referrals, ID support, and court-related navigation.', tags: ['Legal aid', 'Reentry', 'Expungement', 'ID support'] },
  { ic: 'biz', cl: 'green', t: 'Entrepreneurship', sub: 'Own your work', d: 'Business planning, vendor onboarding, Boardwalk Basket participation, cloud-kitchen pathway, licensing, marketing, and small-business coaching.', tags: ['Business plan', 'Vendor onboarding', 'Cloud kitchen', 'Coaching'] },
];

const STEPS = [
  { t: 'Join or connect with the Co-op', d: "Begin as a co-op member, Prime Member, community resident, or through a service provider, block captain, or partner referral. There's no wrong door — every path leads to the same coordinated support.", chips: ['Co-op Member', 'Prime Member', 'Resident', 'Partner Referral', 'Block Captain'] },
  { t: 'Complete the Social Impact Intake', d: 'One intake helps us understand your household, benefits, barriers, food needs, housing situation, employment status, education goals, and health access — so you only tell your story once.', chips: ['Household', 'Benefits', 'Food & Housing', 'Employment', 'Goals'] },
  { t: 'Complete four assessments', d: 'A complete picture of where you are today — and where you want to go.', chips: ['Financial', 'Barrier', 'Academic', 'Job Readiness'] },
  { t: 'Receive an Individual Empowerment Plan', d: 'A personalized roadmap with immediate needs, referrals, training options, job-readiness steps, financial goals, and ownership opportunities — with 30-day, 90-day, 6-month, and 12-month milestones.', chips: ['Immediate needs', 'Referrals', 'Training', 'Financial goals', 'Ownership path'] },
  { t: 'Get connected to trusted partners', d: 'We connect you to service providers, government agencies, nonprofits, healthcare organizations, workforce partners, financial partners, and employers — the right service at the right time.', chips: ['Healthcare', 'Workforce', 'Financial', 'Housing', 'Employers'] },
  { t: 'Follow up and move forward', d: 'The Center tracks referrals, follows up with members, and helps each person keep moving — from support to stability, stability to income, and income to ownership.', chips: ['Referral tracking', 'Check-ins', 'Closed-loop', 'Next step'] },
];

const PLAN = [
  { label: '30 Days', goals: [
    { st: 'done', t: 'Emergency food + Boardwalk Basket set up', s: 'Immediate household stability' },
    { st: 'done', t: 'Benefits screening — SNAP & Medicaid filed', s: 'Public assistance secured' },
    { st: 'now', t: 'Open a banking account', s: 'Financial coaching session 1' },
    { st: 'next', t: 'Schedule primary-care visit', s: 'Healthcare navigation' },
  ] },
  { label: '90 Days', goals: [
    { st: 'now', t: 'Complete digital-literacy module', s: 'Ideal Institute · 6 weeks' },
    { st: 'now', t: 'Resume + interview prep complete', s: 'Job-readiness track' },
    { st: 'next', t: 'Begin budgeting & credit plan', s: 'Build toward savings' },
    { st: 'next', t: 'Utility assistance approved', s: 'LIHEAP / USF referral' },
  ] },
  { label: '6 Months', goals: [
    { st: 'next', t: 'Start paid work-based learning', s: 'Apprenticeship placement' },
    { st: 'next', t: 'Credit score on track', s: 'Debt-support referral active' },
    { st: 'next', t: 'Stable housing plan in place', s: 'Counseling complete' },
    { st: 'next', t: 'Explore vendor / business idea', s: 'Boardwalk Basket pathway' },
  ] },
  { label: '12 Months', goals: [
    { st: 'next', t: 'Employment or income growth', s: 'Move from benefits to wages' },
    { st: 'next', t: 'Savings goal reached', s: 'Benefits-cliff planning' },
    { st: 'next', t: 'Launch as a Co-op vendor', s: 'Small-business coaching' },
    { st: 'next', t: 'Begin Co-op ownership pathway', s: 'Community Owner Member' },
  ] },
];
const stTag: Record<string, string> = { done: 'Done', now: 'In progress', next: 'Upcoming' };

const TIERS = [
  { n: 'Tier 1', t: 'Listed Resource Partner', d: 'For organizations that want to be included in the Co-op service directory.', feat: false, items: ['Listed in partner directory', 'Program / service description', 'Eligibility criteria', 'Contact information', 'Referral instructions'], cta: 'Get Listed' },
  { n: 'Tier 2', t: 'Referral Partner', d: 'For organizations ready to accept referrals from Co-op navigators.', feat: true, items: ['Digital referral participation', 'Service category listing', 'Referral contact person', 'Follow-up coordination', 'Quarterly partner check-ins'], cta: 'Accept Referrals' },
  { n: 'Tier 3', t: 'Strategic Impact Partner', d: 'For formal collaboration, shared outcomes, and priority member support.', feat: false, items: ['MOU / partner agreement', 'Closed-loop referral process', 'Joint workshops & service clinics', 'Shared impact metrics', 'Co-branded outreach'], cta: 'Collaborate' },
  { n: 'Tier 4', t: 'Preferred Member Provider', d: 'For businesses offering discounted, sponsored, or priority services to members.', feat: false, items: ['Preferred provider listing', 'Member benefit description', 'Discount / special-access terms', 'Member referral pathway', 'Sponsor Prime Member services'], cta: 'Offer Benefits' },
];

const IDEAL_FLOW: { icon: LucideIcon; step: string; desc: string }[] = [
  { icon: GraduationCap, step: 'Learn', desc: 'Digital literacy & training' },
  { icon: Building2, step: 'Train', desc: 'Apprenticeships & credentials' },
  { icon: Briefcase, step: 'Work', desc: 'Paid work-based learning' },
  { icon: DollarSign, step: 'Earn', desc: 'Employment & income' },
  { icon: Star, step: 'Own', desc: 'Business & co-op ownership' },
];
const IDEAL_PATHS = ['Digital literacy', 'Career readiness', 'Job training', 'Paid work-based learning', 'Apprenticeships', 'Entrepreneurship training', 'Small business support', 'Youth leadership', 'Community navigator training', 'Block captain training'];

const PARTNER_BENEFITS = [
  { t: 'Better, qualified referrals', d: 'Our intake and assessment process identifies member needs before referrals are made, so you connect with residents who already qualify.' },
  { t: 'Closed-loop network', d: 'Navigators support members with documentation, reminders, and follow-up — and every referral is tracked to a result.' },
  { t: 'Demonstrate impact', d: 'Participate in shared impact reporting, community service days, and funder-facing outcome stories rooted in local ownership.' },
];

const FINALE = ['Assess the member', 'Build the plan', 'Connect the provider', 'Track the result', 'Grow the income', 'Build ownership'];

const FAQS = [
  { q: 'What is the Center for Social Impact?', a: "The Center is the Co-op's member-support hub. It helps members complete one intake, receive assessments, build an Individual Empowerment Plan, and connect with trusted service providers." },
  { q: 'Who can use the Center?', a: 'The Center is designed for Co-op members and Atlantic City residents, with priority support for Prime Members receiving public assistance or facing barriers to stability.' },
  { q: 'What is a Prime Member?', a: 'A Prime Member is a Co-op member receiving public assistance or facing significant barriers such as food insecurity, housing instability, unemployment, health needs, transportation challenges, or financial hardship.' },
  { q: 'Does the Co-op provide all services directly?', a: 'No. The Co-op provides intake, assessment, navigation, planning, referrals, and follow-up. Many services are delivered through trusted service providers and impact partners.' },
  { q: 'How can my organization become a service provider?', a: 'Complete the Partner Application. The Co-op will review your services, eligibility requirements, contact process, and partnership fit.' },
  { q: 'What types of providers can join?', a: 'Nonprofits, public agencies, healthcare providers, employers, workforce providers, financial institutions, housing organizations, legal-aid providers, food-access partners, transportation providers, childcare providers, and businesses serving Atlantic City residents.' },
  { q: 'Can businesses become preferred service providers?', a: 'Yes. Businesses that provide useful, ethical, affordable, discounted, sponsored, or priority services to Co-op members can apply to become Preferred Member Service Providers.' },
  { q: 'Is this only for people receiving public assistance?', a: 'No. The Center can serve all Co-op members, but Prime Members receiving public assistance or facing serious barriers receive priority navigation and support.' },
];

/* ---------------- helpers ---------------- */
function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) { const id = requestAnimationFrame(() => setShow(true)); return () => cancelAnimationFrame(id); }
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShow(true); o.disconnect(); } }, { rootMargin: '0px 0px -10% 0px' });
    o.observe(el);
    return () => o.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ transitionDelay: `${delay}ms` }} className={`transition-all duration-700 ease-out ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'} ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 mb-4">
      <span className={`w-7 h-0.5 rounded-full ${light ? 'bg-accent' : 'bg-primary'}`} aria-hidden="true" />
      <span className={`text-xs font-heading font-bold uppercase tracking-[0.12em] ${light ? 'text-accent' : 'text-primary'}`}>{children}</span>
    </span>
  );
}

/* ---------------- component ---------------- */
export default function CenterForSocialImpact() {
  const [active, setActive] = useState('what');
  const [drawer, setDrawer] = useState(false);
  const [eco, setEco] = useState(0);
  const [planTab, setPlanTab] = useState(0);
  const [step, setStep] = useState(-1);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [faqQuery, setFaqQuery] = useState('');
  const [intake, setIntake] = useState<null | 'member' | 'partner'>(null);
  const [stuck, setStuck] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: '-45% 0px -50% 0px' });
    NAV.forEach((l) => { const el = document.getElementById(l.id); if (el) o.observe(el); });
    return () => o.disconnect();
  }, []);
  useEffect(() => { document.body.style.overflow = drawer || intake ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [drawer, intake]);

  // Show the logo only when the sticky navbar is pinned to the top.
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let ticking = false;
    const update = () => { ticking = false; setStuck(nav.getBoundingClientRect().top <= 0); };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); setDrawer(false);
    const el = document.getElementById(id); if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  // Open the site-wide GHL Vendor form popup (handled by the global FormModal).
  const openVendorForm = () => window.dispatchEvent(new CustomEvent('openFormModal', { detail: { formType: 'vendor', heading: 'Become a Service Provider' } }));

  const faqList = FAQS.map((f, i) => ({ ...f, i })).filter((f) => (f.q + ' ' + f.a).toLowerCase().includes(faqQuery.trim().toLowerCase()));

  return (
    <>
      {/* ===== Sticky secondary navbar ===== */}
      <nav ref={navRef} aria-label="Center for Social Impact" className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center gap-4">
          <Link href="/" aria-label="Atlantic City Community Cooperative — home" className={`flex items-center shrink-0 transition-all duration-300 ${stuck ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden pointer-events-none'}`}>
            <Image src="/logo.png" alt="Atlantic City Community Cooperative" width={160} height={64} className="h-9 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-1 mx-auto">
            {NAV.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} aria-current={active === l.id ? 'true' : undefined}
                className={`px-3 py-2 text-sm font-heading font-medium rounded-full transition-colors ${active === l.id ? 'text-primary bg-primary/10' : 'text-foreground/70 hover:text-primary'}`}>
                {l.label}
              </a>
            ))}
          </div>
          <button type="button" onClick={() => setDrawer(true)} aria-label="Open menu" className="lg:hidden p-2 -mr-2 ml-auto text-foreground"><Menu className="w-6 h-6" aria-hidden="true" /></button>
        </div>
      </nav>

      {/* ===== Mobile drawer ===== */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-black/50" onClick={() => setDrawer(false)} />
          <div className="absolute right-0 top-0 h-full w-72 max-w-[85vw] bg-white shadow-2xl p-6 flex flex-col gap-2">
            <button type="button" onClick={() => setDrawer(false)} aria-label="Close menu" className="self-end p-2 -mr-2 text-foreground"><X className="w-6 h-6" aria-hidden="true" /></button>
            {NAV.map((l) => (<a key={l.id} href={`#${l.id}`} onClick={(e) => go(e, l.id)} className="px-3 py-2.5 rounded-lg font-heading font-medium text-foreground hover:bg-cream">{l.label}</a>))}
          </div>
        </div>
      )}

      {/* ===== Why ===== */}
      <section id="why" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: image with floating card */}
          <Reveal>
            <div className="relative pb-12 sm:pb-0">
              <div className="relative aspect-4/5 rounded-3xl overflow-hidden shadow-lg ring-1 ring-gray-200/60 bg-white">
                <Image
                  src="/AC-CO-OP-flyer-1-pg.jpg"
                  alt="Atlantic City Community Cooperative impact model — grocery, food, social services, housing, workforce development, and community ownership"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-3"
                />
              </div>
              <div className="absolute -bottom-4 left-4 sm:-left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 flex items-start gap-3 max-w-[18rem]">
                <span className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" aria-hidden="true" />
                </span>
                <div>
                  <b className="block font-heading font-bold text-foreground leading-tight">One trusted front door</b>
                  <span className="text-sm text-foreground/55">Instead of office to office, agency to agency</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right: copy */}
          <Reveal delay={120}>
            <Eyebrow>Why We Created the Center</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Because support should be easier to access.</h2>
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Many Atlantic City residents face more than one challenge at the same time — food insecurity, housing pressure, transportation barriers, healthcare needs, unemployment, and public-benefit complexity.</p>
              <p>Instead of sending residents from office to office and website to website, the Co-op is building <strong className="text-foreground font-semibold">one trusted front door</strong>: complete one intake, understand your needs, connect with services, and receive a practical plan for long-term stability.</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              {[
                { t: 'Food Access', c: 'bg-primary' },
                { t: 'Housing', c: 'bg-primary-dark' },
                { t: 'Healthcare', c: 'bg-accent' },
                { t: 'Employment', c: 'bg-primary' },
                { t: 'Education', c: 'bg-primary-dark' },
                { t: 'Transportation', c: 'bg-accent' },
                { t: 'Financial Stability', c: 'bg-primary' },
              ].map((chip) => (
                <span key={chip.t} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-sm font-heading font-semibold text-foreground">
                  <span className={`w-2 h-2 rounded-full ${chip.c}`} aria-hidden="true" />
                  {chip.t}
                </span>
              ))}
            </div>
            <div className="mt-8 bg-accent/10 border-l-4 border-accent rounded-r-xl p-5">
              <p className="text-foreground/90 leading-relaxed">Atlantic City is a food desert where many residents lack car access. The Co-op connects food access with social services, jobs, and community ownership.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== What We Do ===== */}
      <section id="what" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>What the Center Does</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">One place to start. Many pathways to support.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">We help members identify needs, understand available resources, connect with trusted providers, and build a step-by-step plan toward stability and economic mobility.</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => {
              const Icon = ICONS[s.ic];
              return (
                <Reveal key={s.t} delay={(i % 4) * 60}>
                  <article className="bg-cream rounded-2xl p-6 h-full flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <span className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center ${chipTone[s.cl]}`}><Icon className="w-6 h-6" aria-hidden="true" /></span>
                    <h3 className="font-heading font-semibold text-foreground mb-2">{s.t}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed grow">{s.d}</p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== How It Works ===== */}
      <section id="how" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>How It Works</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Your pathway starts with one intake.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">Six guided steps move every member from first contact to a personalized plan and trusted connections. Tap any step to expand.</p>
          </Reveal>
          <div className="space-y-4">
            {STEPS.map((s, i) => {
              const open = step === i;
              return (
                <Reveal key={s.t} delay={i * 40}>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <button type="button" onClick={() => setStep(open ? -1 : i)} aria-expanded={open} className="w-full flex items-center gap-4 p-5 text-left cursor-pointer">
                      <span className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold shrink-0">{i + 1}</span>
                      <h3 className="font-heading font-semibold text-lg text-foreground grow">{s.t}</h3>
                      <span className={`text-primary text-2xl shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                    </button>
                    <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <div className="px-5 pb-5 pl-20">
                          <p className="text-foreground/70 leading-relaxed mb-3">{s.d}</p>
                          <div className="flex flex-wrap gap-2">{s.chips.map((c) => <span key={c} className="px-3 py-1.5 rounded-full text-xs font-heading font-semibold bg-cream text-foreground/70 border border-gray-100">{c}</span>)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Empowerment Plan ===== */}
      <section id="plan" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Individual Empowerment Plan</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Your personalized plan for stability, income &amp; ownership.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">A practical roadmap built around your real household needs and long-term goals — not a list of phone numbers. Here&apos;s what one looks like.</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid md:grid-cols-[300px_1fr] rounded-3xl overflow-hidden shadow-xl border border-gray-100">
              {/* sidebar */}
              <aside className="bg-primary-dark text-white p-6 sm:p-7">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-11 h-11 rounded-xl bg-accent text-foreground flex items-center justify-center font-heading font-bold shrink-0">MJ</span>
                  <div className="leading-tight"><b className="font-heading font-bold">Maria&apos;s Plan</b><span className="block text-xs text-white/65">Prime Member · Atlantic City</span></div>
                </div>
                <div className="space-y-2.5 text-sm mb-6">
                  {[['Plan started', 'Mar 2026'], ['Navigator', 'D. Carter'], ['Next follow-up', '14 days']].map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between"><span className="text-white/65">{k}</span><b className="font-heading font-semibold">{v}</b></div>
                  ))}
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between text-[13px] text-white/70 mb-1.5"><span>Overall progress</span><b className="text-white">62%</b></div>
                  <div className="h-2 rounded-full bg-white/15 overflow-hidden"><div className="h-full rounded-full bg-primary-light" style={{ width: '62%' }} /></div>
                </div>
                <div className="space-y-2.5">
                  {[
                    { t: 'Financial assessment', done: true },
                    { t: 'Barrier assessment', done: true },
                    { t: 'Academic assessment', done: true },
                    { t: 'Job readiness · in progress', done: false },
                  ].map((a) => (
                    <div key={a.t} className="flex items-center gap-2.5 text-sm text-white/90">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${a.done ? 'bg-white/10 text-primary-light' : 'bg-accent/20 text-accent'}`}>
                        {a.done ? <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" /> : <Clock className="w-3.5 h-3.5" aria-hidden="true" />}
                      </span>
                      {a.t}
                    </div>
                  ))}
                </div>
              </aside>

              {/* main */}
              <div className="bg-white p-6 sm:p-7">
                <div className="inline-flex flex-wrap gap-1 bg-cream rounded-full p-1 mb-6">
                  {PLAN.map((p, i) => (
                    <button key={p.label} type="button" onClick={() => setPlanTab(i)} aria-pressed={planTab === i}
                      className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors cursor-pointer ${planTab === i ? 'bg-white text-primary shadow-sm' : 'text-foreground/60 hover:text-primary'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="space-y-3">
                  {PLAN[planTab].goals.map((g) => (
                    <div key={g.t} className="flex items-center gap-3.5 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${g.st === 'done' ? 'bg-primary text-white' : g.st === 'now' ? 'bg-primary/10 text-primary border border-primary/30' : 'border border-gray-300 text-transparent'}`}>
                        <Check className="w-4 h-4" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <div className="grow min-w-0"><b className="block font-heading font-semibold text-[15px] text-foreground">{g.t}</b><span className="text-sm text-foreground/55">{g.s}</span></div>
                      <span className={`shrink-0 text-[11px] font-heading font-semibold rounded-full px-2.5 py-1 ${g.st === 'next' ? 'bg-accent/15 text-foreground/55' : 'bg-primary/10 text-primary'}`}>{stTag[g.st]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Prime Member ===== */}
      <section className="relative py-16 md:py-20 bg-primary-dark text-white overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <Reveal>
            <Eyebrow light>Prime Member Support</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Special support for those who need it most.</h2>
            <p className="text-white/75 leading-relaxed mb-8 max-w-xl">Prime Members receive public assistance or face significant barriers to stability. We&apos;re committed to helping them move toward the true middle class — through support, education, employment, entrepreneurship, and cooperative ownership.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Users, t: 'One-on-one navigation' },
                { icon: BadgeCheck, t: 'Benefits screening' },
                { icon: LineChart, t: 'Empowerment Plan' },
                { icon: ShoppingBasket, t: 'Food access & delivery' },
                { icon: DollarSign, t: 'Financial coaching' },
                { icon: GraduationCap, t: 'Training pathways' },
                { icon: Briefcase, t: 'Work-based learning' },
                { icon: Star, t: 'Co-op ownership education' },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div key={b.t} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-3.5">
                    <span className="w-9 h-9 rounded-lg bg-white/15 text-white flex items-center justify-center shrink-0"><Icon className="w-4.5 h-4.5" aria-hidden="true" /></span>
                    <span className="text-sm font-heading font-medium text-white/90">{b.t}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl p-8 shadow-2xl">
              <span className="inline-flex w-11 h-11 rounded-xl bg-white text-primary items-center justify-center mb-4 shadow-lg shadow-black/10"><Star className="w-5 h-5" fill="currentColor" aria-hidden="true" /></span>
              <span className="block text-xs font-heading font-bold uppercase tracking-[0.12em] text-accent mb-3">Prime Member</span>
              <h3 className="text-2xl font-heading font-bold text-white mb-3">Priority Navigation</h3>
              <p className="text-white/75 leading-relaxed mb-6">A dedicated navigator, a personal plan, and follow-up support every step of the way.</p>
              <ul className="space-y-3 mb-7">
                {[
                  'Barrier & financial assessment + coaching',
                  'Academic & job-readiness assessment',
                  'Training through Ideal Institute of Technology',
                  'Boardwalk Basket delivery where available',
                  'Referrals to trusted providers + follow-up',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-white/90"><Check className="w-4 h-4 text-white shrink-0 mt-0.5" strokeWidth={3} aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <button type="button" onClick={() => setIntake('member')} className="w-full bg-white hover:bg-cream text-primary px-6 py-3.5 rounded-full font-heading font-bold transition-colors inline-flex items-center justify-center cursor-pointer">Complete Prime Member Intake</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Services Ecosystem ===== */}
      <section id="services" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Eyebrow>Support Services Ecosystem</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Every category of community support, in one network.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">We work with providers, public agencies, nonprofits, and businesses across every area of need. Select a category to explore what members can access.</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 lg:gap-8 items-start">
              {/* category card grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ECO.map((e, i) => {
                  const Icon = ICONS[e.ic];
                  const sel = eco === i;
                  return (
                    <button key={e.t} type="button" onClick={() => setEco(i)} aria-pressed={sel}
                      className={`flex flex-col items-center text-center gap-3 rounded-2xl p-4 border transition-all duration-200 cursor-pointer ${sel ? 'bg-primary-dark border-primary-dark shadow-lg' : 'bg-white border-gray-200 hover:border-primary/40 hover:shadow-sm'}`}>
                      <span className={`w-10 h-10 rounded-xl flex items-center justify-center ${sel ? 'bg-white/15 text-white' : chipTone[e.cl]}`}><Icon className="w-5 h-5" aria-hidden="true" /></span>
                      <b className={`font-heading font-semibold text-sm leading-tight ${sel ? 'text-white' : 'text-foreground'}`}>{e.t}</b>
                    </button>
                  );
                })}
              </div>

              {/* detail panel */}
              <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8" key={eco}>
                {(() => { const e = ECO[eco]; const Icon = ICONS[e.ic]; return (
                  <div className="animate-fadeIn">
                    <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${chipTone[e.cl]}`}><Icon className="w-7 h-7" aria-hidden="true" /></span>
                    <h3 className="text-2xl font-heading font-bold text-foreground mt-5">{e.t}</h3>
                    <p className="text-sm font-heading font-semibold text-primary mt-1 mb-4">{e.sub}</p>
                    <p className="text-foreground/75 leading-relaxed mb-6">{e.d}</p>
                    <div className="flex flex-wrap gap-2">{e.tags.map((t) => <span key={t} className="px-3.5 py-1.5 rounded-full bg-accent/10 text-xs font-heading font-semibold text-foreground/70">{t}</span>)}</div>
                  </div>
                ); })()}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Ideal Institute ===== */}
      <section id="ideal" className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <Image src="/iitnj logo.png" alt="Ideal Institute of Technology" width={240} height={88} className="h-24 w-auto object-contain mx-auto mb-5" />
            <Eyebrow>Powered by Ideal Institute of Technology</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Powered by education, employment &amp; entrepreneurship.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">More than a referral office — a pathway to skills, credentials, jobs, business ownership, and long-term financial mobility.</p>
          </Reveal>

          {/* horizontal flow */}
          <Reveal delay={80}>
            <div className="relative mb-14">
              <div className="hidden sm:block absolute top-7 left-[10%] right-[10%] h-0.5 bg-primary/25" aria-hidden="true" />
              <ol className="relative grid grid-cols-2 sm:grid-cols-5 gap-y-8 gap-x-4">
                {IDEAL_FLOW.map((f) => {
                  const Icon = f.icon;
                  return (
                    <li key={f.step} className="flex flex-col items-center text-center">
                      <span className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center mb-3 ring-4 ring-cream shadow-md"><Icon className="w-6 h-6" aria-hidden="true" /></span>
                      <b className="font-heading font-bold text-foreground">{f.step}</b>
                      <span className="text-xs text-foreground/55 mt-0.5 max-w-40">{f.desc}</span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>

          {/* pathway cards */}
          <Reveal delay={120}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {IDEAL_PATHS.map((p) => (
                <div key={p} className="flex items-center gap-2.5 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <span className="w-2 h-2 rounded-full bg-accent shrink-0" aria-hidden="true" />
                  <span className="text-sm font-heading font-semibold text-foreground leading-tight">{p}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Become a Partner ===== */}
      <section id="partner" className="py-16 md:py-20 bg-cream scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl mb-12">
            <Eyebrow>Become a Service Provider / Impact Partner</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">Reach the residents who need your services most.</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">Join the Impact Partner Digital Network — a coordinated referral system that reduces fragmentation, improves follow-up, and strengthens measurable community impact.</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {PARTNER_BENEFITS.map((b, i) => (
              <Reveal key={b.t} delay={i * 60}><div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full"><h3 className="font-heading font-semibold text-foreground mb-2">{b.t}</h3><p className="text-sm text-foreground/70 leading-relaxed">{b.d}</p></div></Reveal>
            ))}
          </div>
          <Reveal className="text-center mb-8"><Eyebrow>Partner Levels</Eyebrow><h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">Ways to partner</h3></Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t, i) => (
              <Reveal key={t.n} delay={i * 60}>
                <article className={`rounded-3xl p-6 h-full flex flex-col border ${t.feat ? 'bg-primary text-white border-primary shadow-lg' : 'bg-white border-gray-100 shadow-sm'}`}>
                  <span className={`text-xs font-heading font-bold uppercase tracking-wider ${t.feat ? 'text-accent' : 'text-primary'}`}>{t.n}</span>
                  <h3 className="font-heading font-bold text-lg mt-1 mb-1">{t.t}</h3>
                  <p className={`text-sm mb-4 ${t.feat ? 'text-white/80' : 'text-foreground/60'}`}>{t.d}</p>
                  <ul className="space-y-2 mb-5 grow">
                    {t.items.map((x) => (<li key={x} className={`flex items-start gap-2 text-sm ${t.feat ? 'text-white/90' : 'text-foreground/75'}`}><Check className={`w-4 h-4 shrink-0 mt-0.5 ${t.feat ? 'text-accent' : 'text-primary'}`} aria-hidden="true" />{x}</li>))}
                  </ul>
                  <button type="button" onClick={openVendorForm} className={`w-full px-4 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors cursor-pointer ${t.feat ? 'bg-white text-primary hover:bg-cream' : 'bg-primary text-white hover:bg-primary-dark'}`}>{t.cta}</button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Impact Statement (finale) ===== */}
      <section className="py-16 md:py-20 bg-primary-dark text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <Eyebrow light>Impact Statement</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-5">Building a stronger Atlantic City through cooperative power.</h2>
            <p className="text-lg text-white/85 leading-relaxed max-w-3xl mx-auto mb-10">Not a traditional charity program — a cooperative social-care and economic-mobility hub. Residents don&apos;t only receive help; they become owners, leaders, workers, entrepreneurs, and builders of the city&apos;s future.</p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {FINALE.map((s, i) => (<span key={s} className="inline-flex items-center gap-2 bg-white/10 rounded-full pl-3 pr-4 py-2 text-sm font-heading font-semibold"><span className="w-5 h-5 rounded-full bg-accent text-foreground text-xs flex items-center justify-center font-bold">{i + 1}</span>{s}</span>))}
            </div>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <button type="button" onClick={() => setIntake('member')} className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold inline-flex items-center justify-center cursor-pointer">Complete Intake</button>
              <button type="button" onClick={openVendorForm} className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 rounded-full font-heading font-semibold border-2 border-white/50 inline-flex items-center justify-center cursor-pointer">Become a Partner</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section id="faq" className="py-16 md:py-20 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-10">
            <Eyebrow>Questions, Answered</Eyebrow>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Frequently asked questions</h2>
            <input type="search" value={faqQuery} onChange={(e) => setFaqQuery(e.target.value)} placeholder="Search questions…" aria-label="Search FAQ" className="w-full max-w-md mx-auto px-5 py-3 rounded-full border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-foreground" />
          </Reveal>
          <div className="space-y-4">
            {faqList.length === 0 && <p className="text-center text-foreground/50">No matches — try different keywords, or ask a Navigator.</p>}
            {faqList.map((f) => {
              const open = faqOpen === f.i;
              return (
                <div key={f.q} className="bg-cream rounded-2xl overflow-hidden">
                  <button type="button" onClick={() => setFaqOpen(open ? null : f.i)} aria-expanded={open} className="w-full flex items-center justify-between gap-4 p-6 text-left cursor-pointer">
                    <h3 className="font-heading font-semibold text-foreground">{f.q}</h3>
                    <span className={`text-primary text-xl shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}><div className="overflow-hidden"><p className="px-6 pb-6 text-foreground/70 text-sm leading-relaxed">{f.a}</p></div></div>
                </div>
              );
            })}
          </div>
          <Reveal className="mt-10 text-center bg-cream rounded-2xl p-8">
            <Phone className="w-10 h-10 text-primary mx-auto mb-3" aria-hidden="true" />
            <h3 className="font-heading font-bold text-lg text-foreground mb-2">Still have questions? Talk to a Navigator.</h3>
            <p className="text-foreground/70 text-sm mb-5">Call <a href="tel:+16093188011" className="text-primary font-semibold">609-318-8011</a> or start your intake — you only tell your story once.</p>
            <button type="button" onClick={() => setIntake('member')} className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-heading font-semibold inline-flex items-center justify-center cursor-pointer">Complete Intake</button>
          </Reveal>
        </div>
      </section>

      {intake && <IntakeModal kind={intake} onClose={() => setIntake(null)} />}
    </>
  );
}

/* ---------------- multi-step intake modal ---------------- */
function IntakeModal({ kind, onClose }: { kind: 'member' | 'partner'; onClose: () => void }) {
  const member = kind === 'member';
  const stepDefs = member
    ? [
        { h: 'Who are you starting as?', sub: 'There is no wrong door — every path leads to the same support.', opts: ['Co-op member', 'Prime Member', 'Atlantic City resident', 'Partner / provider referral'] },
        { h: 'What do you need help with right now?', sub: 'Choose your most pressing need — we will map the rest.', opts: ['Food access', 'Housing or utilities', 'Healthcare', 'Jobs, training or income', 'Benefits navigation'] },
      ]
    : [
        { h: 'What type of organization are you?', sub: 'Tell us how your team serves the community.', opts: ['Social service provider', 'Healthcare provider', 'Housing / utility', 'Education / workforce', 'Food / nutrition', 'Business / professional'] },
        { h: 'How would you like to partner?', sub: 'Choose the level of collaboration that fits.', opts: ['Listed Resource Partner', 'Referral Partner', 'Strategic Impact Partner', 'Preferred Member Provider'] },
      ];
  const [cur, setCur] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={member ? 'Social Impact Intake' : 'Partner Application'} onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-gray-200">
          <h2 className="font-heading font-bold text-foreground">{member ? 'Social Impact Intake' : 'Partner Application'}</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="bg-gray-100 hover:bg-gray-200 rounded-full p-1.5"><X className="w-5 h-5 text-gray-700" aria-hidden="true" /></button>
        </div>
        <div className="flex gap-1.5 px-6 pt-4">{[0, 1, 2, 3].map((i) => <span key={i} className={`h-1.5 flex-1 rounded-full ${i <= cur ? 'bg-primary' : 'bg-gray-200'}`} />)}</div>
        <div className="p-6 overflow-y-auto">
          {cur < 2 && (
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">{stepDefs[cur].h}</h3>
              <p className="text-foreground/60 text-sm mb-5">{stepDefs[cur].sub}</p>
              <div className="space-y-2.5">
                {stepDefs[cur].opts.map((o) => (
                  <button key={o} type="button" onClick={() => setAnswers((a) => ({ ...a, [cur]: o }))} className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left font-heading font-medium transition-colors cursor-pointer ${answers[cur] === o ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-foreground hover:border-primary/40'}`}>
                    <span className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${answers[cur] === o ? 'border-primary' : 'border-gray-300'}`}>{answers[cur] === o && <span className="w-2.5 h-2.5 rounded-full bg-primary" />}</span>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          )}
          {cur === 2 && (
            <div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-1">Tell us how to reach you</h3>
              <p className="text-foreground/60 text-sm mb-5">A navigator will follow up and help build your plan.</p>
              <div className="space-y-4">
                <div><label className="block text-sm font-heading font-semibold text-foreground/80 mb-1">Full name</label><input type="text" autoComplete="name" placeholder="Your name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-sm font-heading font-semibold text-foreground/80 mb-1">Phone</label><input type="tel" autoComplete="tel" placeholder="(609) 000-0000" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                  <div><label className="block text-sm font-heading font-semibold text-foreground/80 mb-1">ZIP code</label><input type="text" inputMode="numeric" placeholder="08401" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" /></div>
                </div>
                <div><label className="block text-sm font-heading font-semibold text-foreground/80 mb-1">Preferred language</label><select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"><option>English</option><option>Spanish</option><option>Other</option></select></div>
              </div>
            </div>
          )}
          {cur === 3 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><Check className="w-8 h-8" aria-hidden="true" /></div>
              <h3 className="text-xl font-heading font-bold text-foreground">You&apos;re on the path.</h3>
              <p className="text-foreground/60 text-sm max-w-xs mx-auto mt-2">A Co-op navigator will reach out to complete your {member ? 'intake and build your Individual Empowerment Plan' : 'partner application'}. You only had to tell your story once.</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-200">
          {cur > 0 && cur < 3 ? <button type="button" onClick={() => setCur((c) => c - 1)} className="px-5 py-2.5 rounded-full font-heading font-semibold text-foreground/70 hover:text-foreground cursor-pointer">Back</button> : <span />}
          <button type="button" onClick={() => (cur >= 3 ? onClose() : setCur((c) => c + 1))} className="ml-auto bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-heading font-semibold inline-flex items-center gap-2 cursor-pointer">
            {cur === 3 ? 'Close' : cur === 2 ? 'Submit' : 'Continue'}{cur < 3 && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </div>
  );
}
