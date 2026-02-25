import Link from 'next/link';
import { Calendar, Newspaper, Users, TrendingUp } from 'lucide-react';
import CountUp from '../components/CountUp';

export const metadata = {
  title: 'News & Events - Atlantic City Community Cooperative',
  description: 'Stay updated on co-op news, community events, and press releases.',
};

export default function NewsPage() {
  const upcomingEvents = [
    {
      date: 'TBA',
      title: 'Grand Opening Celebration',
      desc: 'Join us for the official opening of our community supermarket and social impact center',
      category: 'Community Event',
    },
    {
      date: 'TBA',
      title: 'Vendor Expo',
      desc: 'Meet local vendors and learn about partnership opportunities',
      category: 'Business',
    },
    {
      date: 'TBA',
      title: 'Member Appreciation Day',
      desc: 'Special discounts and activities for co-op members',
      category: 'Member Event',
    },
  ];

  const news = [
    {
      date: '2026',
      title: 'Atlantic City Community Cooperative Launches',
      desc: 'We are excited to announce the launch of Atlantic City\'s first community-owned supermarket and social impact hub.',
      category: 'Announcement',
    },
    {
      date: 'Coming Soon',
      title: 'Membership Drive Begins',
      desc: 'Join the co-op movement and become an owner in Atlantic City\'s economic future.',
      category: 'Community',
    },
    {
      date: 'Coming Soon',
      title: 'Block Captain Program Applications Open',
      desc: 'Earn income while serving your community. Applications now being accepted.',
      category: 'Employment',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              News & Events
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              Stay connected with the latest co-op updates and community happenings
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                Upcoming Events
              </h2>
              <p className="text-xl text-foreground/70">
                Mark your calendar for these co-op events
              </p>
            </div>
            <Calendar className="w-12 h-12 text-primary hidden md:block" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-cream rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-primary text-white text-sm font-heading font-semibold px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  <Calendar className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                </div>
                <div className="text-sm font-semibold text-primary mb-2">
                  {event.date}
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">
                  {event.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {event.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Updates */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-heading font-bold text-foreground mb-2">
                Community Updates
              </h2>
              <p className="text-xl text-foreground/70">
                Latest news from the co-op
              </p>
            </div>
            <Newspaper className="w-12 h-12 text-primary hidden md:block" />
          </div>

          <div className="space-y-6">
            {news.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <Newspaper className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-2xl text-foreground">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-foreground/60">{item.date}</span>
                        <span className="text-sm text-primary font-medium">{item.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed pl-0 md:pl-16">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Community Impact
            </h2>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              Stories of how the co-op is transforming lives
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                number: 2500,
                suffix: '+',
                label: 'Community Members',
                desc: 'Growing family of co-op owners',
              },
              {
                icon: TrendingUp,
                number: 50,
                suffix: '+',
                label: 'Local Vendors',
                desc: 'Small businesses supported',
              },
              {
                icon: Calendar,
                number: 100,
                suffix: '%',
                label: 'Community Owned',
                desc: 'Democratic governance',
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="bg-linear-to-br from-primary/10 to-primary-light/10 rounded-2xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-2xl flex items-center justify-center shadow-md">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <CountUp
                    end={item.number}
                    suffix={item.suffix}
                    className="text-5xl font-heading font-bold text-primary mb-2"
                  />
                  <div className="font-heading font-semibold text-foreground mb-2">
                    {item.label}
                  </div>
                  <p className="text-sm text-foreground/70">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Stay in the Loop
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Subscribe to our newsletter for the latest news, events, and co-op updates
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <p className="text-white/90 mb-4">
              Newsletter signup coming soon! For now, follow us on social media.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-primary hover:bg-cream px-8 py-3 rounded-full font-heading font-semibold transition-all duration-300 hover:scale-105"
            >
              Contact Us for Updates
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
