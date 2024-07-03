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
  Box
} from "@chakra-ui/react";

import positionShortName from "../lib/PositionShortNames";

export const PlayerRatingItem = ({ player, playerRate, index, onIncrement, onDecrement, onChangeAssessment, buttonWord }) => {
  return (
    <AccordionItem>
      <Grid templateColumns="1fr 1fr 5fr 3fr 3fr" alignItems="center" my="10px">
        <GridItem>{positionShortName[player.position]}</GridItem>
        <GridItem>{player.shirtNumber}</GridItem>
        <GridItem>{player.name}</GridItem>
        <GridItem mx="auto">
          <Flex alignItems="center">
            <Button colorScheme='blue' borderWidth="2px" variant='outline' onClick={() => onDecrement(index)}>-</Button>
            <Text as='b' mx="20px" textAlign="center">{playerRate.score.toFixed(1)}</Text>
            <Button colorScheme='red' variant='outline' borderWidth="2px" onClick={() => onIncrement(index)}>+</Button>
          </Flex>
        </GridItem>
        <GridItem>
          <AccordionButton>
            <Box as='b'>評価を{buttonWord}</Box>
            <AccordionIcon />
          </AccordionButton>
        </GridItem>
      </Grid>
      <AccordionPanel>
        <Textarea
          borderWidth="2.5px"
          _focus={{ outline: "none" }}
          value={playerRate.assessment || ""}
          onChange={(e) => onChangeAssessment(index, e.target.value)}
        />
      </AccordionPanel>
    </AccordionItem>
  );
};


export const PlayerRatedItem = ({ playerPosition, playerShirtNumber, playerName, score, assessment}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleButton = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  }

  return (
    <AccordionItem isopen={isOpen.toString()}>
      <Grid templateColumns="1fr 1fr 5fr 3fr 3fr" alignItems="center" my="10px">
        <GridItem>{positionShortName[playerPosition]}</GridItem>
        <GridItem>{playerShirtNumber}</GridItem>
        <GridItem>{playerName}</GridItem>
        <GridItem mx="auto">
          <Text as='b' mx="20px" textAlign="center">{score.toFixed(1)}</Text>
        </GridItem>
        <GridItem>
          <AccordionButton onClick={toggleButton}>
            {isOpen ? 
              <Box as='b'>閉じる</Box>
            :
              <Box as='b'>評価を見る</Box>
            }
            <AccordionIcon />
          </AccordionButton>
        </GridItem>
      </Grid>
      <AccordionPanel>
        <Textarea
          readOnly
          value={assessment || ''}
        />
      </AccordionPanel>
    </AccordionItem>
  )
}