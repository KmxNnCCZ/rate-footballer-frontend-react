import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";

import { StyledRank } from "../components/StyledRank";
import { getPlayerRanking } from "../lib/api/fetchRanking";
import { Loading } from "../components/Loading";
import positionShortName from "../lib/PositionShortNames";

export const Ranking = () => {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate

  useEffect(() => {
    const fetchRanking = async () => {
      const res = await getPlayerRanking();
      setRanking(res.data);
      setLoading(false);
      // console.log(JSON.stringify(res.data, null, 2));
    };
    fetchRanking();
  }, []);

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return <Loading />;
  }

  return (
    <Box p={5}>
      <Helmet>
        <title>ランキング - Rate Footballer</title>
      </Helmet>

      <Text textAlign="center" fontSize="2xl" color="gray.700" fontWeight="bold" mb="8">
        ランキング
      </Text>

      <Box>
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
          {ranking.map((player, i) => {
            return (
              <GridItem
                key={player.playerId}
                as={Flex}
                alignItems="center"
                p={4}
                borderWidth={1}
                borderRadius="md"
                boxShadow="md"
              >
                <Flex direction="column" w="full">
                  <StyledRank
                    rank={i + 1}
                  />
                  <Flex alignItems="center" w="90%" mx="auto" my="10px">
                    <Image src={player.crestUrl} alt={player.team} boxSize="50px" />
                    <Text fontSize="sm" ml="auto" mt="20px" isTruncated>{player.shortName}</Text>
                  </Flex>
                  <Text fontSize="sm" color="gray.500">
                    {positionShortName[player.position]}
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    背番号: {player.shirtNumber}
                  </Text>
                  <Text fontSize="md" fontWeight="medium" mt={2} isTruncated>
                    {player.name}
                  </Text>
                  <Text fontSize="lg" color="blue.600" fontWeight="bold" mt={1} textAlign="center">
                    {player.averageScore}
                  </Text>
                </Flex>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};