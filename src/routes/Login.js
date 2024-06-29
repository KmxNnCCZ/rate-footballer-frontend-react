import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { 
  Text,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { signIn } from '../lib/api/auth.js'
import Cookies from "js-cookie";

export const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const login = async () => {
    try {
      const res = await signIn({ email, password });
      // レスポンスをもとにクッキーをセット
      Cookies.set("_access_token", res.headers["accessToken"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      setIsLoggedIn(true);
      navigate("/")
    } catch (e) {
      console.log(e);
    }
  }

  // すでにログイン済みであればトップページに遷移
  if(isLoggedIn) {
    navigate("/");
  }

  return (
    <Box>
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        ログインページ
      </Text>
      <Center>
        <Input
          placeholder="メールアドレス" 
          mb="16px"
          w="100%"
          maxW="600px"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <Button alignContent="center" w="400px" bgColor="#89DA59" mb="8px" onClick={login}>
          ログイン
        </Button>
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/signUp">新規登録はこちら</Link>
      </Box>
    </Box>
  )
}