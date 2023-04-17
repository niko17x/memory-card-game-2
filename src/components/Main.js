import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import cardData from "../cardData";
import { v4 as uuidv4 } from "uuid";

function Main() {
  const [allCards, setAllCards] = React.useState(duplicateAllCards());

  const handleClick = (event) => {
    toggleCardVisibility(event);
  };

  const toggleCardVisibility = (event) => {
    const getUuid = event.target.getAttribute("data-uuid");
    setAllCards((prevCards) =>
      prevCards.map((card) => {
        return getUuid === card.dataUuid
          ? { ...card, imageVisibility: !card.imageVisibility }
          : card;
      })
    );
  };

  function duplicateAllCards() {
    const duplicateCards = [cardData, cardData];
    const shuffledCards = duplicateCards.map((card) => {
      const newCardArray = [...card];
      return shuffleAllCards(newCardArray);
    });
    const combinedCards = [...shuffledCards[0], ...shuffledCards[1]];
    return addUuid(combinedCards);
  }

  function addUuid(cards) {
    let result = [];
    cards.map((card) => result.push({ ...card, dataUuid: uuidv4() }));
    return result;
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
