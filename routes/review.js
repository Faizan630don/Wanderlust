const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js")
const reviewController = require("../controllers/review.js");


// POST REVIEWS ROUTE
router.post("/", 
    isLoggedIn,validateReview, 
    wrapAsync(reviewController.createReview));

// GET REVIEWS ROOT → redirect to listing page (avoid 404 when visited directly)
router.get("/", (req, res) => {
    const { listingId } = req.params;
    return res.redirect(`/listings/${listingId}`);
});

//DELETE REVIEW ROUTE
router.delete(
    "/:reviewId",
    isLoggedIn, 
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);


module.exports = router;