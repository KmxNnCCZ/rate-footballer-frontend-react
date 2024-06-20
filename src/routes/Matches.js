import { useState, useEffect } from "react";
import { getMatch } from "../lib/api/getMatchList";

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

  const fetchMatchData = async (season, matchday) => {
    const params = {season, matchday};
    const res = await getMatch(params)
    setRes(res.data);
  }


  useEffect(() => {
   if (season !== null && selectedMatchDay !== null) {
    fetchMatchData(season, selectedMatchDay);
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
        <Select placeholder={`第${selectedMatchDay}節`} width="300px" mb="10px" onChange={(e) => onMatchdaySelectChange(e.target.value[1])}>
          {matchdays.map((day) => (
            <option key={day} value={`第${day}節`}>
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
            <GridItem>
              <MatchCard key={data.id} matchData={data}/>
            </GridItem>
          ))}
        </Grid>
    </Box>
  );
}