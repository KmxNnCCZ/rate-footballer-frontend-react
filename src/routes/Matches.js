import { useState } from "react";
import { getMatch } from "../lib/api/getMatches";
import { Heading, Button, Text } from "@chakra-ui/react";


export const Matches = () => {
  const [matches, setMatches] = useState(null);
  const [error, setError] = useState(null);

  const numbers = Array.from({ length: 38 }, (_, index) => index + 1);

  const getMatchIndex = async(matchday) => {
    try {
      const res = await getMatch(matchday);
      console.log("matches", JSON.stringify(res.data, null, 2));
      setMatches(JSON.stringify(res.data)); // レスポンスデータを状態に保存
      setError(null); // エラーをリセット
    } catch (e) {
      console.log(e);
      setError("試合一覧の取得に失敗しました。"); 
    }
  }

  return (
    <>
      <Heading>試合一覧</Heading>
      <Button onClick={() => getMatchIndex()}>全試合を取得</Button>
      {numbers.map((number) => (
        <Button key={number} onClick={() => getMatchIndex(number)}>第{number}節を取得</Button>
      ))}
      {error && <Text>{error}</Text>} {/* エラーメッセージを表示 */}
      {matches &&  (
        <Text>{matches}</Text>
      )}
    </>
  );
}