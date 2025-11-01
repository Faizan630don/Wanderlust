# 📍 Where to Fix Your Connection String

## Your Current Connection String:
```
mongodb+srv://FaizanKhan790:<db_password>@wanderlust.qs3jbyo.mongodb.net/?appName=Wanderlust
```

---

## 🔑 Step 1: Find/Reset Your Password (MongoDB Atlas)

### Where: MongoDB Atlas Dashboard

1. **From where you are now (Overview page):**
   - Look at the **left sidebar**
   - Under **"SECURITY"** section
   - Click **"Database & Network Access"** 
   - OR go directly to: **"Database Users"**

2. **On Database Users page:**
   - You'll see user **"FaizanKhan790"**
   - Click **"EDIT"** button (pencil icon)
   - You can:
     - See current password (if you remember creating it)
     - OR click **"Reset Password"** to create a new one
   - **⚠️ SAVE THE PASSWORD!** Write it down!

3. **If you reset password:**
   - Enter new password
   - Confirm new password
   - Click **"Update User"**
   - **Save this password - you'll need it!**

---

## ✏️ Step 2: Fix Your Connection String (Local Computer)

### Where: Your Local `.env` File

1. **Open your project folder** (`Wanderlust`)
2. **Find `.env` file** (it might be hidden)
3. **Open `.env` file** in any text editor
4. **Find the line with `ATLAS_URL`** (or add it if not there)
5. **Update it** with your fixed connection string:

```env
# Replace this:
ATLAS_URL=mongodb+srv://FaizanKhan790:<db_password>@wanderlust.qs3jbyo.mongodb.net/?appName=Wanderlust

# With this (replace YOUR_PASSWORD with actual password):
ATLAS_URL=mongodb+srv://FaizanKhan790:YOUR_PASSWORD@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
```

**Important changes:**
- ✅ Replace `<db_password>` with your actual password
- ✅ Add `/wanderlust` before `?`

---

## 🧪 Step 3: Test Your Connection (Terminal)

### Where: Your Terminal/Command Line

1. **Open terminal** in your project folder
2. **Run this command:**
   ```bash
   node test-connection.js
   ```
3. **Check the output:**
   - ✅ If you see "✅ Connected successfully!" → You're good!
   - ❌ If you see errors → Check password and connection string format

---

## 📋 Quick Checklist

### In MongoDB Atlas:
- [ ] Go to **"Database Users"** (left sidebar → Security)
- [ ] Find user **"FaizanKhan790"**
- [ ] Click **"EDIT"** to see/reset password
- [ ] **Save the password!**

### In Your Local Project:
- [ ] Open `.env` file in your project folder
- [ ] Update `ATLAS_URL` with:
  - Your actual password (not `<db_password>`)
  - Database name `/wanderlust` before `?`

### In Terminal:
- [ ] Run `node test-connection.js`
- [ ] Confirm it connects successfully

---

## 📝 Example of Fixed String

**Before (wrong):**
```
mongodb+srv://FaizanKhan790:<db_password>@wanderlust.qs3jbyo.mongodb.net/?appName=Wanderlust
```

**After (correct):**
```
mongodb+srv://FaizanKhan790:MyPassword123@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
```

Notice:
- ✅ `<db_password>` → `MyPassword123` (actual password)
- ✅ `...mongodb.net/?...` → `...mongodb.net/wanderlust?` (added `/wanderlust`)

---

## 🚀 After Fixing

Once your connection string is fixed and tested:
1. ✅ Save it - you'll use it in Render as `ATLAS_URL`
2. ✅ We'll proceed to deploy on Render!

---

**Start with Step 1: Go to "Database Users" in MongoDB Atlas to find/reset your password!**

