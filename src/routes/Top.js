import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  Box,
  Heading,
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  Image
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFutbol, faStar, faComments, faRankingStar } from '@fortawesome/free-solid-svg-icons';

const IntroduceCard = ({ icon, heading, explanation, bgColor, gif }) => {
  return (
    <GridItem>
      <Card
        h="700px"
        boxShadow="lg"
        transition="transform 0.3s, box-shadow 0.3s"
        _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
      >
        <CardHeader h="100px">
          <Box
            height="80px"
            width="80px"
            borderRadius="50px"
            bgColor={bgColor}
            display="flex"
            justifyContent="center"
            alignItems="center"
            boxShadow="md"
          >
            <FontAwesomeIcon icon={icon} size="2x" color="white"/>
          </Box>
        </CardHeader>
        <CardBody>
          <Box h="300px">
            <Text fontSize="2xl" fontFamily="Gill Sans" mb="10px">
              {heading}
            </Text>
            <Text>{explanation}</Text>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
          >
            <Image src={`/images/${gif}.gif`} alt="gif" h="200px" w="360px"/>
          </Box>
        </CardBody>
      </Card>
    </GridItem>
  );
};

export const Top = () => {
  return (
    <Box as="main">
      <Helmet>
        <title>Rate Footballer</title>
      </Helmet>

      <Box mb="50px">
        <Heading size="2xl" mb="50px" textAlign="center">
          あなたの評価がサッカーをもっと楽しくする
        </Heading>
        <Text fontSize="xl" color="gray.500" w="80%" mx="auto">
          プレミアリーグの選手を採点し、ファン同士で議論しましょう
          試合ごとにサッカー選手を採点し、他のファンと意見を共有できるプラットフォームです。
        </Text>
      </Box>

      <Box>
        <Grid
          templateColumns="repeat(auto-fit, minmax(350px, 1fr));" 
          gap={6}
          justifyItems="center"
        >
          <Link to="/matches">
            <IntroduceCard
              icon={faFutbol}
              heading={"試合情報をチェック"}
              explanation={"最新の試合情報をすぐに確認し、プレミアリーグの試合を見逃さないようにしましょう！"}
              bgColor="teal.400"
              gif="chackMatchInformation"
            />
          </Link>
          <Link to="/rates">
            <IntroduceCard
              icon={faStar}
              heading={"自分だけの選手採点"}
              explanation={"試合ごとに出場した選手を採点し、あなたの視点で評価を投稿しましょう。"}
              bgColor="yellow.400"
              gif="ratePlayer"
            />
          </Link>
          <Link to="/rates">
            <IntroduceCard
              icon={faComments}
              heading={"ファン同士の熱い議論"}
              explanation={"他のファンの評価にコメントして、試合についての意見を交わし、共感や新しい視点を見つけましょう。"}
              bgColor="blue.400"
              gif="userComments"
            />
          </Link>
          <Link to="/ranking">
            <IntroduceCard
              icon={faRankingStar}
              heading={"人気選手のランキングをチェック"}
              explanation={"各選手の平均採点を元にしたランキングを見て、今シーズンのトッププレイヤーを確認しましょう。"}
              bgColor="purple.400"
              gif=""
            />
          </Link>
        </Grid>
      </Box>
    </Box>
  )
}