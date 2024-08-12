const Tour = require("../models/tourModel");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Review = require("../models/reviewModel");
const calendareData = require('./../utils/calendar')

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    title: "All Tours",
    tours,
  });
});
exports.getTour = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const tour = await Tour.findOne({ slug: req.params.slug }).populate(
    {
      path: "reviews",
      fields: "review rating user",
    }
  );

  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render("tour", {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id });
  const tourIDs = bookings.map((el) => el.tour.id);
  const tours = await Tour.find({ _id: { $in: tourIDs } });
  if (tours.length == 0) {
    return res.status(200).render("message", {
      title: "My Tours",
      msg: "You don't have any tours booked for the moment. ",
      goTo: "overview",
    });
  } else {
    res.status(200).render("overview", {
      title: "My Tours",
      tours,
    });
  }
});
exports.getMyReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user.id }).populate({
    path: "tour",
    fields: "name imageCover summary",
  });
  if (reviews.length == 0) {
    return res.status(200).render("message", {
      title: "My reviews",
      msg: "You didn't comment any tours for the moment. ",
      goTo: `overview`,
    });
  } else {
    res.status(200).render("myReviews", {
      title: "My reviews",
      reviews,
    });
  }
});
exports.getMyBilling = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find({ user: req.user.id }).populate({
    path: "tour",
    fields: "name imageCover summary",
  });

  if (bookings.length == 0) {
    return res.status(200).render("message", {
      title: "My Billing",
      msg: "You don't have any billing for the moment. ",
      goTo: `overview`,
    });
  } else {
    res.status(200).render("billing", {
      title: "billing",
      bookings,
    });
  }
});
exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOne({ _id: req.params.id }).populate({
    path: "tour",
    fields: "name imageCover summary",
  });
  res.status(200).render("editReview", {
    title: "Edit my review",
    review: review,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find()
  res.status(200).render("manageUsers", {
    title: "Manage users",
    users
  });
});

exports.getLanding = catchAsync(async (req, res, next) => {
  let tours = defaultTours;
  tours = await Tour.find().sort({ price: 1 }).limit(3);

  res.status(200).render("landing", {
    title: "Natours | Exciting tours for adventurous people",
    tours,
  });
});
exports.getAbout = (req, res, next) => {
  res.status(200).render("about", {
    title: "About",
  });
};
exports.getGuide = (req, res, next) => {
  res.status(200).render("guide", {
    title: "Guide",
  });
};
exports.getContact = (req, res, next) => {
  res.status(200).render("contact", {
    title: "Contact",
  });
};
exports.getPolicy = (req, res, next) => {
  res.status(200).render("policy", {
    title: "Policy",
  });
};
exports.getManageTours = catchAsync(async (req, res, next) => {
  const tours = await Tour.find();
  res.status(200).render("manageToursOverview", {
    title: "Manage Tours",
    tours
  });
});
exports.getManageOneTour = catchAsync(async (req, res, next) => {
  
  const tour = await Tour.findOne({ slug: req.params.slug }).populate(
    {
      path: "reviews",
      fields: "review rating user",
    }
  );
  const guides = await User.find({role: { $in: ["guide", "lead-guide"] } })
  const getGuideIds = (guides) => guides.map(guide => guide._id.toString());
  const guideIds = getGuideIds(tour.guides);
  if (!tour) {
    return next(new AppError("There is no tour with that name.", 404));
  }
  res.status(200).render("manageToursEdit", {
    title: "Tour editing",
    tour,
    calendareData,
    guideIds,
    guides
  });
});
exports.getStories = catchAsync(async (req, res, next) => {
  let reviews = await Review.find().populate({
    path: "tour",
    fields: "name imageCover slug",
  });
  reviews = reviews.filter((el) => el.rating >= 4);
  shuffleArray(reviews);
  reviews = reviews.slice(0, 25);

  res.status(200).render("stories", {
    title: "Stories",
    reviews,
  });
});

const defaultTours = [
  {
    _id: "5c88fa8cf4afda39709c2951",
    name: "The Forest Hiker",
    duration: 5,
    maxGroupSize: 25,
    difficulty: "easy",
    price: 397,
    imageCover: "tour-1-cover.jpg",
    numberGuides: 3,
    numberStops: 3,
    id: "5c88fa8cf4afda39709c2951",
  },
  {
    _id: "5c88fa8cf4afda39709c2955",
    name: "The Sea Explorer",
    duration: 7,
    maxGroupSize: 15,
    difficulty: "medium",
    price: 497,
    imageCover: "tour-2-cover.jpg",
    numberGuides: 2,
    numberStops: 4,
    id: "5c88fa8cf4afda39709c2955",
  },
  {
    _id: "5c88fa8cf4afda39709c295a",
    name: "The Snow Adventurer",
    duration: 4,
    maxGroupSize: 10,
    difficulty: "difficult",
    price: 997,
    imageCover: "tour-3-cover.jpg",
    numberGuides: 3,
    numberStops: 2,
    id: "5c88fa8cf4afda39709c295a",
  },
];

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};
