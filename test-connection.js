require('dotenv').config();
const mongoose = require("mongoose");

let dbURL = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/wanderlust";

// Ensure database name is in connection string for Atlas
if (dbURL.includes('mongodb+srv://') || dbURL.includes('mongodb://')) {
    // Check if database name is already specified (between / and ?)
    const urlMatch = dbURL.match(/mongodb(\+srv)?:\/\/([^\/]+)(?:\/([^?\/]+))?(\?.*)?$/);
    if (urlMatch && !urlMatch[3]) {
        // Database name not specified, add it before query params
        const hasQuery = dbURL.includes('?');
        if (hasQuery) {
            // Replace ? with /wanderlust?, but handle case where there's already a trailing slash
            dbURL = dbURL.replace(/\/?\?/, '/wanderlust?');
        } else {
            // Remove trailing slash if exists, then add /wanderlust
            dbURL = dbURL.replace(/\/$/, '') + '/wanderlust';
        }
    }
}

async function testConnection() {
    try {
        console.log("Testing MongoDB connection...");
        console.log("Connection string:", dbURL.replace(/\/\/.*@/, '//***:***@')); // Hide credentials
        
        const options = {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(dbURL, options);
        console.log("✅ Connected successfully!");
        console.log("   State:", mongoose.connection.readyState === 1 ? "Connected" : "Not Connected");
        console.log("   Database:", mongoose.connection.db.databaseName);
        console.log("   Host:", mongoose.connection.host);
        
        // Test a query
        const Listing = require("./models/listing");
        const count = await Listing.countDocuments();
        console.log(`✅ Found ${count} listings in database`);
        
        await mongoose.connection.close();
        console.log("✅ Connection closed");
        process.exit(0);
    } catch (error) {
        console.error("❌ Connection failed:", error.message);
        process.exit(1);
    }
}

testConnection();

