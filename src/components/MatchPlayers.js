import React from "react";
import { useNavigate } from "react-router-dom";

import { 
  Tr,
  Td,
  Box,
  Button,
  Table,
  Tbody,
  useDisclosure
} from "@chakra-ui/react";

import { useUser } from "../contexts/UserContext";
import positionShortName from "../lib/PositionShortNames";
import { LoginRequiredMessage } from "./LoginRequiredMessage";


export const MatchPlayers = ({ lineup, team }) => {
  const { isLoggedIn } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();

  const navigateToRatePage = () => {
    navigate(`rate?team=${team}`)
  }

  return (
    <Box width="45%" textAlign="center" > {/* ホームチーム */}
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
        onClick={isLoggedIn ? navigateToRatePage : onOpen}
      >
        採点する
      </Button>
      <LoginRequiredMessage isOpen={isOpen} onClose={onClose} cancelRef={cancelRef}></LoginRequiredMessage>
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