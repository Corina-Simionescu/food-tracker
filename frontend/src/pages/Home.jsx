import { Box, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

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

    fetchData();
  }, []);

  return (
    <Box p={4}>
      <Text>Hello {userData ? userData.username : "Guest"}</Text>
      <Button
        mt={4}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}
      >
        Sign Out
      </Button>
    </Box>
  );
}

export default Home;
