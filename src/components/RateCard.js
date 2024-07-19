import { 
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
  Grid,
  GridItem,
  Box,
  Image,
  Tooltip
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import { positionShortName } from "../lib/PositionShortNames";
import timeAgo from "../lib/timeAgo";


export const RateCard = ({ scores, matchday, teamShortName, teamCrestUrl, season, isOwner, userName, updatedAt }) => {
  const matchDate = `PL ${season} 第${matchday}節`;
  return (
  <Card 
      w="500px"
      h="auto"
      transition="transform 0.2s ease-out"
      _hover={{ transform: "scale(1.02)" }}
      boxShadow="xl"
      borderRadius="md"
    >
      <CardHeader mb="-70px">
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" color="gray.600">{userName}</Text>
          <Text fontSize="xs" color="gray.500" ml="4">{timeAgo(updatedAt)}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center" mb="4">
          <Flex alignItems="center">
            <Text mr="20px" fontSize="sm" fontWeight="bold">{matchDate}</Text>
            <Image src={teamCrestUrl} alt={teamShortName} w="40px" h="40px" mr="5px" />
            <Text fontSize="md" fontWeight="bold">{teamShortName}</Text>
          </Flex>
          {isOwner && 
            <Tooltip label="編集" bg='gray.100' color='black' opacity="0.5">
              <EditIcon boxSize={3} cursor="pointer" mr="15px"/>
            </Tooltip>
          }
        </Flex>
      </CardHeader>

      <CardBody>
        <Box>
          <Grid templateColumns="1fr 1fr 5fr 1.5fr" alignItems="center" mb="10px" textAlign="center" fontSize="xs">
            <GridItem w="90%" mx="auto" bgColor="gray.200" p="1">Pos</GridItem>
            <GridItem w="95%" mx="auto" bgColor="gray.200" p="1" whiteSpace="nowrap">背番号</GridItem>
            <GridItem w="90%" mx="auto" bgColor="gray.200" p="1">選手名</GridItem>
            <GridItem w="90%" mx="auto" bgColor="gray.200" p="1">スコア</GridItem>
          </Grid>
          {scores.map((score) => (
            <Grid key={score.playerId} templateColumns="1fr 1fr 5fr 1.5fr" alignItems="center" mb="3px" textAlign="center">
              <GridItem>{positionShortName[score.position]}</GridItem>
              <GridItem>{score.shirtNumber}</GridItem>
              <GridItem whiteSpace="nowrap" textAlign="left" ml="15px">{score.name}</GridItem>
              <GridItem>{(score.score).toFixed(1)}</GridItem>
            </Grid>
          ))}
        </Box>
      </CardBody>
    </Card>
  );
}