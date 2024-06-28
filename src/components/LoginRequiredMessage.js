import { useNavigate } from "react-router-dom";

import { 
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Button
 } from "@chakra-ui/react"


export const LoginRequiredMessage = ({isOpen, onClose, cancelRef}) => {
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
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>ログインされていません</AlertDialogHeader>
          <AlertDialogBody>採点を投稿するにはログインが必要です。</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={navigateLoginPage}>ログインページへ</Button>
            <Button colorScheme='red' onClick={navigateSignUpPage} ml={3}>未登録の方はこちら</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}