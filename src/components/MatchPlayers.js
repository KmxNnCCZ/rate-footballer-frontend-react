import { 
  Tr,
  Td,
  Box,
  Button,
  Table,
  Tbody
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import positionShortName from "../lib/PositionShortNames";


export const MatchPlayers = ({ lineup, team, matchApiId}) => {
  const path = `rate?team=${team}`
  const navigate = useNavigate();

  const navigateToRatePage = () => {
    navigate(path)
  }

  return (
    <Box width="45%" textAlign="center" boxShadow="0px 2px 8px rgba(0, 0, 0, 0.1)"> {/* ホームチーム */}
      <Button 
        as='button'
        my="20px"
        w="80%"
        h="70px"
        color="#89DA59"
        bg="white"
        borderColor='#89DA59'
        borderRadius="50px"
        borderWidth="4px"
        _hover={{ bg: '#89DA59', color: "white" }}
        onClick={navigateToRatePage}
      >
        採点する
      </Button>
      <Table>
        <Tbody>
          {lineup.map((player) => (
            <Tr key={player.id}>
              <Td fontSize='xs' textAlign="center">{positionShortName[player.position]}</Td>
              <Td fontSize='xs' textAlign="center">{player.shirtNumber}</Td>
              <Td fontSize='xs' whiteSpace="nowrap">{player.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};