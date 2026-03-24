const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isloggedIn, isReviewAuthor} = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");

//Review request
//post review route
router.post("/",isloggedIn, validateReview, wrapAsync(reviewController.createReview));


//Delete route
//delete review route
router.delete("/:reviewId",isloggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));


module.exports = router;