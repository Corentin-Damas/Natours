const express = require("express");
const viewsController = require("../controllers/viewController");
const authController = require("../controllers/authController");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router.get("/", authController.isLoggedIn, viewsController.getLanding);
router.get("/about",authController.isLoggedIn,  viewsController.getAbout);
router.get("/become-a-guide",authController.isLoggedIn, viewsController.getGuide);

router.get("/overview", authController.isLoggedIn, viewsController.getOverview);
router.get("/tour/:slug", authController.isLoggedIn, viewsController.getTour);
router.get("/login", authController.isLoggedIn, viewsController.getLoginForm);

router.get("/me", authController.protect, viewsController.getAccount);
router.post(
  "/submit-user-data",
  authController.protect,
  viewsController.updateUserData
);
router.get(
  "/my-tours",
  bookingController.createBookingCheckout,
  authController.protect,
  viewsController.getMyTours
);
module.exports = router;
