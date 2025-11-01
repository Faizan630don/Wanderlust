# Deployment Guide for Wanderlust

This guide will help you deploy your Wanderlust application to various platforms.

## Prerequisites

Before deploying, make sure you have:
1. ✅ A MongoDB Atlas account (free tier available at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas))
2. ✅ A Cloudinary account (free tier available at [cloudinary.com](https://cloudinary.com))
3. ✅ Git repository set up for your project
4. ✅ All environment variables ready

## Environment Variables Required

You'll need to set these environment variables in your deployment platform:

### Required Variables:
- `ATLAS_URL` - Your MongoDB Atlas connection string
  - Format: `mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority`
- `NODE_ENV` - Set to `production` for production deployments
- `SESSION_SECRET` - A random secret string for session encryption (use a strong random string)

### Optional (but recommended):
- `CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUD_API_KEY` - Your Cloudinary API key
- `CLOUD_API_SECRET` - Your Cloudinary API secret
- `PORT` - Server port (usually auto-set by platform, defaults to 8080)

## Deployment Options

### Option 1: Railway (Recommended - Easiest)

Railway is beginner-friendly with a free tier.

#### Steps:
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account and select this repository
4. Click "Deploy Now"
5. After deployment, go to "Variables" tab and add:
   - `ATLAS_URL` - Your MongoDB connection string
   - `SESSION_SECRET` - Generate a random secret (use: `openssl rand -base64 32`)
   - `NODE_ENV` - Set to `production`
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` - From Cloudinary
6. Your app will automatically redeploy when you push to GitHub

#### Generate Session Secret:
```bash
openssl rand -base64 32
```

---

### Option 2: Render (Free Tier Available)

Render offers a free tier with some limitations.

#### Steps:
1. Go to [render.com](https://render.com) and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub account and select this repository
4. Configure:
   - **Name**: wanderlust
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
5. In "Environment Variables" section, add all the variables listed above
6. Click "Create Web Service"
7. Wait for deployment to complete (first deploy takes ~5-10 minutes)

---

### Option 3: Heroku (Paid - But Reliable)

**Note**: Heroku no longer offers a free tier, but is very reliable.

#### Steps:
1. Install Heroku CLI: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
2. Login: `heroku login`
3. Create app: `heroku create wanderlust-yourname`
4. Set environment variables:
   ```bash
   heroku config:set ATLAS_URL="your-mongodb-connection-string"
   heroku config:set SESSION_SECRET="your-secret-here"
   heroku config:set NODE_ENV="production"
   heroku config:set CLOUD_NAME="your-cloudinary-name"
   heroku config:set CLOUD_API_KEY="your-api-key"
   heroku config:set CLOUD_API_SECRET="your-api-secret"
   ```
5. Deploy: `git push heroku main`
6. Open app: `heroku open`

---

### Option 4: DigitalOcean App Platform

#### Steps:
1. Go to [cloud.digitalocean.com](https://cloud.digitalocean.com)
2. Navigate to "App Platform" → "Create App"
3. Connect GitHub repository
4. Configure build settings:
   - Build Command: `npm install`
   - Run Command: `node app.js`
5. Add environment variables in the "App-Level Environment Variables" section
6. Deploy

---

## MongoDB Atlas Setup

If you haven't set up MongoDB Atlas yet:

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (choose FREE tier)
4. Create a database user (Database Access → Add New User)
5. Whitelist IP addresses (Network Access → Add IP Address → Allow Access from Anywhere: `0.0.0.0/0`)
6. Get connection string (Clusters → Connect → Connect your application)
7. Replace `<password>` and `<dbname>` in the connection string
8. Use this as your `ATLAS_URL` environment variable

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
```

---

## Cloudinary Setup

1. Go to [cloudinary.com](https://cloudinary.com) and sign up for free account
2. Go to Dashboard
3. Copy:
   - Cloud Name
   - API Key
   - API Secret
4. Add these to your environment variables

**Note**: If you skip Cloudinary, images will be stored locally (not recommended for production).

---

## Testing Deployment

After deployment, test these:
- ✅ Home page loads
- ✅ Can view listings
- ✅ Can sign up / login
- ✅ Can create new listings
- ✅ Can upload images
- ✅ Can leave reviews

---

## Common Issues & Solutions

### Issue: Application crashes on startup
**Solution**: Check that all environment variables are set correctly, especially `ATLAS_URL`

### Issue: MongoDB connection fails
**Solution**: 
- Verify your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs)
- Check connection string format is correct
- Ensure database user password is URL-encoded if it contains special characters

### Issue: Images not uploading
**Solution**: 
- Verify Cloudinary credentials are correct
- Or ensure local storage directory has write permissions

### Issue: Sessions not working
**Solution**: 
- Make sure `SESSION_SECRET` is set and is a strong random string
- In production, ensure your platform supports HTTPS

---

## Post-Deployment Checklist

- [ ] All environment variables set
- [ ] MongoDB Atlas connection working
- [ ] Cloudinary configured (or local storage working)
- [ ] HTTPS enabled (for session security)
- [ ] Domain configured (if using custom domain)
- [ ] Error logging/monitoring set up (optional but recommended)

---

## Continuous Deployment

All platforms mentioned above support automatic deployments:
- Push to `main`/`master` branch → Automatic deployment
- Or configure branch-based deployments in platform settings

---

## Need Help?

If you encounter issues:
1. Check platform logs (usually available in platform dashboard)
2. Verify all environment variables are set
3. Test MongoDB connection string locally
4. Check that Node version is compatible (should be 18+)

---

**Happy Deploying! 🚀**

