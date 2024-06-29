import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom';

import { Header } from './components/Header.js'
import { Body } from './components/Body.js'
import { Footer } from './components/Footer.js'

import { Top } from './routes/Top';
import { Login } from './routes/Login';
import { SignUp } from './routes/SignUp';
import { Notfound } from './routes/Notfound';
import { Matches } from './routes/Matches.js';
import { Match } from './routes/Match.js';
import { Test } from './routes/Test.js';
import { Rate } from './routes/Rate.js';
import { Rates } from './routes/Rates.js';

import { getUser } from './lib/api/auth.js';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const checkLoggedInStatus = async() => {
  //     try {
  //       const user = await getUser();
  //       console.log(user.isLogin)
  //       setIsLoggedIn(user.isLogin);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };

  //   checkLoggedInStatus();
  // }, []);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const user = await getUser();
        setIsLoggedIn(user.isLogin);
      } catch (e) {
        console.log(e);
      }
    }
    checkLoggedInStatus();
  }, [isLoggedIn]);

  return (
   <ChakraProvider>
    <Flex
      direction="column"
      minHeight="100vh"
    >
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Body
      >
        <Routes>
          <Route path="/" element={ <Top /> }></Route>
          <Route path="login" element={ <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> }></Route>
          <Route path="signUp" element={ <SignUp /> }></Route>
          <Route path="matches" element={ <Matches /> }></Route>
          <Route path="/matches/:matchApiId" element={ <Match /> }></Route>
          <Route path="/matches/:matchApiId/rate" element={ <Rate isLoggedIn={isLoggedIn}/> }></Route>
          <Route path="rates" element={ <Rates isLoggedIn={isLoggedIn}/> }></Route>
          <Route path="test" element={ <Test /> }></Route>
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </Body>
      <Footer />
    </Flex>
   </ChakraProvider>
  );
}

export default App;