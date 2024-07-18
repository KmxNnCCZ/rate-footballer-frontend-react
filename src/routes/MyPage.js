import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Text,
  Flex,
  useDisclosure
} from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { ConfirmationChangePassword } from "../components/modals/ConfirmationChangePassword";
import { SubmitButton } from "../components/SubmitButton";
import { useUser } from "../contexts/UserContext";

const CustomButton = ({children, onClick}) => {
  return(
    <SubmitButton
      height={"70px"}
      width={"500px"}
      borderRadius={"10px"}
      onClick={onClick}
      content={children}
    />
  )
}
 
export const MyPage = () => {
  const navigate = useNavigate()
  const {isLoggedIn, currentUser, isUserLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const checkLoggedInStatus = () => {
      if (!isUserLoading && !isLoggedIn) {
        navigate("/");
      }
    };

    checkLoggedInStatus();
  }, [isUserLoading, isLoggedIn, navigate, currentUser]);

  if (isUserLoading) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return null;
  }

  const myRates = () => {
    navigate("/rates?myPosts=true");
  }

  const transitionUserInformationForm = () => {
    navigate("/user/setting")
  }

  return (
    <Box>
      <Helmet>
        <title>マイページ - Rate Footballer</title>
      </Helmet>

      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        マイページ
      </Text>

      <Box>
        <Text textAlign="center" fontSize="sm">
          {currentUser.name}
        </Text>

        <Flex flexDirection="column" alignItems="center">
          <CustomButton onClick={transitionUserInformationForm}>
            ユーザー名・メールアドレスの変更
          </CustomButton>
          <CustomButton onClick={onOpen}>
            パスワードの変更
          </CustomButton>
          <ConfirmationChangePassword
            isOpen={isOpen}
            onClose={onClose}
          />
          <CustomButton onClick={myRates}>
            自身の投稿一覧
          </CustomButton>
        </Flex>
      </Box>
    </Box>
  )
}