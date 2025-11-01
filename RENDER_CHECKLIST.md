# ✅ Render Deployment Checklist

Use this checklist to ensure nothing is missed!

## Before You Start

- [ ] Your code works locally
- [ ] Code is pushed to GitHub
- [ ] You have MongoDB Atlas account (or will create one)
- [ ] You have Cloudinary account (you already have this ✅)

---

## MongoDB Atlas Setup

- [ ] Created MongoDB Atlas account
- [ ] Created FREE cluster (M0 Sandbox)
- [ ] Created database user with password (saved the password!)
- [ ] Added Network Access: `0.0.0.0/0` (Allow from anywhere)
- [ ] Got connection string from "Connect your application"
- [ ] Added `/wanderlust` database name to connection string
- [ ] Replaced `<password>` with actual password
- [ ] Tested connection string locally (optional but recommended)

**Your ATLAS_URL should look like:**
```
mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
```

---

## Generate Secrets

- [ ] Generated SESSION_SECRET: `openssl rand -base64 32`
- [ ] Copied and saved the SESSION_SECRET

---

## Render Deployment

### Account Setup
- [ ] Created Render account
- [ ] Connected GitHub account

### Service Configuration
- [ ] Created new Web Service
- [ ] Selected your Wanderlust repository
- [ ] Set Name: `wanderlust`
- [ ] Set Environment: `Node`
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `node app.js`
- [ ] Enabled Auto-Deploy: `Yes`

### Environment Variables (CRITICAL!)
- [ ] Added `ATLAS_URL` (your MongoDB connection string)
- [ ] Added `SESSION_SECRET` (generated secret)
- [ ] Added `NODE_ENV` = `production`
- [ ] Added `CLOUD_NAME` (your Cloudinary name)
- [ ] Added `CLOUD_API_KEY` (your Cloudinary key)
- [ ] Added `CLOUD_API_SECRET` (your Cloudinary secret)
- [ ] Saved all environment variables

**⚠️ DO NOT add PORT variable - Render sets it automatically!**

---

## Deployment

- [ ] Clicked "Create Web Service"
- [ ] Waited for build to complete (5-10 minutes)
- [ ] Checked "Logs" tab for any errors
- [ ] Saw "Service is live" message

---

## Testing

- [ ] Opened the Render URL (e.g., `https://wanderlust.onrender.com`)
- [ ] Home page loads successfully
- [ ] `/listings` page works
- [ ] Can sign up new user
- [ ] Can login
- [ ] Can create new listing
- [ ] Images upload correctly
- [ ] No errors in browser console
- [ ] No errors in Render logs

---

## If Something Went Wrong

- [ ] Checked Render "Logs" tab for error messages
- [ ] Verified all environment variables are set correctly
- [ ] Verified MongoDB Atlas Network Access allows `0.0.0.0/0`
- [ ] Verified connection string format is correct
- [ ] Tested connection string locally with `test-connection.js`

---

## Common Issues & Quick Fixes

| Error | Fix |
|-------|-----|
| MongoDB timeout | Check Network Access is `0.0.0.0/0` |
| Connection string error | Make sure `/wanderlust` is before `?` |
| Port error | Remove PORT from env vars (Render sets it) |
| Build failed | Check Node version in package.json |
| Session error | Make sure SESSION_SECRET is set |
| Image upload fails | Add Cloudinary credentials |

---

## ✅ Success!

If all checkboxes are checked and your site is working:
- 🎉 **Congratulations! Your app is live on Render!**
- 🔄 Future pushes to GitHub will auto-deploy
- 📊 Monitor your app in Render dashboard
- 🚀 Share your Render URL with the world!

---

**Need detailed steps? See `RENDER_DEPLOYMENT.md`**

