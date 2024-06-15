import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Box,
  Center,
  Text,
  Input,
  InputGroup,
  Button,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { signUp } from "../lib/api/auth.js";
import Cookies from "js-cookie";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const navigate = useNavigate();

  const register = async () => {
    try {
      const res = await signUp({ name, email, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box 
      w="80%"
      mx="auto"
      mt="50px"
    >
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        ユーザー新規登録
      </Text>
      <Center>
        <Input
          placeholder="ユーザー名"
          mb="16px"
          maxW="600px"
          w="100%"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Center>
      <Center>
      <Input
        placeholder="メールアドレス"
        mb="16px"
        maxW="600px"
        w="100%"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      </Center>
      <Center>
        <InputGroup maxW="600px" w="100%" mb="50px">
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
      </Center>
      <Center>
        <Button alignContent="center" w="400px" bgColor="#89DA59"  mb="8px" onClick={register}>
          登録する
        </Button>
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/login">ログインはこちら</Link>
      </Box>
    </Box>

  );
};