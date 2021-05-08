import React, { useState, useEffect } from "react";
import { Snake } from "./Snake";
import "./App.css";

function App() {
  const [state, setState] = useState({
    board: [],
    snakeG: new Snake("app-id"),
    rowSize: 0,
    interval: null,
    snake: [],
    food: {},
    isGameOver: false,
  });

  // Set events listeners
  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      state.snakeG.handleKeyDown(event)
    );
    window.addEventListener("resize", () => state.snakeG.resizeBoard());

    return () => {
      window.removeEventListener("keydown", state.snakeG.handleKeyDown());
      window.removeEventListener("resize", () => state.snakeG.resizeBoard());
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
    state.snakeG.gameLoop();
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
