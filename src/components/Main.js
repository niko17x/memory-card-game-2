import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import StartGameButton from "./StartGameButton";
import cardData from "../cardData";
import { v4 as uuidv4 } from "uuid";

window.addEventListener("click", (e) => {
  console.log(e.target);
});

function Main() {
  const [allCards, setAllCards] = React.useState(duplicateAllCards());
  const [cardInPlayId, setCardInPlayId] = React.useState(null);
  const [gameOn, setGameOn] = React.useState(false);
  const [wrongMoveCount, setWrongMoveCount] = React.useState(0);

  const currentCardInPlay = React.useRef(false);
  const firstCardUuid = React.useRef(null);
  const secondCardUuid = React.useRef(null);

  React.useEffect(() => {
    checkGameWin();
  }, [allCards]);

  React.useEffect(() => {
    disableClicksBeforeGameOn();
    preventClickWhenAllCardsVisible();
  }, [gameOn]);

  function disableClicksBeforeGameOn() {
    allCards.forEach((cards) => {
      const selector = document.querySelector(
        `[data-uuid="${cards.dataUuid}"]`
      );
      if (gameOn) {
        selector.style.pointerEvents = "auto";
      } else {
        selector.style.pointerEvents = "none";
      }
    });
  }

  function checkGameWin() {
    const allCardsPaired = allCards.every((card) => card.imageVisibility);
    return allCardsPaired && !gameOn ? setGameOn(false) : null;
  }

  function preventClickWhenAllCardsVisible() {
    const allCardsRevealed = allCards.every((card) => card.imageVisibility);
    if (allCardsRevealed) {
      temporarilyPreventAllCardClicks(5000);
    }
  }

  function handleStartGameButton(event) {
    const startGameButton = event.target;
    if (!startGameButton.classList.contains("start-game-button")) return;
    if (!gameOn) {
      temporarilyRevealCards();
      setGameOn(true);
      startGameButton.style.pointerEvents = "none";
      setTimeout(() => {
        startGameButton.style.pointerEvents = "auto";
      }, 5000);
    } else {
      resetGameState();
    }
  }

  function temporarilyRevealCards() {
    setAllCards(
      (prevCards) =>
        prevCards.map((card) => ({ ...card, imageVisibility: true })),
      setTimeout(() => {
        setAllCards((prevCards) =>
          prevCards.map((card) => ({ ...card, imageVisibility: false }))
        );
      }, 5000)
    );
  }

  function resetGameState() {
    setAllCards(duplicateAllCards());
    setCardInPlayId(null);
    setGameOn(false);
    setWrongMoveCount(0);
    currentCardInPlay.current = false;
    firstCardUuid.current = null;
    secondCardUuid.current = null;
  }

  const handleClick = (event) => {
    renderCardClicks(event);
  };

  function renderCardClicks(event) {
    const getFirstUuid = event.target.getAttribute("data-uuid");
    if (!currentCardInPlay.current && gameOn) {
      setCardInPlayId(event.target.id);
      currentCardInPlay.current = true;
      firstCardUuid.current = getFirstUuid;
    } else {
      areCardsMatching(event, getFirstUuid);
      currentCardInPlay.current = false;
    }
    cardVisibilityOn(event);
  }

  function areCardsMatching(event, firstUuid) {
    secondCardUuid.current = event.target.getAttribute("data-uuid");
    const selectFirstCardUuid = document.querySelector(
      `[data-uuid="${firstCardUuid.current}"]`
    );
    const selectSecondCardUuid = document.querySelector(
      `[data-uuid="${secondCardUuid.current}"]`
    );
    if (firstUuid === firstCardUuid.current) {
      return null;
    } else if (event.target.id === cardInPlayId) {
      selectFirstCardUuid.style.pointerEvents = "none";
      selectSecondCardUuid.style.pointerEvents = "none";
    } else {
      clickedWrongCard(event);
      setWrongMoveCount(wrongMoveCount + 1);
    }
  }

  function clickedWrongCard(event) {
    temporarilyPreventAllCardClicks(3000);
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

  function temporarilyPreventAllCardClicks(seconds) {
    allCards.forEach((card) => {
      const selector = document.querySelector(`[data-uuid="${card.dataUuid}"]`);
      selector.style.pointerEvents = "none";
      setTimeout(() => {
        selector.style.pointerEvents = "auto";
      }, seconds);
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
      <Title />
      <Cards newCards={allCards} handleClick={handleClick} />
      <StartGameButton
        handleClick={handleStartGameButton}
        buttonMessage={!gameOn ? "Start Game" : "Restart Game"}
      />
    </div>
  );
}

export default Main;
