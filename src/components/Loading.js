import { Box, Spinner } from "@chakra-ui/react";

export const Loading = () => {
  return (
    <Box textAlign="center" mt="30px">
      <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='gray.200'
      color='#89DA59'
      size='lg'
    /> 
    </Box>
  );
}