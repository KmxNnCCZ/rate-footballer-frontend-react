import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMatchList } from "../lib/api/getMatch";

import { 
  Text,
  Box,
  Select,
  Grid,
  GridItem,
} from "@chakra-ui/react";

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
    console.log(res.data);
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

  return (
    <Box>
        <Text textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
          試合一覧
        </Text>
        <Select  width="300px" mb="10px" onChange={(e) => onSeasonSelectChange(e.target.value)}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </Select>
        <Select 
          // placeholder={`第${selectedMatchDay}節`}
          width="300px"
          mb="10px"
          onChange={(e) => onMatchdaySelectChange(e.target.value)}
        >
          {matchdays.map((matchday) => (
            (matchday === selectedMatchDay ?
              <option key={matchday} value={matchday} selected>
              {`第${matchday}節`}
            </option>
              :
              <option key={matchday} value={matchday} >
              {`第${matchday}節`}
            </option>
            )
          ))}
        </Select>
        {loading ?
          <Loading/>
          :
          <Grid 
            templateColumns="repeat(auto-fit, minmax(350px, 1fr));" 
            gap={6}
            justifyItems="center"
            >
            {res.map((data) => (
              <GridItem key={data.match.id}>
                <Link to={`${data.match.matchApiId}`}>
                  <MatchCard matchData={data.match} homeTeam={data.homeTeamData} awayTeam={data.awayTeamData}/>
                </Link>
              </GridItem>
            ))}
          </Grid>
        }
    </Box>
  );
}