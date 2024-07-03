import { 
  Text,
  Image,
  Card,
  CardHeader,
  CardBody,
  Flex,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

import formattedDate from "../lib/formattedDate";

export const MatchCard = ({ matchData, homeTeam, awayTeam }) => {
  const matchday = `第${matchData.matchday}節`;
  const result = `${matchData.homeTeamScore} - ${matchData.awayTeamScore}`

  return(
    <Card w="350px" h="215px">
      <CardHeader my="-20px" >
        <Flex justify="space-between">
          <Flex direction="column" align="flex-start">
            <Text fontSize='xs' opacity="0.9">{formattedDate(matchData.utcDate)}</Text> {/* 日付 */}
            <Text
              fontSize='xs'
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              maxW="200px"
              opacity="0.9"
            >{homeTeam.venue}</Text> {/* 開催場所 */}
          </Flex>

          <Heading
            as='h6' size='xs'
          >
            {matchday}
          </Heading>
        </Flex>
      </CardHeader>

      <CardBody my="-20px">
        <Grid templateColumns="2fr 1fr 2fr" gap="3">
          <GridItem > {/* ホームチーム */}
            <Image src={homeTeam.crestUrl} alt={homeTeam.name} width="70px" height="70px" mx="auto" />
            <Text
              fontSize='sm'
              mt="10px"
              mx="auto"
              textAlign="center"
              whiteSpace="nowrap"
            >
              {homeTeam.tla}
            </Text>
          </GridItem >
          <GridItem  whiteSpace="nowrap"> {/* 結果 */}
            <Text fontSize='lg' position="relative" top="20px">{result}</Text>
          </GridItem>
          <GridItem> {/* アウェイチーム */}
            <Image  src={awayTeam.crestUrl} alt={awayTeam.name} width="70px" height="70px" mx="auto" />
            <Text
              fontSize='sm'
              mt="10px"
              mx="auto"
              textAlign="center"
              whiteSpace="nowrap"
            >
              {awayTeam.tla}
            </Text>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  )
}