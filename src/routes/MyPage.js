import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const {isLoggedIn, currentUser, userLoading } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const checkLoggedInStatus = () => {
      if (!userLoading && !isLoggedIn) {
        navigate("/");
      }
    };

    checkLoggedInStatus();
  }, [userLoading, isLoggedIn, navigate, currentUser]);

  if (userLoading) {
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