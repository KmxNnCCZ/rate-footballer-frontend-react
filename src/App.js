import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react'
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { Header } from './components/Header.js'
import { Body } from './components/Body.js'
import { Footer } from './components/Footer.js'
import { FlashMessage } from './components/FlashMessage.js';

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
import { TermOfUse } from './routes/TermsOfUse.js';
import { PrivacyPolicy } from './routes/PrivacyPolicy.js';
import { MyPage } from './routes/MyPage.js';
import { UpdatePassword } from './routes/UpdatePassword.js';
import { UpdateUserInformation } from './routes/UpdateUserInformation.js';
import { Ranking } from './routes/Ranking.js';

import { UserProvider } from './contexts/UserContext.js';
import { FlashProvider } from './contexts/FlashMessage.js';

function App() {
  return (
    <HelmetProvider>
    <ChakraProvider>
      <UserProvider>
      <FlashProvider>
        <Flex
          direction="column"
          minHeight="100vh"
        >
          <Header />
          <FlashMessage />
          <Body>
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
              <Route path="/terms_of_use" element={ <TermOfUse /> }></Route>
              <Route path="/privacy_policy" element={ <PrivacyPolicy /> }></Route>
              <Route path="/mypage" element={ <MyPage/> }></Route>
              <Route path="/user/edit/:token" element={ <UpdatePassword/> }></Route>
              <Route path="/user/setting" element={ <UpdateUserInformation/> }></Route>
              <Route path="/ranking" element={ <Ranking /> }></Route>
              <Route path="test" element={ <Test /> }></Route>
              <Route path="*" element={ <Notfound /> } />
            </Routes>
          </Body>
          <Footer />
        </Flex>
      </FlashProvider>
      </UserProvider>
    </ChakraProvider>
    </HelmetProvider>
  );
}

export default App;