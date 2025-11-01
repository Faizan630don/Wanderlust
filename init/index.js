const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbURL = process.env.dbURL || "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(dbURL);
    console.log("Connected to DB");
    
    // Clear existing data
    await Listing.deleteMany({});
    console.log("Cleared existing listings");
    
    // Insert sample data
    await Listing.insertMany(initData.data);
    console.log("Sample data inserted successfully");
    
    // Close connection
    await mongoose.connection.close();
    console.log("Database connection closed");
}

main().catch(err => {
    console.log(err);
});