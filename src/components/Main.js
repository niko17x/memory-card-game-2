import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import cardData from "../cardData";

// ? Why is allCards not logging the correct data that I need?

function Main() {
  const [allCards, setAllCards] = React.useState(duplicateAllCards);

  const toggleCardVisibility = (event) => {
    setAllCards((prevCards) =>
      prevCards.map((card) => {
        return card.id === event.target.id
          ? { ...card, imageVisibility: !card.imageVisibility }
          : card;
      })
    );
    console.log(allCards);
  };

  const handleClick = (event) => {
    toggleCardVisibility(event);
  };

  function duplicateAllCards() {
    const duplicateCards = [cardData, cardData];
    const shuffleCards = duplicateCards.map((array) => {
      const newArray = [...array];
      return shuffleAllCards(newArray);
    });
    const combineCards = [...shuffleCards[0], ...shuffleCards[1]];
    return combineCards;
  }

  // Fisher-Yates shuffle algorithm:
  function shuffleAllCards(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  return (
    <div className="main--container">
      <Title />
      <Cards newCards={allCards} handleClick={handleClick} />
    </div>
  );
}

export default Main;
