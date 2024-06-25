import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { 
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { getMatch } from "../lib/api/getMatch";
import { MatchPlayers } from "../components/MatchPlayers";
import { Loading } from "../components/Loading";
import formattedDate from "../lib/formattedDate";



export const Match = () => {
  const { matchId } = useParams();
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await getMatch(matchId);
        // console.log(JSON.stringify(res, null, 2));
        setMatchData(res.data);
        setLoading(false); // データの読み込みが完了
      } catch (error) {
        // console.error("Error fetching match:", error);
        setLoading(false); // エラーが発生してもローディングを終了する
      }
    };

    fetchMatch();
  }, [matchId]);

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  const matchday = `第${matchData.matchday}節`;


  return (
    <Box>
      <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="20px"> {/* タイトル */}
        プレミアリーグ {matchday}
      </Heading>

      <Flex mb="30px" width="80%" mx="auto"> {/* 日付場所 */}
        <Text mr="10px" fontSize='md'>{formattedDate(matchData.utcDate)}</Text>
        <Text fontSize='md'>{matchData.venue}</Text>
      </Flex>

      <Box mx="auto"> {/* スコアボード */}
        <Grid templateColumns="1fr 1fr 1fr">
          <GridItem>{/* ホームチーム情報 */}
            <Image src={matchData.homeTeam.crest} alt={matchData.homeTeam.name} height="170px" width="170px" mx="auto"/>
            <Text textAlign="center" fontSize='lg' w="100%">{matchData.homeTeam.name}</Text>
          </GridItem>

          <GridItem mt="50px">{/* スコア詳細 */}
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
                <Text as='b' fontSize='3xl' >{matchData.score.fullTime.away}</Text>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem> {/* アウェイチーム情報 */}
            <Image src={matchData.awayTeam.crest} alt={matchData.awayTeam.name} height="170px" width="170px" mx="auto"/>
            <Text textAlign="center" fontSize='lg' w="100%">{matchData.awayTeam.name}</Text>
          </GridItem>
          </Grid>
      </Box>

      <Box mt="30px"> {/* 選手ラインナップ */}
        <Flex justifyContent="space-between">
          <MatchPlayers lineup={matchData.homeTeam.lineup} team={"home"}/>
          <MatchPlayers lineup={matchData.awayTeam.lineup} team={"away"}/>
        </Flex>
      </Box>

    </Box>
  )
}
