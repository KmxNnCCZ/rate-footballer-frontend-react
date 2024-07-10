import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Box,
  Center,
  Text,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { useFlash } from "../contexts/FlashMessage.js";
import { signUp } from "../lib/api/auth.js";
import { userNameErrorMessages, emailErrorMessages, passwordErrorMessages } from "../lib/errorMessages.js";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emaiError, setEmaiError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { setIsExistFlash, setFlashMessage } = useFlash();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

    // ページが読み込まれたときスクロール位置をトップにする
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  

  const navigate = useNavigate();

  const register = async () => {
    try {
      // もう一度登録ボタンを押した場合、エラーメッセージを初期化
      setNameError("");
      setEmaiError("");
      setPasswordError("");
      await signUp({ name, email, password });
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "登録が完了しました！"})
      navigate("/login");
    } catch (e) {
      if(e.response.data.errors) {
        console.log(e.response.data.errors);
        if (e.response.data.errors.name) {
          setNameError(userNameErrorMessages[e.response.data.errors.name.join(" ")]);
          console.log(e.response.data.errors.name)
        }
        if (e.response.data.errors.email) {
          setEmaiError(emailErrorMessages[e.response.data.errors.email.join(" ")])
        }
        if (e.response.data.errors.password) {
          setPasswordError(passwordErrorMessages[e.response.data.errors.password.join(" ")])
        }
      }
    }
  };

  return (
    <Box>
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        ユーザー新規登録
      </Text>

      <Center>
        <FormControl isInvalid={nameError} maxW="600px" w="100%" mb="16px">
          <Input
            placeholder="ユーザーネーム"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <FormErrorMessage ml="15px" mt="5px">※ {nameError}</FormErrorMessage>
        </FormControl>
      </Center>

      <Center>
        <FormControl isInvalid={emaiError}  maxW="600px" w="100%" mb="16px">
          <Input
            placeholder="メールアドレス"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <FormErrorMessage ml="15px" mt="5px">※ {emaiError}</FormErrorMessage>
        </FormControl>
      </Center>

      <Center>
        <FormControl isInvalid={passwordError} maxW="600px" w="100%" mb="50px">
          <InputGroup>
            <Input
              placeholder="パスワード"
              value={password}
              type={isRevealPassword ? 'text' : 'password'}
              onChange={(event) => setPassword(event.target.value)}
            />
            <InputRightElement>
              <Button onClick={togglePassword}>
                {isRevealPassword  ? <ViewOffIcon /> : <ViewIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage ml="15px" mt="5px">※ {passwordError}</FormErrorMessage>
        </FormControl>
      </Center>
      <Center>
      <Button
        as='button'
        my="20px"
        w="250px"
        h="70px"
        color="#89DA59"
        bg="white"
        borderColor='#89DA59'
        borderRadius="10px"
        borderWidth="4px"
        _hover={{ bg: '#89DA59', color: "white" }}
        onClick={register}
      >
        登録する
      </Button>
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/login">ログインはこちら</Link>
      </Box>
    </Box>

  );
};