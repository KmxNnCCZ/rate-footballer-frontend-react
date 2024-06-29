import React from 'react';
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
import { RateDetail } from './routes/RateDetail.js';
import { RateDetailEdit } from './routes/RateDetailEdit.js';

import { UserProvider } from './contexts/UserContext.js';

function App() {
  return (
   <ChakraProvider>
    <UserProvider>
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
          <Route path="/matches/:matchApiId" element={ <Match /> }></Route>
          <Route path="/matches/:matchApiId/rate" element={ <Rate /> }></Route>
          <Route path="rates" element={ <Rates /> }></Route>
          <Route path="rates/:rateId" element={ <RateDetail/> }></Route>
          <Route path="rates/:rateId/edit" element={ <RateDetailEdit /> }></Route>
          <Route path="test" element={ <Test /> }></Route>
          <Route path="*" element={ <Notfound /> } />
        </Routes>
      </Body>
      <Footer />
    </Flex>
    </UserProvider>
   </ChakraProvider>
  );
}

export default App;