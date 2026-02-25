# Hostinger Deployment Guide

## Overview

This guide explains how to create a proper deployment zip file for this Next.js application to deploy on Hostinger's Node.js hosting platform.

## How Hostinger Node.js Hosting Works

Hostinger's Node.js hosting platform:
1. Accepts your **source code** (not pre-built files)
2. Automatically detects your framework (Next.js)
3. Runs `npm install` to install dependencies from package.json
4. Runs `npm run build` to build your application
5. Starts your app using `npm start`

**Important**: Hostinger builds your app on their servers, so you should NOT include build artifacts or node_modules.

## Files to Include

### Required Files
```
✓ app/                      # Next.js app directory with all pages and components
✓ public/                   # Static assets (images, icons, manifest.json)
✓ package.json              # Project dependencies and scripts
✓ package-lock.json         # Locked dependency versions
✓ next.config.ts            # Next.js configuration
✓ tsconfig.json             # TypeScript configuration
✓ postcss.config.mjs        # PostCSS configuration
✓ eslint.config.mjs         # ESLint configuration
✓ next-env.d.ts             # Next.js TypeScript declarations
✓ README.md                 # Project documentation (optional)
```

### Files to EXCLUDE
```
✗ .next/                    # Build output - Hostinger rebuilds this
✗ node_modules/             # Dependencies - Hostinger installs these
✗ .git/                     # Git repository data
✗ .DS_Store                 # macOS system files
✗ *.zip                     # Other zip files
✗ deploy/                   # Local deployment folder
✗ .env.local                # Local environment variables (add via Hostinger dashboard)
```

## Creating the Deployment Zip

### Command
Run this command from the project root directory:

```bash
zip -r accoop-website-hostinger.zip \
  app \
  public \
  package.json \
  package-lock.json \
  next.config.ts \
  tsconfig.json \
  postcss.config.mjs \
  eslint.config.mjs \
  next-env.d.ts \
  README.md \
  -x "*.DS_Store"
```

### One-Line Version
```bash
cd /path/to/accoop-website && rm -f accoop-website-hostinger.zip && zip -r accoop-website-hostinger.zip app public package.json package-lock.json next.config.ts tsconfig.json postcss.config.mjs eslint.config.mjs next-env.d.ts README.md -x "*.DS_Store"
```

## Verification Steps

### 1. Check File Size
The zip should be around **900KB - 1MB** (NOT 300MB+):
```bash
ls -lh accoop-website-hostinger.zip
```

Expected output:
```
-rw-r--r--  1 user  staff   924K Feb 25 11:41 accoop-website-hostinger.zip
```

### 2. Verify Contents
Check what's inside the zip:
```bash
unzip -l accoop-website-hostinger.zip | head -20
```

You should see:
- app/ directory with .tsx files
- public/ directory with images
- package.json and other config files

You should NOT see:
- .next/ directory
- node_modules/ directory

### 3. Count Files
```bash
unzip -l accoop-website-hostinger.zip | tail -1
```

Should show around **48 files** total.

## Common Mistakes to Avoid

### ❌ Mistake 1: Including Build Output
**Problem**: Including the `.next/` folder makes the zip 300MB+ and causes deployment issues.

**Why it fails**: Hostinger expects source code and will rebuild the app. Pre-built files can cause conflicts.

**Solution**: Never include `.next/` in the zip.

### ❌ Mistake 2: Including node_modules
**Problem**: Including `node_modules/` creates a massive zip file (500MB+).

**Why it fails**: Hostinger installs dependencies automatically. Including them is redundant and causes version conflicts.

**Solution**: Never include `node_modules/` in the zip.

### ❌ Mistake 3: Wrong Directory Structure
**Problem**: Creating zip from parent directory, causing files to be nested incorrectly.

**Example of wrong structure**:
```
accoop-website/
  accoop-website/
    app/
    public/
    package.json
```

**Solution**: Always `cd` into the project directory first, then create zip from there.

### ❌ Mistake 4: Missing Configuration Files
**Problem**: Not including essential config files like `next.config.ts` or `tsconfig.json`.

