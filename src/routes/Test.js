import { useState } from 'react';
import { Helmet } from "react-helmet-async";

import { Heading, Input, Button, Box } from "@chakra-ui/react"

import { getTestData } from "../lib/api/test.js";
import { sendEmail } from "../lib/api/sendEmail.js";

export const Test = () => {
  const [path, setPath] = useState('')

  const getData = async (path) => {
    try {
      const res = await getTestData(path);
      console.log("RESPONSE_DATA", JSON.stringify(res.data, null, 2));
    } catch (e) {
      console.log(e);
    }
  }

  const fetchSendEmail = async() => {
    try {
      const res = await sendEmail();
      console.log(res)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <Heading>テストページ(コンソールで取得したデータを見る)</Heading>
      <Helmet>
        <title>テスト - Rate Footballer</title>
      </Helmet>
      <Input
          placeholder="パスを入力" 
          mb="16px"
          w="100%"
          maxW="600px"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      <Button onClick={() => getData(path)}>データを取得</Button>
      <Box mt="50px">
        <Button onClick={fetchSendEmail}>メールを送信する</Button>
      </Box>
    </>
  )
}