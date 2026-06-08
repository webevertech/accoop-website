import Link from 'next/link';
import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import {
  Target,
  Eye,
  Users,
  Store,
  Truck,
  Building2,
  ChefHat,
  Briefcase,
  ShoppingCart,
  Crown,
  Vote,
  Gift,
  Coins,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | Atlantic City Community Cooperative',
  description: 'Atlantic City Community Cooperative is a community-owned supermarket, Boardwalk Basket marketplace, delivery network, and social impact hub — a national movement beginning in Atlantic City, NJ.',
  alternates: { canonical: 'https://accoop.com/about' },
};

export default function AboutPage() {
  const whatWeAreBuilding = [
    { title: 'Community-Owned Supermarket', icon: ShoppingCart, desc: 'Affordable groceries, fresh produce, meat, seafood, bakery items, pharmacy essentials, and household goods.' },
    { title: 'Boardwalk Basket Marketplace', icon: Store, desc: "Atlantic City's own digital marketplace connecting residents, tourists, vendors, and local businesses." },
    { title: 'Home Delivery Network', icon: Truck, desc: 'A neighborhood-based delivery system supported by Block Captains, EV vehicles, and local logistics.' },
    { title: 'Social Impact Center', icon: Building2, desc: 'Access to social services, job training, housing support, food assistance, and family resources.' },
    { title: 'Community Kitchen', icon: ChefHat, desc: 'A platform for local food entrepreneurs to prepare, launch, and grow food businesses.' },
    { title: 'Workforce Development', icon: Briefcase, desc: 'Training and employment pathways for Atlantic City residents.' },
  ];

  const ownershipPillars = [
    { title: 'Owners', icon: Crown, desc: 'Residents become member-owners of the cooperative.' },
    { title: 'Decision-Makers', icon: Vote, desc: 'Members help shape the future through cooperative governance.' },
    { title: 'Beneficiaries', icon: Gift, desc: 'Members receive access to benefits, discounts, services, and potential patronage refunds.' },
    { title: 'Economic Participants', icon: Coins, desc: 'Local dollars stay in Atlantic City and support local growth.' },
  ];

  const whoCanJoin = [
    { title: 'Atlantic City Residents', desc: 'Become member-owners, access benefits, shop local, and help shape the cooperative.' },
    { title: 'Local Businesses & Vendors', desc: 'Sell products, reach new customers, and grow through Boardwalk Basket and the cooperative marketplace.' },
    { title: 'Corporate Sponsors & Investors', desc: 'Support community ownership, food access, workforce development, and neighborhood revitalization.' },
    { title: 'Community Organizations', desc: 'Partner with the Social Impact Center to connect residents with services and resources.' },
  ];

  const cooperativePrinciples = [
    'Voluntary and Open Membership',
    'Democratic Member Control',
    'Member Economic Participation',
    'Autonomy and Independence',
    'Education, Training, and Information',
    'Cooperation Among Cooperatives',
    'Concern for Community',
  ];

  return (
    <>
      {/* 1. Top Hero */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold animate-fadeInUp">
                About Atlantic City Community Cooperative
              </h1>
              <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
                A community-owned supermarket, service hub, and national movement beginning in Atlantic City.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                Atlantic City Community Cooperative is more than a grocery store. It is a people-powered movement where Atlantic City residents are coming together to own the problem, build the solution, and change the narrative about their city.
              </p>
              <p className="text-lg text-white/80 leading-relaxed">
                We are creating a community-owned supermarket, Boardwalk Basket digital marketplace, home delivery network, and social impact hub where residents, local businesses, vendors, sponsors, and investors can work together to build a stronger Atlantic City.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                <CTAButton className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Pre-Register Now
                </CTAButton>
                <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
                  Become a Member
                </CTAButton>
                <CTAButton className="bg-accent hover:bg-accent/90 text-foreground px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Partner With Us
                </CTAButton>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-4 sm:p-6">
                <Image
                  src="/AC-CO-OP-flyer-1-pg.jpg"
                  alt="Atlantic City Community Cooperative impact model — grocery and food, social services, food pantry, community kitchen, indoor farming, home delivery network, workforce development, training, and employment at 7 South Carolina Ave"
                  width={1000}
                  height={1080}
                  quality={85}
                  priority
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            Our Story: Atlantic City Is Writing Its Own Future
          </h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>
              For too long, the story of Atlantic City has been told through its challenges: food insecurity, vacant properties, limited access to fresh groceries, unemployment, and economic opportunity leaving the community.
            </p>
            <p className="font-heading font-semibold text-foreground">But Atlantic City is more than its challenges.</p>
            <p>
              Atlantic City is home to hardworking families, entrepreneurs, students, faith leaders, small business owners, and residents who believe in the future of their neighborhoods.
            </p>
            <p>
              Atlantic City Community Cooperative was created to show what happens when residents stop waiting for someone else to solve the problem and come together as owners of the solution.
            </p>
            <p>
              This cooperative is a showcase of the power of the people — a model of community unity, shared ownership, and local action.
            </p>
          </div>
          <div className="mt-8">
            <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Join the Movement
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 3. A National Movement Begins Here */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
            A National Movement Begins in Atlantic City
          </h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>
              Atlantic City Community Cooperative is the first chapter of a larger national vision: helping communities across America build community-owned solutions to food insecurity, economic inequality, and lack of local ownership.
            </p>
            <p>The goal is not only to open a supermarket.</p>
            <p>
              The goal is to prove that residents can organize, invest, govern, and build businesses that serve their own community.
            </p>
            <p>
              Atlantic City is creating a blueprint for other cities — a model where people unite around ownership, technology, food access, workforce development, and social impact.
            </p>
          </div>
          <div className="mt-8 bg-primary text-white rounded-2xl p-8 text-center">
            <p className="text-xl md:text-2xl font-heading font-semibold leading-relaxed">
              Atlantic City is not just building a co-op. Atlantic City is building an example for the nation.
            </p>
          </div>
        </div>
      </section>

      {/* 4. What We Are Building */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Everything the Community Needs — In One Cooperative Hub
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whatWeAreBuilding.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-cream p-6 rounded-2xl hover:shadow-lg transition-all duration-300 group">
                  <div className="w-12 h-12 mb-4 bg-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{item.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Power of Community Ownership */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Why Community Ownership Matters
            </h2>
            <p className="text-lg text-foreground/80 leading-relaxed mb-3">
              When residents own the cooperative, they are not just customers. They become decision-makers, beneficiaries, and builders of the local economy.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              Every dollar spent at the cooperative helps support jobs, local vendors, food access, neighborhood services, and future community investment.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownershipPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="bg-white p-6 rounded-2xl shadow-sm text-center">
                  <div className="w-14 h-14 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{pillar.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{pillar.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-cream rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                To create a community-owned marketplace and social impact hub that provides Atlantic City residents with access to fresh food, local economic opportunity, essential services, and a voice in building the future of their city.
              </p>
            </div>
            <div className="bg-cream rounded-3xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                To build a self-sustaining cooperative model where community members are owners, employees, entrepreneurs, vendors, and beneficiaries — and to make Atlantic City the national example of people-powered community transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Who Can Join the Movement? */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Who Can Join the Movement?
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {whoCanJoin.map((item) => (
              <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-4">
                <div className="shrink-0 w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Pre-Register Now
            </CTAButton>
          </div>
        </div>
      </section>

      {/* 8. Cooperative Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Built on Cooperative Principles
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Atlantic City Community Cooperative is guided by the values that define cooperatives around the world.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {cooperativePrinciples.map((principle, index) => (
              <div key={principle} className="bg-cream p-5 rounded-2xl flex items-center gap-4">
                <div className="shrink-0 w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-sm">
                  {index + 1}
                </div>
                <span className="font-heading font-semibold text-foreground">{principle}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Closing CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold leading-tight">
            Owned by the Community. Powered by the People. Building the Future Together.
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Atlantic City residents are proving that unity, ownership, and action can change the future of a city. Whether you are a resident, vendor, business owner, sponsor, investor, or community partner, there is a place for you in the Atlantic City Community Cooperative.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <CTAButton className="bg-white text-primary hover:bg-cream px-7 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Member
            </CTAButton>
            <CTAButton formType="vendor" className="bg-white/15 hover:bg-white/25 text-white px-7 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Vendor
            </CTAButton>
            <CTAButton formType="sponsor" className="text-foreground px-7 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-accent hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center" style={{ backgroundColor: '#eeb171' }}>
              Sponsor the Co-Op
            </CTAButton>
            <Link href="/contact" className="bg-transparent text-white px-7 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 hover:bg-white/10 inline-flex items-center justify-center">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
