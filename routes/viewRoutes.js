const express = require("express");
const viewsController = require("../controllers/viewController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");


const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getLanding);
router.get("/about", authController.isLoggedIn, viewsController.getAbout);
router.get(
  "/become-a-guide",
  authController.isLoggedIn,
  viewsController.getGuide
);

router.get("/stories", authController.isLoggedIn, viewsController.getStories);
router.get("/policy", authController.isLoggedIn, viewsController.getPolicy);
router.get("/contact", authController.isLoggedIn, viewsController.getContact);
router.get("/overview", authController.isLoggedIn, viewsController.getOverview);
router.get("/tour/:slug", authController.isLoggedIn, viewsController.getTour);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);

router.get("/me", authController.protect, viewsController.getAccount);
router.get(
  "/my-reviews",
  authController.isLoggedIn,
  authController.protect,
  viewsController.getMyReviews
);
router.get(
  "/my-billing",
  authController.isLoggedIn,
  authController.protect,
  viewsController.getMyBilling
);
router.get(
  "/my-reviews/:id",
  // authController.isLoggedIn,
  authController.protect,
  viewsController.getReview
);
router.patch(
  "/submit-review-data/:id",
  // authController.protect,
  reviewController.updateMyReview
);

router.get(
  "/my-tours",
  authController.isLoggedIn,
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);

router.get(
  "/manage-tours",
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo("admin", "lead-guide"),
  viewsController.getManageTours
);
router.get(
  "/manage-tours/:slug",
  authController.isLoggedIn,
  authController.protect,
  authController.restrictTo("admin", "lead-guide"),
  viewsController.getManageOneTour
);

module.exports = router;
