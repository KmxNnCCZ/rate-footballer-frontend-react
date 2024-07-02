const positionPriority = {
  "Goalkeeper": 1,
  "Defence": 2,
  "Defender": 2,
  "Left-Back": 3,
  "Centre-Back": 4,
  "Right-Back": 5,
  "Defensive Midfield": 6,
  "Central Midfield": 7,
  "Midfielder": 7,
  "Midfield": 7,
  "Attacking Midfield": 8,
  "Left Winger": 9,
  "Right Winger": 9,
  "Offence": 10,
  "Forward": 10,
  "Centre-Forward": 11,
};


const sortPlayer = (players) => {
  const sortedPlayers = players.sort((a, b) => {
    if(a.position !== b.position){
      return  positionPriority[a.position] -  positionPriority[b.position];
    }
    return a.shirtNumber - b.shirtNumber;
  })
  return sortedPlayers;
};

export default sortPlayer;

