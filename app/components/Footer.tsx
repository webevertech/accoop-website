import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <Image
              src="/dark-logo.png"
              alt="Atlantic City Community Cooperative"
              width={180}
              height={72}
              className="h-30 w-auto"
            />
            <p className="text-sm text-white/80 leading-relaxed">
              A community-owned supermarket & social impact hub empowering Atlantic City residents.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white/80 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-sm text-white/80 hover:text-white transition-colors">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-sm text-white/80 hover:text-white transition-colors">
                  Our Marketplace
                </Link>
              </li>
              <li>
                <Link href="/social-impact" className="text-sm text-white/80 hover:text-white transition-colors">
                  Social Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/membership" className="text-sm text-white/80 hover:text-white transition-colors">
                  Become a Member
                </Link>
              </li>
              <li>
                <Link href="/vendors" className="text-sm text-white/80 hover:text-white transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/block-captain" className="text-sm text-white/80 hover:text-white transition-colors">
                  Join as Block Captain
                </Link>
              </li>
              <li>
                <Link href="/sponsorship" className="text-sm text-white/80 hover:text-white transition-colors">
                  Sponsor the Co-Op
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <a href="https://www.google.com/maps/search/?api=1&query=7+South+Carolina+Ave,+Atlantic+City,+NJ+08401" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  7 South Carolina Ave<br />Atlantic City, NJ 08401
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@accoop.com" className="hover:text-white transition-colors">
                  info@accoop.com
                </a>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:6093188011" className="hover:text-white transition-colors">
                  (609) 318-8011
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4">
              <a href="https://www.facebook.com/profile.php?id=61581595171934&sk=about" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
            <p>&copy; {currentYear} Atlantic City Community Cooperative. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
