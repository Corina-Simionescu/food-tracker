import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import NutritionProgress from "../components/NutritionProgress.jsx";
import UserIcon from "../components/UserIcon.jsx";
import FoodLog from "../components/FoodLog.jsx";
import { Box, Button, Divider } from "@chakra-ui/react";

function FoodTracker() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [targetCalories, setTargetCalories] = useState(0);
  const [targetProteins, setTargetProteins] = useState(0);
  const [targetFats, setTargetFats] = useState(0);
  const [targetCarbohydrates, setTargetCarbohydrates] = useState(0);
  const [eatenCalories, setEatenCalories] = useState(0);
  const [eatenProteins, setEatenProteins] = useState(0);
  const [eatenFats, setEatenFats] = useState(0);
  const [eatenCarbohydrates, setEatenCarbohydrates] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    async function fetchData() {
      try {
        const response = await fetch("/api/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();
        setUserData(responseData.user);
      } catch (error) {
        console.error("Error fetching protected data:", error);
        localStorage.removeItem("token");
        navigate("/");
      }
    }

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
          setTargetCalories(responseData.calories);
          setTargetProteins(responseData.proteins);
          setTargetFats(responseData.fats);
          setTargetCarbohydrates(responseData.carbohydrates);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();
    fetchNutritionData();
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
