import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Button,
  Input,
  Text,
  Center,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

import { SubmitButton, LoadingButton } from "../components/SubmitButton.js";
import { updatePassword, hasPermission } from "../lib/api/changeUserInformation.js";
import { passwordErrorMessages } from "../lib/errorMessages.js";
import { useFlash } from "../contexts/FlashMessage.js";

export const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setIsExistFlash, setFlashMessage } = useFlash();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const togglePassword = () => {
    setIsRevealPassword((prevState) => !prevState);
  }

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkPermissions = async () => {
      const status = await hasPermission(token);
      if(status === 200) {

      } else {
        navigate("/")
      }
    }
    checkPermissions();
  }, [token, navigate])

  const fetchUpdatePassword = async () => {
    try {
      setIsLoading(true);
      // もう一度登録ボタンを押した場合、エラーメッセージを初期化
      setPasswordError("");
      await updatePassword(token, password);
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "パスワードを変更しました。"})
      navigate("/mypage")
    } catch (e) {
      // これが機能していない
      if(e.response.data.errors) {
        if (e.response.data.errors.password) {
          setPasswordError(passwordErrorMessages[e.response.data.errors.password.join(" ")])
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Helmet>
        <title>パスワード変更 - Rate Footballer</title>
      </Helmet>

      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        パスワード変更
      </Text>

      <Center>
        <FormControl isInvalid={passwordError} maxW="600px" w="100%" mb="50px">
          <InputGroup>
            <Input
              placeholder="新しいパスワード"
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
        {isLoading ? (
          <LoadingButton
            width={"250px"}
            h={"70px"}
            borderRadius={"10px"}
            content={"処理中"}
          />
        ) : (
          <SubmitButton
            w={"250px"}
            h={"70px"}
            borderRadius={"10px"}
            onClick={fetchUpdatePassword}
            content={"変更する"}
          />
        )}
      </Center>
    </Box>

  );
};
