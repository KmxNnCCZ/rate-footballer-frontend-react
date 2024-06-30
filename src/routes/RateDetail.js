import { useState, useEffect } from 'react';
import { 
  useParams,
  Link as ReactRouterLink,
  useNavigate } from 'react-router-dom';

import { 
  Box,
  Flex,
  Text,
  Accordion,
  Image,
  Tooltip,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

import { useUser } from '../contexts/UserContext';
import { getRate, deleteRate } from '../lib/api/fetchRate';
import { Loading } from '../components/Loading';
import { PlayerRatedItem } from '../components/PlayerRatingItem';
import { Comment } from '../components/Comment';


export const RateDetail = () => {
  const [res, setRes] = useState();
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const {currentUser} = useUser();
  const { rateId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRateData = async () => {
      const res = await getRate(rateId);
      // console.log(JSON.stringify(res.data, null, 2));
      setComments(res.data.comments.reverse());
      delete res.data.comments
      setRes(res.data);
      setLoading(false);
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

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  const matchDate = `PL ${res.season} 第${res.matchday}節`;

  return (
    <Box width="80%" mx="auto">
      <Flex justifyContent="space-between">
        <Text>{res.userName}</Text>
        {currentUser && currentUser.id === res.userId &&
          <Box>
            <Tooltip label="編集" bg='gray.100' color='black' opacity="0.5">
              <EditIcon onClick={() => navigateEditPage(res.id)} cursor="pointer" mr="15px"/>
            </Tooltip>
            <Tooltip label="削除" bg='gray.100' color='black'>
              <DeleteIcon onClick={fetchDeleteRate} cursor="pointer"/>
            </Tooltip>
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
            // as="ins"
            // _hover={{color: "#89DA59"}}
          >
            <ChakraLink as={ReactRouterLink} to={`/matches/${res.matchApiId}`}>試合詳細ページへ</ChakraLink>
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
              />
            ))}
          </Accordion>
        </Box>
      </Box>

      <Comment rateId={rateId} comments={comments}/>
    </Box>
  )
}