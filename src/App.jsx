import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";
const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let activePlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") activePlayer = "O";
  return activePlayer;
}
function App() {
  const [turns, setTurns] = useState([]);
  const [playerName, setPlayerName] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  function handlePlayerName(symbol, name) {
    setPlayerName((prev) => {
      return {
        ...prev,
        [symbol]: name,
      };
    });
  }
  const activePlayer = deriveActivePlayer(turns);
  let gameBoard = [...intialGameBoard.map((innerArr) => [...innerArr])];
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    let firstSq = gameBoard[combination[0].row][combination[0].column];
    let secondSq = gameBoard[combination[1].row][combination[1].column];
    let thirdSq = gameBoard[combination[2].row][combination[2].column];

    if (firstSq && firstSq === secondSq && firstSq === thirdSq) {
      winner = playerName[firstSq];
      console.log(firstSq);
    }
  }

  let hasDraw = turns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setTurns((prev) => {
      let currentPlayer = deriveActivePlayer(prev);
      if (prev.length > 0 && prev[0].player === "X") currentPlayer = "O";
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prev,
      ];
      return updatedTurns;
    });
  }
  function handleRestart() {
    setTurns([]);
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player 1"
            symbol="X"
            updateName={handlePlayerName}
            isActive={activePlayer === "X" ? true : undefined}
          />
          <Player
            name="Player 2"
            symbol="O"
            updateName={handlePlayerName}
            isActive={activePlayer === "O" ? true : undefined}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winName={winner} rematch={handleRestart} />
        )}
        <GameBoard
          isActive={activePlayer}
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log gameTurn={turns}></Log>
    </main>
  );
}

export default App;
