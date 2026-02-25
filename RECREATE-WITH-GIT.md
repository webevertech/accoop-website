# Recreating Hostinger App with Git Integration

## IMPORTANT: Check First, Delete Later!

**Before deleting your current app**, let's verify Git integration is available on your plan.

## Step 1: Verify Git Integration is Available

### Method 1: Check Plan Features

1. Login to [Hostinger hPanel](https://hpanel.hostinger.com)
2. Go to **Billing** or **Hosting Plans**
3. Check your current plan features
4. Look for:
   - ✅ "Git Integration"
   - ✅ "GitHub Integration"
   - ✅ "Deploy from Git"
   - ✅ "Version Control"

**Plans that usually support Git**:
- Business Web Hosting ✅
- Cloud Startup/Professional/Enterprise ✅
- VPS Hosting ✅

**Plans that may NOT support Git**:
- Premium Web Hosting ❌
- Single/Basic Web Hosting ❌

### Method 2: Test by Creating New App (Without Deleting)

**Safest approach**:

1. Go to **Websites** → **Add Website**
2. Select **Node.js Apps**
3. **Look at the options presented**:
   - If you see **"Import Git Repository"** → Git IS available ✅
   - If you only see **"Upload files"** → Git NOT available ❌

4. **Don't complete the setup** - just check the options
5. Cancel/close the dialog

**This confirms Git availability without deleting anything!**

## Step 2: Decision Tree

### If Git Integration IS Available ✅

**Safe to proceed** - You can delete and recreate with Git.

**Before deleting, save**:
1. Current website URL
2. Any environment variables you added
3. SSL certificate settings (if custom)
4. Domain configuration
5. Any custom server configurations

### If Git Integration is NOT Available ❌

**Don't delete!** Options:

1. **Keep current setup** with manual deployment workflow (works great!)
2. **Upgrade Hostinger plan** to one with Git support
3. **Keep manual workflow** until you want to upgrade

## Step 3: Backup Current Configuration

**Before deleting**, document everything:

### Current App Settings
```
App Name: _________________
URL: _____________________
Node.js Version: __________
Build Command: ____________
Start Command: ____________
Port: _____________________
```

### Environment Variables
```
Variable 1: NAME=value
Variable 2: NAME=value
(List all environment variables)
```

### Domain Settings
```
Primary Domain: ___________
SSL Enabled: Yes/No
Force HTTPS: Yes/No
Custom Domain: ____________
```

### Other Settings
- Custom error pages
- Redirects
- Security settings
- Backup schedule

## Step 4: Delete Current App (Only if Git Available)

**⚠️ WARNING**: Your site will be offline until recreation completes!

### Before Deleting:
- [ ] Verified Git integration is available
- [ ] Saved all settings above
- [ ] Downloaded current deployment files (backup)
- [ ] Noted environment variables
- [ ] Screenshot of all important settings
- [ ] Scheduled deletion during low-traffic time

### To Delete:

1. Go to your Node.js app in hPanel
2. Look for **Settings** or **Danger Zone**
3. Find **"Delete Application"** or **"Remove"**
4. Confirm deletion
5. Wait for confirmation

**Expected downtime**: Until you recreate and deploy (15-20 minutes)

## Step 5: Create New App with Git

### 5.1: Create Application

1. Go to **Websites** → **Add Website**
2. Select **Node.js Apps**
3. Choose **"Import Git Repository"** ✅

### 5.2: Connect GitHub

1. Click **"Connect to GitHub"**
2. Authorize Hostinger
3. Select repository: `webevertech/accoop-website`
4. Select branch: `main`

### 5.3: Configure Settings

Use the settings you backed up:

```
Repository: webevertech/accoop-website
Branch: main
Build Command: npm run build
Start Command: npm start
Install Command: npm ci
Node.js Version: 20.x
```

### 5.4: Add Environment Variables

Re-add all environment variables you saved from backup.

### 5.5: Configure Domain

1. Select your domain (same as before)
2. SSL will auto-configure
3. Enable Force HTTPS

### 5.6: Deploy

1. Click **"Create"** or **"Deploy"**
2. Wait for deployment (2-5 minutes)
3. Monitor deployment logs

## Step 6: Verify New Deployment

### Check Website
- [ ] Site is accessible
- [ ] All pages load correctly
- [ ] Contact links work (phone, email, address)
- [ ] Images display properly
- [ ] Navigation works
- [ ] SSL certificate active (https://)

### Test Automatic Deployment

1. Make a small test change:
```bash
# Edit README.md or similar
git add .
git commit -m "test: Verify auto-deployment"
git push origin main
```

2. Watch Hostinger - should auto-deploy in 2-5 minutes
3. Verify change appears on site

## Risks to Consider

### Potential Issues

**1. Downtime**
- Site offline during recreation (15-20 minutes)
- Plan accordingly

**2. Domain/SSL Issues**
- May take time to re-provision SSL
- DNS may need time to update
- Have patience (up to 24 hours for SSL)

**3. Lost Settings**
- Any custom configurations not backed up
- Environment variables if forgotten
- Custom server configurations

**4. Different Behavior**
- Git deployment may have different settings than manual
- May need to troubleshoot differences

### Mitigation

- ✅ Backup everything first
- ✅ Document all settings
- ✅ Test during low-traffic period
- ✅ Have old deployment zip ready for emergency manual upload

## Alternative: Keep Current Setup

**Consider keeping manual workflow if**:

1. ✅ It's working well
2. ✅ You don't mind downloading artifacts
3. ✅ Deployments are infrequent
4. ✅ Manual upload only takes 2 minutes

**Manual workflow advantages**:
- Zero risk of breaking current site
- Already set up and working
- 80% automated anyway
- Easy rollback

## Upgrade Plan Instead

**If Git isn't available** but you want it:

1. Check Hostinger plan upgrades
2. Compare features and pricing
3. Upgrade plan (usually no downtime)
4. Git integration becomes available
5. Connect existing app to Git (no deletion needed!)

## Troubleshooting After Recreation

### Build Fails

**Check**:
1. Build commands match previous setup
2. Node.js version is correct (20.x)
3. Review build logs for specific errors
4. Compare with working CI/CD build in GitHub Actions

### Site Not Accessible

**Check**:
1. Deployment completed successfully
2. DNS has updated (can take time)
3. SSL certificate provisioned
4. Domain configured correctly

### Auto-Deploy Not Working

**Check**:
1. GitHub webhook created (Repository → Settings → Webhooks)
2. Auto-deploy enabled in Hostinger
3. Pushing to correct branch (`main`)
4. Webhook delivery logs in GitHub

## Emergency Rollback

**If recreation fails badly**:

1. **Quick Fix**: Create new app with manual upload
2. Use latest CI/CD artifact or local deployment zip
3. Upload and deploy
4. Site back online while you troubleshoot

## Summary Decision Guide

```
Check if Git available (don't delete yet)
│
├─ Git Available ✅
│  ├─ Backup everything
│  ├─ Delete during low-traffic time
│  ├─ Recreate with Git
│  └─ Test thoroughly
│
└─ Git NOT Available ❌
   ├─ Keep manual workflow (works great!)
   ├─ OR upgrade Hostinger plan
   └─ OR wait until you need Git integration
```

## Recommendation

**Best approach**:

1. ✅ **First**: Test if Git option appears when creating new app (without deleting)
2. ✅ **If available**: Backup everything, then delete and recreate
3. ✅ **If not available**: Keep current manual workflow - it's already excellent!

**The manual workflow you have now is actually very good!** Only recreate if:
- Git integration is definitely available
- You deploy very frequently
- You want zero-touch deployments

## Questions Before Proceeding?

**Ask yourself**:
1. Is Git integration confirmed available on my plan?
2. Have I backed up all settings and configurations?
3. Is this the right time (low traffic)?
4. Am I comfortable with 15-20 minutes downtime?
5. Do I really need Git vs. manual artifact upload?

**If any answer is "no"** → Consider keeping current setup!

---

**Risk Level**: Medium (downtime, potential issues)
**Benefit**: Automatic deployments on push
**Alternative**: Keep manual workflow (low risk, works well)

**Last Updated**: February 25, 2026
