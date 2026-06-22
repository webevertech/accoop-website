import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import {
  Users,
  UserPlus,
  Smartphone,
  Truck,
  HeartHandshake,
  Store,
  MessageSquare,
  Briefcase,
  Apple,
  Wifi,
  Megaphone,
  MapPin,
  Crown,
} from 'lucide-react';

export const metadata = {
  title: 'Become a Block Captain | Atlantic City Community Cooperative',
  description: 'Atlantic City Community Cooperative is hiring and training youth ages 18–30 to become paid Block Captains who lead outreach, membership, Boardwalk Basket education, delivery support, and community impact across Atlantic City\'s 48 blocks.',
  alternates: { canonical: 'https://accoop.com/block-captain' },
};

export default function BlockCaptainPage() {
  const impactStats = [
    { stat: '12', title: 'Pilot Block Captains', desc: 'Launching the first youth leadership cohort.' },
    { stat: '48', title: 'Atlantic City Blocks', desc: 'Organizing outreach block by block.' },
    { stat: '18–30', title: 'Ages', desc: 'Paid leadership opportunity for AC youth and young adults.' },
    { stat: 'Paid', title: 'Training + Work', desc: 'Earn income while building real-world experience.' },
  ];

  const whatTheyDo = [
    { icon: Users, title: 'Community Outreach', desc: 'Speak directly with residents, families, seniors, workers, and neighborhood leaders. Explain the Co-op\'s mission, answer questions, and invite people to participate.' },
    { icon: UserPlus, title: 'Membership Drive', desc: 'Help residents become members. Explain membership options, help with sign-up forms, and make sure every block has a voice in the Co-op.' },
    { icon: Smartphone, title: 'Boardwalk Basket Education', desc: 'Teach residents how to use Boardwalk Basket. Help people create accounts, understand delivery, and support local vendors.' },
    { icon: Truck, title: 'Delivery Support', desc: 'Support local delivery through Boardwalk Basket with required training — grocery delivery, vendor pickup, senior delivery, and neighborhood routes.' },
    { icon: HeartHandshake, title: 'Social Impact Referrals', desc: 'Connect residents to the ACCC Center for Social Impact for food access, job readiness, training, benefits navigation, and community resources.' },
    { icon: Store, title: 'Small Business Support', desc: 'Introduce local businesses, food entrepreneurs, and service providers to Boardwalk Basket so they can reach more customers.' },
    { icon: MessageSquare, title: 'Resident Feedback', desc: 'Collect community feedback, concerns, ideas, food preferences, delivery needs, and service gaps so the Co-op responds to real needs.' },
  ];

  const youthBenefits = [
    'Earn paid income.',
    'Receive paid training.',
    'Build your resume.',
    'Learn leadership skills.',
    'Help residents in your community.',
    'Support local businesses.',
    'Learn about delivery and digital marketplace operations.',
    'Gain customer service and outreach experience.',
    'Build a pathway into future jobs with the Co-op.',
    'Become a recognized leader in your neighborhood.',
    'Help change the story of Atlantic City.',
  ];

  const candidateChecklist = [
    'Are between 18 and 30 years old.',
    'Live in Atlantic City or have a strong connection to the city.',
    'Care about your neighborhood.',
    'Like talking to people.',
    'Want paid work experience.',
    'Want to learn leadership and communication skills.',
    'Are interested in community impact.',
    'Are interested in delivery, business, technology, social services, or entrepreneurship.',
    'Can be reliable and professional.',
    'Are willing to complete training.',
  ];

  const phases = [
    { phase: 'Phase 1', lines: ['12 Block Captains', '4 blocks per captain', '48 blocks covered'] },
    { phase: 'Phase 2', lines: ['24 Block Captains', '2 blocks per captain', 'Deeper neighborhood coverage'] },
    { phase: 'Future Goal', lines: ['48 Block Captains', '1 captain per block', 'Full citywide leadership network'] },
  ];

  const trainingTopics = [
    'What a cooperative is.',
    'How Atlantic City Community Cooperative works.',
    'How to explain membership.',
    'How to use Boardwalk Basket.',
    'How to conduct respectful outreach.',
    'How to speak with residents and businesses.',
    'How to collect community feedback.',
    'How to make social impact referrals.',
    'How delivery operations work.',
    'How to use digital tools and reporting systems.',
    'How to stay safe during outreach.',
    'How to build professional communication and leadership skills.',
  ];

  const careerPathways = [
    'Lead Block Captain', 'Outreach Coordinator', 'Membership Coordinator', 'Boardwalk Basket Delivery Coordinator',
    'Vendor Support Associate', 'Social Impact Intake Assistant', 'Customer Service Representative', 'Retail Operations Associate',
    'Logistics Supervisor', 'Community Health Worker pathway', 'Youth Entrepreneurship Fellow', 'Co-op Leadership Fellow',
  ];

  const impactAreas = [
    { icon: Briefcase, title: 'Youth Employment', desc: 'Paid jobs and training for Atlantic City youth and young adults.' },
    { icon: Apple, title: 'Food Access', desc: 'More residents connected to fresh food, groceries, and delivery options.' },
    { icon: Wifi, title: 'Digital Equity', desc: 'Hands-on support to help residents use Boardwalk Basket and other digital tools.' },
    { icon: UserPlus, title: 'Membership Growth', desc: 'More residents becoming members and owners of the Co-op.' },
    { icon: Store, title: 'Local Business Support', desc: 'More Atlantic City vendors connected to the local digital marketplace.' },
    { icon: HeartHandshake, title: 'Social Impact Referrals', desc: 'More residents connected to support services, benefits, training, and opportunities.' },
    { icon: MessageSquare, title: 'Community Voice', desc: 'Block-by-block feedback to help the Co-op respond to real needs.' },
    { icon: Crown, title: 'Neighborhood Leadership', desc: 'Young people becoming trusted leaders in their own communities.' },
  ];

  const applicationSteps = [
    { step: '1', title: 'Apply', desc: 'Complete the Block Captain interest form online.' },
    { step: '2', title: 'Attend an Information Session', desc: 'Learn about the program, responsibilities, schedule, pay, training, and expectations.' },
    { step: '3', title: 'Interview', desc: 'Meet with the ACCC team and tell us why you want to serve your community.' },
    { step: '4', title: 'Complete Training', desc: 'Selected applicants will complete paid training before being assigned to a block.' },
    { step: '5', title: 'Start Serving Your Block', desc: 'Begin outreach, membership support, Boardwalk Basket education, and community impact work.' },
  ];

  const sponsorshipOptions = [
    'One Block Captain', 'One four-block outreach zone', 'A neighborhood team', 'Youth training bootcamp',
    'Boardwalk Basket digital education', 'Senior delivery access', 'Community outreach events',
    'Membership drives', 'Technology and outreach kits', 'Youth leadership graduation',
  ];

  const faqs = [
    { q: 'What is a Block Captain?', a: 'A Block Captain is a paid Community Impact Liaison who represents Atlantic City Community Cooperative in assigned neighborhoods. They help residents join the Co-op, learn Boardwalk Basket, access support services, and stay connected to community opportunities.' },
    { q: 'Is this a paid position?', a: 'Yes. Block Captains receive paid training and paid work opportunities. Compensation details will be shared during the information session and interview process.' },
    { q: 'Who can apply?', a: 'The program is designed for Atlantic City youth and young adults ages 18 to 30. Preference may be given to applicants who live in Atlantic City or have a strong connection to the blocks they will serve.' },
    { q: 'Do I need experience?', a: 'No formal experience is required. We are looking for reliable, respectful, motivated young people who care about their community and are willing to learn.' },
    { q: 'What will I be doing?', a: 'You will conduct outreach, help residents become Co-op members, teach people how to use Boardwalk Basket, collect feedback, support community events, connect residents to the Center for Social Impact, and possibly support delivery operations.' },
    { q: 'Do I have to do delivery work?', a: 'Delivery work may be available for Block Captains who are interested and complete the required training. Some Block Captains may focus more on outreach, membership, and community education.' },
    { q: 'Will I be assigned to my own neighborhood?', a: 'Whenever possible, ACCC will try to assign Block Captains to areas where they live or already have community relationships.' },
    { q: 'What is Boardwalk Basket?', a: "Boardwalk Basket is Atlantic City's local digital marketplace and delivery platform, being developed to help residents, visitors, and workers order from local vendors, food businesses, and the Co-op marketplace." },
    { q: 'How do sponsors support the program?', a: 'Sponsors can support wages, training, outreach materials, technology, events, delivery access, and neighborhood teams. Sponsorship helps create paid youth jobs and measurable community impact.' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <p className="text-sm font-heading font-semibold text-accent uppercase tracking-wider">Become a Block Captain</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight">
                Lead Your Block. Serve Your Community. Get Paid to Build Atlantic City&apos;s Future.
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Atlantic City Community Cooperative is recruiting youth and young adults ages 18–30 to become paid Block Captains — trusted neighborhood leaders who help residents join the Co-op, use Boardwalk Basket, access support services, and bring community ownership to every block of Atlantic City.
              </p>
              <p className="text-base text-white/80 leading-relaxed">
                This is more than a job. It is a leadership opportunity, a paid work experience, and a chance to represent your neighborhood with pride. Atlantic City has 48 community outreach blocks. We are starting with 12 Block Captains who will each serve approximately four blocks.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
                <CTAButton className="bg-white text-primary hover:bg-cream px-6 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center">
                  Apply to Become a Block Captain
                </CTAButton>
                <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
                  Support the Block Captain Program
                </CTAButton>
                <a href="https://www.boardwalkbasket.com/en/" target="_blank" rel="noopener noreferrer" className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
                  Learn About Boardwalk Basket
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                <Image
                  src="/man-carrying-groceries.webp"
                  alt="An Atlantic City Block Captain carrying a box of groceries for delivery with Boardwalk Basket"
                  width={800}
                  height={600}
                  quality={80}
                  priority
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Impact Bar */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg font-heading font-semibold text-foreground mb-8">
            One City. 48 Blocks. Youth-Led Community Ownership.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {impactStats.map((s) => (
              <div key={s.title} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <p className="text-3xl font-heading font-bold text-primary mb-1">{s.stat}</p>
                <p className="font-heading font-semibold text-foreground text-sm mb-1">{s.title}</p>
                <p className="text-xs text-foreground/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Is a Block Captain */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">What Is a Block Captain?</h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>A Block Captain is a paid Community Impact Liaison for Atlantic City Community Cooperative.</p>
            <p>Block Captains are local youth and young adults who represent the Co-op in their assigned neighborhoods. They help residents understand what the Co-op is, how to become members, how to use Boardwalk Basket, and how to connect with the ACCC Center for Social Impact.</p>
            <p>They knock on doors, attend neighborhood events, speak with families, support seniors, educate residents, help small businesses connect to Boardwalk Basket, and collect feedback from the people who know Atlantic City best — the residents.</p>
          </div>
          <div className="mt-8 bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6">
            <p className="text-lg font-heading font-semibold text-foreground">
              A Block Captain is a paid neighborhood leader who helps Atlantic City residents connect to food, delivery, membership, services, jobs, and community ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Program Matters */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">Why Atlantic City Needs Block Captains</h2>
          <div className="space-y-5 text-lg text-foreground/80 leading-relaxed">
            <p>Atlantic City Community Cooperative is not just building a supermarket. We are building a community-owned system for food access, local delivery, small business growth, youth employment, and social impact.</p>
            <p>For this movement to succeed, residents must understand it, trust it, join it, and use it. That cannot happen through ads alone. It happens through people — when a young leader from the neighborhood says:</p>
            <ul className="space-y-2 text-base italic text-primary font-medium pl-4 border-l-2 border-primary/30">
              <li>&ldquo;This Co-op belongs to us.&rdquo;</li>
              <li>&ldquo;This platform supports our local businesses.&rdquo;</li>
              <li>&ldquo;This membership gives our community a voice.&rdquo;</li>
              <li>&ldquo;This service can help your family.&rdquo;</li>
              <li>&ldquo;This is how we change Atlantic City together.&rdquo;</li>
            </ul>
          </div>
          <div className="mt-8 bg-primary text-white rounded-2xl p-6 text-center">
            <p className="text-lg font-heading font-semibold">
              The Block Captain Program turns community outreach into paid youth employment and turns local residents into leaders of the cooperative movement.
            </p>
          </div>
        </div>
      </section>

      {/* What Block Captains Do */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">What Block Captains Do</h2>
            <p className="text-lg text-foreground/70">Block Captains are trained and paid to support several important areas of the Co-op&apos;s work.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whatTheyDo.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className="bg-cream p-6 rounded-2xl hover:shadow-lg transition-all duration-300">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Youth */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">For Atlantic City Youth Ages 18–30</h2>
          <p className="text-xl font-heading font-semibold text-primary mb-6">Get Paid. Get Trained. Get Respected. Lead Your Block.</p>
          <div className="space-y-4 text-lg text-foreground/80 leading-relaxed mb-8">
            <p>If you are between the ages of 18 and 30 and care about Atlantic City, this program is for you. As a Block Captain, you will receive paid training, paid work experience, leadership development, and the opportunity to represent your own neighborhood with pride.</p>
            <p>You do not need to be perfect. You do not need a college degree. You do not need years of experience. You need to be reliable, respectful, coachable, and ready to make a difference.</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">As a Block Captain, you can:</h3>
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {youthBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xl font-heading font-bold text-foreground mb-6">You are not just applying for a job. You are stepping into leadership.</p>
          <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
            Apply to Become a Block Captain
          </CTAButton>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Who Should Apply?</h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            We are looking for Atlantic City youth and young adults who are ready to serve, learn, and lead. You may be a good fit if you:
          </p>
          <div className="bg-cream rounded-2xl p-6 mb-6">
            <ul className="grid sm:grid-cols-2 gap-2.5">
              {candidateChecklist.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-foreground/80">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-primary/5 rounded-2xl p-6">
            <p className="font-heading font-semibold text-foreground mb-2">Preferred but not required:</p>
            <p className="text-sm text-foreground/70">Previous outreach experience, customer service experience, bilingual ability, driver&apos;s license, delivery experience, social media or content creation skills, or experience helping neighbors, family, church, school, or community groups.</p>
            <p className="text-sm text-foreground/70 mt-3 italic">Even if this is your first leadership opportunity, we encourage you to apply. We will train you.</p>
          </div>
        </div>
      </section>

      {/* Training & Career Pathways */}
      <section className="py-20 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">Training That Builds Real Skills</h2>
          <p className="text-lg text-foreground/80 leading-relaxed mb-8">
            Every Block Captain will receive training before going into the community, designed to help you become confident, professional, and prepared.
          </p>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Block Captains will learn:</h3>
              <ul className="space-y-2">
                {trainingTopics.map((t) => (
                  <li key={t} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-heading font-semibold text-lg text-foreground mb-4">Career Pathways</h3>
              <div className="flex flex-wrap gap-2">
                {careerPathways.map((c) => (
                  <span key={c} className="px-3 py-1.5 bg-cream rounded-full text-xs font-heading font-semibold text-foreground/80">
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-sm font-heading font-semibold text-primary mt-6">
                This program is designed to help you earn today and build your future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 48-Block Model */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <MapPin className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">How the 48-Block Model Works</h2>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Atlantic City Community Cooperative is organizing outreach across 48 community blocks. Whenever possible, Block Captains will be assigned to areas where they live, work, worship, attend school, or already have relationships.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {phases.map((p) => (
              <div key={p.phase} className="bg-cream rounded-2xl p-6 text-center">
                <p className="font-heading font-bold text-primary mb-4">{p.phase}</p>
                <ul className="space-y-1.5">
                  {p.lines.map((l) => (
                    <li key={l} className="text-sm text-foreground/80">{l}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-primary text-white rounded-2xl p-6 text-center">
            <p className="text-lg font-heading font-semibold">
              Every block deserves a voice. Every resident deserves access. Every neighborhood deserves leadership.
            </p>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">The Impact We Are Building</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((a) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className="bg-white p-6 rounded-2xl shadow-sm">
                  <div className="w-12 h-12 mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{a.title}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{a.desc}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-xl font-heading font-bold text-primary mt-10">
            This is how Atlantic City builds from the block up.
          </p>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">How to Become a Block Captain</h2>
          <div className="space-y-6">
            {applicationSteps.map((s) => (
              <div key={s.step} className="flex gap-5 items-start">
                <div className="shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-lg">
                  {s.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">{s.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <CTAButton className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Start Your Application
            </CTAButton>
          </div>
        </div>
      </section>

      {/* For Vendors & Sponsors */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <Store className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">For Vendors and Small Businesses</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Block Captains help introduce local businesses to Boardwalk Basket and connect them with the vendor onboarding team — helping you reach more residents, offer delivery, promote products, and keep more dollars circulating locally.
            </p>
            <CTAButton formType="vendor" className="inline-block bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg">
              Become a Boardwalk Basket Vendor
            </CTAButton>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <Megaphone className="w-10 h-10 text-primary mb-4" />
            <h2 className="text-2xl font-heading font-bold text-foreground mb-2">For Sponsors, Donors &amp; Supporters</h2>
            <p className="text-foreground/70 leading-relaxed mb-4">
              Sponsor youth leadership, support food access, and invest in Atlantic City. You can support a Block Captain, a four-block outreach zone, a neighborhood team, training bootcamps, and more.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              {sponsorshipOptions.slice(0, 6).map((o) => (
                <span key={o} className="px-3 py-1.5 bg-cream rounded-full text-xs font-heading font-semibold text-foreground/80">{o}</span>
              ))}
            </div>
            <CTAButton formType="sponsor" className="inline-block text-foreground px-6 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg" style={{ backgroundColor: '#eeb171' }}>
              Sponsor the Block Captain Program
            </CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
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

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-3xl md:text-5xl font-heading font-bold">Ready to Lead Your Block?</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Atlantic City is building something different — a community-owned cooperative powered by residents, local businesses, youth leadership, and shared responsibility. If you are ready to earn, learn, serve, and lead, the Block Captain Program is your opportunity.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <CTAButton className="bg-white text-primary hover:bg-cream px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Apply to Become a Block Captain
            </CTAButton>
            <CTAButton formType="sponsor" className="text-foreground px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-accent hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center" style={{ backgroundColor: '#eeb171' }}>
              Sponsor the Program
            </CTAButton>
            <CTAButton className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
              Become a Co-op Member
            </CTAButton>
            <CTAButton formType="vendor" className="bg-white/15 hover:bg-white/25 text-white px-6 py-3.5 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white/60 inline-flex items-center justify-center">
              Become a Vendor
            </CTAButton>
          </div>
          <p className="text-sm text-white/70 leading-relaxed border-t border-white/20 pt-8 max-w-2xl mx-auto">
            One City. 48 Blocks. One Cooperative Future. Atlantic City Community Cooperative Block Captains are paid youth leaders helping connect residents to membership, Boardwalk Basket, local businesses, delivery access, social impact services, and community ownership — one block at a time.
          </p>
        </div>
      </section>
    </>
  );
}
