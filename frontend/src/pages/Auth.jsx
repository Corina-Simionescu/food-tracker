import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
} from "@chakra-ui/react";

function Auth() {
  const [signInData, setSignInData] = useState({ username: "", password: "" });
  const [signUpData, setSignUpData] = useState({ username: "", password: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const toast = useToast();

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const response = await fetch("/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });

      if (response.ok) {
        navigate("/home");
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
          <FormLabel htmlFor="signin-username">Username</FormLabel>
          <Input
            type="text"
            id="signin-username"
            name="signin-username"
            onChange={(e) =>
              setSignInData((prevData) => ({
                ...prevData,
                username: e.target.value,
              }))
            }
          ></Input>
        </FormControl>

        <FormControl isRequired>
          <FormLabel htmlFor="signin-password">Password</FormLabel>
          <Input
            type="password"
            id="signin-password"
            name="signin-password"
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
                <FormLabel htmlFor="signup-username">Username</FormLabel>
                <Input
                  type="text"
                  id="signup-username"
                  name="signup-username"
                  onChange={(e) =>
                    setSignUpData((prevData) => ({
                      ...prevData,
                      username: e.target.value,
                    }))
                  }
                ></Input>
              </FormControl>

              <FormControl isRequired>
                <FormLabel htmlFor="signup-password">Password</FormLabel>
                <Input
                  type="password"
                  id="signup-password"
                  name="signup-password"
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
