const starWarsCharacters = [
    "Obi-Wan Kenobi", "R2-D2", "Darth Vader", "Luke Skywalker", "Yoda", "Grogu",
    "Leia Organa", "Han Solo", "Chewbacca", "C-3PO", "Mace Windu", "Darth Maul",
    "Boba Fett", "Jango Fett", "Lando Calrissian", "Qui-Gon Jinn", "Admiral Ackbar",
    "Ahsoka Tano", "Count Dooku", "Plo Koon", "Kit Fisto", "Cad Bane", "Rey",
    "Kylo Ren", "Ezra Bridger"
  ];
  
  // Function to get six random unique characters
  const getRandomCharacters = (list, count) => {
    const shuffled = list.sort(() => 0.5 - Math.random()); // Shuffle array
    return shuffled.slice(0, count); // Get first `count` elements
  };
  
  const navPresets = getRandomCharacters(starWarsCharacters, 6);
  
  export default navPresets;
  