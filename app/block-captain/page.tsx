import Link from 'next/link';
import { Bike, Users, DollarSign, MapPin, CheckCircle2, Briefcase, ShoppingCart, Heart, Phone } from 'lucide-react';
import VendorForm from '../components/VendorForm';

export const metadata = {
  title: 'Block Captain Program Atlantic City | Community Outreach & Delivery Jobs',
  description: 'Join the Atlantic City Community Cooperative Block Captain Program. Help deliver groceries, connect neighbors to services, and build community leadership.',
};

export default function BlockCaptainPage() {
  const responsibilities = [
    'Assist neighbors with grocery orders',
    'Coordinate home deliveries',
    'Connect residents to social services',
    'Lead membership outreach',
  ];

  const benefits = [
    { icon: DollarSign, title: 'Competitive Pay', desc: 'Earn income serving your community' },
    { icon: Bike, title: 'Flexible Hours', desc: 'Work on your own schedule' },
    { icon: Users, title: 'Community Impact', desc: 'Make a real difference locally' },
    { icon: Briefcase, title: 'Training Provided', desc: 'Full onboarding and ongoing support' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Block Captain Program — Community Leadership in Action
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Earn income while empowering your neighbors and strengthening our community
            </p>
          </div>
        </div>
      </section>

      {/* Who Are Block Captains */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
                Who Are Block Captains?
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-6">
                Block Captains are local Atlantic City residents hired to:
              </p>
              <ul className="space-y-3 mb-8">
                {responsibilities.map((item) => (
                  <li key={item} className="flex items-start space-x-3">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-start space-x-3 bg-accent/10 border-l-4 border-accent p-4 rounded-r-xl">
                <MapPin className="w-6 h-6 text-accent shrink-0 mt-1" />
                <div>
                  <p className="font-heading font-semibold text-foreground mb-1">
                    Neighborhood-Based Work
                  </p>
                  <p className="text-foreground/70">
                    Serve the blocks and areas you know best, building trust and relationships
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8">
              <VendorForm />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-foreground/70 mb-8">
              Block Captains act as neighborhood ambassadors and delivery coordinators, strengthening both service access and community ownership.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Block Captain Benefits
            </h2>
            <p className="text-xl text-foreground/70">
              Why join our team
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-cream p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300 shadow-md">
                    <Icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/70">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </>
  );
}
