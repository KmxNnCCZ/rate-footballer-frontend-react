import { useState } from "react";
import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Grid,
  GridItem,
  Flex,
  Button,
  Text,
  Textarea,
  Box,
} from "@chakra-ui/react";
import { positionShortName } from "../lib/PositionShortNames";

export const PlayerRatingItem = ({
  player,
  playerRate,
  index,
  onIncrement,
  onDecrement,
  onChangeAssessment,
  buttonWord,
}) => {
  return (
    <AccordionItem my="1" p="4" borderRadius="md">
      <Grid templateColumns="1fr 1fr 5fr 3fr 4fr" alignItems="center">
        <GridItem>{positionShortName[player.position]}</GridItem>
        <GridItem>{player.shirtNumber}</GridItem>
        <GridItem>{player.name}</GridItem>
        <GridItem mx="auto">
          <Flex alignItems="center">
            <Button
              colorScheme="blue"
              variant="outline"
              borderWidth="2px"
              onClick={() => onDecrement(index)}
            >
              -
            </Button>
            <Text as="b" mx="4" textAlign="center">
              {playerRate.score.toFixed(1)}
            </Text>
            <Button
              colorScheme="red"
              variant="outline"
              borderWidth="2px"
              onClick={() => onIncrement(index)}
            >
              +
            </Button>
          </Flex>
        </GridItem>
        <GridItem>
          <AccordionButton>
            <Box as="b" flex="1">
              評価を{buttonWord}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </GridItem>
      </Grid>
      <AccordionPanel p="4">
        <Textarea
          borderWidth="2px"
          _focus={{ outline: "none" }}
          value={playerRate.assessment || ""}
          onChange={(e) => onChangeAssessment(index, e.target.value)}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};

export const PlayerRatedItem = ({
  playerPosition,
  playerShirtNumber,
  playerName,
  score,
  assessment,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <AccordionItem>
      <Grid templateColumns="1fr 1fr 5fr 3fr 4fr" alignItems="center" p="4">
        <GridItem>{positionShortName[playerPosition]}</GridItem>
        <GridItem>{playerShirtNumber}</GridItem>
        <GridItem>{playerName}</GridItem>
        <GridItem mx="auto">
          <Text as="b" mx="4" textAlign="center">
            {score.toFixed(1)}
          </Text>
        </GridItem>
        <GridItem>
          <AccordionButton onClick={toggleButton}>
            <Box as="b" flex="1" textAlign="left">
              {isOpen ? "閉じる" : "評価を見る"}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </GridItem>
      </Grid>
      <AccordionPanel p="4">
        <Textarea readOnly value={assessment || ''} />
      </AccordionPanel>
    </AccordionItem>
  );
};