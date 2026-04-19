const Listing = require("../models/listing")
 
const axios = require('axios');


module.exports.index = async (req, res) => {
    const q = (req.query.q || '').trim();
    let filter = {};
    if (q.length > 0) {
        const regex = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
        filter = {
            $or: [
                { title: regex },
                { location: regex },
                { country: regex }
            ]
        };
    }
    const allListings = await Listing.find(filter);
    res.render("listings/index.ejs", { allListings, query: q })
}

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs")
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    
    // Validate MongoDB ObjectId format
    if (!id || !require("mongoose").Types.ObjectId.isValid(id)) {
        req.flash("error", "Invalid listing ID!");
        return res.redirect("/listings");
    }
    
    try {
        const listing = await Listing.findById(id)
            .populate({
                path: "reviews",
                populate: {
                    path: "author",
                    select: "username" // Only select needed fields
                }
            })
            .populate({
                path: "owner",
                select: "username" // Only select needed fields
            });

        if(!listing) {
            req.flash("error", "Listing You requested for does not Exist!");
            return res.redirect("/listings");
        }

        console.log(listing);
        res.render("listings/show", {listing});
    } catch (error) {
        console.error("Error fetching listing:", error);
        req.flash("error", "Error loading listing. Please try again.");
        res.redirect("/listings");
    }
};
module.exports.createListing = async (req, res, next)=> {
    
    try {
        console.log("Incoming data: ", req.body);
        console.log("File data: ", req.file);
        
        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        
        // Handle geometry data if provided
        if (req.body.listing.geometry && req.body.listing.geometry.coordinates) {
            const coords = req.body.listing.geometry.coordinates;
            if (coords.length === 2 && coords[0] && coords[1]) {
                newListing.geometry = {
                    type: 'Point',
                    coordinates: [parseFloat(coords[0]), parseFloat(coords[1])]
                };
                console.log('Geometry data added:', newListing.geometry);
            }
        }
        
        // Handle image upload
        if(req.file) {
            // Check if it's Cloudinary (has secure_url) or local storage
            if(req.file.path && req.file.path.startsWith('http')) {
                // Cloudinary upload
                newListing.image = {
                    url: req.file.path,
                    filename: req.file.filename
                };
            } else {
                // Local storage - serve from /uploads
                newListing.image = {
                    url: `/uploads/${req.file.filename}`,
                    filename: req.file.filename
                };
            }
        } else {
            // Use default image if no file uploaded
            newListing.image = {
                url: "https://images.unsplash.com/photo-1756312091615-f6a0b77e3e8d?w=1600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
                filename: "default"
            };
        }
        
        await newListing.save();
        console.log("Saved listing: ", newListing);
        req.flash("success", "New Listing Created ")
        res.redirect("/listings");
    } catch (error) {
        console.error("Error creating listing: ", error);
        req.flash("error", "Failed to create listing: " + error.message);
        res.redirect("/listings/new");
    }
    
};

module.exports.renderEditForm = async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "listing you requested for does not exist!");
        res.redirect("/listings")
    }
    res.render("listings/edit", {listing})
};

module.exports.updateListing = async(req, res) => {

    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing});

    // Handle geometry update if provided
    try {
        if (req.body.listing && req.body.listing.geometry && req.body.listing.geometry.coordinates) {
            const coords = req.body.listing.geometry.coordinates;
            if (Array.isArray(coords) && coords.length === 2 && coords[0] && coords[1]) {
                listing.geometry = {
                    type: 'Point',
                    coordinates: [parseFloat(coords[0]), parseFloat(coords[1])]
                };
                await listing.save();
            }
        }
    } catch (e) {
        console.error('Failed to update geometry for listing', id, e);
    }

   if(typeof req.file !== "undefined"){
    let filename = req.file.filename;
    let url = (req.file.path && req.file.path.startsWith('http'))
        ? req.file.path
        : `/uploads/${filename}`;
    listing.image = { url, filename };
    await listing.save();
   }
   
    req.flash("success","Listing Updated")
    res.redirect(`/listings/${id}`);
     
};


module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};