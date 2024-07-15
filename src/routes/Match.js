import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
} from "@chakra-ui/react";

import { getMatch } from "../lib/api/fetchMatch";
import { MatchPlayers } from "../components/MatchPlayers";
import { Loading } from "../components/Loading";
import sortPlayer from "../lib/sortPlayer";

export const Match = () => {
  const { matchApiId } = useParams();
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await getMatch(matchApiId);
        console.log(JSON.stringify(res, null, 2));
        setMatchData(res.data);
        setLoading(false); // データの読み込みが完了
      } catch (error) {
        // console.error("Error fetching match:", error);
        setLoading(false); // エラーが発生してもローディングを終了する
      }
    };

    fetchMatch();
  }, [matchApiId]);

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  const matchday = `第${matchData.matchday}節`;
  const season = `${matchData.season.startDate.slice(2,4)}-${matchData.season.endDate.slice(2,4)}シーズン`;

  return (
    <Box>
      <Helmet>
        <title>試合詳細 - Rate Footballer</title>
      </Helmet>

      <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="20px"> {/* タイトル */}
        試合詳細
      </Heading>

      <Card>
        <CardHeader bgColor="#EDF2F7">
          <Flex mx="auto" fontSize="sm" as="i" > {/* 日付場所 */}
            <Text mr="10px">プレミアリーグ {season} {matchday}</Text>
            <Text>{matchData.venue}</Text>
          </Flex>
        </CardHeader>

        <CardBody>
          <Box> {/* スコアボード */}
            <Grid templateColumns="1fr 1fr 1fr">
              <GridItem>{/* ホームチーム情報 */}
                <Image src={matchData.homeTeam.crest} alt={matchData.homeTeam.name} height="170px" width="170px" mx="auto"/>
                <Text textAlign="center" fontSize='lg' w="100%">{matchData.homeTeam.name}</Text>
              </GridItem>

              <GridItem mt="50px" >{/* スコア詳細 */}
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
        </CardBody>
      </Card>

      <Box mt="30px"> {/* 選手ラインナップ */}
        <Flex justifyContent="space-between">
          <MatchPlayers lineup={sortPlayer(matchData.homeTeam.lineup)} team={"home"} matchApiId={matchApiId}/>
          <MatchPlayers lineup={sortPlayer(matchData.awayTeam.lineup)} team={"away"} matchApiId={matchApiId}/>
        </Flex>
      </Box>

    </Box>
  )
}
