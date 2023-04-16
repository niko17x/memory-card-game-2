import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import cardData from "../cardData";

// Todo: Player selects a card; change card imageVisibility property to opposite (hidden/show) based on the current condition of play.

function Main() {
  const [allCards, setAllCards] = React.useState(duplicateAllCards);

  const toggleCardVisibility = (event) => {
    setAllCards((prevCards) =>
      prevCards.map((card) => {
        return parseInt(event.target.id) === card.id
          ? { ...card, imageVisibility: !card.imageVisibility }
          : card;
      })
    );
  };

  const handleClick = (event) => {
    toggleCardVisibility(event);
  };

  function duplicateAllCards() {
    const duplicateCards = [cardData, cardData];
    const shuffledCards = duplicateCards.map((card) => {
      const newCardArray = [...card];
      return shuffleAllCards(newCardArray);
    });
    const combinedCards = [...shuffledCards[0], ...shuffledCards[1]];
    return combinedCards;
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
