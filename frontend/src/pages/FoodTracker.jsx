import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NutritionProgress from "../components/NutritionProgress.jsx";
import UserIcon from "../components/UserIcon.jsx";
import FoodLog from "../components/FoodLog.jsx";
import { Box, Button, Divider } from "@chakra-ui/react";

function FoodTracker() {
  const navigate = useNavigate();
  const [nutritionPlan, setNutritionPlan] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      localStorage.setItem(
        "error",
        "You need to log in to access the Food Tracker"
      );

      navigate("/");
      return;
    }

    fetchNutritionPlan();
  }, []);

  async function fetchNutritionPlan() {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.setItem("error", "You need to sign in");
      navigate("/");
      return;
    }

    try {
      const response = await fetch("/api/food-tracker/nutrition", {
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
        setNutritionPlan({
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

  function updateNutritionPlan() {
    fetchNutritionPlan();
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <NutritionProgress targetNutrition={nutritionPlan}></NutritionProgress>
        <UserIcon
          updateNutritionPlan={updateNutritionPlan}
        ></UserIcon>
      </Box>

      <Button onClick={() => navigate("/food-tracker/add-food")}>
        Add food
      </Button>

      <Divider borderWidth="0.3rem" borderColor="red"></Divider>

      <FoodLog></FoodLog>
    </Box>
  );
}

export default FoodTracker;
