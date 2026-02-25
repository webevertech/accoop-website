# Atlantic City Community Cooperative Website

![CI/CD Pipeline](https://github.com/webevertech/accoop-website/actions/workflows/ci-cd.yml/badge.svg)

A community-owned supermarket and social impact hub website built with Next.js 16, empowering Atlantic City residents through cooperative ownership.

## 🌟 Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Full Page Suite**: Home, About, Membership, Marketplace, Social Impact, News, Contact, and more
- **SEO Optimized**: Sitemap, robots.txt, and meta tags
- **PWA Support**: Manifest and favicons for installable web app
- **Clickable Contact Info**: Phone, email, and address with proper links
- **Social Media Integration**: Facebook page integration
- **TypeScript**: Full type safety across the application
- **Optimized Images**: Next.js Image component with AVIF/WebP support

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm (comes with Node.js)

### Development

1. Clone the repository:
```bash
git clone https://github.com/webevertech/accoop-website.git
cd accoop-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
accoop-website/
├── app/                          # Next.js app directory
│   ├── about/                    # About page
│   ├── block-captain/            # Block Captain program page
│   ├── components/               # Reusable components
│   │   ├── Header.tsx           # Site header with navigation
│   │   ├── Footer.tsx           # Site footer with contact info
│   │   └── CountUp.tsx          # Animated counter component
│   ├── contact/                  # Contact page
│   ├── marketplace/              # Marketplace page
│   ├── membership/               # Membership information
│   ├── news/                     # News and updates
│   ├── social-impact/            # Social impact initiatives
│   ├── sponsorship/              # Sponsorship opportunities
│   ├── vendors/                  # Vendor information
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles
│   ├── robots.ts                 # SEO robots configuration
│   └── sitemap.ts                # SEO sitemap generation
├── public/                       # Static assets
│   ├── logo.png                  # Co-op logo
│   ├── dark-logo.png             # Dark theme logo
│   ├── hero-*.jpg                # Hero images
│   ├── community-*.jpg           # Community images
│   └── *.png                     # Favicons and PWA icons
├── .github/                      # GitHub configuration
│   ├── workflows/                # CI/CD workflows
│   │   └── ci-cd.yml            # Main pipeline
│   └── CICD-GUIDE.md            # CI/CD documentation
├── HOSTINGER-DEPLOYMENT.md       # Hostinger deployment guide
└── package.json                  # Project dependencies
```

## 🔄 CI/CD Pipeline

This project uses GitHub Actions for automated testing and deployment.

### Pipeline Jobs

- **Build & Test**: Validates builds, runs linter, type checking
- **Security Scan**: Checks for vulnerabilities and sensitive data
- **Code Quality**: Verifies configuration and required files

### Workflow Triggers

- **Push to `main`**: Full pipeline + creates deployment artifact
- **Pull Requests**: Build validation only

### Viewing Pipeline Status

1. Go to the [Actions tab](https://github.com/webevertech/accoop-website/actions)
2. See all workflow runs and their status
3. Download deployment artifacts (retained for 30 days)

For detailed CI/CD documentation, see [.github/CICD-GUIDE.md](.github/CICD-GUIDE.md)

## 📦 Deployment

### Option 1: Hostinger GitHub Integration (Recommended)

1. Login to Hostinger hPanel
2. Navigate to **Websites** → **Add Website**
3. Select **Node.js Apps** → **Import Git Repository**
4. Connect to `webevertech/accoop-website`
5. Configure:
   - **Branch**: `main`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 20.x
6. Click **Deploy**

Hostinger will automatically deploy on every push to `main`.

### Option 2: Manual Deployment

1. Download deployment artifact from GitHub Actions
2. Upload to Hostinger via hPanel
3. See [HOSTINGER-DEPLOYMENT.md](HOSTINGER-DEPLOYMENT.md) for details

## 📞 Contact Information

**Atlantic City Community Cooperative**

- **Phone**: [(609) 318-8011](tel:6093188011)
- **Email**: [info@accoop.com](mailto:info@accoop.com)
- **Address**: [7 South Carolina Ave, Atlantic City, NJ 08401](https://www.google.com/maps/search/?api=1&query=7+South+Carolina+Ave,+Atlantic+City,+NJ+08401)
- **Facebook**: [Official Page](https://www.facebook.com/profile.php?id=61581595171934&sk=about)

## 🛠️ Technology Stack

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Fonts**: Geist (optimized with next/font)
- **Deployment**: Hostinger Node.js hosting (standalone mode)

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check
```

## 🔒 Security

- No sensitive data in repository
- Environment variables managed via Hostinger dashboard
- Regular security audits via CI/CD pipeline
- Dependencies scanned for vulnerabilities

## 📄 License

All rights reserved - Atlantic City Community Cooperative

## 🤝 Contributing

This is a private project for Atlantic City Community Cooperative. For contributions or questions, please contact the development team.

## 📚 Documentation

- [HOSTINGER-DEPLOYMENT.md](HOSTINGER-DEPLOYMENT.md) - Complete Hostinger deployment guide
- [.github/CICD-GUIDE.md](.github/CICD-GUIDE.md) - CI/CD pipeline documentation
- [Next.js Documentation](https://nextjs.org/docs) - Next.js features and API

## 🐛 Troubleshooting

### Build Issues

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Type Errors

```bash
npx tsc --noEmit
```

### Deployment Issues

See [HOSTINGER-DEPLOYMENT.md](HOSTINGER-DEPLOYMENT.md) troubleshooting section.

---

**Built with ❤️ for the Atlantic City community**

**Repository**: https://github.com/webevertech/accoop-website
**Last Updated**: February 25, 2026

