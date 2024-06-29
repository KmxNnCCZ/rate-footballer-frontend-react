import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { 
  Box,
  Flex,
  Text,
  Button,
  Accordion,
  Image
} from '@chakra-ui/react';

import { useUser } from '../contexts/UserContext';
import { getRate } from '../lib/api/fetchRate';
import { Loading } from '../components/Loading';
import { PlayerRatedItem } from '../components/PlayerRatingItem';


export const RateDetail = () => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(true);
  const {currentUser} = useUser();
  const { rateId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRateData = async () => {
      const res = await getRate(rateId);
      setRes(res.data);
      setLoading(false);
    }
    fetchRateData();
  }, [rateId]);



  const navigateEditPage = (id) => {
    if (currentUser && currentUser.id === res.userId) {
      navigate(`/rates/${id}/edit`);
    }
  }

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  const matchDate = `PL ${res.season} 第${res.matchday}節`;

  return (
    <Box>
      <Flex justifyContent="space-between">
        <Text>{res.userName}</Text>
        {currentUser && currentUser.id === res.userId &&
        <Box>
        <Button onClick={() => navigateEditPage(res.id)}>編集</Button>
        <Button>削除</Button>
        </Box>
        }
      </Flex>

      <Box>
        <Flex justifyContent="space-between" pb="20px" alignItems="center">
          <Flex as="b">
            <Text mr="30px">{matchDate}</Text>
            <Image src={res.teamCrestUrl} alt={res.teamName} w="40px" h="40px" mr="5px"></Image>
            <Text>{res.teamName}</Text>
          </Flex>
          <Text
            fontSize="xs"
            as="ins"
            _hover={{color: "#89DA59"}}
          >
            <Link to={`/matches/${res.matchApiId}`}>試合詳細ページへ</Link>
          </Text>
        </Flex>
        <Box>
          <Accordion allowMultiple>
            {res.scores.map((score, index) => (
              <PlayerRatedItem
              key={score.playerId}
              playerPosition={score.position}
              playerShirtNumber={score.shirtNumber}
              playerName={score.name}
              score={score.score}
              assessment={score.assessment}
              index={index}
            />
            ))}
          </Accordion>
        </Box>
      </Box>
    </Box>
  )
}