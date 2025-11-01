const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

// Use ATLAS_URL from environment (same as app.js)
const dbURL = process.env.ATLAS_URL || process.env.dbURL || "mongodb://127.0.0.1:27017/wanderlust";

// Ensure database name is in connection string for Atlas
let finalDbURL = dbURL;
if (dbURL.includes('mongodb+srv://') || dbURL.includes('mongodb://')) {
    const urlMatch = dbURL.match(/mongodb(\+srv)?:\/\/([^\/]+)(?:\/([^?\/]+))?(\?.*)?$/);
    if (urlMatch && !urlMatch[3]) {
        const hasQuery = dbURL.includes('?');
        if (hasQuery) {
            finalDbURL = dbURL.replace(/\/?\?/, '/wanderlust?');
        } else {
            finalDbURL = dbURL.replace(/\/$/, '') + '/wanderlust';
        }
    }
}

async function main() {
    await mongoose.connect(finalDbURL);
    console.log("Connected to DB");
    
    // Create or find a dummy user for sample listings
    let sampleUser = await User.findOne({ username: "sampleuser" });
    if (!sampleUser) {
        sampleUser = new User({ username: "sampleuser", email: "sample@wanderlust.com" });
        await User.register(sampleUser, "samplepass123");
        console.log("Created sample user for listings");
    }
    
    // Clear existing data
    await Listing.deleteMany({});
    console.log("Cleared existing listings");
    
    // Add owner to each listing
    const listingsWithOwner = initData.data.map(listing => ({
        ...listing,
        owner: sampleUser._id
    }));
    
    // Insert sample data
    await Listing.insertMany(listingsWithOwner);
    console.log(`Sample data inserted successfully (${listingsWithOwner.length} listings)`);
    
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
}

main().catch(err => {
    console.log(err);
});