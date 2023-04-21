import React from "react";

function StartGameButton(props) {
  return (
    <button className="start-game-button" onClick={props.handleClick}>
      {/* Start Game */}
      {props.buttonMessage}
    </button>
  );
}

export default StartGameButton;
