# Fixing 500/404 Errors on Hostinger Deployment

## Your Current Errors

```
❌ CSS files: 500 errors (can't load stylesheets)
❌ manifest.json: 404 error (file not found)
❌ favicon.png: 404 error (file not found)
❌ Static files: 500 errors (JavaScript bundles failing)
```

## ✅ Fix Just Applied

I've updated `next.config.ts` to disable image optimization:

```typescript
images: {
  unoptimized: true, // Hostinger compatibility fix
}
```

This fix is now in GitHub and will be included in the next deployment.

## 🔧 Complete Fix Process

### Step 1: Wait for GitHub Actions Build

The fix I just pushed will trigger a new build:

1. Go to: https://github.com/webevertech/accoop-website/actions
2. Wait for the latest workflow to complete (2-3 minutes)
3. Look for green checkmark ✅

### Step 2: Deploy New Build to Hostinger

**If using GitHub integration (automatic)**:
- Hostinger should auto-deploy within 5 minutes
- Watch your Hostinger dashboard for deployment progress

**If using manual upload**:
1. Download the new artifact from GitHub Actions
2. Upload to Hostinger
3. Let it rebuild

### Step 3: Verify Hostinger Configuration

Login to Hostinger hPanel and check these settings:

#### Required Settings for Next.js Standalone

```
✅ Application Type: Node.js
✅ Node.js Version: 20.x or 22.x (NOT 18.x or lower)
✅ Build Command: npm run build
✅ Start Command: npm start (NOT node server.js)
✅ Install Command: npm ci or npm install
✅ Working Directory: / (root)
```

#### Environment Variables

Add this if not present:
```
NODE_ENV=production
```

### Step 4: Check File Structure After Build

After Hostinger builds, verify these folders exist:

```
your-app/
├── .next/              ← Created by build
├── node_modules/       ← Created by npm install
├── public/             ← Should be copied from source
│   ├── manifest.json
│   ├── favicon.png
│   └── favicon-192.png
├── app/               ← Your source code
├── package.json
└── next.config.ts
```

**If `public/` folder is missing** → That's the problem!

## 🚨 Common Hostinger Issues & Fixes

### Issue 1: Public Folder Not Copied

**Symptom**: 404 errors on manifest.json, favicons

**Cause**: Hostinger's build process didn't copy public folder

**Fix Options**:

**Option A: Check Deployment Package**
If using manual upload, ensure your zip includes:
```
✅ app/
✅ public/      ← Must be included!
✅ package.json
✅ next.config.ts
```

**Option B: Force Redeploy**
1. Go to Hostinger dashboard
2. Click "Redeploy" or "Rebuild"
3. Watch build logs carefully
4. Verify public folder is copied

**Option C: Manual Copy (Temporary Fix)**
1. Use Hostinger File Manager or FTP
2. Upload public folder contents manually
3. Place files in root: `/public/manifest.json`, etc.

### Issue 2: Static Files Getting 500 Errors

**Symptom**: CSS, JS files fail with 500

**Cause**: Next.js server not serving `.next/static` correctly

**Fix**:

1. **Check Node.js version**:
   - Must be 20.x or higher
   - 18.x and lower won't work properly

2. **Verify start command**:
   ```
   Correct: npm start
   Wrong: node server.js
   Wrong: npm run dev
   ```

3. **Check application logs**:
   - Look for startup errors
   - Check if server is listening on correct port
   - Port should be auto-assigned by Hostinger

4. **Verify standalone build**:
   - Check `.next/standalone` folder exists
   - Should contain server.js and dependencies

### Issue 3: Build Succeeds But Site Broken

**Symptom**: Build logs show success, but site has errors

**Debugging Steps**:

1. **Check Application Logs** (not Build Logs):
   - Look for runtime errors
   - Check what happens when server starts
   - Look for missing file errors

2. **Verify Routes**:
   ```bash
   # In browser DevTools Network tab, check:
   /_next/static/css/...  → Should be 200, not 500
   /manifest.json         → Should be 200, not 404
   /favicon.png           → Should be 200, not 404
   ```

3. **Test Static File Serving**:
   - Try accessing: `https://beta.accoop.com/logo.png`
   - Should return 200 if public folder is working
   - If 404 → public folder not served

## 🔍 Diagnostic Commands

### Check Your Deployment Locally

Before deploying to Hostinger, test locally:

