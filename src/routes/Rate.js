import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Textarea,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import { getTeam } from "../lib/api/getMatch";
import { Loading } from "../components/Loading";
import positionShortName from "../lib/PositionShortNames";
import { getUser } from "../lib/api/auth";
import { postRate } from "../lib/api/postRate";

export const Rate = () => {
  const { matchApiId } = useParams();
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);

  const [playerRates, setPlayerRates] = useState([...Array(11)].map(() => ({
    playerApiId: undefined,
    score: 5.0,
    assessment: undefined
  })));

  // パラメータを取得
  const query = new URLSearchParams(useLocation().search);
  const team = query.get('team');

  const matchday = `第${teamData.matchday}節`;

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await getTeam(matchApiId, team);
        setTeamData(res.data);
        res.data.lineup.forEach((player, i) => {
          setPlayerRates(prevPlayerRates => {
            const newPlayerRates = [...prevPlayerRates];
            newPlayerRates[i].playerApiId = player.id
            return newPlayerRates;
          })
        })
        setLoading(false); // データの読み込みが完了
      } catch (error) {
        console.error("Error fetching match:", error);
        setLoading(false); // エラーが発生してもローディングを終了する
      }
    };
    fetchMatch();
  }, [matchApiId, team]);

  const increment = (i) => {
    setPlayerRates((prevPlayerRates) => {
      return prevPlayerRates.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            score: Math.min(10, Number(item.score) + 0.5)
          };
        }
        return item;
      });
    });
  }

  const decrement = (i) => {
    setPlayerRates((prevPlayerRates) => {
      return prevPlayerRates.map((item, index) => {
        if (index === i) {
          return {
            ...item,
            score: Math.max(0, Number(item.score) - 0.5)
          };
        }
        return item;
      });
    });
  }

  const formatToOneDecimal = (value) => {
    return (value).toFixed(1);
  }

  const changeAssessment = (i, value) => {
    setPlayerRates((prevPlayerRates) => {
      const newPlayerRates = [...prevPlayerRates];
      newPlayerRates[i].assessment = value;
      return newPlayerRates;
    })
  }

  const postRateData = async () => {
    try {
      const res = await getUser();
      if (res && res.data.isLogin) {
        await postRate(matchApiId, team, playerRates);
      } else {
        // ログインを促す処理
        console.log("未ログイン");
      }
    } catch (error) {
      console.error("Error posting rate:", error);
    }
  }

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  return (
    <Box>
      <Flex
        width={{ base: "100%", md: "60%" }} // ベース（小さい画面）では100%、ミディアム（大きい画面）では60%
        flexDirection={{ base: "column", md: "row" }} // 小さい画面では縦並び、大きい画面では横並び
        alignItems="center"
        justifyContent="center"
        mb="30px"
        mx="auto"
      >
        {/* タイトル */}
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold"  mr={{ base: "0px", md: "10px" }}>
          プレミアリーグ {matchday}
        </Heading>
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold">
          {teamData.name}採点投稿
        </Heading>
      </Flex>

      <Flex justifyContent="space-around" alignItems="center" mx="auto" px="30px" mb="80px">
        {/* スコアボード */}
        <Box>
          <Image src={teamData.crest} alt={teamData.name} height="100px" width="100px" mx="auto"/>
        </Box>
        <Text as='b' fontSize='lg'>{teamData.name}</Text>
        <Text mx="20px" fontSize='sm' letterSpacing="10px">{teamData.score}</Text>
        <Text as='b'fontSize='sm'>{teamData.awayTeamName}</Text>
        <Box>
          <Image src={teamData.awayTeamCrest} alt={teamData.awayTeamName} height="50px" width="50px" mx="auto"/>
        </Box>
      </Flex>

      <Box mb="20px" borderColor="#89DA59" borderBottomWidth="2px">
        <Text fontSize="sm" as="b">{teamData.name} スターティングメンバー</Text>
      </Box>

      <Box boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)" textAlign="center">
        {/* 投稿場所 */}
        <Box>
          <Accordion allowMultiple>
            {teamData.lineup.map((player, i) => (
              <AccordionItem key={player.id}>
                <Grid templateColumns="1fr 1fr 5fr 3fr 3fr" alignItems="center" my="10px">
                  <GridItem>{positionShortName[player.position]}</GridItem>
                  <GridItem>{player.shirtNumber}</GridItem>
                  <GridItem>{player.name}</GridItem>
                  <GridItem mx="auto">
                    {/* スコア操作 */}
                    <Flex alignItems="center">
                      <Button colorScheme='blue' borderWidth="2px" variant='outline' onClick={() => decrement(i)}>-</Button>
                      <Text
                        as='b'
                        mx="20px"
                        textAlign="center"
                      >
                        {formatToOneDecimal(playerRates[i].score)}
                      </Text>
                      <Button colorScheme='red' variant='outline' borderWidth="2px" onClick={() => increment(i)}>+</Button>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <AccordionButton>
                      <Box as='b'>
                        評価を追加
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </GridItem>
                </Grid>
                <AccordionPanel>
                  <Textarea
                    borderWidth="2.5px"
                    _focus={{
                      outline: "none"
                    }}
                    value={playerRates[i].assessment}
                    onChange={(e) => changeAssessment(i, e.target.value)}
                  />
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        <Button 
          as='button'
          my="20px"
          w="50%"
          h="70px"
          color="#89DA59"
          bg="white"
          borderColor='#89DA59'
          borderRadius="50px"
          borderWidth="4px"
          _hover={{ bg: '#89DA59', color: "white" }}
          onClick={postRateData}
        >
          投稿する
        </Button>
      </Box>
    </Box>
  );
};