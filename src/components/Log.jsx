export default function Log({ gameTurn }) {
  return (
    <ol id="log">
      {gameTurn.map((turn) => (
        <li key={`${turn.square.row}${turn.square.col}`}>
          {turn.player} Selected {turn.square.row} , {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
