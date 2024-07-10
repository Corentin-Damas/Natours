const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.get("/test", (req, res) => {
  res.status(200).render("base", {
    tour: "the Forest Hiker",
    user: "Jonas",
  });
});
router.get("/overview", viewsController.getOverview);
router.get("/tour/:slug", viewsController.getTour);

module.exports = router;
