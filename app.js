if(process.env.NODE_ENV !== "production"){
    require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose")
// Get connection string from environment or use local
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

// Set mongoose options globally to prevent buffering
mongoose.set('bufferCommands', false);
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const ExpressError = require("./utils/ExpressError.js")
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");
const userRouter = require("./routes/user.js");
const { console } = require("inspector");

// Start MongoDB connection
main().catch(err => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    console.error("   The app will start but database operations will fail.");
    console.error("   Please check:");
    console.error("   1. MongoDB is running locally, OR");
    console.error("   2. Your ATLAS_URL is set correctly in .env file");
    console.error("   3. Your MongoDB Atlas IP is whitelisted (if using Atlas)");
});



async function main() {
    try {
        // Add connection options for better reliability
        const options = {
            serverSelectionTimeoutMS: 10000, // 10 seconds timeout
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };

        await mongoose.connect(dbURL, options);
        console.log("✅ MongoDB connected successfully");
        // Wait a moment for connection to stabilize
        await new Promise(resolve => setTimeout(resolve, 100));
        if (mongoose.connection.db) {
            console.log(`   Database: ${mongoose.connection.db.databaseName}`);
            console.log(`   Host: ${mongoose.connection.host}`);
        }
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        console.error("   Make sure MongoDB is running or check your ATLAS_URL");
        throw error;
    }
}

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️  MongoDB disconnected');
});

mongoose.connection.on('connected', () => {
    console.log('✅ MongoDB reconnected');
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



const sessionOptions = {
    secret: process.env.SESSION_SECRET || "mysupersecretstring-dev-only-change-in-production",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // HTTPS only in production
    },
}
// app.get("/", (req, res) => {
//     res.send("Hi , I am root ");
// })




app.use(session(sessionOptions));
app.use(flash()); 

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next ) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// Middleware to check MongoDB connection before handling database operations
app.use((req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
        if (req.method === 'GET' && (req.path === '/' || req.path === '/listings' || req.path.startsWith('/listings'))) {
            return res.status(503).render("error.ejs", { 
                statusCode: 503, 
                message: "Database connection not available. Please check your MongoDB connection and try again." 
            });
        }
    }
    next();
})



// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username:"delta-student",
//     });

//     let registeredUser= await User.register(fakeUser, "heloFaizan");
//     res.send(registeredUser)
// })  


app.use("/listings", listingRouter );
app.use("/listings/:listingId/reviews", reviewRouter );
app.use("/",userRouter)

// Root route must be defined BEFORE the catch-all route
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Test route to debug MongoDB connection
app.get("/test", async (req, res) => {
    try {
        const Listing = require("./models/listing");
        const count = await Listing.countDocuments();
        res.json({ 
            status: "success", 
            message: "MongoDB connection working", 
            listingsCount: count 
        });
    } catch (error) {
        res.json({ 
            status: "error", 
            message: error.message 
        });
    }
});

app.all(/.*/, (req, res, next) => {
    next(new ExpressError(404, "Page not Found!"));
});

app.use((err, req, res, next) => {
    let  {statusCode = 500, message ="Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { statusCode, message });
    // res.status(statusCode).send(message);
})
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
});








