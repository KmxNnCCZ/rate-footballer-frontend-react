import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  Text,
  Spinner,
} from "@chakra-ui/react"

import { updateUserInformation } from "../../lib/api/changeUserInformation.js";
import { useUser } from "../../contexts/UserContext.js";
import { useFlash } from "../../contexts/FlashMessage.js";
import { userNameErrorMessages, emailErrorMessages } from "../../lib/errorMessages.js";
import { getUser } from "../../lib/api/auth.js";

export const ConfirmationChangeUserInformation = ({ isOpen, onClose, name, email, setNameError, setEmaiError }) => {
  const { setIsExistFlash, setFlashMessage} = useFlash();
  const [isLoading, setIsLoading] = useState(false);
  const { setIsLoggedIn, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const params = {
        ...(name && { name }),
        ...(email && { email }),
      }
      await updateUserInformation(params);
      // ユーザー情報の更新に成功したらログイン情報も更新
      const user = await getUser();
        setIsLoggedIn(user.success);
        if(user.success) {
          const filteredUser = {
            email: user.data.email,
            id: user.data.id,
            name: user.data.name
          };
          setCurrentUser(filteredUser);
        }
      setIsLoading(false);
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "ユーザー情報を変更しました。"});
      onClose();
      navigate("/")
    } catch (e) {
      if(e.response.data.errors) {
        console.log(e.response.data.errors);
        if (e.response.data.errors.name) {
          setNameError(userNameErrorMessages[e.response.data.errors.name.join(" ")]);
          console.log(e.response.data.errors.name)
        }
        if (e.response.data.errors.email) {
          setEmaiError(emailErrorMessages[e.response.data.errors.email.join(" ")])
        }
      }
      onClose();
      setIsLoading(false);
      setIsExistFlash(true);
      setFlashMessage({type: "error", message: "ユーザー情報の変更に失敗しました。"});
    }
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {name || email ? 
          <>
            <ModalHeader>この内容で本当に更新しますか？</ModalHeader>
            <ModalBody>
              { name &&
                <Text mb="10px">
                  新しいユーザーネーム: {name}
                </Text>
              }
              { email &&
                <Text>
                  新しいメールアドレス: {email}
                </Text>
              }
            </ModalBody>
            <ModalFooter>
              {isLoading ? (
                <Button colorScheme="blue" mr={3} disabled>
                  <Spinner size="sm" />
                  処理中
                </Button>
              ) : (
                <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                  はい
                </Button>
              )}
              <Button variant='ghost' onClick={onClose}>
                いいえ
              </Button>
            </ModalFooter>
          </>
          :
          <>
            <ModalHeader border="1px">変更内容を記入してください</ModalHeader>
            <ModalCloseButton mt="10px"/>
          </>
        }
        </ModalContent>
      </Modal>
  )
}