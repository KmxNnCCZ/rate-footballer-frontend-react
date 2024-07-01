import React, { useEffect } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, WarningTwoIcon, CloseIcon } from "@chakra-ui/icons";
import { useFlash } from "../contexts/FlashMessage";

const typeIcons = {
  "success": CheckCircleIcon,
  "error": CloseIcon,
  "info": InfoIcon,
  "warning": WarningTwoIcon,
};

const typeStyles = {
  "success": {
    bgColor: "#F1F8F4",
    borderColor: "#CFE8D4",
    iconbgColor: "#51DC6D",
  },
  "error": {
    bgColor: "#FAEFEC",
    borderColor: "#F0CEC3",
    iconbgColor: "#FC5758",
  },
  "info": {
    bgColor: "#E6EFFA",
    borderColor: "#B4CDEF",
    iconbgColor: "#3286EA",
  },
  "warning": {
    bgColor: "#FEF8EB",
    borderColor: "#F4E0B9",
    iconbgColor: "#FFBF23",
  }
};

export const FlashMessage = () => {
  const { isExistFlash, setIsExistFlash, flashMessage, setFlashMessage } = useFlash();

  useEffect(() => {
    if (isExistFlash) {
      const timer = setTimeout(() => {
        setIsExistFlash(false);
        setFlashMessage({ type: "", message: "" });
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [isExistFlash, setIsExistFlash, setFlashMessage]);

  const closeFlash = () => {
    setIsExistFlash(false);
    setFlashMessage({ type: "", message: "" });
  };

  const IconComponent = typeIcons[flashMessage.type];

  return isExistFlash ? (
    <Box
      mt="110px"
      height="100px"
      w="80%"
      bgColor={typeStyles[flashMessage.type].bgColor}
      borderRadius="10px"
      borderColor={typeStyles[flashMessage.type].borderColor}
      borderWidth="2px"
      position="fixed"
      zIndex="1000"
      display="flex"
      alignItems="center"
      left="50%"
      transform="translateX(-50%)"
    >
      <Flex justifyContent="space-between" alignItems="center" width="full" mx="20px">
        <Box
          bgColor={typeStyles[flashMessage.type].iconbgColor}
          w="60px"
          h="60px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="50px"
        >
          <IconComponent color="white" boxSize={5} />
        </Box>
        <Text fontSize="sm">{flashMessage.message}</Text>
        <Box
          bgColor="white"
          w="50px"
          h="50px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <CloseIcon onClick={closeFlash} />
        </Box>
      </Flex>
    </Box>
  ) : null;
};