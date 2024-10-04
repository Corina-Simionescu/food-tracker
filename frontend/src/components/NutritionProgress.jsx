import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

function NutritionProgress({ targetNutrition }) {
  const navigate = useNavigate();
  const [consumedNutrition, setConsumedNutrition] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });

  useEffect(() => {
    async function fetchFoodLog() {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.setItem("error", "You need to sign in");
        navigate("/");
        return;
      }

      try {
        const response = await fetch(`/api/food-tracker/food`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          localStorage.setItem("error", "You need to sign in");
          navigate("/");
          return;
        }

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

    calculateConsumedNutrition();
  }, []);

  return (
    <Box>
      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.calories}/{targetNutrition.calories || 0} calories
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.proteins}/{targetNutrition.proteins || 0} proteins
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.carbohydrates}/{targetNutrition.carbohydrates || 0}{" "}
          carbs
        </CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="15rem" color="green.400">
        <CircularProgressLabel>
          {consumedNutrition.fats}/{targetNutrition.fats || 0} fats
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  );
}

export default NutritionProgress;
