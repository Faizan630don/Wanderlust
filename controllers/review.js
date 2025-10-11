const Listing = require("../models/listing")
const Review = require("../models/review")


module.exports.createReview = async (req, res) => {
    try {
        let { listingId } = req.params;
        console.log("Creating review for listing:", listingId);
        console.log("Review data:", req.body.review);
        console.log("User:", req.user);
        
        let listing = await Listing.findById(listingId);
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
        
        let newReview = new Review(req.body.review);
        newReview.author = req.user._id;
        listing.reviews.push(newReview);

        await newReview.save();
        await listing.save();
        req.flash("success" , "New Review Created")

        res.redirect(`/listings/${listing._id}`);
    } catch (error) {
        console.error("Error creating review:", error);
        req.flash("error", "Failed to create review: " + error.message);
        res.redirect(`/listings/${req.params.listingId}`);
    }
}
module.exports.destroyReview = async (req, res) => {
    let { listingId, reviewId } = req.params;
    await Listing.findByIdAndUpdate(listingId, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review Deleted")
    res.redirect(`/listings/${listingId}`);
} 