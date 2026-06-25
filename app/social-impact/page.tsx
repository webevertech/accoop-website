import Image from 'next/image';
import { ClipboardCheck } from 'lucide-react';
import CTAButton from '../components/CTAButton';
import LoginButton from '../components/LoginButton';
import CenterForSocialImpact from './CenterForSocialImpact';
import EmpowermentJourney from './EmpowermentJourney';

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
          <div className="grid md:grid-cols-2 gap-10 items-center py-12 sm:py-16 md:py-20">
            <div className="space-y-6">
              <h1>
                <Image
                  src="/Ideal-for-Social-Impact-Logo-white.png"
                  alt="Center for Social Impact"
                  width={735}
                  height={326}
                  priority
                  className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto"
                />
              </h1>
              <div className="space-y-3">
                <p className="text-lg font-heading font-semibold text-white">
                  One Intake. One Empowerment Plan. One Pathway to Financial Freedom.
                </p>
                <p className="text-base text-white/85 leading-relaxed">
                  Connecting AC COOP members to the services, benefits, and partners that build a stronger, healthier, and more prosperous Atlantic City.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <CTAButton label="Complete Social Impact Intake" className="bg-white text-primary hover:bg-cream px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg w-full sm:flex-1 inline-flex items-center justify-center gap-2">
                  <ClipboardCheck className="w-5 h-5 shrink-0" aria-hidden="true" />
                  Complete Social Impact Intake
                </CTAButton>
                <CTAButton formType="vendor" label="Become a Service Provider" className="bg-transparent hover:bg-white/15 text-white px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 border-2 border-white/70 w-full sm:flex-1 inline-flex items-center justify-center">
                  Become a Service Provider
                </CTAButton>
                <LoginButton className="bg-accent hover:bg-accent/90 text-foreground px-7 py-3.5 rounded-full font-heading font-semibold transition-all duration-300 hover:shadow-lg w-full sm:flex-1 inline-flex items-center justify-center">
                  Login
                </LoginButton>
              </div>
            </div>
            <div className="relative">
              <EmpowermentJourney />
            </div>
          </div>
        </div>
      </section>

      {/* Center for Social Impact — full design ported from the standalone source */}
      <CenterForSocialImpact />
    </>
  );
}
