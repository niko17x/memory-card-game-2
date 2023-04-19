import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import cardData from "../cardData";
import { v4 as uuidv4 } from "uuid";

window.addEventListener("click", (e) => {
  console.log(e.target);
});

function Main() {
  const [allCards, setAllCards] = React.useState(duplicateAllCards());
  const [cardInPlayId, setCardInPlayId] = React.useState(null);
  const [gameStatus, setGameStatus] = React.useState(false);
  const [wrongMoveCount, setWrongMoveCount] = React.useState(0);

  const currentCardInPlay = React.useRef(false);
  const firstCardUuid = React.useRef(null);
  const secondCardUuid = React.useRef(null);

  React.useEffect(() => {
    checkGameWin();
  }, [allCards]);

  // Check for game win if allCards imageVisibility is set to true.
  function checkGameWin() {
    const allCardsAreVisible = allCards.every((card) => card.imageVisibility);
    return allCardsAreVisible ? setGameStatus(true) : null;
  }

  const handleClick = (event) => {
    if (!currentCardInPlay.current) {
      const getFirstUuid = event.target.getAttribute("data-uuid");
      setCardInPlayId(event.target.id);
      currentCardInPlay.current = true;
      firstCardUuid.current = getFirstUuid;
    } else {
      areCardsMatching(event);
      currentCardInPlay.current = false;
    }
    cardVisibilityOn(event);
  };

  function areCardsMatching(event) {
    secondCardUuid.current = event.target.getAttribute("data-uuid");
    const selectFirstCardUuid = document.querySelector(
      `[data-uuid="${firstCardUuid.current}"]`
    );
    const selectSecondCardUuid = document.querySelector(
      `[data-uuid="${secondCardUuid.current}"]`
    );
    if (event.target.id === cardInPlayId) {
      selectFirstCardUuid.style.pointerEvents = "none";
      selectSecondCardUuid.style.pointerEvents = "none";
    } else {
      clickedWrongCard(event);
      setWrongMoveCount(wrongMoveCount + 1);
    }
  }

  function clickedWrongCard(event) {
    temporarilyPreventCardClick();
    setTimeout(() => {
      setAllCards((prevCards) => {
        const updatedCards = prevCards.map((cards) => {
          if (parseInt(event.target.id) === cards.id) {
            return { ...cards, imageVisibility: false };
          } else if (parseInt(cardInPlayId) === cards.id) {
            return { ...cards, imageVisibility: false };
          } else {
            return cards;
          }
        });
        return updatedCards;
      });
    }, 3000);
  }

  function temporarilyPreventCardClick() {
    allCards.forEach((card) => {
      const selector = document.querySelector(`[data-uuid="${card.dataUuid}"]`);
      selector.style.pointerEvents = "none";

      setTimeout(() => {
        selector.style.pointerEvents = "auto";
      }, 3000);
    });
  }

  const cardVisibilityOn = (event) => {
    const getUuid = event.target.getAttribute("data-uuid");
    setAllCards((prevCards) =>
      prevCards.map((card) => {
        return getUuid === card.dataUuid
          ? { ...card, imageVisibility: true }
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
      {gameStatus ? console.log("Game is over") : null}
      <Title />
      <Cards newCards={allCards} handleClick={handleClick} />
    </div>
  );
}

export default Main;
