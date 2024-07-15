import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Hide,
  Button,
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowRightToBracket, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { useUser } from "../contexts/UserContext.js";
import { useFlash } from "../contexts/FlashMessage.js";
import { signOut } from '../lib/api/auth.js'

const HeaderItem = ({children, itemPath, }) => {
  const currentPath = useLocation().pathname;
  return (
    <Link to={itemPath}>
      <Box
        _hover={{
          visibility: "visible",
          bottom: "12px",
          opacity: "1",
        }}
      >
        {currentPath === itemPath ? 
          <Text 
            as="b"
            color="#89DA59"
          >
            {children}
            </Text>
          :
          <Text
          as="b"
          position="relative"
          _after={{
            content: '""',
            position: "absolute",
            left: "0",
            width: "100%",
            height: "3px",
            background: "#89DA59", //線の色
            bottom: "0px", // 線をテキストの下に配置
            opacity: "0",
            visibility: "hidden",
            transition: "all 0.3s ease-in-out", // アニメーション
          }}
          _hover={{
            _after: {
              visibility: "visible",
              bottom: "-5px", // ホバー時の線の位置を調整
              opacity: "1",
            },
          }}
        >
            {children}
          </Text>
        }
      </Box>
    </Link>
  )
};

const CustomButton = ({children, itemPath}) => {
  const currentPath = useLocation().pathname;
  return (
    <Link to={itemPath}>
      {currentPath === itemPath ? 
        <Button
        as='button'
        my="20px"
        h="60px"
        color="white"
        bg="#89DA59"
        borderColor='#89DA59'
        borderRadius="50px"
        borderWidth="4px"
        _hover={{ bg: '#89DA59', color: "white" }}
        >
          {children}
        </Button>
      :
        <Button 
        as='button'
        my="20px"
        h="60px"
        color="#89DA59"
        bg="white"
        borderColor='#89DA59'
        borderRadius="50px"
        borderWidth="4px"
        _hover={{ bg: '#89DA59', color: "white" }}
      >
        {children}
      </Button>
      }
    </Link>
  )
}


export const Header = () => {
  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useUser();
  const { setIsExistFlash, setFlashMessage} = useFlash();
  const navigate = useNavigate();

  const fetchSignOut = async () => {
    const res = await signOut(setIsLoggedIn, setCurrentUser);
    console.log(res.status);
    if(res.status === 200) {
      setIsExistFlash(true);
      setFlashMessage({type: "success", message: "ログアウトしました"});
      navigate("/")
    }

  };

  return (
    <Box
      as="header"
      width="full"
      height="100px"
      bg="#FFF"
      top={0}
      position="fixed"
      zIndex="1000" // ヘッダーが上に来るようにするため
      boxShadow="0 0 10px rgba(0, 0, 0, .26);"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="full"
        height="100px"
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
        <Box mr="25px">
          <Hide above="md">
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton height="10%">
                  {isOpen ? <SmallCloseIcon /> : <HamburgerIcon />}
                  </MenuButton>
                  <MenuList>
                    <Link to="rates"><MenuItem>採点一覧</MenuItem></Link>
                    <Link to="matches"><MenuItem>試合一覧</MenuItem></Link>
                    {isLoggedIn ? (
                      <>
                        <Link to="#"><MenuItem>ランキング</MenuItem></Link>
                        <Link to="/mypage"><MenuItem>マイページ</MenuItem></Link>
                        <Link onClick={fetchSignOut}>
                          <MenuItem>ログアウト</MenuItem>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="signUp">
                          <MenuItem>新規登録</MenuItem>
                        </Link>
                        <Link to="login">
                          <MenuItem>ログイン</MenuItem>
                        </Link>
                      </>
                    )}
                  </MenuList>
                </>
              )}
            </Menu>
          </Hide>
          <Hide below="md">
            <Flex 
              justifyContent="flex-end" 
              alignItems="center" 
              gap="20px"
            >
              <HeaderItem itemPath="/rates">
                採点一覧
              </HeaderItem>
              <HeaderItem itemPath="/matches">
                試合一覧
              </HeaderItem>
              {isLoggedIn ? (
                <>
                  <HeaderItem itemPath="#">ランキング</HeaderItem>
                  <HeaderItem itemPath="/mypage">マイページ</HeaderItem>
                  <Box onClick={fetchSignOut}>
                    <CustomButton itemPath="">
                      <Box mr="10px">
                        <FontAwesomeIcon icon={faArrowRightFromBracket}/>
                      </Box>
                      ログアウト
                    </CustomButton>
                  </Box>
                </>
              ) : (
                <>
                <CustomButton itemPath={"/signup"}>
                  <Box mr="10px">
                    <FontAwesomeIcon icon={faUserPlus}/>
                  </Box>
                  新規登録
                </CustomButton>
                <CustomButton itemPath={"/login"}>
                  <Box mr="10px">
                    <FontAwesomeIcon icon={faArrowRightToBracket}/>
                  </Box>
                  ログイン
                </CustomButton>
                </>
              )}
            </Flex>
          </Hide>
        </Box>
      </Flex>
    </Box>
  )
}



