import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';

import {
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  Flex,
  Select
} from "@chakra-ui/react";

import { StyledRank } from "../components/StyledRank";
import { getPlayerRanking } from "../lib/api/fetchRanking";
import { Loading } from "../components/Loading";
import { positionShortName, positionMap } from "../lib/PositionShortNames";

export const Ranking = () => {
  const [originalRanking, setOriginalRanking] = useState([]); // 元のランキングデータ
  const [ranking, setRanking] = useState([]); //絞り込み後のランキングデータ
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate
  // 検索用
  const [teams, setTeams] = useState([]); // チーム一覧を管理するstate
  const [selectedPosition, setSelectedPosition] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const positions = ["GK", "DF", "MF", "FW"];
  
  useEffect(() => {
    const fetchRanking = async () => {
      const res = await getPlayerRanking();
      setOriginalRanking(res.data);
      const teamsData = [];
      res.data.forEach(player => {
        if (!teamsData.includes(player.teamShortName)) {
          teamsData.push(player.teamShortName);
        }
      });
      setTeams(teamsData);
      setLoading(false);
    };
    fetchRanking();
  }, []);
  
  useEffect(() => {
    let filteredRanking = originalRanking
    // ポジションでフィルタリング
    if(selectedPosition) {
      filteredRanking = filteredRanking.filter((player) => {
        return positionMap[player.position] === selectedPosition;
      });
    }
    // チームでフィルタリング
    if(selectedTeam) {
      filteredRanking = filteredRanking.filter((player) => {
        return player.teamShortName === selectedTeam
      })
    }

    setRanking(filteredRanking);
  }, [selectedPosition, selectedTeam, originalRanking]);

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return <Loading />;
  }

  const  onPositionSelectChange = (position) => {
    setSelectedPosition(position);
  }

  const onTeamSelectChange = (team) => {
    setSelectedTeam(team);
  }

  return (
    <Box p={5}>
      <Helmet>
        <title>ランキング - Rate Footballer</title>
      </Helmet>

      <Text textAlign="center" fontSize="2xl" color="gray.700" fontWeight="bold" mb="8">
        ランキング
      </Text>

      <Flex mb="20px" justifyContent="right">
        {/* ポジション検索 */}
        <Select  width="300px" mr="10px" onChange={(e) => onPositionSelectChange(e.target.value)}>
          <option value="">ポジションを選択</option>
          {positions.map((position) => (
            <option key={position} value={position}>
              {position}
            </option>
          ))}
        </Select>
        {/* チーム検索 */}
        <Select  width="300px" mr="10px" onChange={(e) => onTeamSelectChange(e.target.value)}>
          <option value="">チームを選択</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </Select>
      </Flex>

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
                    <Image src={player.teamCrestUrl} alt={player.teamName} boxSize="50px" />
                    <Text fontSize="sm" ml="auto" mt="20px" isTruncated>{player.teamShortName}</Text>
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