import { Helmet } from "react-helmet-async";
import { Box, Center, Text } from "@chakra-ui/react";

export const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not Found - Rate Footballer</title>
      </Helmet>

      <Center height="80vh">
        <Box textAlign="center">
          <Text fontSize="4xl" fontWeight="bold" color="red.500" mb="4">
            404 Not Found
          </Text>
          <Text fontSize="xl" color="gray.700">
            ページが存在しません
          </Text>
        </Box>
      </Center>
    </>
  );
};