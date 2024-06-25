import * as React from 'react';
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

function App() {
  return (
   <ChakraProvider>
    <Flex
      direction="column"
      minHeight="100vh"
    >
      <Header />
      <Body
      >
        <Routes>
          <Route path="/" element={ <Top /> }></Route>
          <Route path="login" element={ <Login /> }></Route>
          <Route path="signUp" element={ <SignUp /> }></Route>
          <Route path="matches" element={ <Matches /> }></Route>
          <Route path="/matches/:matchId" element={ <Match /> }></Route>
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
