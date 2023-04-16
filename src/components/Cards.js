import React from "react";

function Cards(props) {
  const renderCardData = () => {
    const allCards = [];
    props.newCards.map((card, index) =>
      allCards.push(
        <img
          className="card-image"
          key={index}
          src={card.url}
          alt=""
          onClick={props.handleClick}
          image-visibility={card.imageVisibility}
        />
      )
    );

    // const duplicateAllCards = [allCards, allCards];
    // const shuffledDuplicateAllCards = duplicateAllCards.map((array) => {
    //   const newArray = [...array];
    //   return shuffleAllCards(newArray);
    // });

    return allCards;
  };

  // // Fisher-Yates shuffle algorithm:
  // const shuffleAllCards = (array) => {
  //   let currentIndex = array.length;
  //   let temporaryValue, randomIndex;

  //   // While there remain elements to shuffle...
  //   while (currentIndex !== 0) {
  //     // Pick a remaining element...
  //     randomIndex = Math.floor(Math.random() * currentIndex);
  //     currentIndex -= 1;

  //     // And swap it with the current element.
  //     temporaryValue = array[currentIndex];
  //     array[currentIndex] = array[randomIndex];
  //     array[randomIndex] = temporaryValue;
  //   }
  //   return array;
  // };

  return <div className="cards--container">{renderCardData()}</div>;
}

export default Cards;
