import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
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
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineUser } from "react-icons/ai";

function UserIcon() {
  const navigate = useNavigate();
  const {
    isOpen: isNutritionPlanModalOpen,
    onOpen: onNutritionPlanModalOpen,
    onClose: onNutritionPlanModalClose,
  } = useDisclosure();
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [gender, setGender] = useState("");
  const [workoutFrequency, setWorkoutFrequency] = useState("");
  const [workoutIntensity, setWorkoutIntensity] = useState("");
  const [dailyActivityLevel, setDailyActivityLevel] = useState("");

  function calculateNutritionPlan(event) {
    event.preventDefault();

    console.log("calculateNutritionPlan function: ");
    console.log(age);
    console.log(weight);
    console.log(height);
    console.log(gender);
    console.log(workoutFrequency);
    console.log(workoutIntensity);
    console.log(dailyActivityLevel);

    onNutritionPlanModalClose();
  }

  return (
    <Box>
      <Menu>
        <MenuButton as={Box} cursor="pointer" height="3rem" width="3rem">
          <Avatar
            bg="gray.700"
            icon={<AiOutlineUser fontSize="1.7rem" color="white" />}
          ></Avatar>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={onNutritionPlanModalOpen}>Generate Plan</MenuItem>
          <MenuItem
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal
        isOpen={isNutritionPlanModalOpen}
        onClose={onNutritionPlanModalClose}
      >
        <ModalOverlay></ModalOverlay>

        <ModalContent>
          <ModalHeader>
            Personalized Calories & Macronutrients Calculator
          </ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <form onSubmit={calculateNutritionPlan}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="age">Age (years)</FormLabel>
                <NumberInput
                  id="age"
                  name="age"
                  min={0}
                  onChange={(value) => setAge(value)}
                  value={age}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="weight">Weight (kg)</FormLabel>
                <NumberInput
                  id="weight"
                  name="weight"
                  min={0}
                  onChange={(value) => setWeight(value)}
                  value={weight}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="height">Height (cm)</FormLabel>
                <NumberInput
                  id="height"
                  name="height"
                  min={0}
                  onChange={(value) => setHeight(value)}
                  value={height}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Gender</FormLabel>
                <RadioGroup
                  name="gender"
                  onChange={(value) => setGender(value)}
                  value={gender}
                >
                  <Stack direction="row">
                    <Radio value="man">Man</Radio>
                    <Radio value="women">Woman</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Workout frequency</FormLabel>
                <RadioGroup
                  name="workoutFrequency"
                  onChange={(value) => setWorkoutFrequency(value)}
                  value={workoutFrequency}
                >
                  <Stack direction="column">
                    <Radio value="rarely">Rarely (0-1 days/week)</Radio>
                    <Radio value="sometimes">Sometimes (2-3 days/week)</Radio>
                    <Radio value="often">Often (4-5 days per week)</Radio>
                    <Radio value="veryOften">
                      Very often (6-7 days per week)
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Workout intensity</FormLabel>
                <RadioGroup
                  name="workoutIntensity"
                  onChange={(value) => setWorkoutIntensity(value)}
                  value={workoutIntensity}
                >
                  <Stack direction="column">
                    <Radio value="light">Light (e.g., walking, yoga)</Radio>
                    <Radio value="moderate">
                      Moderate (e.g., jogging, recreational sports, moderate
                      strength training)
                    </Radio>
                    <Radio value="hard">
                      Hard (e.g., intense cardio, heavy strength training)
                    </Radio>
                    <Radio value="veryHard">
                      Very hard (e.g., professional athlete training)
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Daily activity level</FormLabel>
                <RadioGroup
                  name="dailyActivityLevel"
                  onChange={(value) => setDailyActivityLevel(value)}
                  value={dailyActivityLevel}
                >
                  <Stack direction="column">
                    <Radio value="sedentary">
                      Sedentary (Mostly sitting: e.g. desk job)
                    </Radio>
                    <Radio value="lightlyActive">
                      Lightly Active (Mostly standing or walking: e.g. teacher,
                      retail)
                    </Radio>
                    <Radio value="moderatelyActive">
                      Moderately Active (Regular movement, some physical tasks:
                      e.g. waiter, mailman)
                    </Radio>
                    <Radio value="veryActive">
                      Very Active (Mostly moving, regular physical tasks: e.g
                      housekeeper, gardener)
                    </Radio>
                    <Radio value="extremelyActive">
                      Extremely Active (Constant movement, heavy physical tasks:
                      e.g. construction worker, firefighter)
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Submit</Button>
              <Button onClick={onNutritionPlanModalClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default UserIcon;
