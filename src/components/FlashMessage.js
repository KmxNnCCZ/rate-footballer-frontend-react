import React, { useEffect } from "react";

import { Box, Flex, Text } from "@chakra-ui/react";
import { CheckCircleIcon, InfoIcon, WarningTwoIcon, CloseIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

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
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isExistFlash, setIsExistFlash, setFlashMessage]);

  const closeFlash = () => {
    setIsExistFlash(false);
    setFlashMessage({ type: "", message: "" });
  };

  const IconComponent = typeIcons[flashMessage.type];

  return (
    <AnimatePresence>
      {isExistFlash && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            zIndex: "1000",
            width: "100%",
            position: "fixed",
            top: "50px",
            left: "50%",
            maxWidth: "1000px"
          }}
        >
          <Box
            transform="translateX(-50%)"
            height="100px"
            w="80%"
            bgColor={typeStyles[flashMessage.type].bgColor}
            borderRadius="10px"
            borderColor={typeStyles[flashMessage.type].borderColor}
            borderWidth="2px"
            display="flex"
            alignItems="center"
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
              <Text fontSize="sm" maxWidth="70%">{flashMessage.message}</Text>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};
