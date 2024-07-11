import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { 
  Text,
  Box,
  Select,
  Grid,
  GridItem,
  Flex
} from "@chakra-ui/react";

import { getMatchList } from "../lib/api/fetchMatch";
import { MatchCard } from "../components/MatchCard";
import { Loading } from "../components/Loading";


export const Matches = () => {
  const seasons = ["23-24", "22-23", "21-22"]
  const [season, setSeason] = useState("23-24");
  const [res, setRes] = useState([]);
  const [selectedMatchDay, setSelectedMatchDay] = useState(38);
  const [loading, setLoading] = useState(true); // 読み込み状態を管理するstate

  const matchdays = [...Array(38)].map((_, i) => i+1)

  const fetchMatchesData = async (season, matchday) => {
    const params = {season, matchday};
    const res = await getMatchList(params)
    setLoading(false)
    setRes(res.data);
  }


  useEffect(() => {
   if (season !== null && selectedMatchDay !== null) {
    setLoading(true);
    fetchMatchesData(season, selectedMatchDay);
   }
  }, [season, selectedMatchDay]);


  const  onSeasonSelectChange = (season) => {
    setSeason(season);
  }

  const  onMatchdaySelectChange = (matchday) => {
    setSelectedMatchDay(matchday);
  }

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  return (
    <Box>
      <Helmet>
        <title>試合一覧 - Rate Footballer</title>
      </Helmet>

      <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        試合一覧
      </Text>
      
      <Flex mb="20px" justifyContent="right">
        <Select  width="300px" mr="10px" onChange={(e) => onSeasonSelectChange(e.target.value)}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </Select>
        <Select 
          width="300px"
          mb="10px"
          value={selectedMatchDay}
          onChange={(e) => onMatchdaySelectChange(e.target.value)}
        >
          {matchdays.map((matchday) => (
            <option key={matchday} value={matchday} >
            {`第${matchday}節`}
          </option>
          ))}
        </Select>
      </Flex>
      <Grid 
        templateColumns="repeat(auto-fit, minmax(350px, 1fr));" 
        gap={6}
        justifyItems="center"
        >
        {res.map((data) => (
          <GridItem key={data.match.matchApiId}>
            <Link to={`${data.match.matchApiId}`}>
              <MatchCard matchData={data.match} homeTeam={data.homeTeamData} awayTeam={data.awayTeamData}/>
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}