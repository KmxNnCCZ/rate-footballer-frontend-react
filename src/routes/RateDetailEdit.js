import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Accordion,
  useDisclosure,
} from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { PlayerRatingItem } from "../components/PlayerRatingItem";
import { LoginRequiredMessage } from "../components/LoginRequiredMessage";
import { SubmitButton } from "../components/SubmitButton";
import { useUser } from "../contexts/UserContext";
import { editRate } from "../lib/api/fetchRate";
import { putRate } from "../lib/api/fetchRate";

export const RateDetailEdit = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { currentUser, isLoggedIn, userLoading } = useUser();
  const [rate, setRate] = useState();
  const [pageLoading, setPageLoading] = useState(true);

  const { rateId } = useParams();
  const navigate = useNavigate();

  const [playerRates, setPlayerRates] = useState([]);

  useEffect(() => {
    if(!userLoading) {
      if (!currentUser) {
        navigate(`/rates/${rateId}`);
      } else if (!pageLoading && rate && currentUser.id !== rate.userId) {
        navigate(`/rates/${rateId}`);
      }
    }
  }, [userLoading, pageLoading, isLoggedIn, currentUser, rate, navigate, rateId]);

  useEffect(() => {
    const fetchEditRateData = async () => {
      const res = await editRate(rateId);
      setRate(res.data);
      const initialPlayerRates = res.data.scores.map(player => ({
        playerId: player.playerId,
        score: player.score,
        assessment: player.assessment
      }));
      setPlayerRates(initialPlayerRates);
      setPageLoading(false);
    };
    fetchEditRateData()
  }, [rateId]);

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

  const putRateData = async () => {
    await putRate(rate.matchApiId, rate.teamId, playerRates, rateId);
    navigate(`/rates/${rateId}`);
  };

  if (userLoading || pageLoading) {
    return <Loading />;
  }

  const matchDate = `PL ${rate.season} 第${rate.matchday}節`;

  return (
    <Box>
      <Helmet>
        <title>採点編集 - Rate Footballer</title>
      </Helmet>

      <Flex width={{ base: "100%", md: "60%" }} flexDirection={{ base: "column", md: "row" }} alignItems="center" justifyContent="center" mb="30px" mx="auto">
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mr={{ base: "0px", md: "10px" }}>
          {matchDate}
        </Heading>
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold">
          {rate.teamName} 編集ページ
        </Heading>
      </Flex>

      <Flex justifyContent="space-around" alignItems="center" mx="auto" px="30px" mb="80px">
        <Box>
          <Image src={rate.teamCrestUrl} alt={rate.teamName} height="100px" width="100px" mx="auto" />
        </Box>
        <Text as='b' fontSize='lg'>{rate.teamName}</Text>
        <Text mx="20px" fontSize='sm' letterSpacing="10px">{rate.matchScore}</Text>
        <Text as='b' fontSize='sm'>{rate.reverseTeamName}</Text>
        <Box>
          <Image src={rate.reverseTeamCrestUrl} alt={rate.reverseTeamName} height="50px" width="50px" mx="auto" />
        </Box>
      </Flex>

      <Box mb="20px" borderColor="#89DA59" borderBottomWidth="2px">
        <Text fontSize="sm" as="b">{rate.name} スターティングメンバー</Text>
      </Box>

      <Box boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)" textAlign="center">
        <Accordion allowMultiple>
          {rate.scores.map((player, index) => (
            <PlayerRatingItem
              key={player.playerId}
              player={player}
              playerRate={playerRates[index]}
              index={index}
              onIncrement={incrementScore}
              onDecrement={decrementScore}
              onChangeAssessment={changeAssessment}
              buttonWord={"編集"}
            />
          ))}
        </Accordion>

        <SubmitButton
          width={"50%"}
          height={"70px"}
          borderRadius={"50px"}
          onClick={isLoggedIn ? putRateData : onOpen}
          content={"更新する"}
        />
        <LoginRequiredMessage isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}></LoginRequiredMessage>
      </Box>
    </Box>
  );
};
