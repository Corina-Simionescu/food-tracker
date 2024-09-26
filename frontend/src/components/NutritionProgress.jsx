import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function NutritionProgress() {
  const [targetNutrition, setTargetNutrition] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });
  const [consumedNutrition, setConsumedNutrition] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });

  useEffect(() => {
    async function fetchNutritionData() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await fetch(`/api/food-tracker/nutrition/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();

        if (response.ok) {
          setTargetNutrition({
            calories: responseData.calories,
            proteins: responseData.proteins,
            carbohydrates: responseData.carbohydrates,
            fats: responseData.fats,
          });
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function fetchFoodLog() {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await fetch(`/api/food-tracker/food/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await response.json();

        if (response.ok) {
          return responseData;
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    async function calculateConsumedNutrition() {
      const foodLog = await fetchFoodLog();

      let consumedCalories = 0;
      let consumedProteins = 0;
      let consumedCarbohydrates = 0;
      let consumedFats = 0;

      const today = new Date().toISOString().split("T")[0];

      foodLog.forEach((foodLogEntry) => {
        const entryDate = foodLogEntry.date.split("T")[0];

        if (entryDate === today) {
          foodLogEntry.foods.forEach((food) => {
            consumedCalories += food.calories;
            consumedProteins += food.proteins;
            consumedCarbohydrates += food.carbohydrates;
            consumedFats += food.fats;
          });
        }
      });

      setConsumedNutrition({
        calories: Math.round(consumedCalories),
        proteins: Math.round(consumedProteins),
        carbohydrates: Math.round(consumedCarbohydrates),
        fats: Math.round(consumedFats),
      });
    }

    fetchNutritionData();
    calculateConsumedNutrition();
  }, []);

  return (
    <Box>
      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.calories}/{targetNutrition.calories} calories
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.proteins}/{targetNutrition.proteins} proteins
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.carbohydrates}/{targetNutrition.carbohydrates}{" "}
          carbs
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.fats}/{targetNutrition.fats} fats
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}

export default NutritionProgress;
