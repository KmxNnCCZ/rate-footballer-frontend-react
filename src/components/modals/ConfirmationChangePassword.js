import { useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Spinner
} from "@chakra-ui/react"

import { sendChangeRequest } from "../../lib/api/changeUserInformation.js"
import { useUser } from "../../contexts/UserContext.js";
import { useFlash } from "../../contexts/FlashMessage.js";

export const ConfirmationChangePassword = ({ isOpen, onClose }) => {
  const { currentUser } = useUser();
  const { setIsExistFlash, setFlashMessage} = useFlash();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await sendChangeRequest(currentUser.email);
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "メールを送信しました。"});
      onClose();
    } catch (e) {
      console.error(e);
      setIsExistFlash(true);
      setFlashMessage({type: "error", message: "メールに失敗しました。"});
    } finally {
      setIsLoading(false);
    }
  }
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>パスワード変更</ModalHeader>
          <ModalBody>
            <Text mb="10px">
              パスワードを変更するためのリンクを以下のメールアドレスにお送りします。
            </Text>
            <Text textAlign="center">
              {currentUser.email}
            </Text>
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
        </ModalContent>
      </Modal>
  )
}