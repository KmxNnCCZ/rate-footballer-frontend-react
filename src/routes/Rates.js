import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import { 
  Box,
  Text,
  Grid,
  GridItem,
 } from "@chakra-ui/react";

import { Loading } from "../components/Loading";
import { RateCard } from "../components/RateCard";
import { useUser } from "../contexts/UserContext";
import { getRateList } from "../lib/api/fetchRate";

export const Rates = () => {
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, currentUser } = useUser();

  useEffect(() => {
    const fetchRatesData = async () => {
      const rateList = await getRateList()
      setRes(rateList.data.reverse());
      setLoading(false); // データの読み込みが完了
      // console.log(JSON.stringify(res.data, null,2))
    }
    fetchRatesData()
  }, [isLoggedIn, currentUser])

  return (
    <Box>
      <Text  textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold" mb="50px">
        採点一覧
      </Text>
      {loading ?
        <Loading/>
        :
        <Grid
          templateColumns="repeat(auto-fit, minmax(450px, 1fr));" 
          gap={6}
          justifyItems="center"
        >
          {res.map((rate) => (
            <GridItem key={rate.id}>
              <Link to={`${rate.id}`}>
                <RateCard 
                  scores={rate.scores}
                  matchday={rate.matchday}
                  teamShortName={rate.teamShortName}
                  teamCrestUrl={rate.teamCrestUrl}
                  season={rate.season}
                  isOwner={isLoggedIn && currentUser.id === rate.userId}
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      }
    </Box>
  )
}
