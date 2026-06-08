import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import { Check, Users, HeartHandshake, Crown, Building2, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Membership | Atlantic City Community Cooperative',
  description: 'Join Atlantic City Community Cooperative free as a Patron Member, apply for Premium Access support, become a Community Owner through Class A Community Stock, or invest as a Corporate / Sponsor Member.',
  alternates: { canonical: 'https://accoop.com/membership' },
};

export default function MembershipPage() {
  const pathways = [
    { icon: Users, title: 'Join Free', sub: 'Patron Member', desc: 'Start as a free supporter and stay connected to AC COOP launch, events, updates, and community campaigns.', cta: 'Join Free' },
    { icon: HeartHandshake, title: 'Get Support', sub: 'Premium Access Member', desc: 'For qualifying Atlantic City residents who need food access, delivery support, wellness resources, and social impact services.', cta: 'Apply for Support' },
    { icon: Crown, title: 'Own the Movement', sub: 'Community Owner Member / Class A Community Stock', desc: 'For eligible Atlantic City residents, workers, small businesses, and community stakeholders who want to help own and guide the movement.', cta: 'Become an Owner' },
    { icon: Building2, title: 'Invest in Atlantic City', sub: 'Corporate / Sponsor Member', desc: 'For businesses, institutions, nonprofits, healthcare providers, foundations, and civic partners that want to sponsor community ownership and Atlantic City small business growth.', cta: 'Become a Sponsor' },
  ];

  const patronBenefits = [
    'Free first-year membership',
    'Digital Patron Member card',
    'AC COOP launch updates',
    'Boardwalk Basket updates',
    'Invitations to community meetings and events',
    'Selected member promotions',
    'Volunteer and ambassador opportunities',
    'Ability to refer members, vendors, and sponsors',
    'Option to upgrade to Community Owner Membership if eligible',
  ];

  const premiumBenefits = [
    'Free Premium Access Membership',
    'Reduced or waived delivery support when available',
    'Access to affordable grocery bundles',
    'Access to food box and nutrition programs',
    'Assisted ordering through Block Captains',
    'SNAP/EBT ordering support when active',
    'Social service referral support',
    'Health concierge network access when launched',
    'Workforce and entrepreneurship program referrals',
    'Senior, family, and disability support pathways',
    'Opportunity to become a sponsored Community Owner Member',
  ];

  const ownerBenefits = [
    'Community ownership participation through Class A Community Stock',
    'Participation in Class A board elections',
    'Member-owner grocery and marketplace benefits',
    'Reduced Boardwalk Basket delivery fees',
    'Member-only food bundles and promotions',
    'Priority access to local produce and vendor offers',
    'Invitations to member and shareholder meetings',
    'Annual public benefit and community impact updates',
    'Eligibility for dividends or other benefits if approved by the Board and legally available',
    "Opportunity to help shape COOP's future",
  ];

  const sponsorLevels = [
    { amount: '$500', name: 'Community Supporter', desc: 'For small businesses, local professionals, and individual civic supporters.' },
    { amount: '$1,000', name: 'Neighborhood Builder', desc: 'Supports outreach, member enrollment, and neighborhood engagement.' },
    { amount: '$2,500', name: 'Food Access Partner', desc: 'Supports grocery access, delivery support, and food bundle programs.' },
    { amount: '$5,000', name: 'Community Ownership Sponsor', desc: 'Supports sponsored Community Owner Memberships and resident ownership access.' },
    { amount: '$10,000', name: 'Atlantic City Impact Partner', desc: 'Supports citywide membership growth, food access, delivery equity, and small business participation.' },
    { amount: '$25,000+', name: 'Founding Corporate Partner', desc: "For major institutions and anchor partners committed to Atlantic City's long-term revitalization." },
  ];

  const sponsorshipDonations = [
    '$25 supports outreach and onboarding',
    '$50 supports member support and assisted enrollment',
    '$100 supports delivery access and food support',
    '$200 sponsors one Community Owner Membership pathway',
    '$1,000 sponsors five Community Owner Membership pathways',
    '$5,000 supports a neighborhood membership campaign',
    '$10,000+ supports citywide membership and food access expansion',
  ];

  const comparison = [
    { pathway: 'Join Free — Patron Member', best: 'Supporters, volunteers, visitors, future members', cost: 'Free first year', stock: 'No', voting: 'No' },
    { pathway: 'Get Support — Premium Access Member', best: 'Qualifying AC residents needing food and service access', cost: 'Free with application', stock: 'Not automatic', voting: 'No' },
    { pathway: 'Own the Movement — Community Owner Member', best: 'Eligible AC residents, workers, small businesses, stakeholders', cost: 'Recommended $200', stock: 'Class A Community Stock', voting: 'Class A rights' },
    { pathway: 'Invest — Corporate / Sponsor Member', best: 'Businesses, institutions, nonprofits, sponsors, civic partners', cost: '$500 to $25,000+', stock: 'No', voting: 'No' },
  ];

  const whyThisMatters = [
    'A community-centered supermarket',
    'A local delivery platform through Boardwalk Basket',
    'A marketplace for Atlantic City small businesses',
    'Better food access for families, seniors, and residents without reliable transportation',
    'A platform for local farmers, vendors, and food entrepreneurs',
    'A block-by-block outreach network',
    'A workforce development pipeline',
    'A social impact hub connecting food, health, employment, and entrepreneurship',
  ];

  const faqs = [
    { q: 'Do I have to be a member to shop?', a: 'No. COOP may serve the broader public. Membership provides additional access, benefits, ownership opportunities, and participation pathways.' },
    { q: 'What is the difference between Patron Membership and Community Owner Membership?', a: 'Patron Membership is a free supporter membership and does not include stock ownership or voting rights. Community Owner Membership includes participation through Class A Community Stock, subject to eligibility and governing documents.' },
    { q: 'Is Premium Access Membership stock ownership?', a: 'No. Premium Access Membership is a free social impact membership for qualifying Atlantic City residents. It does not automatically include stock ownership or voting rights.' },
    { q: 'Can Premium Access Members become owners?', a: 'Yes. Premium Access Members may become Community Owner Members through sponsorship, installment payment, or other approved ownership pathways.' },
    { q: 'Who can become a Community Owner Member?', a: 'Community Owner Membership is intended for eligible Atlantic City residents, workers, small businesses, and local stakeholders, subject to COOP bylaws and stock issuance policies.' },
    { q: 'Can businesses become Community Owner Members?', a: 'Yes, if permitted by COOP bylaws and stock policies. A business may need to designate one authorized representative.' },
    { q: 'What is Corporate / Sponsor Membership?', a: "Corporate / Sponsor Membership is a non-voting sponsorship membership for organizations that want to support COOP's public benefit mission, sponsor resident memberships, promote food access, and invest in Atlantic City's community development." },
    { q: 'Does Corporate / Sponsor Membership include stock or voting rights?', a: 'No. Corporate / Sponsor Membership does not include stock ownership, voting rights, dividends, or investment returns.' },
    { q: 'Can a sponsor also become a vendor or partner?', a: 'Yes. Sponsors may also participate as vendors, service providers, community partners, event sponsors, or Boardwalk Basket partners if approved through the appropriate process.' },
    { q: 'Will Community Owner Members receive dividends?', a: 'Dividends or other economic benefits may be available only if declared by the Board and legally permitted. No dividend should be guaranteed.' },
  ];

  return (
    <>
      {/* 1. Hero */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1]">
                Join Atlantic City&apos;s Community-Owned Movement
              </h1>
              <p className="text-xl text-white/90 font-heading font-medium">
                Fresh food. Local delivery network. Social impact. Local jobs. Small business growth. Community ownership.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Atlantic City Community Cooperative is building a community-centered supermarket, Boardwalk Basket delivery platform, local vendor marketplace, and social impact network designed to help Atlantic City residents, workers, businesses, sponsors, and supporters participate in a new model of local ownership and public benefit.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/community-unity.jpg"
                  alt="Community members joining hands together in unity"
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

      {/* 2. Membership Pathway Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Choose the Membership Path That Fits You
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              There is more than one way to be part of Atlantic City Community Cooperative. You can join free as a supporter, apply for food and delivery support, become a Community Owner Member through Class A Community Stock, or support the movement as a Corporate / Sponsor Member.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pathways.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="bg-cream p-6 rounded-2xl flex flex-col hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 mb-4 bg-primary rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-foreground mb-1">{p.title}</h3>
                  <p className="text-sm font-heading font-semibold text-primary mb-3">{p.sub}</p>
                  <p className="text-sm text-foreground/70 leading-relaxed mb-6 grow">{p.desc}</p>
                  <CTAButton formType={p.cta === 'Become a Sponsor' ? 'sponsor' : 'inquiry'} className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-full font-heading font-semibold text-sm transition-colors inline-flex items-center justify-center">
                    {p.cta}
                  </CTAButton>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Join Free — Patron Member */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-primary" />
            <span className="text-sm font-heading font-semibold text-primary uppercase tracking-wider">Join Free</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Join Free as a Patron Member</h2>
          <p className="text-lg text-foreground/70 mb-6">The easiest way to join the movement.</p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Patron Membership is designed for anyone who wants to support Atlantic City Community Cooperative, stay connected, receive updates, attend events, and help spread the word.</p>
              <p>This is the best first step for supporters, volunteers, visitors, students, future customers, and community members who are not ready to become owners yet.</p>
              <div className="bg-white rounded-2xl p-6 shadow-sm space-y-1.5 text-sm">
                <p><span className="font-semibold">First Year:</span> Free</p>
                <p><span className="font-semibold">Renewal After First Year:</span> $25 annually</p>
                <p><span className="font-semibold">Stock Ownership:</span> No</p>
                <p><span className="font-semibold">Voting Rights:</span> No</p>
                <p><span className="font-semibold">Upgrade Option:</span> Yes, eligible members may upgrade to Community Owner Membership.</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Benefits</h3>
              <ul className="space-y-2.5">
                {patronBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Join Free Today
            </CTAButton>
            <p className="text-sm text-foreground/60 mt-3">Start supporting Atlantic City&apos;s community-owned future.</p>
          </div>
        </div>
      </section>

      {/* 4. Get Support — Premium Access Member */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <HeartHandshake className="w-8 h-8 text-primary" />
            <span className="text-sm font-heading font-semibold text-primary uppercase tracking-wider">Get Support</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Get Support as a Premium Access Member</h2>
          <p className="text-lg text-foreground/70 mb-6">Free food access and community support membership for qualifying Atlantic City residents.</p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4 text-foreground/80 leading-relaxed">
              <p>Premium Access Membership is for Atlantic City residents receiving public assistance or facing financial hardship. This membership is designed to make healthy food, delivery support, wellness resources, and social impact services easier to access.</p>
              <p>Premium Access Membership is a free social impact membership created to support residents who need access, affordability, and connection to services.</p>
              <div className="bg-cream rounded-2xl p-6 space-y-2 text-sm">
                <p className="font-heading font-semibold text-foreground">Who May Qualify</p>
                <p className="text-foreground/70">Atlantic City residents may qualify if they receive or are eligible for support such as SNAP, EBT, WIC, Medicaid, Medicare-related assistance, TANF, housing assistance, unemployment support, SSI/SSDI, senior assistance, veterans support, reentry support, or other public assistance or hardship-based programs.</p>
              </div>
              <div className="bg-cream rounded-2xl p-6 space-y-1.5 text-sm">
                <p><span className="font-semibold">Cost:</span> Free for approved applicants</p>
                <p><span className="font-semibold">Application:</span> Social Impact Application</p>
                <p><span className="font-semibold">Stock Ownership:</span> Not automatic</p>
                <p><span className="font-semibold">Voting Rights:</span> No, unless converted into Community Owner Membership</p>
                <p><span className="font-semibold">Ownership Pathway:</span> Sponsored or installment-based Class A Community Stock pathway may be available.</p>
              </div>
            </div>
            <div className="bg-cream rounded-2xl p-6">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Benefits</h3>
              <ul className="space-y-2.5">
                {premiumBenefits.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8">
            <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Apply for Premium Access Membership
            </CTAButton>
            <p className="text-sm text-foreground/60 mt-3">Complete the Social Impact Application and let AC COOP help connect you to food, delivery, and support resources.</p>
          </div>
        </div>
      </section>

      {/* 5. Own the Movement — Community Owner Member */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Crown className="w-8 h-8 text-primary" />
            <span className="text-sm font-heading font-semibold text-primary uppercase tracking-wider">Own the Movement</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Own the Movement as a Community Owner Member</h2>
          <p className="text-lg text-foreground/70 mb-6">For eligible Atlantic City residents, workers, small businesses, and local stakeholders.</p>
          <div className="space-y-4 text-foreground/80 leading-relaxed mb-8">
            <p>Community Owner Membership is the ownership pathway for people and businesses directly connected to Atlantic City. This membership is for those who want to help build, guide, and benefit from Atlantic City&apos;s community-centered food, delivery, and marketplace system.</p>
            <p>Community Owner Members participate through Class A Community Stock, subject to COOP bylaws, stock issuance policies, and applicable law. COOP&apos;s formation document designates 200,000 shares as Class A Community Stock and states that Class A Community Stock may only be issued to qualifying persons connected to the Atlantic City Metro Area as further defined by the bylaws.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-foreground mb-2">Recommended Ownership Investment</h3>
              <p className="text-3xl font-heading font-bold text-primary mb-4">$200 <span className="text-base font-normal text-foreground/60">community ownership investment</span></p>
              <p className="font-heading font-semibold text-sm text-foreground mb-2">Payment Options</p>
              <ul className="space-y-1.5 text-sm text-foreground/70">
                <li>• $200 one-time payment</li>
                <li>• $20 per month for 10 months</li>
                <li>• $10 per month for 20 months for approved community access participants</li>
                <li>• Sponsored ownership pathway for qualifying residents</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Eligibility</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">Available to eligible individuals and local entities connected to the Atlantic City Metro Area, including AC residents, people who work in Atlantic City, AC small businesses, and other qualifying community stakeholders, subject to COOP bylaws and stock issuance policies.</p>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground mb-2">Governance Rights</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">Class A Community Stockholders participate in the governance rights assigned to Class A Community Stock. The formation document gives Class A Community Stockholders the right to elect 2 members of the Board of Directors, voting separately as a class.</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Benefits</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {ownerBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
            Become a Community Owner Member
          </CTAButton>
          <p className="text-sm text-foreground/60 mt-3">Help Atlantic City own the solution.</p>
        </div>
      </section>

      {/* 6. Invest — Corporate / Sponsor Member */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <Building2 className="w-8 h-8 text-primary" />
            <span className="text-sm font-heading font-semibold text-primary uppercase tracking-wider">Invest in Atlantic City</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Invest in Atlantic City as a Corporate / Sponsor Member</h2>
          <p className="text-lg text-foreground/70 mb-6">A non-voting sponsorship membership for businesses, institutions, nonprofits, and civic partners.</p>
          <div className="space-y-4 text-foreground/80 leading-relaxed mb-10 max-w-4xl">
            <p>Corporate / Sponsor Membership is for organizations that want to support Atlantic City Community Cooperative&apos;s public benefit mission without becoming voting shareholders.</p>
            <p>This membership is designed for businesses, corporations, healthcare providers, banks, foundations, nonprofits, universities, casinos, hospitality companies, local employers, professional service firms, and civic partners that want to invest in Atlantic City&apos;s future through food access, community ownership, small business growth, workforce development, and neighborhood-level impact.</p>
            <p className="text-sm bg-cream rounded-xl p-4">Corporate / Sponsor Membership is not a stock offering, does not include voting rights, and does not provide ownership in COOP. It is a public benefit sponsorship and partnership pathway.</p>
          </div>

          <h3 className="text-2xl font-heading font-bold text-foreground mb-6 text-center">Recommended Sponsorship Levels</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {sponsorLevels.map((level) => (
              <div key={level.name} className="bg-cream rounded-2xl p-6 border-t-4 border-primary">
                <p className="text-2xl font-heading font-bold text-primary mb-1">{level.amount}</p>
                <h4 className="font-heading font-semibold text-foreground mb-2">{level.name}</h4>
                <p className="text-sm text-foreground/70 leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton formType="sponsor" className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Become a Corporate / Sponsor Member
            </CTAButton>
            <CTAButton formType="sponsor" className="inline-flex items-center justify-center bg-white text-primary border-2 border-primary hover:bg-primary/5 px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300">
              Sponsor Community Memberships
            </CTAButton>
          </div>
          <p className="text-xs text-foreground/50 mt-6 leading-relaxed max-w-3xl">
            Corporate / Sponsor Membership is a non-voting sponsorship membership. It does not include stock ownership, shareholder rights, voting rights, dividends, or investment returns.
          </p>
        </div>
      </section>

      {/* 7. Comparison Table */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Compare Membership Options
          </h2>
          <div className="overflow-x-auto rounded-2xl shadow-sm">
            <table className="w-full bg-white text-sm text-left">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-4 font-heading font-semibold">Pathway</th>
                  <th className="px-4 py-4 font-heading font-semibold">Best For</th>
                  <th className="px-4 py-4 font-heading font-semibold">Cost</th>
                  <th className="px-4 py-4 font-heading font-semibold">Stock Ownership</th>
                  <th className="px-4 py-4 font-heading font-semibold">Voting Rights</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={row.pathway} className={i % 2 === 0 ? 'bg-white' : 'bg-cream/50'}>
                    <td className="px-4 py-4 font-semibold text-foreground">{row.pathway}</td>
                    <td className="px-4 py-4 text-foreground/70">{row.best}</td>
                    <td className="px-4 py-4 text-foreground/70">{row.cost}</td>
                    <td className="px-4 py-4 text-foreground/70">{row.stock}</td>
                    <td className="px-4 py-4 text-foreground/70">{row.voting}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Social Impact Membership Sponsorship */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Sponsor a Neighbor. Sponsor an Owner. Sponsor the Movement.
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed max-w-3xl mx-auto">
              Many Atlantic City residents want to participate in the cooperative movement but may not be able to pay ownership equity immediately. COOP will work with businesses, donors, healthcare partners, foundations, faith-based organizations, and sponsors to help qualifying residents access Premium Membership and, where possible, become Community Owner Members.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {sponsorshipDonations.map((d) => (
              <div key={d} className="bg-cream rounded-xl px-5 py-4 text-sm text-foreground/80 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{d}</span>
              </div>
            ))}
          </div>
          <div className="text-center">
            <CTAButton formType="sponsor" className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Sponsor Community Memberships
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 9. Why This Matters */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              This Is Bigger Than a Membership
            </h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Atlantic City Community Cooperative is building a new model of public benefit business: one where food access, local business growth, delivery equity, community wellness, and local ownership work together. When you join, apply, own, or sponsor, you are helping create:
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {whyThisMatters.map((item) => (
              <div key={item} className="bg-white rounded-xl px-5 py-4 text-sm text-foreground/80 flex items-start gap-2.5 shadow-sm">
                <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-10 text-center">
            Frequently Asked Questions
          </h2>
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

      {/* 11. Final CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Atlantic City Can Own the Solution</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Whether you join free, apply for support, become a Community Owner Member, or sponsor the movement, you are helping build a stronger Atlantic City.
          </p>
          <p className="text-lg font-heading font-medium text-white/90">
            This is food access. This is local ownership. This is small business growth. This is community power.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <CTAButton className="bg-white text-primary hover:bg-cream px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Join Free
            </CTAButton>
            <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
              Apply for Support
            </CTAButton>
            <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
              Become an Owner
            </CTAButton>
            <CTAButton formType="sponsor" className="text-foreground px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-accent hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center" style={{ backgroundColor: '#eeb171' }}>
              Become a Sponsor
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 12. Footer Disclaimer */}
      <section className="py-10 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-foreground/50 leading-relaxed text-center">
            Membership, stock ownership, voting rights, dividends, transfer restrictions, eligibility, sponsorship benefits, and participation rights are subject to COOP&apos;s certificate of formation, bylaws, board policies, membership agreements, stock issuance documents, and applicable law. Patron Membership, Premium Access Membership, and Corporate / Sponsor Membership do not include stock ownership or voting rights.
          </p>
        </div>
      </section>
    </>
  );
}
