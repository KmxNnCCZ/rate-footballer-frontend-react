import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { 
  Box,
  Text,
  Grid,
  GridItem,
  Select,
  Flex
 } from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { RateCard } from "../components/RateCard";
import { useUser } from "../contexts/UserContext";
import { getRateList } from "../lib/api/fetchRate";

export const Rates = () => {
  const [originalRates, setOriginalRates] = useState([]);
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, currentUser } = useUser();
  const location = useLocation();

  // 検索用
  const [selectedTeam, setSelectedTeam] = useState("");
  const [teams, setTeams] = useState([]);
  const [myPosts, setMyPosts] = useState(false);

  useEffect(() => {
    const fetchRatesData = async () => {
      try {
        const rateList = await getRateList()
        console.log(JSON.stringify(rateList, null, 2));
        // マイページから飛んできた時のmyPostsをtrueにする
        const queryParams = new URLSearchParams(location.search);
        const myPosts = queryParams.get('myPosts');
        if (myPosts === 'true') {
          setMyPosts(true);
        }

        const teamsData = [];
        rateList.data.forEach(rate => {
          if (!teamsData.includes(rate.teamShortName)) {
            teamsData.push(rate.teamShortName);
          }
        });
        setTeams(teamsData);

        setOriginalRates(rateList.data.reverse());
      } catch (e) {
        console.error('Error fetching rates:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchRatesData()
  }, [isLoggedIn, currentUser, location.search]);

  useEffect(() => {
    let filteredRates = originalRates
    if (selectedTeam) {
      filteredRates = filteredRates.filter((rate) => {
        return rate.teamShortName === selectedTeam
      });
    };

    if (myPosts) {
      filteredRates = filteredRates.filter((rate) => {
        return rate.userId === currentUser.id
      });
    }

    setRates(filteredRates)
  }, [selectedTeam, originalRates, myPosts, currentUser])

  const onTeamSelectChange = (team) => {
    setSelectedTeam(team);
  }

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return <Loading />;
  }

  return (
    <Box>
      <Helmet>
        <title>採点一覧 - Rate Footballer</title>
      </Helmet>

      <Text  textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        採点一覧
      </Text>

      <Flex mb="20px" justifyContent="right">
        <Select  width="300px" mr="10px" onChange={(e) => onTeamSelectChange(e.target.value)}>
          <option value="">チームを選択</option>
          {teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </Select>
      </Flex>

      <Grid
        templateColumns="repeat(auto-fit, minmax(450px, 1fr));" 
        gap={6}
        justifyItems="center"
      >
        {rates.map((rate) => (
          <GridItem key={rate.id}>
            <Link to={`${rate.id}`}>
              <RateCard 
                scores={rate.scores}
                matchday={rate.matchday}
                teamShortName={rate.teamShortName}
                teamCrestUrl={rate.teamCrestUrl}
                season={rate.season}
                isOwner={isLoggedIn && currentUser.id === rate.userId}
                userName={rate.userName}
                updatedAt={rate.updatedAt}
              />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}
