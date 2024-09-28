export default function GameOver({ winName, rematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winName && <p>{winName} won!</p>}
      {!winName && <p>it is a Draw</p>}
      <p>
        <button onClick={rematch}>Rematch</button>
      </p>
    </div>
  );
}
