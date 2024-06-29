import { useState, useEffect } from "react"

import { getRateList } from "../lib/api/rate";
import { Loading } from "../components/Loading";
import { RateCard } from "../components/RateCard";
import { getUser } from "../lib/api/auth";

import { 
  Box,
  Text,
  Grid,
  GridItem,
 } from "@chakra-ui/react";


export const Rates = () => {
  const [res, setRes] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const fetchRatesData = async () => {
    const rateList = await getRateList()
    setRes(rateList.data);
    setLoading(false); // データの読み込みが完了
    // console.log(JSON.stringify(res.data, null,2))
  }

  const fetchCurrentUser = async () => {
    const user = await getUser();
    if (user.isLogin) {
      setCurrentUserId(user.data.id)
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchRatesData(), fetchCurrentUser()]);
      setLoading(false); // 両方のデータの読み込みが完了
    };
    fetchData();
  }, [])


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
              <RateCard 
                scores={rate.scores}
                matchday={rate.matchday}
                teamShortName={rate.teamShortName}
                teamCrestUrl={rate.teamCrestUrl}
                season={rate.season}
                isOwner={currentUserId === rate.userId}
              />
            </GridItem>
          ))}
        </Grid>
      }
    </Box>
  )
}
