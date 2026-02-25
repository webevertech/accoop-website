# Manual Deployment Workflow with GitHub Actions

## Overview

Your Hostinger plan uses manual file upload (no Git integration). **This is fine!** We've already set up GitHub Actions to automatically create deployment packages for you.

## How It Works

```
1. You push code to GitHub
   ↓
2. GitHub Actions automatically:
   - Builds your app
   - Runs tests & checks
   - Creates deployment zip
   ↓
3. You download the zip from GitHub
   ↓
4. Upload to Hostinger (2 clicks)
   ↓
5. Done! 🎉
```

**Time**: ~2 minutes per deployment (mostly automated)

## Step-by-Step Deployment

### Step 1: Make Your Changes Locally

Work on your code as normal:

```bash
# Make changes to your files
# For example, edit app/page.tsx

# Test locally
npm run dev
# Open http://localhost:3000 and verify changes
```

### Step 2: Commit and Push to GitHub

```bash
# Stage your changes
git add .

# Commit with a clear message
git commit -m "feat: Add new feature description"

# Push to GitHub
git push origin main
```

**That's it for code!** GitHub Actions takes over from here.

### Step 3: Wait for GitHub Actions to Build

1. Go to: https://github.com/webevertech/accoop-website/actions
2. You'll see your commit running (yellow dot 🟡)
3. Wait 2-3 minutes for it to complete (green check ✅)

**What's happening**:
- Installing dependencies
- Running linter
- Type checking
- Building your app
- Creating deployment zip

### Step 4: Download Deployment Package

Once the workflow completes (green ✅):

1. **Stay on the Actions page**
2. Click on your workflow run (the one with your commit message)
3. Scroll down to **"Artifacts"** section
4. Click **"deployment-package"** to download
5. Extract the downloaded zip file

**File**: `accoop-website-<commit-hash>.zip` (~1MB)

### Step 5: Upload to Hostinger

#### Via Hostinger hPanel:

1. Login to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Websites** → Your Node.js App
3. Look for **"Upload Files"** or **"Deploy"** button
4. Select **"Upload Website Files"**
5. Upload the extracted zip file (or the zip itself if Hostinger extracts automatically)
6. Click **"Deploy"** or **"Update"**

Hostinger will:
- Extract your files
- Run `npm install`
- Run `npm run build`
- Restart your app

**Deployment time**: 2-3 minutes

### Step 6: Verify Deployment

1. Visit your website URL
2. Verify your changes are live
3. Test all functionality
4. Check contact links, navigation, etc.

## Important Notes

### Always Use CI/CD Artifacts

**✅ DO**: Download deployment packages from GitHub Actions
- Already tested
- Build verified
- Correct file structure
- No build artifacts or node_modules

**❌ DON'T**: Zip your local project folder
- May include `.next/` build folder
- May include `node_modules/`
- Not tested
- Wrong file structure

### Artifact Retention

- Artifacts are kept for **30 days**
- Download and save if you need it longer
- Or keep a local copy of successful builds

## Quick Deployment Reference

### Fast Deployment (After Setup)

```bash
# 1. Make changes and push
git add .
git commit -m "fix: Bug fix description"
git push origin main

# 2. Wait for GitHub Actions (~2-3 min)
# Go to: https://github.com/webevertech/accoop-website/actions

# 3. Download artifact when ready

# 4. Upload to Hostinger

# Done! ✅
```

**Total time**: ~5 minutes

## Troubleshooting

### No Artifacts Available

**Issue**: Artifacts section is empty after workflow completes

**Causes**:
1. Workflow only runs on `main` branch pushes
2. Workflow failed before creating artifact
3. You're on a pull request (artifacts only created for `main`)

**Solution**:
- Verify you pushed to `main` branch
- Check workflow logs for errors
- Ensure workflow completed successfully (green ✅)

### Build Fails on Hostinger

**Issue**: Upload succeeds but build fails

**Check**:
1. View build logs in Hostinger
2. Verify zip contains correct files:
   - `app/` folder
   - `public/` folder
   - `package.json`
   - `next.config.ts`
   - NO `.next/` folder
   - NO `node_modules/` folder

**Common Issues**:
- Wrong Node.js version in Hostinger (use 20.x)
- Missing files in zip
- Included build artifacts accidentally

