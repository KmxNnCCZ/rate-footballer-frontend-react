import { 
  Box,
  Flex,
  Heading,
  Hide
} from '@chakra-ui/react';
import { CustomChevronRightIcon } from './CustomChevronRightIcon';
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Box
      as="footer"
      width="100%"
      bg="#F6F7F8"
      minH="100px"
    >
      <Hide above="md">
        <Flex justifyContent="space-between">
          <Heading 
            as='h1' 
            fontSize="xl" 
            mt="15px"
            ml="15px"
            cursor="pointer" 
            fontFamily="Arial"
          >
            <Link to="/">Rate Footballer</Link>
          </Heading>
          <Flex 
            direction="column"
            gap="10px"
            mr="50px"
            my="50px"
            alignItems="flex-start"
            fontSize="sm" 
          >
            <Box _hover={{color: "#83BD41"}}>
              <Link to="#"><CustomChevronRightIcon/>お問い合わせ</Link>
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="#"><CustomChevronRightIcon />利用規約</Link>
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="#"><CustomChevronRightIcon />プライバシーポリシー</Link>
            </Box>
          </Flex>
        </Flex>
      </Hide>
        <Hide below="md">
          <Flex
            justifyContent="space-between"
            minH="100px"
            alignItems="center"
          >
            <Heading 
              as='h1' 
              fontSize="xl" 
              position="relative"
              top="-15px"
              left="15px"
              cursor="pointer" 
              fontFamily="Arial"
            >
              <Link to="/">Rate Footballer</Link>
            </Heading>
            <Flex 
              // justifyContent="flex-end" 
              gap="30px"
              mr="30px"
              fontSize="sm" 
            >
              <Box _hover={{color: "#83BD41"}}>
                <Link to="#"><CustomChevronRightIcon/>お問い合わせ</Link>
              </Box>
              <Box _hover={{color: "#83BD41"}}>
                <Link to="#"><CustomChevronRightIcon />利用規約</Link>
              </Box>
              <Box _hover={{color: "#83BD41"}}>
                <Link to="#"><CustomChevronRightIcon />プライバシーポリシー</Link>
              </Box>
            </Flex>
          </Flex>
        </Hide>
    </Box>
  )
}