const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbURL = process.env.ATLAS_URL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(dbURL);
    console.log("Connected to DB");
    
    // Clear existing data
    await Listing.deleteMany({});
    console.log("Cleared existing listings");
    
    // Insert sample data with owner ID
    const sampleData = initData.data.map((obj) => ({
        ...obj, 
        owner: "68dbb683d43c627687dcfe18" // You'll need to replace this with a real user ID
    }));
    
    await Listing.insertMany(sampleData);
    console.log("Sample data inserted successfully");
    
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
}

main().catch(err => {
    console.log(err);
});