import { Button } from "@chakra-ui/react"

export const SubmitButton = ({width, height, borderRadius, onClick, content}) => {
  return (
    <Button
      as='button'
      my="20px"
      w={width}
      h={height}
      color="#89DA59"
      bg="white"
      borderColor='#89DA59'
      borderRadius={borderRadius}
      borderWidth="4px"
      _hover={{ bg: '#89DA59', color: "white" }}
      onClick={onClick}
    >
      {content}
  </Button>
  );
};