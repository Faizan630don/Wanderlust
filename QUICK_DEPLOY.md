# ⚡ Quick Deploy to Render - 5 Steps

Follow these **5 simple steps** to deploy your Wanderlust app to Render!

---

## 📝 Step 1: Get MongoDB Atlas Connection String (5 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up (FREE)
3. Create cluster → FREE tier
4. Database Access → Add User (save password!)
5. Network Access → Allow `0.0.0.0/0`
6. Connect → Connect your application
7. Copy connection string
8. Replace `<password>` with your password
9. Add `/wanderlust` before `?` in the URL
10. **Save this connection string!**

**Example:**
```
mongodb+srv://user:pass@cluster.mongodb.net/wanderlust?retryWrites=true&w=majority
```

---

## 🔑 Step 2: Generate Session Secret (30 seconds)

Run this in your terminal:
```bash
openssl rand -base64 32
```

**Copy the output** - you'll need it!

---

## 🚀 Step 3: Push Code to GitHub (2 minutes)

```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

---

## 🌐 Step 4: Deploy on Render (10 minutes)

1. Go to [render.com](https://render.com) → Sign up
2. Click **"New +"** → **"Web Service"**
3. Connect GitHub → Select your repository
4. Configure:
   - Name: `wanderlust`
   - Environment: `Node`
   - Build: `npm install`
   - Start: `node app.js`
5. Click **"Advanced"** → Enable **Auto-Deploy**
6. Click **"Create Web Service"**

---

## ⚙️ Step 5: Add Environment Variables (3 minutes)

In Render dashboard, go to **"Environment"** tab and add:

| Key | Value |
|-----|-------|
| `ATLAS_URL` | Your MongoDB connection string from Step 1 |
| `SESSION_SECRET` | The secret from Step 2 |
| `NODE_ENV` | `production` |
| `CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUD_API_KEY` | Your Cloudinary API key |
| `CLOUD_API_SECRET` | Your Cloudinary API secret |

**Click "Save Changes" after each!**

---

## ✅ Wait & Test!

1. Wait 5-10 minutes for deployment
2. Check **"Logs"** tab for progress
3. When you see "Service is live" → Click the URL!
4. Test your site! 🎉

---

## 🆘 Problems?

- **MongoDB error?** → Check Network Access is `0.0.0.0/0`
- **Build fails?** → Check all env variables are set
- **Site not loading?** → Check "Logs" tab for errors

**See `RENDER_DEPLOYMENT.md` for detailed help!**

---

**That's it! Your app will be live in ~15 minutes! 🚀**

