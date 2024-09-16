import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserIcon from "../components/UserIcon.jsx";
import { Box, CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

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
    <Box display="flex" justifyContent="space-between">
      <CircularProgress value={40} size="10rem" color="green.400">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="10rem" color="green.400">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="10rem" color="green.400">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>

      <CircularProgress value={40} size="10rem" color="green.400">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>

      <UserIcon></UserIcon>
    </Box>
  );
}

export default Home;
