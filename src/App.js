import React, { useState, useEffect } from "react";
import { Snake } from "./Snake";
import "./App.css";

function App() {
  const [state, setState] = useState({
    board: [],
    snakeG: new Snake("app-id"),
    rowSize: 0,
    interval: null,
  });

    // Set events listeners
  useEffect(() => {
    window.addEventListener("resize", () => state.snakeG.createBoard());

    return () => {
      window.removeEventListener("resize", () => state.snakeG.createBoard());
    };
  }, []);

  // Start Game
  useEffect(() => {
    state.snakeG.startGame();
    setState((state) => {
      return {
        ...state,
        interval: setInterval(() => loop(), 100),
      };
    });
  }, []);

  const loop = () => {
    setState((state) => {
      return {
        ...state,
        ...state.snakeG.getState(),
      };
    });
  };

  return (
    <div className="App">
      <div className="board" id="board-id">
        {state.board}
      </div>
    </div>
  );
}

export default App;
