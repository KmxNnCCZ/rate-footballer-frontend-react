import { Heading, Input, Button } from "@chakra-ui/react"
import { useState } from 'react';

import { getTestData } from "../lib/api/test.js";

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

  return (
    <>
      <Heading>テストページ(コンソールで取得したデータを見る)</Heading>
      <Input
          placeholder="パスを入力" 
          mb="16px"
          w="100%"
          maxW="600px"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
      <Button onClick={() => getData(path)}>データを取得</Button>
    </>
  )
}