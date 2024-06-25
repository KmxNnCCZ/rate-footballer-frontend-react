import { 
  Tr,
  Td,
  Box,
  Button,
  Table,
  Tbody
} from "@chakra-ui/react";

import { Link } from "react-router-dom";


export const MatchPlayers = ({ lineup, team }) => {
  const path = `/rate?team=${team}`
  const pos = {
    "Attacking Midfield": "AM",
    "Left-Back": "LB",
    "Forward": "FW",
    "Defence": "DF",
    "Defensive Midfield": "DM",
    "Offence": "FW",
    "Goalkeeper": "GK",
    "Centre-Forward": "CF",
    "Centre-Back": "CB",
    "Central Midfield": "CM",
    "Left Winger": "LWG",
    "Midfielder": "MF",
    "Defender": "DF",
   " Right Winger": "RWG",
    "Right-Back": "RB",
   " Midfield": "MF",
  }
  return (
    <Box width="40%" textAlign="center"> {/* ホームチーム */}
      <Button 
        as='button'
        mb="20px"
        w="80%"
        h="70px"
        color="#89DA59"
        bg="white"
        borderColor='#89DA59'
        borderRadius="50px"
        borderWidth="4px"
        _hover={{ bg: '#89DA59', color: "white" }}
      >
        <Link to={path}>採点する</Link>
      </Button>
      <Table>
        <Tbody>
          {lineup.map((player) => (
            <Tr key={player.id}>
              <Td fontSize='xs' textAlign="center">{pos[player.position]}</Td>
              <Td fontSize='xs' textAlign="center">{player.shirtNumber}</Td>
              <Td fontSize='xs' whiteSpace="nowrap">{player.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};