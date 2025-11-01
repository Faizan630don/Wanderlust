# Fix MongoDB Connection Issue

## The Problem
Your MongoDB connection is timing out. The error `querySrv ENOTFOUND` suggests either:
1. The connection string format is incorrect
2. Network/DNS issue
3. MongoDB Atlas cluster name is incorrect

## Solution

### Step 1: Check Your .env File

Make sure your `.env` file has the correct MongoDB Atlas connection string format:

**CORRECT FORMAT:**
```
ATLAS_URL=mongodb+srv://username:password@cluster-name.mongodb.net/wanderlust?retryWrites=true&w=majority
```

**IMPORTANT:** The connection string MUST include:
- ✅ The database name (`/wanderlust`) **before** the `?`
- ✅ Your actual username and password
- ✅ Your actual cluster name (not `wanderlust.qs3jbyo` - that looks wrong)

### Step 2: Get Your Correct Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. **Replace `<dbname>` with `wanderlust`** (or add `/wanderlust` if not there)

**Example:**
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority
```

### Step 3: Test the Connection

After updating your `.env` file, restart your server:
```bash
# Stop your current server (Ctrl+C)
# Then restart:
nodemon app.js
```

Or test the connection directly:
```bash
node test-connection.js
```

### Step 4: Alternative - Use Local MongoDB

If MongoDB Atlas continues to have issues, you can use local MongoDB:

1. Make sure MongoDB is running locally (it is, based on your setup)
2. In your `.env` file, either:
   - Remove `ATLAS_URL` entirely, OR
   - Comment it out: `#ATLAS_URL=...`

The app will automatically use: `mongodb://127.0.0.1:27017/wanderlust`

## Still Having Issues?

If the connection still fails:
1. Check MongoDB Atlas dashboard - is your cluster running?
2. Check Network Access - is your IP whitelisted? (use `0.0.0.0/0` for all IPs)
3. Verify your username and password are correct
4. Try regenerating your password in Atlas