```bash
# Clean build
rm -rf .next node_modules
npm install
npm run build

# Test production mode
npm start

# Visit http://localhost:3000
# Check browser console for errors
# If it works locally but not on Hostinger → configuration issue
# If it fails locally too → code issue
```

### Verify Files in Deployment Package

```bash
# If using manual deployment, check your zip:
unzip -l your-deployment.zip | grep public/
# Should show:
# public/manifest.json
# public/favicon.png
# public/favicon-192.png
# etc.

# If these are missing → wrong deployment package!
```

## ✅ Complete Deployment Checklist

Use this checklist when deploying:

### Before Deployment
- [ ] Latest code includes `images: { unoptimized: true }`
- [ ] GitHub Actions build passed (green ✅)
- [ ] Deployment package includes `public/` folder
- [ ] Local production build works (`npm run build && npm start`)

### Hostinger Configuration
- [ ] Node.js version: 20.x or higher
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Install command: `npm ci` or `npm install`
- [ ] Environment: Production
- [ ] NODE_ENV=production set

### After Deployment
- [ ] Build logs show no errors
- [ ] Application logs show server started
- [ ] Visit site - loads without errors
- [ ] Browser console - no 500 errors
- [ ] Browser console - no 404 errors
- [ ] All images load correctly
- [ ] CSS styles applied
- [ ] Navigation works
- [ ] Test on mobile

## 🆘 Still Not Working? Try These

### Nuclear Option 1: Complete Redeploy

1. **Delete app** in Hostinger
2. **Recreate** Node.js app
3. **Connect to GitHub** (if using Git integration)
4. **Configure settings** exactly as above
5. **Deploy fresh**

### Nuclear Option 2: Use Manual Deployment

If GitHub integration isn't working:

1. Download latest CI/CD artifact
2. Extract the zip
3. Upload to Hostinger manually
4. Ensure all folders included
5. Rebuild

### Nuclear Option 3: Contact Hostinger Support

Provide them with:
- Your application URL: `https://beta.accoop.com`
- Error description: "500 errors on static files, 404 on public folder"
- Build logs (copy/paste)
- Application logs (copy/paste)
- Your configuration settings

**Hostinger 24/7 Support**: Live chat in hPanel

## 📝 Expected Timeline

After applying fix:

```
1. Push to GitHub → Immediate
2. GitHub Actions build → 2-3 minutes
3. Hostinger auto-deploy (if connected) → 5 minutes
4. Total time → ~8 minutes
```

If manual:
```
1. Wait for GitHub Actions → 2-3 minutes
2. Download artifact → 30 seconds
3. Upload to Hostinger → 1 minute
4. Hostinger rebuild → 3 minutes
5. Total time → ~7 minutes
```

## 🎯 Success Indicators

You'll know it's fixed when:

✅ No errors in browser console
✅ CSS loads and site looks correct
✅ All images display
✅ favicon appears in browser tab
✅ manifest.json accessible (check: `https://beta.accoop.com/manifest.json`)
✅ All pages navigate correctly

## 📊 Monitoring After Fix

For the next few deployments:

1. **Always check browser console** after deploy
2. **Test all pages** thoroughly
3. **Check manifest.json** explicitly
4. **Verify images** load correctly
5. **Test on mobile** device

## 🔄 Prevention for Future

To avoid these issues:

1. **Always test locally** before deploying:
   ```bash
   npm run build && npm start
   ```

2. **Use CI/CD artifacts** for deployment (already set up!)

3. **Monitor GitHub Actions** - if build fails there, don't deploy

4. **Keep Hostinger settings consistent** - don't change them randomly

5. **Document any custom configurations** you make

## Summary

**Root Cause**: Image optimization incompatibility + Hostinger configuration issues

**Fix Applied**: Disabled image optimization in `next.config.ts`

**Next Steps**:
1. Wait for new build (GitHub Actions)
2. Deploy to Hostinger (automatic or manual)
3. Verify configuration in Hostinger
4. Check site works correctly
5. Monitor for any remaining issues

**Expected Result**: All 500 and 404 errors resolved

---

**Fix Status**: Pushed to GitHub ✅
**Build Status**: Check https://github.com/webevertech/accoop-website/actions
**Deployment**: Waiting for Hostinger auto-deploy or manual upload

**Last Updated**: February 25, 2026
