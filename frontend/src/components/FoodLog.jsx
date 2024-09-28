import { Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";

function FoodLog() {
  const [foodLog, setFoodLog] = useState([]);

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
