import { Box } from '@chakra-ui/react'

export const Body = ({ children }) => {
  return (
    <Box 
      flex="1" //bodyが短い際に、footerをページの下部に固定するため
      pt="100px"  //固定したヘッダーとbodyが被らないようにするため
    >
      {children}
    </Box>
  )
}