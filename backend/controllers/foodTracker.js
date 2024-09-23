const User = require("../models/User.js");
const DailyFoodLog = require("../models/DailyFoodLog.js");

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

async function getNutritionPlan(req, res) {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.nutritionPlan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function putNewFood(req, res) {
  const {
    userId,
    date,
    foodName,
    amount,
    unit,
    calories,
    proteins,
    carbohydrates,
    fats,
  } = req.body;

  const logDate = new Date(date);

  const startOfDay = new Date(logDate.setHours(0, 0, 0, 0));
  const endOfDay = new Date(logDate.setHours(23, 59, 59, 999));

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let foodLog = await DailyFoodLog.findOne({
      user: userId,
      date: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });

    if (!foodLog) {
      foodLog = new DailyFoodLog({
        user: userId,
        date: startOfDay,
        foods: [],
      });
    }

    foodLog.foods.push({
      name: foodName,
      amount,
      unit,
      calories,
      proteins,
      carbohydrates,
      fats,
    });

    await foodLog.save();

    res.status(200).json({ message: "Food added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

module.exports = { putNutritionPlan, getNutritionPlan, putNewFood };
