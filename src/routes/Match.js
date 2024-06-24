import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { getMatch } from "../lib/api/getMatch";

import { 
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Table,
  Tr,
  Td,
  Grid,
  GridItem,
} from "@chakra-ui/react";



export const Match = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await getMatch(matchId);
        console.log(JSON.stringify(res, null, 2));
        setMatchData(res.data);
        setLoading(false); // データの読み込みが完了
      } catch (error) {
        console.error("Error fetching match:", error);
        setLoading(false); // エラーが発生してもローディングを終了する
      }
    };

    fetchMatch();
  }, [matchId]);

  if (loading) {
    return <div>Loading...</div>; // データが読み込まれるまでローディングを表示
  }

  const matchday = `第${matchData.matchday}節`;
  const formattedDate = (inputDate) => {
    const date = new Date(inputDate);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }

  return (
    <Box>
      <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="20px"> {/* タイトル */}
        プレミアリーグ {matchday}
      </Heading>

      <Flex mb="30px" width="80%" mx="auto"> {/* 日付場所 */}
        <Text mr="10px" fontSize='md'>{formattedDate(matchData.utcDate)}</Text>
        <Text fontSize='md'>{matchData.venue}</Text>
      </Flex>

      <Box width="80%" mx="auto"> {/* スコアボード */}
        <Flex justifyContent="space-between" mx="50px" my="10px">
          <Box>{/* ホームチーム情報 */}
            <Image src={matchData.homeTeam.crest} alt={matchData.homeTeam.name} height="170px" width="170px"/>
            <Text textAlign="center" fontSize='lg'>{matchData.homeTeam.name}</Text>
          </Box>

          <Box mt="50px">{/* スコア詳細 */}
            <Grid templateColumns="1fr 3fr 1fr" placeContent="center" placeItems="center" gap="3">
              <GridItem mr="5px">
                <Text as='b' fontSize='3xl'>{matchData.score.fullTime.home}</Text>
              </GridItem>
              <GridItem>
                <Grid
                  templateColumns="1fr 2fr 1fr" 
                  templateRows='repeat(2, 1fr)' 
                  placeContent="center" 
                  placeItems="center"
                  gap="2"
                  color="gray.800"
                >
                  <GridItem>{matchData.score.halfTime.home}</GridItem>
                  <GridItem fontSize="xs">前半</GridItem>
                  <GridItem>{matchData.score.halfTime.away}</GridItem>
                  <GridItem>{matchData.score.fullTime.home - matchData.score.halfTime.home}</GridItem>
                  <GridItem fontSize="xs">後半</GridItem>
                  <GridItem>{matchData.score.fullTime.away - matchData.score.halfTime.away}</GridItem>
                </Grid>
              </GridItem>
              <GridItem ml="5px">
                <Text as='b' fontSize='3xl'>{matchData.score.fullTime.away}</Text>
              </GridItem>
            </Grid>
          </Box>

          <Box> {/* アウェイチーム情報 */}
            <Image src={matchData.awayTeam.crest} alt={matchData.awayTeam.name} height="170px" width="170px"/>
            <Text textAlign="center" fontSize='lg'>{matchData.awayTeam.name}</Text>
          </Box>
          </Flex>
      </Box>

      <Box> {/* 選手ラインナップ */}
        <Flex>
          <Table>
            <Tr>
              <Td></Td>
              <Td></Td>
              <Td></Td>
              <Td></Td>
            </Tr>
            <Tr></Tr>
            <Tr></Tr>
          </Table>
          <Table></Table>
        </Flex>
      </Box>

{/*  */}

    </Box>
  )
}

{/* <div>
      <h1>試合詳細</h1>
      <p>Match ID: {matchId}</p>
      <div>
        <p>utcDate: {matchInformation.utcDate}</p>
        <p>venue: {matchInformation.venue}</p>
        <p>matchday: {matchInformation.matchday}</p>
        <p>homeTeam: {matchInformation.homeTeam.name}</p>
        <p>homeTeamCrest: {matchInformation.homeTeam.crest}</p>
        {matchInformation.homeTeam.lineup.map((player) => (
          <div key={player.id}>
            <p>{player.name}</p>
            <p>Position: {player.position}</p>
            <p>Shirt Number: {player.shirtNumber}</p>
          </div>
        ))}
      </div>
    </div> */}