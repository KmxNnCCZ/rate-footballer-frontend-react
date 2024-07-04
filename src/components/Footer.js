import { Link } from "react-router-dom";

import { 
  Box,
  Flex,
  Heading,
  Hide,
  Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";

import { CustomChevronRightIcon } from './CustomChevronRightIcon';


export const Footer = () => {
  const transitionContactForm = () => {
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfLN-K3gDbz0ubHXmeitouJJsW4_8MIS8HoPMbSyK2JKdwMVQ/viewform?usp=sf_link");
  };

  const transitionGitHubPage = () => {
    window.open("https://github.com/KmxNnCCZ/rate-footballer");
  }

  return (
    <Box
      as="footer"
      width="100%"
      bg="#F6F7F8"
      minH="100px"
    >
      <Hide above="md">
        <Flex justifyContent="space-between">
          <Box>
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
            <Flex justifyContent="center" mt="50px">
              <Box mr="30px" onClick={transitionGitHubPage}>
                <FontAwesomeIcon icon={faGithub}/>
              </Box>
              <Box>
                <FontAwesomeIcon icon={faXTwitter} />
              </Box>
            </Flex>

          </Box>
          <Flex
            direction="column"
            gap="10px"
            mr="50px"
            my="50px"
            alignItems="flex-start"
            fontSize="sm" 
          >
            <Box _hover={{color: "#83BD41"}} onClick={transitionContactForm}>
              <CustomChevronRightIcon/>お問い合わせ
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="/terms_of_use"><CustomChevronRightIcon />利用規約</Link>
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="/privacy_policy"><CustomChevronRightIcon />プライバシーポリシー</Link>
            </Box>
          </Flex>
        </Flex>
      </Hide>
      
      <Hide below="md" h="100px">
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Heading 
              as='h1' 
              fontSize="xl" 
              position="relative"
              left="15px"
              cursor="pointer" 
              fontFamily="Arial"
            >
              <Link to="/">Rate Footballer</Link>
            </Heading>

            <Flex justifyContent="center" mt="10px">
              <Box mr="30px" onClick={transitionGitHubPage}>
                <FontAwesomeIcon icon={faGithub}/>
              </Box>
              <Box>
                <FontAwesomeIcon icon={faXTwitter} />
              </Box>
            </Flex>
          </Box>
          <Flex 
            // justifyContent="flex-end" 
            gap="30px"
            mr="30px"
            fontSize="sm" 
            color="#4A556"
          >
            <Box _hover={{color: "#83BD41"}} onClick={transitionContactForm}>
              <CustomChevronRightIcon/>お問い合わせ
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="/terms_of_use"><CustomChevronRightIcon />利用規約</Link>
            </Box>
            <Box _hover={{color: "#83BD41"}}>
              <Link to="/privacy_policy"><CustomChevronRightIcon />プライバシーポリシー</Link>
            </Box>
          </Flex>
        </Flex>
      </Hide>
      <Text fontSize="xs" color="#A0AEC0" textAlign="center" mb="5px">Copyright © 2024 - Rate-Footballer</Text>
    </Box>
  )
}