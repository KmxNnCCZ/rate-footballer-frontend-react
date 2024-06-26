import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { 
  Text,
  Box,
  Flex,
  Image,
  Heading,
  Table,
  Tbody,
  Button,
  Tr,
  Td,
  Stack,
  Divider,
  border
} from "@chakra-ui/react";

import { getTeam } from "../lib/api/getMatch";
import { Loading } from "../components/Loading";
import positionShortName from "../lib/PositionShortNames";

export const Rate = () => {
  const { matchApiId } = useParams();
  const [teamData, setTeamData] = useState({});
  const [loading, setLoading] = useState(true);

  const [scores, setScores] = useState([...Array(11)].map(() => "5.0"));

  // パラメータを取得
  const query = new URLSearchParams(useLocation().search);
  const team = query.get('team');

  const matchday = `第${teamData.matchday}節`;

  useEffect(() => {
    const fetchMatch = async () => {
      try {
        const res = await getTeam(matchApiId, team);
        // console.log(JSON.stringify(res.data, null, 2))
        setTeamData(res.data);
        setLoading(false); // データの読み込みが完了
      } catch (error) {
        console.error("Error fetching match:", error);
        setLoading(false); // エラーが発生してもローディングを終了する
      }
    };

    fetchMatch();
  }, [matchApiId, team]);

  const increment = (i) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[i] = formatToOneDecimal(Math.min(10, Number(newScores[i]) + 0.5)); // 最高値を10とする
      return newScores;
    });
  }

  const decrement = (i) => {
    setScores((prevScores) => {
      const newScores = [...prevScores];
      newScores[i] = formatToOneDecimal(Math.max(0, Number(newScores[i]) - 0.5)); // 最低値を0とする
      return newScores;
    });
  }

  const handleScoreChange = (i, value) => {
    if (!isNaN(value)) { // 数値に変換できる場合のみ更新する
      setScores((prevScores) => {
        const newScores = [...prevScores];
        newScores[i] = value;
        return newScores;
      });
    }
  }

  const formatToOneDecimal = (value) => {
    return String((value).toFixed(1));
  }

  // const isHalfStep = (number) => {
  //   return (number * 10) % 5 === 0;
  // }
  

  // データが読み込まれるまでローディングを表示
  if (loading) {
    return (
      <Loading />
    );
  };

  return (
    <Box>
      <Flex
        width={{ base: "100%", md: "60%" }} // ベース（小さい画面）では100%、ミディアム（大きい画面）では60%
        flexDirection={{ base: "column", md: "row" }} // 小さい画面では縦並び、大きい画面では横並び
        alignItems="center"
        justifyContent="center"
        mb="30px"
        mx="auto"
      > {/* タイトル */}
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold"  mr={{ base: "0px", md: "10px" }}>
        プレミアリーグ {matchday}
        </Heading>
        <Heading textAlign="center" fontSize="24px" color="gray.700" fontWeight="bold">
          {teamData.name}採点投稿
        </Heading>
      </Flex>

      <Flex justifyContent="space-around" alignItems="center" mx="auto" px="30px" mb="80px"> {/* スコアボード */}
        <Box>
          <Image src={teamData.crest} alt={teamData.name} height="100px" width="100px" mx="auto"/>
        </Box>
        <Text as='b' fontSize='lg'>{teamData.name}</Text>
        <Text mx="20px" fontSize='sm' letterSpacing="10px">{teamData.score}</Text>
        <Text as='b'fontSize='sm'>{teamData.awayTeamName}</Text>
        <Box>
          <Image src={teamData.awayTeamCrest} alt={teamData.awayTeamName} height="50px" width="5opx" mx="auto"/>
        </Box>
      </Flex>

      <Box mb="20px" borderColor="#22543D" borderBottomWidth="2px">
      <Text fontSize="sm" as="b">{teamData.name} スターティングメンバー</Text>
    </Box>

      <Box boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"> {/* 投稿場所 */}
        <Table size='sm'>
          <Tbody> {/*Trをmapで表示 */}
            {teamData.lineup.map((player, i) => (
              <Tr key={player.id}>
                <Td>{positionShortName[player.position]}</Td>
                <Td>{player.shirtNumber}</Td>
                <Td>{player.name}</Td>
                <Td> {/* スコア操作 */}
                  <Flex alignItems="center">
                    <Button colorScheme='blue' borderWidth="2px" variant='outline' onClick={() => decrement(i)}>-</Button>
                    <Text
                      as='b'
                      mx="20px"
                      textAlign="center"
                      onChange={(e) => handleScoreChange(i, e.target.value)}
                    >
                      {scores[i]}
                    </Text>
                    <Button colorScheme='red' variant='outline' borderWidth="2px" onClick={() => increment(i)}>+</Button>
                  </Flex>
                </Td>
                <Td><Button>評価を追加</Button></Td>{/* アコーディオン */}
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Button></Button>
      </Box>
    </Box>
    
  );
};