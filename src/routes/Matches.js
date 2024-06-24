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


export const Matches = () => {
  const seasons = ["23-24", "22-23", "21-22"]
  const [season, setSeason] = useState("23-24");
  const [res, setRes] = useState([]);
  const [selectedMatchDay, setSelectedMatchDay] = useState(38);

  const matchdays = [...Array(38)].map((_, i) => i+1)

  const fetchMatchesData = async (season, matchday) => {
    const params = {season, matchday};
    const res = await getMatchList(params)
    setRes(res.data);
  }


  useEffect(() => {
   if (season !== null && selectedMatchDay !== null) {
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
        <Select placeholder={season} width="300px" mb="10px" onChange={(e) => onSeasonSelectChange(e.target.value)}>
          {seasons.map((season) => (
            <option key={season} value={season}>
              {season}
            </option>
          ))}
        </Select>
        <Select 
          placeholder={`第${selectedMatchDay}節`}
          width="300px"
          mb="10px"
          onChange={(e) => onMatchdaySelectChange(e.target.value)}
        >
          {matchdays.map((day) => (
            <option key={day} value={day}>
              {`第${day}節`}
            </option>
          ))}
        </Select>
        <Grid 
          templateColumns="repeat(auto-fit, minmax(350px, 1fr));" 
          gap={6}
          justifyItems="center"
          >
          {res.map((data) => (
            <GridItem key={data.id}>
              <Link to={`${data.matchApiId}`}>
                <MatchCard matchData={data}/>
              </Link>
            </GridItem>
          ))}
        </Grid>
    </Box>
  );
}