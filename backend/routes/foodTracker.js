const express = require("express");
const router = express.Router();
const foodTrackerController = require("../controllers/foodTracker.js");

router.put("/nutrition", foodTrackerController.putNutritionPlan);
router.get("/nutrition/:userId", foodTrackerController.getNutritionPlan);
router.put("/add-food", foodTrackerController.putNewFood);

module.exports = router;
