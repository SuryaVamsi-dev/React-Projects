import { useState } from "react";

export default function Player({ name, symbol, isActive, updateName }) {
  const [pName, setPName] = useState(name);
  const [isEditing, setIsEditing] = useState(false);

  function onClickHandler() {
    setIsEditing((edit) => !edit);
    if (isEditing) {
      updateName(symbol, pName);
    }
  }
  function onChangeHandler(event) {
    setPName(event.target.value);

    //console.log(pName);
  }
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (
          <input
            onChange={onChangeHandler}
            type="text"
            placeholder="Name"
            required
            value={pName}
          />
        ) : (
          <span className="player-name">{pName}</span>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={onClickHandler}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
