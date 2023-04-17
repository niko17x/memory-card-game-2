import React from "react";

function Cards(props) {
  const renderCardData = () => {
    const allCards = [];
    props.newCards.map((card, index) =>
      allCards.push(
        <div className="card-outline" key={index}>
          <img
            className="card-image"
            id={card.id}
            src={card.url}
            alt=""
            data-uuid={card.dataUuid}
            onClick={props.handleClick}
            style={{ opacity: card.imageVisibility ? 100 : 0 }}
          />
        </div>
      )
    );
    // console.log(allCards);
    return allCards;
  };

  return <div className="cards--container">{renderCardData()}</div>;
}

export default Cards;
