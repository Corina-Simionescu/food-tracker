import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Box,
  Button,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function AddFood() {
  const [inputFood, setInputFood] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [chosenFoodName, setChosenFoodName] = useState("");
  const [originalNutritionData, setOriginalNutritionData] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
    amount: 0,
    unit: "",
  });
  const [customNutritients, setCustomNutrients] = useState({
    calories: 0,
    proteins: 0,
    carbohydrates: 0,
    fats: 0,
  });
  const [customAmount, setCustomAmount] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    setCustomAmount(originalNutritionData.amount);
  }, [originalNutritionData.amount]);

  useEffect(() => {
    setCustomNutrients(calculateNutrients(customAmount));
  }, [customAmount, originalNutritionData]);

  async function handleSearchFood() {
    const numberOfResultsPerCategory = 1;

    const url = `https://api.spoonacular.com/food/search?query=${inputFood}&number=${numberOfResultsPerCategory}&apiKey=${
      import.meta.env.VITE_SPOONACULAR_API_KEY
    }`;

    try {
      const response = await fetch(url);
      const responseData = await response.json();

      const filteredResults = responseData.searchResults.filter(
        (category) => category.name != "Articles" && category.name != "Videos"
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching searched foods: ", error);
    }
  }

  async function fetchSelectedFoodNutritionData(url, category) {
    try {
      const response = await fetch(url);
      const responseData = await response.json();

      let fetchedNutritionData = {
        calories: 0,
        proteins: 0,
        carbohydrates: 0,
        fats: 0,
        amount: 0,
        unit: "",
      };

      switch (category.name) {
        case "Recipes": {
          fetchedNutritionData.calories = responseData.nutrients.find(
            (nutrient) => nutrient.name == "Calories"
          ).amount;

          fetchedNutritionData.proteins = responseData.nutrients.find(
            (nutrient) => nutrient.name == "Protein"
          ).amount;

          fetchedNutritionData.carbohydrates = responseData.nutrients.find(
            (nutrient) => nutrient.name == "Carbohydrates"
          ).amount;

          fetchedNutritionData.fats = responseData.nutrients.find(
            (nutrient) => nutrient.name == "Fat"
          ).amount;

          fetchedNutritionData.amount = responseData.weightPerServing.amount;

          if (responseData.weightPerServing.unit === "g") {
            fetchedNutritionData.unit = "grams";
          } else {
            fetchedNutritionData.unit = responseData.weightPerServing.unit;
          }

          break;
        }
        case "Products": {
          fetchedNutritionData.calories = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Calories"
          ).amount;

          fetchedNutritionData.proteins = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Protein"
          ).amount;

          fetchedNutritionData.carbohydrates =
            responseData.nutrition.nutrients.find(
              (nutrient) => nutrient.name == "Carbohydrates"
            ).amount;

          fetchedNutritionData.fats = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Fat"
          ).amount;

          fetchedNutritionData.amount = responseData.servings.number;

          fetchedNutritionData.unit = "servings";

          break;
        }
        case "Menu Items": {
          fetchedNutritionData.calories = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Calories"
          ).amount;

          fetchedNutritionData.proteins = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Protein"
          ).amount;

          fetchedNutritionData.carbohydrates =
            responseData.nutrition.nutrients.find(
              (nutrient) => nutrient.name == "Carbohydrates"
            ).amount;

          fetchedNutritionData.fats = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Fat"
          ).amount;

          fetchedNutritionData.amount = responseData.servings.number;

          fetchedNutritionData.unit("servings");

          break;
        }
        case "Simple Foods": {
          fetchedNutritionData.calories = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Calories"
          ).amount;

          fetchedNutritionData.proteins = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Protein"
          ).amount;

          fetchedNutritionData.carbohydrates =
            responseData.nutrition.nutrients.find(
              (nutrient) => nutrient.name == "Carbohydrates"
            ).amount;

          fetchedNutritionData.fats = responseData.nutrition.nutrients.find(
            (nutrient) => nutrient.name == "Fat"
          ).amount;

          fetchedNutritionData.amount = responseData.amount;

          if (responseData.unit === "g") {
            fetchedNutritionData.unit = "grams";
          } else {
            fetchedNutritionData.unit = responseData.unit;
          }

          break;
        }
      }

      setOriginalNutritionData(fetchedNutritionData);
      setCustomAmount(originalNutritionData.amount);
    } catch (error) {
      console.error("Error fetching nutrition for selected food: ", error);
    }
  }

  function handleFoodSelection(category, food) {
    let url;
    setChosenFoodName(food.name);

    switch (category.name) {
      case "Recipes":
        url = `https://api.spoonacular.com/recipes/${
          food.id
        }/nutritionWidget.json?apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`;
        break;
      case "Products":
        url = `https://api.spoonacular.com/food/products/${food.id}?apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`;
        break;
      case "Menu Items":
        url = `https://api.spoonacular.com/food/menuItems/${food.id}?apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`;
        break;
      case "Simple Foods":
        url = `https://api.spoonacular.com/food/ingredients/${
          food.id
        }/information?amount=100&unit=grams&apiKey=${
          import.meta.env.VITE_SPOONACULAR_API_KEY
        }`;
        break;
    }

    fetchSelectedFoodNutritionData(url, category);
    onOpen();
  }

  function calculateNutrients(customAmount) {
    customAmount = parseFloat(customAmount);

    if (isNaN(customAmount) || customAmount === 0) {
      return { calories: 0, proteins: 0, carbohydrates: 0, fats: 0 };
    }

    //rule of third
    return {
      calories:
        (customAmount / originalNutritionData.amount) *
        originalNutritionData.calories,
      proteins:
        (customAmount / originalNutritionData.amount) *
        originalNutritionData.proteins,
      carbohydrates:
        (customAmount / originalNutritionData.amount) *
        originalNutritionData.carbohydrates,
      fats:
        (customAmount / originalNutritionData.amount) *
        originalNutritionData.fats,
    };
  }

  async function sendDataToServer() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await fetch("/api/food-tracker/food", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          date: new Date(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          foodName: chosenFoodName,
          amount: customAmount,
          unit: originalNutritionData.unit,
          calories: customNutritients.calories,
          proteins: customNutritients.proteins,
          carbohydrates: customNutritients.carbohydrates,
          fats: customNutritients.fats,
        }),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: responseData.message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });

        onClose();
      } else {
        toast({
          title: "Error",
          description: responseData.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error sending data to server: ", error);
    }

    onClose();
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      paddingTop="5rem"
    >
      <Heading>Search food</Heading>
      <InputGroup width="40rem" marginTop="3rem">
        <Input
          type="text"
          placeholder="e.g., pizza"
          _placeholder={{ fontStyle: "italic" }}
          onChange={(event) => setInputFood(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSearchFood();
            }
          }}
        ></Input>
        <InputRightElement width="5rem">
          <Button onClick={handleSearchFood}>Search</Button>
        </InputRightElement>
      </InputGroup>

      {searchResults.length > 0 && (
        <VStack
          spacing={4}
          align="stretch"
          width="40rem"
          mt={4}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          p={4}
        >
          {searchResults.map((category) =>
            category.results.map((food) => (
              <Box
                key={food.id}
                display="flex"
                alignItems="center"
                padding={4}
                borderRadius="md"
                boxShadow="md"
                background="gray.50"
                cursor="pointer"
                _hover={{ bg: "gray.100" }}
                onClick={() => handleFoodSelection(category, food)}
              >
                {food.image && (
                  <Image
                    src={food.image}
                    alt={food.name}
                    boxSize="50px"
                    objectFit="cover"
                    margin={3}
                  />
                )}
                <Text fontSize="lg">{food.name}</Text>
              </Box>
            ))
          )}
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>

        <ModalContent>
          <ModalHeader>{chosenFoodName}</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <Text>Set the amount as needed</Text>
          <TableContainer>
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Amount</Td>
                  <Td>
                    <NumberInput
                      value={customAmount}
                      min={0}
                      onChange={(inputAmount) => {
                        setCustomAmount(inputAmount);
                      }}
                    >
                      <NumberInputField></NumberInputField>
                      <NumberInputStepper>
                        <NumberIncrementStepper></NumberIncrementStepper>
                        <NumberDecrementStepper></NumberDecrementStepper>
                      </NumberInputStepper>
                    </NumberInput>
                  </Td>
                  <Td>{originalNutritionData.unit}</Td>
                </Tr>
                <Tr>
                  <Td>Calories</Td>
                  <Td>{Math.round(customNutritients.calories)}</Td>
                  <Td>kcal</Td>
                </Tr>
                <Tr>
                  <Td>Proteins</Td>
                  <Td>{Math.round(customNutritients.proteins)}</Td>
                  <Td>grams</Td>
                </Tr>
                <Tr>
                  <Td>Carbohydrates</Td>
                  <Td>{Math.round(customNutritients.carbohydrates)}</Td>
                  <Td>grams</Td>
                </Tr>
                <Tr>
                  <Td>Fats</Td>
                  <Td>{Math.round(customNutritients.fats)}</Td>
                  <Td>grams</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>

          <ModalFooter>
            <Button onClick={sendDataToServer}>Add food</Button>
            <Button onClick={onClose}>Cancel </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AddFood;
