import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NutritionProgress from "../components/NutritionProgress.jsx";
import UserIcon from "../components/UserIcon.jsx";
import FoodLog from "../components/FoodLog.jsx";
import { Box, Button, Divider } from "@chakra-ui/react";

function FoodTracker() {
  const navigate = useNavigate();

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
  }, []);

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <NutritionProgress></NutritionProgress>
        <UserIcon></UserIcon>
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
