import React from "react";
import Title from "./Title";
import Cards from "./Cards";
import cardData from "../cardData";

function Main() {
  const [allCards, setAllCards] = React.useState(cardData);

  const randomizeCardData = () => {
    setAllCards(cardData);
  };

  return (
    <div className="main--container">
      <Title />
      <Cards newCards={allCards} />
    </div>
  );
}

export default Main;
