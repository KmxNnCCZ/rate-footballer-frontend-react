import { 
  Card,
  CardHeader,
  CardBody,
  Flex,
  Text,
  Grid,
  GridItem,
  Box,
  Image
} from "@chakra-ui/react";

import positionShortName from "../lib/PositionShortNames";


export const RateCard = ({ scores, matchday, teamShortName, teamCrestUrl, season, isOwner }) => {
  const matchDate = `PL ${season} 第${matchday}節`;
  return(
    <Card w="500px">
      <CardHeader>
        <Flex justifyContent="space-between" fontSize="sm" as="b" alignItems="center">
          <Flex alignItems="center">
            <Text mr="20px">{matchDate}</Text>
            <Image src={teamCrestUrl} alt={teamShortName} w="40px" h="40px" mr="5px"></Image>
            <Text>{teamShortName}</Text>
          </Flex>
          {isOwner && <Text cursor="pointer" color="#4A5568" fontSize="xs">編集</Text>}
        </Flex>
      </CardHeader>

      <CardBody>
        <Box>
          <Grid templateColumns="1fr 1fr 5fr 1.5fr" alignItems="center" mb="10px" textAlign="center" fontSize="xs">
            <GridItem w="90%" mx="auto" bgColor="#EDF2F7">Pos</GridItem>
            <GridItem w="95%" mx="auto" bgColor="#EDF2F7" whiteSpace="nowrap">背番号</GridItem>
            <GridItem w="90%" mx="auto" bgColor="#EDF2F7">選手名</GridItem>
            <GridItem w="90%" mx="auto" bgColor="#EDF2F7">スコア</GridItem>
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
  )
}