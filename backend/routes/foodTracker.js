const express = require("express");
const router = express.Router();
const foodTrackerController = require("../controllers/foodTracker.js");

router.put("/nutrition", foodTrackerController.putNutritionPlan);

module.exports = router;
