import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Cookies from "js-cookie";

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

import { useUser } from '../contexts/UserContext.js';
import { useFlash } from '../contexts/FlashMessage.js';
import { signIn } from '../lib/api/auth.js'
import { SubmitButton } from '../components/SubmitButton.js';

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useUser();
  const { setIsExistFlash, setFlashMessage } = useFlash();
  const navigate = useNavigate();

  // ページが読み込まれたときスクロール位置をトップにする
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const fetchLogin = async () => {
    try {
      const res = await signIn({ email, password });
      // レスポンスをもとにクッキーをセット
      Cookies.set("_access_token", res.data.data.accessToken);
      Cookies.set("_client", res.data.data.client);
      Cookies.set("_uid", res.data.data.uid);
      setIsLoggedIn(true);
      setCurrentUser(res.data.data);
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "ログインしました"});
      navigate("/")
    } catch (e) {
      console.log(e);
      setIsExistFlash(true);
      setFlashMessage({type: "error", message: "ログインに失敗しました"});
    }
  }

  // すでにログイン済みであればトップページに遷移
    if (isLoggedIn) {
      navigate("/");
    }

  return (
    <Box>
      <Helmet>
        <title>ログイン - Rate Footballer</title>
      </Helmet>
      
      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        ログイン
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
      <SubmitButton
        width={"250px"}
        h={"70px"}
        borderRadius={"10px"}
        onClick={fetchLogin}
        content={"ログイン"}
      />
      </Center>
      <Box textAlign="right" color="blue.500">
        <Link to="/signUp">新規登録はこちら</Link>
      </Box>
    </Box>
  )
}