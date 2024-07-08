import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Text,
  Flex
} from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { useUser } from "../contexts/UserContext";

export const MyPage = () => {
  const navigate = useNavigate()
  const {isLoggedIn, currentUser, userLoading } = useUser();

  useEffect(() => {
    if(!userLoading) {
      if(!isLoggedIn) {
        navigate("/")
      }
    }
  }, [userLoading, isLoggedIn, navigate])

  if (userLoading) {
    return (
      <Loading />
    );
  };

  const changeUserInformation = () => {

  }

  const myRates = () => {
    navigate("/rates?myPosts=true");
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
          <Button
            as='button'
            my="20px"
            w="500px"
            h="70px"
            color="#89DA59"
            bg="white"
            borderColor='#89DA59'
            borderRadius="10px"
            borderWidth="4px"
            _hover={{ bg: '#89DA59', color: "white" }}
            onClick={changeUserInformation}
          >
            ユーザー情報の変更
          </Button>
          <Button
            as='button'
            my="20px"
            w="500px"
            h="70px"
            color="#89DA59"
            bg="white"
            borderColor='#89DA59'
            borderRadius="10px"
            borderWidth="4px"
            _hover={{ bg: '#89DA59', color: "white" }}
            onClick={myRates}
          >
            自身の投稿一覧
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}