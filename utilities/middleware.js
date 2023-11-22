// const Campground = require("../models/campground");
// const Review = require("../models/review");
// const { joiCampgroundSchema } = require('../schemas.js');
// const { joiReviewSchema } = require('../schemas.js');
const ExpressError = require('../utilities/ExpressError');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // req.session.returnTo = req.originalUrl; // add this line
        req.flash('error', 'Please sign in to access this feature');
        return res.redirect('/login');
    }
    next();
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You Do Not Have Access To This Page')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();

}

module.exports.validateCampground = (req, res, next) => {
    const { error } = joiCampgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    const { error } = joiReviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You Cannot Carry Out That Action')
        return res.redirect(`/campgrounds/${id}`)
    }
    next();

}