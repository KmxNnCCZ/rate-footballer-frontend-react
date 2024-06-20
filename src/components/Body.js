import { Box } from '@chakra-ui/react'

export const Body = ({ children }) => {
  return (
    <Box 
      flex="1" //bodyが短い際に、footerをページの下部に固定するため
      pt="100px"  //固定したヘッダーの下からbodyが始まるようにするため
      as="main"
      my="50px"
      width="80%"
      mx="auto"
    >
      {children}
    </Box>
  )
}