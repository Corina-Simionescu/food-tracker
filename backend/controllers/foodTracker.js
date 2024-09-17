const User = require("../models/User.js");

async function putNutritionPlan(req, res) {
  const { userId, calories, proteins, fats, carbohydrates } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.nutritionPlan = {
      calories,
      proteins,
      fats,
      carbohydrates,
    };

    await user.save();

    res.status(201).json({ message: "Nutrition plan created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { putNutritionPlan };
