import { Box } from "@chakra-ui/react";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

function FoodLog() {
  const [foodLog, setFoodLog] = useState([]);

  useEffect(() => {
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
          setFoodLog(responseData);
        }
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchFoodLog();
  }, []);

  return (
    <Box>
      {foodLog
        .slice()
        .reverse()
        .map((foodLogEntry, index) => (
          <Box key={index}>
            <Box key={foodLogEntry.date} backgroundColor="grey">
              {foodLogEntry.date}
            </Box>
            {foodLogEntry.foods.map((food, index) => (
              <Box
                key={index}
                display="flex"
                justifyContent="space-between"
                backgroundColor="yellow"
              >
                <Box>{food.name}</Box>
                <Box>
                  {food.amount} {food.unit}
                </Box>
                <Box>{Math.round(food.calories)} cals</Box>
                <Box>{Math.round(food.proteins)} proteins</Box>
                <Box>{Math.round(food.carbohydrates)} carbs</Box>
                <Box>{Math.round(food.fats)} fats</Box>
              </Box>
            ))}
          </Box>
        ))}
    </Box>
  );
}

export default FoodLog;
