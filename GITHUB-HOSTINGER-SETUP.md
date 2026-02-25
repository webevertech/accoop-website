# GitHub to Hostinger Integration Setup Guide

## Overview

This guide walks you through connecting your GitHub repository to Hostinger for automatic deployments. Every time you push to the `main` branch, Hostinger will automatically rebuild and deploy your website.

## Prerequisites

✅ Hostinger account with Node.js hosting plan (Business Web Hosting, Cloud, or VPS)
✅ GitHub repository: `webevertech/accoop-website` (already set up)
✅ GitHub account access

## Step-by-Step Setup

### Step 1: Access Hostinger hPanel

1. Go to [https://hpanel.hostinger.com](https://hpanel.hostinger.com)
2. Login with your Hostinger credentials
3. You should see your hosting dashboard

### Step 2: Create Node.js Application

1. In the left sidebar, click **"Websites"**
2. Click the **"Add Website"** button (usually top-right)
3. Select **"Node.js Apps"** from the options
4. Choose **"Import Git Repository"**

### Step 3: Connect GitHub Account

1. You'll see a prompt to connect your GitHub account
2. Click **"Connect to GitHub"** or **"Authorize GitHub"**
3. You'll be redirected to GitHub
4. GitHub will ask you to authorize Hostinger
5. Review the permissions and click **"Authorize"**
6. You'll be redirected back to Hostinger

**Note**: Hostinger only needs read access to your repositories to pull code.

### Step 4: Select Repository

1. You should now see a list of your GitHub repositories
2. Find and select: **`webevertech/accoop-website`**
3. Click **"Select"** or **"Continue"**

### Step 5: Configure Deployment Settings

Hostinger will auto-detect your Next.js application. Verify these settings:

#### Basic Settings
- **Repository**: `webevertech/accoop-website`
- **Branch**: `main` ✅ (very important!)
- **Framework**: Next.js (auto-detected)

#### Build Configuration
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Install Command**: `npm install` (or `npm ci`)

#### Runtime Settings
- **Node.js Version**: Select **20.x** or **22.x** (recommended: 20.x)
- **Environment**: Production

### Step 6: Domain Configuration (Optional)

1. Choose a domain for your application:
   - **Subdomain**: Use a free Hostinger subdomain (e.g., `accoop.example-site.com`)
   - **Custom Domain**: If you have a domain, select it here

2. For custom domain setup:
   - Domain should be pointed to Hostinger nameservers
   - SSL certificate will be auto-configured (free)

### Step 7: Environment Variables (If Needed)

If your application requires environment variables:

1. Look for **"Environment Variables"** section
2. Click **"Add Variable"**
3. Add any required variables (format: `KEY=value`)

**Common Variables**:
```
NODE_ENV=production
```

**Note**: This project currently doesn't require environment variables.

### Step 8: Deploy

1. Review all settings
2. Click **"Create"** or **"Deploy"**
3. Hostinger will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Build your application (`npm run build`)
   - Start your application (`npm start`)

**Deployment time**: Usually 2-5 minutes for first deployment

### Step 9: Monitor Deployment

You'll see a deployment progress screen:

1. **Cloning repository** ✅
2. **Installing dependencies** ✅
3. **Building application** ✅
4. **Starting server** ✅

Watch for:
- ✅ Green checkmarks = Success
- ❌ Red X = Error (see logs)

### Step 10: Verify Deployment

Once deployment completes:

1. Hostinger will show you the application URL
2. Click the URL to open your website
3. Verify all pages load correctly:
   - Home page
   - About page
   - Contact page (test clickable links)
   - All other pages

## Automatic Deployments

### How It Works

Now that GitHub is connected:

1. **You push code** to `main` branch
2. **GitHub notifies** Hostinger (webhook)
3. **Hostinger automatically**:
   - Pulls latest code
   - Runs `npm install`
   - Runs `npm run build`
   - Restarts application
4. **New version is live!**

### No Manual Work Required

Every time you run:
```bash
git push origin main
```

Hostinger will automatically deploy the changes within 2-5 minutes.

### Monitoring Deployments

To see deployment status:

1. Go to Hostinger hPanel
2. Navigate to your Node.js application
3. Click **"Deployments"** or **"History"**
4. See all automatic deployments with:
   - Timestamp
   - Commit message
   - Build status
   - Build logs

## Troubleshooting

### Build Fails

**Symptom**: Deployment fails during build step

**Check**:
1. View build logs in Hostinger
2. Verify Node.js version is 20.x or higher
3. Check if build works locally: `npm run build`
4. Review GitHub Actions - if CI passes but Hostinger fails, compare configurations

**Common Issues**:
- Wrong Node.js version selected
- Missing dependencies in package.json
- Build command incorrect

### Application Won't Start

**Symptom**: Build succeeds but app doesn't start

**Check**:
1. Verify start command is `npm start`
2. Check application logs in Hostinger
3. Ensure `next.config.ts` has `output: "standalone"`
4. Verify port binding (Hostinger assigns port automatically)

### GitHub Connection Issues

**Symptom**: Can't connect GitHub or repositories don't show

**Solutions**:
1. Revoke Hostinger's GitHub access:
   - Go to GitHub Settings → Applications
   - Revoke Hostinger
   - Reconnect in Hostinger
2. Check repository visibility (must not be private, or Hostinger needs access)
3. Verify repository URL is correct

### Deployment Not Triggering

**Symptom**: Push to `main` but Hostinger doesn't deploy

**Check**:
1. Verify webhook is active:
   - Go to GitHub repository
   - Settings → Webhooks
   - Should see Hostinger webhook
   - Check "Recent Deliveries" for errors
2. Check Hostinger's GitHub integration is still connected
3. Verify you pushed to `main` branch (not another branch)

### SSL Certificate Issues

**Symptom**: Site shows "Not Secure" or SSL errors

**Solution**:
1. Wait up to 24 hours for SSL provisioning
2. In Hostinger, go to SSL/TLS settings
3. Enable "Force HTTPS"
4. Regenerate SSL certificate if needed

## Managing Your Application

### Viewing Logs

1. Go to Hostinger hPanel
2. Navigate to your Node.js app
3. Click **"Logs"** or **"Console"**
4. View:
   - Application logs (console.log output)
   - Error logs
   - Build logs

### Restarting Application

If you need to manually restart:

1. Go to your Node.js app in hPanel
2. Click **"Restart"** button
3. Wait 10-30 seconds for restart

### Updating Configuration

To change build settings:

1. Go to your Node.js app in hPanel
2. Click **"Settings"** or **"Configuration"**
3. Update:
   - Node.js version
   - Build commands
   - Environment variables
4. Save changes
5. Redeploy

### Rolling Back

To rollback to a previous version:

1. Go to **"Deployments"** history
2. Find the working version
3. Click **"Redeploy"** or **"Rollback"**
4. Confirm the action

## Performance Optimization

### Recommended Settings

After deployment, optimize performance:

1. **Enable Caching**:
   - In Hostinger, enable static file caching
   - Next.js automatically caches built pages

2. **Enable Compression**:
   - Hostinger usually enables gzip automatically
   - Verify in Network tab (browser DevTools)

3. **CDN (Optional)**:
   - Consider Cloudflare integration
   - Available in Hostinger hPanel

### Monitoring

Set up monitoring:

1. **Uptime Monitoring**:
   - Use Hostinger's built-in uptime monitor
   - Or external service (e.g., UptimeRobot)

2. **Error Tracking**:
   - Monitor application logs
   - Set up error alerts

## Security Considerations

### Best Practices

1. ✅ Never commit sensitive data to GitHub
2. ✅ Use environment variables for secrets
3. ✅ Keep dependencies updated
4. ✅ Enable Force HTTPS in Hostinger
5. ✅ Regularly review access logs

### Environment Variables (Secrets)

If you need to add API keys or secrets:

1. **NEVER** commit them to GitHub
2. Add them in Hostinger's Environment Variables section
3. Access in code via `process.env.VARIABLE_NAME`

## Additional Resources

### Hostinger Documentation
- [Node.js Hosting Guide](https://www.hostinger.com/tutorials/nodejs-hosting)
- [GitHub Integration](https://www.hostinger.com/tutorials/github-integration)

### Project Documentation
- `README.md` - Project overview and setup
- `HOSTINGER-DEPLOYMENT.md` - Manual deployment guide
- `.github/CICD-GUIDE.md` - CI/CD pipeline documentation

## Support

### If You Need Help

1. **Hostinger Support**:
   - Live chat available 24/7
   - Visit: https://www.hostinger.com/support
   - Provide your application URL and error logs

2. **GitHub Issues**:
   - For code-related issues
   - Check CI/CD pipeline status first

3. **Project Documentation**:
   - Review troubleshooting sections
   - Check similar issues in project docs

## Quick Reference

### Deployment Checklist

- [ ] Hostinger account with Node.js hosting
- [ ] GitHub account connected to Hostinger
- [ ] Repository `webevertech/accoop-website` selected
- [ ] Branch `main` configured
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Node.js version: 20.x
- [ ] Domain configured (optional)
- [ ] Environment variables added (if needed)
- [ ] First deployment successful
- [ ] Website accessible and tested
- [ ] Automatic deployments working

### Key URLs

- **Hostinger hPanel**: https://hpanel.hostinger.com
- **GitHub Repository**: https://github.com/webevertech/accoop-website
- **GitHub Actions**: https://github.com/webevertech/accoop-website/actions

### Commands for Local Testing

Before pushing to trigger deployment:

```bash
# Test build locally
npm run build

# Test production locally
npm start

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

---

**Setup Time**: 10-15 minutes
**First Deployment**: 2-5 minutes
**Subsequent Deployments**: 2-3 minutes (automatic)

**Questions?** Refer to troubleshooting section or contact Hostinger support.

**Last Updated**: February 25, 2026
