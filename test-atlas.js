require('dotenv').config();

const mongoose = require("mongoose");

// Test MongoDB Atlas connection
const testConnection = async () => {
    try {
        console.log("Testing MongoDB Atlas connection...");
        
        // Use the same connection string as your app
        const dbURL = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/wanderlust";
        console.log("Connection string:", dbURL.replace(/\/\/.*@/, '//***:***@')); // Hide password
        
        // Add database name to connection string if not present
        const finalURL = dbURL.includes('wanderlust') ? dbURL : `${dbURL}/wanderlust`;
        console.log("Final connection string:", finalURL.replace(/\/\/.*@/, '//***:***@'));
        
        await mongoose.connect(finalURL);
        console.log("✅ MongoDB Atlas connected successfully!");
        
        // Test a simple query
        const Listing = require("./models/listing");
        const count = await Listing.countDocuments();
        console.log(`✅ Found ${count} listings in database`);
        
        await mongoose.connection.close();
        console.log("✅ Connection closed successfully");
        
    } catch (error) {
        console.log("❌ MongoDB Atlas connection failed:", error.message);
    }
};

testConnection();
