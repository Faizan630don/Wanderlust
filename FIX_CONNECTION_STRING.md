# ✏️ Fix Your MongoDB Connection String

## Your Current Connection String:
```
mongodb+srv://FaizanKhan790:<db_password>@wanderlust.qs3jbyo.mongodb.net/?appName=Wanderlust
```

## ⚠️ Two Fixes Needed:

### Fix 1: Replace `<db_password>`
Replace `<db_password>` with your **actual database password**

**How to find your password:**
1. Go to MongoDB Atlas
2. Left sidebar → **"Database Users"**
3. Find user **"FaizanKhan790"**
4. Click **"EDIT"** to see/reset password OR use the password you created earlier

### Fix 2: Add Database Name
Add `/wanderlust` **BEFORE** the `?`

**Your string should become:**
```
mongodb+srv://FaizanKhan790:YOUR_ACTUAL_PASSWORD@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
                                                                                ^^^^^^^^^^
                                                                          ADD THIS!
```

---

## ✅ Example of Corrected String:

If your password is `MyPassword123`, your final connection string should be:
```
mongodb+srv://FaizanKhan790:MyPassword123@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
```

---

## 🧪 Test Your Fixed Connection String

1. Open your `.env` file
2. Update `ATLAS_URL`:
   ```
   ATLAS_URL=mongodb+srv://FaizanKhan790:YOUR_ACTUAL_PASSWORD@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
   ```
3. Save the file
4. Test it:
   ```bash
   node test-connection.js
   ```
5. If you see "✅ Connected successfully!" - you're good!

---

## 📋 Checklist:

- [ ] Know your database password (from Database Users page)
- [ ] Replaced `<db_password>` with actual password
- [ ] Added `/wanderlust` before `?`
- [ ] Tested connection string locally (optional but recommended)
- [ ] Connection string saved safely (for Render deployment)

---

## 🚀 Next Step: Deploy to Render!

Once your connection string is fixed and tested, you're ready to deploy to Render!

**Your final `ATLAS_URL` for Render will be:**
```
mongodb+srv://FaizanKhan790:YOUR_PASSWORD@wanderlust.qs3jbyo.mongodb.net/wanderlust?appName=Wanderlust
```

