# Connect Existing Hostinger App to GitHub

## Overview

You already have the Atlantic City Co-op website deployed on Hostinger. This guide shows you how to connect your **existing deployment** to GitHub for automatic updates.

## Why Connect to GitHub?

Once connected, every time you push code to GitHub:
- ✅ Hostinger automatically pulls the latest code
- ✅ Rebuilds your application
- ✅ Deploys the new version
- ✅ No manual uploads needed

## Before You Start

Make sure you have:
- ✅ Your app currently running on Hostinger
- ✅ Access to Hostinger hPanel
- ✅ GitHub repository: `webevertech/accoop-website`

## Step-by-Step Connection

### Step 1: Access Your Application

1. Login to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Websites** in the sidebar
3. Find your Atlantic City Co-op Node.js application
4. Click on it to open the application dashboard

### Step 2: Find Git/GitHub Settings

Look for one of these options in your app dashboard:
- **"GitHub Integration"**
- **"Git Repository"**
- **"Source Control"**
- **"Settings"** → **"Git"**
- **"Deployment"** → **"GitHub"**

The exact location may vary, but it's usually in:
- Top menu bar
- Settings section
- Deployment section

### Step 3: Connect to GitHub

#### Option A: If You See "Connect to GitHub" Button

1. Click **"Connect to GitHub"** or **"Link Repository"**
2. You'll be redirected to GitHub
3. Authorize Hostinger to access your repositories
4. Select: `webevertech/accoop-website`
5. Select branch: `main`
6. Click **"Connect"** or **"Save"**

#### Option B: If You See "Repository URL" Field

1. Enter repository URL: `https://github.com/webevertech/accoop-website.git`
2. Select branch: `main`
3. Choose authentication method:
   - **OAuth/GitHub App** (recommended - easier)
   - **Deploy Key** (requires SSH key setup)
4. Click **"Connect"** or **"Save"**

#### Option C: Via Deployment Settings

1. Go to **"Deployment"** or **"Build Settings"**
2. Look for **"Source"** or **"Deploy from"**
3. Change from "Manual Upload" to "Git Repository"
4. Follow the prompts to connect GitHub
5. Select repository and branch

### Step 4: Configure Build Settings

After connecting, verify these settings are correct:

```
Repository: webevertech/accoop-website
Branch: main
Build Command: npm run build
Start Command: npm start
Install Command: npm install (or npm ci)
Node Version: 20.x
```

**Important**: These should match your current working deployment.

### Step 5: Enable Automatic Deployments

Look for an option like:
- ✅ **"Auto Deploy"**
- ✅ **"Automatic Deployments"**
- ✅ **"Deploy on Push"**
- ✅ **"Enable Continuous Deployment"**

Make sure this is **enabled/checked**.

### Step 6: Test the Connection

#### Option 1: Trigger Manual Deployment
1. Look for **"Deploy Now"** or **"Redeploy"** button
2. Click it
3. Hostinger will pull from GitHub and rebuild
4. Watch the logs to ensure it works

#### Option 2: Push a Small Change
1. Make a tiny change (e.g., edit README.md)
2. Commit and push:
```bash
git add .
git commit -m "test: Verify GitHub integration"
git push origin main
```
3. Check Hostinger - should auto-deploy within 2-5 minutes

### Step 7: Verify Deployment

After deployment completes:
1. Visit your website URL
2. Verify everything works correctly
3. Check that changes are reflected (if you made any)

## What Hostinger Does During First Sync

When you first connect GitHub:

1. **Pulls your code** from `main` branch
2. **Compares** with currently deployed files
3. **Rebuilds** if there are differences
4. **Deploys** the new version

**Your site may have brief downtime (30-60 seconds) during initial sync.**

## Troubleshooting

### Can't Find GitHub Connection Option

**Possible Reasons**:
1. **Not a Git-capable plan**: Some basic Hostinger plans don't support Git integration
2. **App created via file upload**: May need to recreate as Git-based app

**Solution**:
- Check your hosting plan features
- Contact Hostinger support to verify Git integration is available
- You may need to upgrade your plan

**Alternative**: Keep using manual deployment and CI/CD artifacts

### GitHub Connection Fails

**Common Issues**:

1. **Repository is Private**:
   - Ensure repository is public, OR
   - Grant Hostinger access to private repositories

2. **Permission Denied**:
   - Revoke and reconnect GitHub authorization
   - Go to GitHub Settings → Applications → Hostinger
   - Revoke and re-authorize

3. **Wrong Repository URL**:
   - Double-check: `https://github.com/webevertech/accoop-website.git`

### Build Fails After Connecting

**Check**:
1. Compare build commands with your current working deployment
2. Verify Node.js version matches
3. Check build logs in Hostinger for specific errors
4. Ensure `package.json` and `package-lock.json` are in repository

**If build fails but currently works**:
- Your manual deployment might have different settings
- Match GitHub build settings to your working configuration

### Site Breaks After First GitHub Deploy

