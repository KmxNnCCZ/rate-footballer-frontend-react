import { useState, useEffect } from 'react';
import {
  useParams,
  Link as ReactRouterLink,
  useNavigate
} from 'react-router-dom';
import { Helmet } from "react-helmet-async";

import {
  Box,
  Flex,
  Text,
  Accordion,
  Image,
  Tooltip,
  Link as ChakraLink,
  IconButton,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { NotFound } from './NotFound'; // NotFoundコンポーネントをインポート
import { Loading } from '../components/Loading';
import { PlayerRatedItem } from '../components/PlayerRatingItem';
import { Comment } from '../components/Comment';
import { useUser } from '../contexts/UserContext';
import { getRate, deleteRate } from '../lib/api/fetchRate';

export const RateDetail = () => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [matchDate, setMatchData] = useState();
  const {currentUser} = useUser();
  const { rateId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRateData = async () => {
      try {
        const res = await getRate(rateId);
        // console.log(JSON.stringify(res.data, null, 2));
        setMatchData(`PL ${res.data.season} 第${res.data.matchday}節`);
        setComments(res.data.comments.reverse());
        delete res.data.comments;
        setRes(res.data);
      } catch (e) {
        console.error('Error fetching rate:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchRateData();
  }, [rateId]);

  const navigateEditPage = () => {
    if (currentUser && currentUser.id === res.userId) {
      navigate(`/rates/${rateId}/edit`);
    }
  }

  const fetchDeleteRate = async () => {
    if (currentUser && currentUser.id === res.userId) {
      await deleteRate(rateId);
      navigate("/rates");
    }
  }

  if (loading) {
    return <Loading />;
  }

  if(!res) {
    return <NotFound />;
  }

  return (
    <Box width="80%" mx="auto" my="4">
      <Helmet>
        <title>採点詳細 - Rate Footballer</title>
      </Helmet>
      
      <Flex justifyContent="space-between" alignItems="center" mb="4">
        <Flex alignItems="center">
          <Text fontSize="lg" fontWeight="bold">{res.userName}</Text>
        </Flex>
        {currentUser && currentUser.id === res.userId &&
          <Box>
            <Tooltip label="編集" bg='gray.300' color='black'>
              <IconButton
                icon={<EditIcon />}
                onClick={navigateEditPage}
                aria-label="編集"
                variant="ghost"
                mr="2"
              />
            </Tooltip>
            <Tooltip label="削除" bg='gray.300' color='black'>
              <IconButton
                icon={<DeleteIcon />}
                onClick={fetchDeleteRate}
                aria-label="削除"
                variant="ghost"
              />
            </Tooltip>
          </Box>
        }
      </Flex>

      <Box mb="6">
        <Flex justifyContent="space-between" alignItems="center" pb="4">
          <Flex alignItems="center">
            <Text fontSize="xl" fontWeight="bold" mr="4">{matchDate}</Text>
            <Image src={res.teamCrestUrl} alt={res.teamName} w="50px" h="50px" mr="4" />
            <Text fontSize="xl" fontWeight="bold">{res.teamName}</Text>
          </Flex>
          <ChakraLink as={ReactRouterLink} to={`/matches/${res.matchApiId}`} fontSize="sm" color="blue.500">
            試合詳細ページへ
          </ChakraLink>
        </Flex>
        <Box bg="gray.50" p="4" borderRadius="md" boxShadow="md">
          <Accordion allowMultiple>
            {res.scores.map((score) => (
              <PlayerRatedItem
                key={score.playerId}
                playerPosition={score.position}
                playerShirtNumber={score.shirtNumber}
                playerName={score.name}
                score={score.score}
                assessment={score.assessment}
              />
            ))}
          </Accordion>
        </Box>
      </Box>

      <Comment rateId={rateId} comments={comments} />
    </Box>
  );
}
