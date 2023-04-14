import React from "react";

function Title() {
  const Header = () => {
    return <div className="header">Card Memory Game</div>;
  };

  const GameInstructions = () => {
    return (
      <div className="gameInstructions">
        Match all pairing cards to win the game! Click on any card to start.
      </div>
    );
  };

  return (
    <div>
      <Header />
      <GameInstructions />
    </div>
  );
}

export default Title;
