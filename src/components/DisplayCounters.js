import React from "react";

function DisplayCounters(props) {
  function timer() {
    return (
      <div className="display-timer">
        <span className="display-text">Timer:</span>
        <span className="clock-data">
          {props.gameTimer ? props.gameTimer : "00"}
        </span>
      </div>
    );
  }

  function errorClicks() {
    return (
      <div className="display-errors">
        <span className="display-text">Errors:</span>
        <span className="error-data">{props.errors ? props.errors : 0}</span>
      </div>
    );
  }

  return (
    <div className="display-counters-container">
      {errorClicks()}
      {timer()}
    </div>
  );
}

export default DisplayCounters;
