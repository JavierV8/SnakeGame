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
    score: 0,
    highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
    isGameOver: false,
  });

  // Set events listeners
  useEffect(() => {
    window.addEventListener("keydown", (event) =>
      state.snakeG.handleKeyDown(event)
    );
    window.addEventListener("resize", () => state.snakeG.createBoard());

    return () => {
      window.removeEventListener("keydown", state.snakeG.handleKeyDown());
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
    state.snakeG.gameLoop();
    setState((state) => {
      return {
        ...state,
        ...state.snakeG.getState(),
      };
    });
  };

  // Reset HighScore
  useEffect(() => {
    setState((state) => {
      return {
        ...state,
        highScore: Number(localStorage.getItem("snakeHighScore")) || 0,
      };
    });
  }, [state.isGameOver]);

  const isVisible = !state.isGameOver
  ? { visibility: "visible" }
  : { visibility: "hidden" };

  return (
    <div>
      <GameOver isGameOver={state.isGameOver} />
      <div style={isVisible}>
        <div className="board" id="board-id">
          {state.board}
        </div>
        <div className="score-container">
          <div>
            <h2>Your score</h2>
            <h2>{state.score}</h2>
          </div>
          <div>
            <h2>Higer score</h2>
            <h2>{state.highScore}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

function GameOver(props) {
  const { isGameOver } = props;
  const isDisplay = isGameOver ? { display: "block" } : { display: "none" };
  return (
    <div className="gameOver-component" style={isDisplay}>
      <h1>GAME OVER</h1>
      <h3>Press spacebar to start again</h3>
    </div>
  );
}