**Why it fails**: Next.js needs these files to build correctly.

**Solution**: Always include all configuration files listed in the "Required Files" section.

## Deploying to Hostinger

### Step 1: Access hPanel
1. Log in to your Hostinger account
2. Navigate to **Websites** in the sidebar
3. Click **Add Website**

### Step 2: Select Node.js Apps
1. Choose **Node.js Apps** option
2. Select **"Upload your website files"**

### Step 3: Upload Zip
1. Upload `accoop-website-hostinger.zip`
2. Hostinger will auto-detect it's a Next.js application

### Step 4: Verify Build Settings
Hostinger should auto-configure these settings:
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Node Version**: 20.x or higher

Verify these are correct before proceeding.

### Step 5: Deploy
1. Click **Deploy**
2. Hostinger will:
   - Extract your files
   - Run `npm install`
   - Run `npm run build`
   - Start your application

## Troubleshooting

### Build Fails on Hostinger

**Check 1: File Size**
```bash
ls -lh accoop-website-hostinger.zip
```
Should be ~1MB, not 300MB+

**Check 2: Contents**
```bash
unzip -l accoop-website-hostinger.zip | grep -E "(\.next|node_modules)"
```
Should return nothing. If you see these directories, recreate the zip.

**Check 3: Required Files**
```bash
unzip -l accoop-website-hostinger.zip | grep -E "(package\.json|next\.config)"
```
Should show both files.

### Application Won't Start

**Check**: Ensure `next.config.ts` has `output: "standalone"` configured:
```typescript
const nextConfig: NextConfig = {
  output: "standalone",
  // ... other config
};
```

This is required for Hostinger deployment.

## Quick Reference

### ✅ Correct Zip Creation
```bash
# Navigate to project directory
cd /path/to/accoop-website

# Remove old zip if exists
rm -f accoop-website-hostinger.zip

# Create new zip with source files only
zip -r accoop-website-hostinger.zip \
  app public package.json package-lock.json \
  next.config.ts tsconfig.json \
  postcss.config.mjs eslint.config.mjs \
  next-env.d.ts README.md \
  -x "*.DS_Store"

# Verify size (should be ~1MB)
ls -lh accoop-website-hostinger.zip
```

### ❌ What NOT to Do
```bash
# DON'T include build output
zip -r deploy.zip .next  # ❌

# DON'T include dependencies
zip -r deploy.zip node_modules  # ❌

# DON'T zip from parent directory
cd .. && zip -r deploy.zip accoop-website  # ❌

# DON'T include everything
zip -r deploy.zip .  # ❌ (includes .git, node_modules, etc.)
```

## Environment Variables

If your app requires environment variables (API keys, database URLs, etc.):

1. **DO NOT** include `.env` files in the zip
2. Add them through Hostinger's dashboard:
   - Go to your Node.js app settings
   - Find "Environment Variables" section
   - Add variables there

This keeps sensitive data secure and separate from your code.

## Alternative: GitHub Deployment

Hostinger also supports direct GitHub integration:

1. Push your code to a GitHub repository
2. In Hostinger, choose "Import Git Repository" instead of "Upload files"
3. Connect your GitHub account
4. Select your repository
5. Hostinger will automatically pull and build from GitHub

**Advantages**:
- No need to create zip files
- Automatic deployments on git push
- Version control integration

## Contact Information Update Checklist

When updating contact information, ensure these files are updated:

- [ ] `app/contact/page.tsx` - Contact page phone and email
- [ ] `app/components/Footer.tsx` - Footer contact info
- [ ] All contact info uses clickable links:
  - [ ] Phone: `<a href="tel:...">`
  - [ ] Email: `<a href="mailto:...">`
  - [ ] Address: `<a href="https://maps.google.com/...">`

## Support

For issues with:
- **This application**: Check project README.md
- **Hostinger platform**: Visit https://www.hostinger.com/support
- **Next.js deployment**: See Next.js docs at https://nextjs.org/docs/deployment

---

**Last Updated**: February 25, 2026
**Next.js Version**: 16.1.6
**Node.js Required**: 20.x or higher
