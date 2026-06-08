import Image from 'next/image';
import CTAButton from '../components/CTAButton';
import SocialImpactTabs from '../components/SocialImpactTabs';
import { Users } from 'lucide-react';

export const metadata = {
  title: 'Center for Social Impact | Atlantic City Community Cooperative',
  description: 'The AC COOP Center for Social Impact, powered by Ideal Institute of Technology, connects members to services, benefits, and partners through one intake and one Individual Empowerment Plan — building a stronger, healthier, and more prosperous Atlantic City.',
  alternates: { canonical: 'https://accoop.com/social-impact' },
};

export default function SocialImpactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center py-16 md:py-20">
            <div className="space-y-6">
              <h1>
                <Image
                  src="/Ideal-for-Social-Impact-Logo-white.png"
                  alt="Center for Social Impact"
                  width={735}
                  height={326}
                  priority
                  className="w-full max-w-md h-auto"
                />
              </h1>
              <div className="space-y-3 max-w-lg">
                <p className="text-lg font-heading font-semibold text-white">
                  One Intake. One Empowerment Plan. One Pathway to Financial Freedom.
                </p>
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
                  src="/embraced-african-american-family-talking-kitchen.jpg"
                  alt="A family embracing in their kitchen, supported by the Center for Social Impact"
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

      {/* Tabbed micro-site — navigate the full Center content via the secondary navbar */}
      <SocialImpactTabs />
    </>
  );
}
