import { useNavigate } from "react-router-dom";

import { 
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Button,
  Text,
  Flex
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";


export const LoginRequiredMessage = ({ isOpen, onClose, cancelRef, message }) => {
  const navigate = useNavigate();
  
  const navigateSignUpPage = () => {
    navigate("/signUp");
  };

  const navigateLoginPage = () => {
    navigate("/login");
  };

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogCloseButton />
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            <Flex alignItems="center">
            <WarningIcon mr="10px" boxSize={5} />
            <Text>
              ログインされていません
            </Text>
            </Flex>
          </AlertDialogHeader>
          <AlertDialogBody>{message}するにはログインが必要です。</AlertDialogBody>
          <AlertDialogFooter>
            <Button 
              as='button'
              my="20px"
              h="60px"
              color="#89DA59"
              bg="white"
              borderColor='#89DA59'
              borderRadius="10px"
              borderWidth="4px"
              _hover={{ bg: '#89DA59', color: "white" }}
              ref={cancelRef}
              onClick={navigateLoginPage}
            >
              ログイン
            </Button>
            <Button 
              as='button'
              my="20px"
              h="60px"
              color="#89DA59"
              bg="white"
              borderColor='#89DA59'
              borderRadius="10px"
              borderWidth="4px"
              _hover={{ bg: '#89DA59', color: "white" }}
              onClick={navigateSignUpPage}
              ml={3}
            >
              未登録の方はこちら
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