**Immediate Fix**:
1. Rollback to previous deployment (if option available)
2. Or manually re-upload your working version

**Root Cause**:
- Settings mismatch between manual deployment and Git deployment
- Missing environment variables
- Different build configuration

**Solution**:
- Review what's different between manual deployment and Git settings
- Match all configurations exactly

### Webhook Not Working

**Symptom**: Pushing to GitHub doesn't trigger deployment

**Check**:
1. Go to GitHub repository
2. Settings → Webhooks
3. Look for Hostinger webhook
4. Check "Recent Deliveries" for errors

**Solutions**:
- Verify webhook is active
- Check webhook URL is correct
- Re-save GitHub connection in Hostinger
- Contact Hostinger support if webhook is missing

## Managing After Connection

### Viewing Deployment History

In Hostinger hPanel:
1. Go to your Node.js app
2. Look for **"Deployments"** or **"History"**
3. See all automatic deployments with:
   - Commit hash
   - Commit message
   - Deployment time
   - Build status
   - Logs

### Manually Triggering Deployment

Even with auto-deploy enabled, you can manually trigger:
1. Go to your app in Hostinger
2. Click **"Redeploy"** or **"Deploy Now"**
3. Hostinger pulls latest from GitHub
4. Useful for deploying when webhook fails

### Temporarily Disabling Auto-Deploy

If you need to pause automatic deployments:
1. Go to Git/Deployment settings
2. Disable **"Auto Deploy"** or **"Automatic Deployments"**
3. Make your changes in GitHub
4. Manually trigger deployment when ready
5. Re-enable auto-deploy

### Rolling Back

To revert to a previous version:

**Method 1: Via Hostinger**
1. Go to Deployment History
2. Find working version
3. Click **"Rollback"** or **"Redeploy"**

**Method 2: Via Git**
```bash
# Revert last commit
git revert HEAD
git push origin main

# Or reset to specific commit
git reset --hard <commit-hash>
git push -f origin main  # Be careful with force push!
```

## Environment Variables

If your app uses environment variables:

1. **Don't remove them** when connecting Git
2. They're stored separately in Hostinger
3. Verify they're still there after connecting:
   - Go to app Settings
   - Check Environment Variables section
   - Re-add if missing

## Best Practices After Connection

### 1. Always Test Locally First
```bash
npm run build
npm start
```

### 2. Use Feature Branches
```bash
git checkout -b feature/my-change
# Make changes
git push origin feature/my-change
# Test on feature branch (if Hostinger supports multi-branch)
# Merge to main when ready
```

### 3. Monitor First Few Deployments
- Watch deployment logs
- Check for errors
- Verify site works after each auto-deploy

### 4. Keep Deployments Small
- Smaller, frequent updates are easier to debug
- If something breaks, easier to identify what changed

### 5. Use GitHub Actions CI/CD
Your repository already has CI/CD set up:
- Pushes trigger automated tests
- Only deploy if tests pass
- Catches issues before Hostinger deployment

## Alternative: If GitHub Connection Not Available

If your Hostinger plan doesn't support Git integration:

### Option 1: Manual with CI/CD Artifacts
1. Push code to GitHub
2. GitHub Actions builds and creates artifact
3. Download artifact from GitHub Actions
4. Upload to Hostinger manually

### Option 2: Upgrade Hostinger Plan
- Check if Git integration is available on higher plans
- Upgrade if needed for automatic deployments

### Option 3: External CI/CD
- Use GitHub Actions or other CI/CD
- Deploy via SSH/FTP (requires credentials)
- More complex but fully automated

## Quick Reference

### Connection Checklist
- [ ] Found existing app in Hostinger hPanel
- [ ] Located Git/GitHub settings
- [ ] Connected to GitHub repository
- [ ] Selected `webevertech/accoop-website`
- [ ] Selected `main` branch
- [ ] Verified build settings match current deployment
- [ ] Enabled automatic deployments
- [ ] Tested with manual deployment or test push
- [ ] Verified site still works
- [ ] Checked deployment history works

### Key Settings to Verify
```
Repository: webevertech/accoop-website
Branch: main
Build Command: npm run build
Start Command: npm start
Node Version: 20.x
Auto Deploy: Enabled ✅
```

### Useful Commands
```bash
# Push changes to trigger auto-deploy
git push origin main

# View recent commits
git log --oneline -5

# Check current branch
git branch
```

## Need Help?

1. **Can't find Git settings**: Contact Hostinger support via live chat
2. **Build fails after connecting**: Compare settings with working deployment
3. **Webhook not working**: Check GitHub webhook settings
4. **General issues**: Review troubleshooting section above

## Support Resources

- **Hostinger Support**: 24/7 live chat in hPanel
- **Hostinger Docs**: https://www.hostinger.com/tutorials/nodejs-hosting
- **GitHub Actions**: https://github.com/webevertech/accoop-website/actions

---

**Estimated Time**: 5-10 minutes
**Complexity**: Easy
**Benefit**: Automatic deployments on every push!

**Last Updated**: February 25, 2026
