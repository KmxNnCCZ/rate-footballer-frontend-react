import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {

  Box,
  Text,
  Center,
  FormControl,
  Input,
  FormErrorMessage,
  useDisclosure
} from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { ConfirmationChangeUserInformation } from "../components/modals/ConfirmationChangeUserInformation";
import { SubmitButton } from "../components/SubmitButton";
import { useUser } from "../contexts/UserContext";

export const UpdateUserInformation = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isLoggedIn, userLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  if (userLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    navigate("/")
  }


  return ( 
    <Box>
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        ユーザー情報更新
      </Text>
      <Center>
        <FormControl isInvalid={nameError} maxW="600px" w="100%" mb="16px">
          <Input
            placeholder="新しいユーザーネーム"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FormErrorMessage ml="15px" mt="5px">※ {nameError}</FormErrorMessage>
        </FormControl>
      </Center>

      <Center>
        <FormControl isInvalid={emailError} maxW="600px" w="100%" mb="16px">
          <Input
            placeholder="新しいメールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormErrorMessage ml="15px" mt="5px">※ {emailError}</FormErrorMessage>
        </FormControl>
      </Center>

      <Center>
      <SubmitButton
        width={"250px"}
        height={"70px"}
        borderRadius={"10px"}
        onClick={onOpen}
        content={"変更する"}
      />
      <ConfirmationChangeUserInformation
        isOpen={isOpen}
        onClose={onClose}
        name={name}
        email={email}
        setNameError={setNameError}
        setEmaiError={setEmailError}
      />
      </Center>
    </Box>

  )
}