### Site Shows Old Version

**Issue**: Uploaded new version but site unchanged

**Solutions**:
1. **Hard refresh browser**: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. **Check deployment status** in Hostinger - may still be deploying
3. **Clear browser cache**
4. **Verify correct file uploaded** - check timestamp in Hostinger

### Deployment Takes Too Long

**Normal**: 2-5 minutes
**Too Long**: 10+ minutes

**Possible Reasons**:
1. Large dependencies (normal for first deployment)
2. Hostinger server load
3. Network issues

**Solution**:
- Wait patiently for first deployment
- Contact Hostinger support if consistently slow

## Advanced: Local Deployment Package Creation

If you need to create a deployment package locally (not recommended):

```bash
# Navigate to project
cd /path/to/accoop-website

# Create deployment zip
zip -r deployment.zip \
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

# Verify size (should be ~1MB)
ls -lh deployment.zip
```

**But**: Using GitHub Actions artifacts is better because:
- ✅ Build is verified
- ✅ Tests have passed
- ✅ No human error
- ✅ Consistent structure

## Upgrading to Git Integration (Future)

If you want automatic deployments in the future:

### Option 1: Upgrade Hostinger Plan
- Check if higher-tier plans include Git integration
- Plans like Cloud Hosting or VPS usually have it

### Option 2: External Deployment Service
- Use GitHub Actions to deploy via SSH/FTP
- Requires adding SSH credentials to GitHub Secrets
- Fully automatic but more complex setup

### Option 3: Different Hosting
- Vercel, Netlify, or Railway offer free Git integration
- Automatic deployments on every push
- But you may want to stay with Hostinger

**For now**: Manual deployment with CI/CD artifacts is perfect! ✅

## Best Practices

### 1. Test Before Pushing

```bash
# Always test locally first
npm run build
npm start
# Visit http://localhost:3000
```

### 2. Use Descriptive Commit Messages

Good:
```bash
git commit -m "feat: Add membership pricing table"
git commit -m "fix: Contact form email validation"
```

Bad:
```bash
git commit -m "updates"
git commit -m "fix"
```

### 3. Deploy During Low Traffic

- Avoid peak hours if possible
- Site has brief downtime during deployment
- Usually 30-60 seconds

### 4. Keep Backups

- Download working deployment artifacts
- Keep locally for emergency rollback
- Or keep previous version in Hostinger (if available)

### 5. Monitor First Deployment

After uploading new version:
- Test all pages
- Check contact forms
- Verify links work
- Test on mobile

## Workflow Comparison

### Current Workflow (Manual + CI/CD)
```
✅ Automatic build & test
✅ Verified package creation
✅ No local build needed
❌ Manual upload to Hostinger
⏱️ 5 minutes total
```

### If You Had Git Integration
```
✅ Automatic build & test
✅ Automatic deployment
✅ No manual upload
✅ Zero-touch deployment
⏱️ 3 minutes total (fully automatic)
```

**Current workflow is great!** You still get most of the automation benefits.

## Summary

### What You Do
1. Write code
2. Push to GitHub
3. Download artifact from Actions
4. Upload to Hostinger

### What Automation Does
1. ✅ Runs tests
2. ✅ Type checks
3. ✅ Lints code
4. ✅ Builds app
5. ✅ Creates deployment package
6. ✅ Verifies everything works

**You only handle the upload!** Everything else is automated.

## Quick Links

- **GitHub Repository**: https://github.com/webevertech/accoop-website
- **GitHub Actions**: https://github.com/webevertech/accoop-website/actions
- **Hostinger hPanel**: https://hpanel.hostinger.com

## Support

### For Deployment Issues
1. Check workflow logs in GitHub Actions
2. Review Hostinger build logs
3. See troubleshooting section above

### For Code Issues
1. Test locally first: `npm run build`
2. Check CI/CD pipeline status
3. Review error messages

### For Hostinger Issues
- Contact Hostinger support (24/7 chat)
- Provide deployment logs and error messages

---

**Workflow**: Manual upload with automated building
**Complexity**: Easy
**Time Per Deployment**: ~5 minutes
**Automation Level**: 80% (only upload is manual)

**This workflow works great!** 🚀

**Last Updated**: February 25, 2026
