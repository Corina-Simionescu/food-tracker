import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Divider,
} from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import UserIcon from "../components/UserIcon.jsx";

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

  function f() {
    let date = new Date();
    let logDate = new Date(date);
    console.log("date: ", date);
    console.log("logDate: ", logDate);
    let timezoneOffset = date.getTimezoneOffset() * 60 * 1000;
    console.log("timezoneOffset: ", timezoneOffset);
    console.log("date.getTime(): ", date.getTime());
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <CircularProgress value={40} size="15rem" color="green.400" onClick={f}>
          <CircularProgressLabel>
            {eatenCalories}/{targetCalories} calories
          </CircularProgressLabel>
        </CircularProgress>

        <CircularProgress value={40} size="15rem" color="green.400">
          <CircularProgressLabel>
            {eatenProteins}/{targetProteins} proteins
          </CircularProgressLabel>
        </CircularProgress>

        <CircularProgress value={40} size="15rem" color="green.400">
          <CircularProgressLabel>
            {eatenFats}/{targetFats} fats
          </CircularProgressLabel>
        </CircularProgress>

        <CircularProgress value={40} size="15rem" color="green.400">
          <CircularProgressLabel>
            {eatenCarbohydrates}/{targetCarbohydrates} carbs
          </CircularProgressLabel>
        </CircularProgress>

        <UserIcon></UserIcon>
      </Box>

      <Button onClick={() => navigate("/food-tracker/add-food")}>
        Add food
      </Button>

      <Divider borderWidth="0.3rem" borderColor="red"></Divider>
    </Box>
  );
}

export default FoodTracker;
