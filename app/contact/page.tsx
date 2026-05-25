import { Mail, Phone, MapPin, Clock, HelpCircle } from 'lucide-react';
import CTAButton from '../components/CTAButton';

export const metadata = {
  title: 'Contact Us | Atlantic City Community Cooperative',
  description: 'Contact AC COOP for questions about membership, vendor partnerships, sponsorship, or social services. Call (609) 318-8011 or email info@accoop.com.',
  alternates: { canonical: 'https://accoop.com/contact' },
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: 'Phone',
      info: '(609) 318-8011',
      desc: 'Mon-Fri, 9am-5pm EST',
    },
    {
      icon: Mail,
      title: 'Email',
      info: 'info@accoop.com',
      desc: 'We respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Location',
      info: '7 South Carolina Ave',
      desc: 'Atlantic City, NJ 08401',
    },
    {
      icon: Clock,
      title: 'Hours',
      info: 'Monday - Friday',
      desc: '9:00 AM - 5:00 PM',
    },
  ];

  const departments = [
    {
      title: 'General Inquiries',
      email: 'info@accoop.com',
      desc: 'Questions about the co-op',
    },
    {
      title: 'Membership',
      email: 'membership@accoop.com',
      desc: 'Join or manage membership',
    },
    {
      title: 'Vendor Relations',
      email: 'vendors@accoop.com',
      desc: 'Become a vendor partner',
    },
    {
      title: 'Investor Relations',
      email: 'investors@accoop.com',
      desc: 'Investment opportunities',
    },
    {
      title: 'Social Services',
      email: 'services@accoop.com',
      desc: 'Access support programs',
    },
    {
      title: 'Block Captain',
      email: 'blockcaptain@accoop.com',
      desc: 'Employment opportunities',
    },
  ];

  const faqs = [
    {
      question: 'How can I become a member?',
      answer: 'Contact us to learn about membership options and the registration process.',
    },
    {
      question: 'Where is the supermarket located?',
      answer: 'We are currently in development. Location details will be announced soon.',
    },
    {
      question: 'Do you offer tours?',
      answer: 'Once we open, we will offer community tours. Contact us to stay updated.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary via-primary-dark to-primary-light text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 animate-fadeInUp">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 leading-relaxed animate-fadeInUp" style={{ animationDelay: '100ms' }}>
              We&apos;re here to answer your questions and help you get involved
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const isPhone = method.title === 'Phone';
              const isEmail = method.title === 'Email';

              return (
                <div
                  key={method.title}
                  className="bg-cream p-6 rounded-2xl text-center hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-white rounded-xl flex items-center justify-center shadow-md">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-1">
                    {method.title}
                  </h3>
                  {isPhone ? (
                    <a href={`tel:${method.info.replace(/\D/g, '')}`} className="font-medium text-primary mb-1 hover:underline block">
                      {method.info}
                    </a>
                  ) : isEmail ? (
                    <a href={`mailto:${method.info}`} className="font-medium text-primary mb-1 hover:underline block">
                      {method.info}
                    </a>
                  ) : (
                    <p className="font-medium text-primary mb-1">
                      {method.info}
                    </p>
                  )}
                  <p className="text-sm text-foreground/70">
                    {method.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <p className="text-lg text-foreground/80 mb-8">
                Have a question or want to learn more? Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div style={{ width: '100%', height: '870px' }}>
                <iframe
                  src="https://links.webevertech.com/widget/form/1mUxFpmyhY1V5BfqFioB"
                  style={{ width: '100%', height: '100%', border: 'none', borderRadius: '10px' }}
                  id="contact-inline-1mUxFpmyhY1V5BfqFioB"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Main Inquiry Form"
                  data-height="833"
                  data-layout-iframe-id="contact-inline-1mUxFpmyhY1V5BfqFioB"
                  data-form-id="1mUxFpmyhY1V5BfqFioB"
                  title="Main Inquiry Form"
                />
              </div>
            </div>

            {/* Departments */}
            <div>
              <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                Contact by Department
              </h2>
              <div className="space-y-3">
                {departments.map((dept) => (
                  <div
                    key={dept.title}
                    className="bg-cream p-4 rounded-xl hover:bg-primary/10 transition-colors group"
                  >
                    <h3 className="font-heading font-semibold text-foreground mb-1">
                      {dept.title}
                    </h3>
                    <a
                      href={`mailto:${dept.email}`}
                      className="text-primary font-medium text-sm hover:underline"
                    >
                      {dept.email}
                    </a>
                    <p className="text-sm text-foreground/70 mt-1">
                      {dept.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-foreground/70">
              Quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="bg-white rounded-2xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <HelpCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-foreground/70">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-foreground/70 mb-4">
              Don&apos;t see your question answered?
            </p>
            <a
              href="mailto:info@accoop.com"
              className="inline-block text-primary font-heading font-semibold hover:text-primary-dark transition-colors"
            >
              Email us your question →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-linear-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-heading font-bold">
            Ready to Join Us?
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            Become part of Atlantic City&apos;s cooperative movement today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton className="bg-white text-primary hover:bg-cream px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Member
            </CTAButton>
            <CTAButton formType="vendor" className="bg-primary-dark hover:bg-primary text-white px-8 py-4 rounded-full font-heading font-semibold text-lg transition-all duration-300 border-2 border-white hover:shadow-2xl hover:scale-105 inline-flex items-center justify-center">
              Become a Vendor
            </CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}
