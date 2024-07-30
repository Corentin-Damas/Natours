const Review = require("./../models/reviewModel");
const factory = require("./handlerFactory");
const catchAsync = require("./../utils/catchAsync");

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.updateMyReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(res.params.id);
  res.status(200).render("my-reviews", {
    title: "My reviewst",
    review: review,
  });
});

exports.getCurrentReview = catchAsync(async (req, res, next) => {
  const review = await Review.find({_id: req.params.id}).populate({
    path: "tour",
    fields: "name imageCover summary",
  });
  req.review = review[0];
  res.locals.review = review[0];
  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
