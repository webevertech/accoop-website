# CI/CD Pipeline Guide

## Overview

This repository uses GitHub Actions for continuous integration and deployment. The pipeline automatically builds, tests, and validates the application on every push and pull request.

## Pipeline Workflow

### Trigger Events
- **Push to `main` branch**: Full CI/CD pipeline + deployment artifact creation
- **Pull Requests**: Build and test validation only

## Jobs

### 1. Build and Test Job

**Purpose**: Validates that the application builds successfully and meets quality standards.

**Steps**:
1. ✅ Checkout code
2. ✅ Setup Node.js 20.x
3. ✅ Install dependencies (`npm ci`)
4. ✅ Run ESLint (`npm run lint`)
5. ✅ TypeScript type checking (`npx tsc --noEmit`)
6. ✅ Build Next.js application (`npm run build`)
7. ✅ Verify build output exists
8. ✅ Create deployment artifact (main branch only)
9. ✅ Upload artifact for download (main branch only)

### 2. Security Scan Job

**Purpose**: Checks for security vulnerabilities and sensitive data exposure.

**Steps**:
1. ✅ Run `npm audit` for dependency vulnerabilities
2. ✅ Check for exposed `.env` files
3. ✅ Verify no sensitive data in repository

### 3. Code Quality Job

**Purpose**: Ensures code quality and proper configuration.

**Steps**:
1. ✅ Run linting checks
2. ✅ Verify Hostinger configuration (standalone output)
3. ✅ Verify all required files exist

## Deployment Artifacts

When code is pushed to the `main` branch, the pipeline creates a deployment-ready zip file containing:

```
✓ app/                      # Source code
✓ public/                   # Static assets
✓ package.json              # Dependencies
✓ package-lock.json         # Locked versions
✓ next.config.ts            # Next.js config
✓ tsconfig.json             # TypeScript config
✓ postcss.config.mjs        # PostCSS config
✓ eslint.config.mjs         # ESLint config
✓ next-env.d.ts             # Next.js types
✓ README.md                 # Documentation
✓ HOSTINGER-DEPLOYMENT.md   # Deployment guide

✗ .next/                    # Excluded (build output)
✗ node_modules/             # Excluded (dependencies)
✗ .env files                # Excluded (sensitive data)
```

### Downloading Artifacts

After a successful build on `main`:

1. Go to the **Actions** tab in GitHub
2. Click on the latest workflow run
3. Scroll to **Artifacts** section
4. Download `deployment-package`
5. Extract and deploy to Hostinger

**Artifact Retention**: 30 days

## Hostinger Deployment Options

### Option 1: GitHub Integration (Recommended)

Hostinger supports direct GitHub integration for automatic deployments.

**Setup**:
1. Login to Hostinger hPanel
2. Go to **Websites** → **Add Website**
3. Select **Node.js Apps**
4. Choose **Import Git Repository**
5. Authorize GitHub access
6. Select repository: `webevertech/accoop-website`
7. Select branch: `main`
8. Verify build settings:
   - Build Command: `npm run build`
   - Start Command: `npm start`
   - Node Version: 20.x
9. Click **Deploy**

**Benefits**:
- ✅ Automatic deployments on every push to `main`
- ✅ No manual artifact downloads
- ✅ Hostinger manages the entire build process
- ✅ Easy rollback to previous commits

### Option 2: Manual Deployment

Use CI/CD artifacts for manual deployment.

**Steps**:
1. Download deployment artifact from GitHub Actions
2. Login to Hostinger hPanel
3. Go to **Websites** → **Add Website**
4. Select **Node.js Apps** → **Upload files**
5. Upload the downloaded zip file
6. Verify settings and deploy

### Option 3: Automated Deployment (Advanced)

For fully automated deployments to Hostinger, you can add deployment secrets and scripts.

**Required Secrets** (if implementing):
```
HOSTINGER_API_KEY      # Hostinger API credentials
HOSTINGER_APP_ID       # Application ID
```

**Note**: This requires additional setup and is not included by default.

## Environment Variables

### GitHub Secrets

To add environment variables for production:

1. Go to repository **Settings**
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add production environment variables

**Common Variables**:
- `NODE_ENV=production` (automatically set during build)
- Add any API keys or database URLs here (not in code)

### Hostinger Environment Variables

Set production variables in Hostinger dashboard:

1. Go to your Node.js app in hPanel
2. Find **Environment Variables** section
3. Add variables there (NOT in repository)

**Never commit**:
- ❌ API keys
- ❌ Database credentials
- ❌ Secret tokens
- ❌ Private keys

## Workflow Status Badge

Add this badge to your README to show build status:

```markdown
![CI/CD Pipeline](https://github.com/webevertech/accoop-website/actions/workflows/ci-cd.yml/badge.svg)
```

## Monitoring Pipeline

### View Workflow Runs
1. Go to **Actions** tab in GitHub
2. See all workflow runs with status
3. Click any run to see detailed logs

### Understanding Status Icons
- ✅ Green check: All jobs passed
- ❌ Red X: Build or test failed
- 🟡 Yellow dot: In progress
- ⚪ Gray circle: Skipped or cancelled

## Troubleshooting

### Build Fails in CI/CD

**Check**:
1. Review error logs in Actions tab
2. Ensure all dependencies are in `package.json`
3. Verify `npm run build` works locally
4. Check for TypeScript errors

**Common Issues**:
```bash
# TypeScript errors
npm run type-check

# Lint errors
npm run lint

# Build locally to replicate
npm run build
```

### Deployment Artifact Too Large

**Issue**: Artifact over 2GB (GitHub limit)

**Solution**:
- Verify `.gitignore` excludes `node_modules/` and `.next/`
- Check zip creation command excludes build artifacts
- Review workflow file's zip command

### Tests Failing

Currently, this project doesn't have tests configured. To add:

1. Install testing library:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

2. Add to workflow:
```yaml
- name: Run tests
  run: npm test
```

## Pipeline Maintenance

### Updating Node.js Version

To use a different Node.js version:

1. Edit `.github/workflows/ci-cd.yml`
2. Update `node-version: [20.x]` to desired version
3. Ensure Hostinger supports that version

### Adding New Jobs

To add additional checks:

```yaml
new-job-name:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - name: Your custom step
      run: echo "Custom check"
```

### Modifying Build Steps

Edit the `build-and-test` job in `.github/workflows/ci-cd.yml`:

```yaml
- name: Custom build step
  run: your-command-here
```

## Best Practices

### Before Pushing

1. ✅ Test build locally: `npm run build`
2. ✅ Run linter: `npm run lint`
3. ✅ Check TypeScript: `npx tsc --noEmit`
4. ✅ Review changes for sensitive data
5. ✅ Update version in `package.json` if needed

### Pull Request Workflow

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit
3. Push branch: `git push origin feature/your-feature`
4. Create Pull Request on GitHub
5. CI/CD runs automatically
6. Wait for ✅ before merging
7. Merge to `main` when approved

### Security

- ❌ Never commit `.env` files
- ❌ Never commit API keys or passwords
- ✅ Use GitHub Secrets for sensitive data
- ✅ Regularly run `npm audit`
- ✅ Keep dependencies updated

## Contact & Support

For issues with:
- **CI/CD Pipeline**: Check workflow logs in Actions tab
- **GitHub Actions**: https://docs.github.com/actions
- **Hostinger Deployment**: See `HOSTINGER-DEPLOYMENT.md`
- **Next.js Build**: https://nextjs.org/docs

---

**Pipeline Version**: 1.0
**Last Updated**: February 25, 2026
**Maintained By**: Webever Tech Team
