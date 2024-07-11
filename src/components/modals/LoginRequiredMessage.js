import { useNavigate } from "react-router-dom";

import { 
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Text,
  Flex,
  Box
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

import { SubmitButton } from "../SubmitButton";


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
            <Box mr={2}>
              <SubmitButton 
                height={"60px"}
                borderRadius={"10px"}
                onClick={navigateLoginPage}
                content={"ログイン"}
              />
            </Box>
            <SubmitButton 
              h={"60px"}
              borderRadius={"10px"}
              onClick={navigateSignUpPage}
              content={"未登録の方はこちら"}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
