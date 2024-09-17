import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

function Auth() {
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", password: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSignIn(event) {
    event.preventDefault();

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseData.token);
        navigate("/food-tracker");
      } else {
        toast({
          title: "Error",
          description: "Invalid credentials!",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: responseData.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast({
          title: "Success",
          description: "Account created successfully",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        onClose();
      } else {
        toast({
          title: "Error",
          description: responseData.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Unexpected Error",
        description: responseData.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box>
      <form onSubmit={handleSignIn}>
        <FormControl isRequired>
          <FormLabel htmlFor="signInUsername">Username</FormLabel>
          <Input
            type="text"
            id="signInUsername"
            name="signInUsername"
            onChange={(e) =>
              setSignInData((prevData) => ({
                ...prevData,
                username: e.target.value,
              }))
            }
          ></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="signInPassword">Password</FormLabel>
          <Input
            type="password"
            id="signInPassword"
            name="signInPassword"
            onChange={(e) =>
              setSignInData((prevData) => ({
                ...prevData,
                password: e.target.value,
              }))
            }
          ></Input>
        </FormControl>

        <Button type="submit">Sign In</Button>
      </form>

      <Button onClick={onOpen}>Create account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay></ModalOverlay>

        <ModalContent>
          <ModalHeader>Create Account</ModalHeader>
          <ModalCloseButton></ModalCloseButton>

          <form onSubmit={handleSignUp}>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel htmlFor="signUpUsername">Username</FormLabel>
                <Input
                  type="text"
                  id="signUpUsername"
                  name="signUpUsername"
                  onChange={(e) =>
                    setSignUpData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="signUpPassword">Password</FormLabel>
                <Input
                  type="password"
                  id="signUpPassword"
                  name="signUpPassword"
                  onChange={(e) =>
                    setSignUpData((prevData) => ({
                      ...prevData,
                      password: e.target.value,
                    }))
                  }
                ></Input>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit">Create Account</Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Auth;
