import  { useState, useEffect } from 'react';

import { Link } from "react-router-dom";

import {
  Box,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Hide
} from '@chakra-ui/react';
import { HamburgerIcon, SmallCloseIcon } from '@chakra-ui/icons';

import { getUser, signOut } from '../lib/api/auth.js'

export const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = async() => {
      try {
        const res = await getUser();
          if (res && res.data.isLogin) {
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
          }
      } catch (e) {
        console.log(e);
      }
    };

    checkLoggedInStatus();
  }, []);

  return (
    <Box
      as="header"
      width="full"
      height="100px"
      bg="#89DA59"
      top={0}
      position="fixed"
      zIndex="1000" // ヘッダーが上に来るようにするため
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
                    <Link to="#"><MenuItem>採点一覧</MenuItem></Link>
                    <Link to="matches"><MenuItem>試合一覧</MenuItem></Link>
                    {loggedIn ? (
                      <>
                        <Link to="#"><MenuItem>ランキング</MenuItem></Link>
                        <Link to="#"><MenuItem>マイページ</MenuItem></Link>
                        <Link onClick={signOut}><MenuItem>ログアウト</MenuItem></Link>
                      </>
                    ) : (
                      <>
                        <Link to="signUp"><MenuItem>新規登録</MenuItem></Link>
                        <Link to="login"><MenuItem>ログインページ</MenuItem></Link>
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
              <Link to="#">採点一覧</Link>
              <Link to="matches">試合一覧</Link>
              {loggedIn ? (
                <>
                  <Link to="#">ランキング</Link>
                  <Link to="#">マイページ</Link>
                  <Link to="" onClick={signOut}>ログアウト</Link>
                </>
              ) : (
                <>
                  <Link to="signUp">新規登録</Link>
                  <Link to="login">ログイン</Link>
                </>
              )}
            </Flex>
          </Hide>
        </Box>
      </Flex>
    </Box>
  )
}