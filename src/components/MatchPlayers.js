import React from "react";
import { useNavigate } from "react-router-dom";

import { 
  Tr,
  Td,
  Box,
  Table,
  Tbody,
  useDisclosure
} from "@chakra-ui/react";

import { LoginRequiredMessage } from "./modals/LoginRequiredMessage";
import { SubmitButton } from "./SubmitButton";
import { useUser } from "../contexts/UserContext";
import positionShortName from "../lib/PositionShortNames";

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
      <SubmitButton 
        height={"70px"}
        width={"80%"}
        borderRadius={"50px"}
        onClick={isLoggedIn ? navigateToRatePage : onOpen}
        content={"採点する"}
      />
      <LoginRequiredMessage 
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
        message={"採点"}
      />
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