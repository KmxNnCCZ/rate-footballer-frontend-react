import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Button,
  Accordion,
} from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { PlayerRatingItem } from "../components/PlayerRatingItem";
import { useUser } from "../contexts/UserContext";
import { getTeam } from "../lib/api/fetchMatch";
import { postRate } from "../lib/api/fetchRate";
import sortPlayer from "../lib/sortPlayer";


export const Rate = () => {

  const { matchApiId } = useParams();
  const { isLoggedIn } = useUser();
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [playerRates, setPlayerRates] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const team = query.get('team');

  const matchday = `第${teamData.matchday}節`;

  useEffect(() => {
    const fetchMatch = async () => {
      if (!isLoggedIn) {
        navigate(`/matches/${matchApiId}`);
      }

      try {
        const res = await getTeam(matchApiId, team);
        setTeamData(res.data);
        const initialPlayerRates = res.data.lineup.map(player => ({
          playerApiId: player.id,
          score: 5.0,
          assessment: ""
        }));
        setPlayerRates(initialPlayerRates);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching match:", error);
        setLoading(false);
      }
    };

    fetchMatch();
  }, [matchApiId, team, isLoggedIn, navigate]);

  const incrementScore = (i) => {
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
  };

  const decrementScore = (i) => {
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
  };

  const changeAssessment = (index, value) => {
    setPlayerRates(prevPlayerRates => {
      const updatedRates = [...prevPlayerRates];
      updatedRates[index].assessment = value;
      return updatedRates;
    });
  };

  const postRateData = async () => {
    if(isLoggedIn) {
      await postRate(matchApiId, team, playerRates);
      navigate("/rates");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Flex width={{ base: "100%", md: "60%" }} flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="center" mb="30px" mx="auto">
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mr={{ base: "0px", md: "10px" }}>
          プレミアリーグ {matchday}
        </Heading>
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold">
          {teamData.name} 採点
        </Heading>
      </Flex>

      <Flex justifyContent="space-around" alignItems="center" mx="auto" px="30px" mb="80px">
        <Box>
          <Image src={teamData.crest} alt={teamData.name} height="100px" width="100px" mx="auto" />
        </Box>
        <Text as='b' fontSize='lg'>{teamData.name}</Text>
        <Text mx="20px" fontSize='sm' letterSpacing="10px">{teamData.score}</Text>
        <Text as='b' fontSize='sm'>{teamData.awayTeamName}</Text>
        <Box>
          <Image src={teamData.awayTeamCrest} alt={teamData.awayTeamName} height="50px" width="50px" mx="auto" />
        </Box>
      </Flex>

      <Box mb="20px" borderColor="#89DA59" borderBottomWidth="2px">
        <Text fontSize="sm" as="b">{teamData.name} スターティングメンバー</Text>
      </Box>

      <Box boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)" textAlign="center">
        <Accordion allowMultiple>
          {sortPlayer(teamData.lineup).map((player, index) => (
            <PlayerRatingItem
              key={player.id}
              player={player}
              playerRate={playerRates[index]}
              index={index}
              onIncrement={incrementScore}
              onDecrement={decrementScore}
              onChangeAssessment={changeAssessment}
              buttonWord={"追加"}
            />
          ))}
        </Accordion>

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
