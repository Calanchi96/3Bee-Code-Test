import Gameboard from "../components/Gameboard/Gameboard";
import BoardBlock from "../components/BoardBlock/BoardBlock";
import { useState } from "react";

const BoardBlockCount = ['1','2','3','4','5','6','7','8','9']

export default function Home() {
  const [boardState, setBoardState] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");

  const handleChange = (boardState, currentPlayer) => {
    // check if there are other moves available
    // fetch api to check if there is a winner
    // if winner open modal to show who is the winner
    // if no winner but moves available keep going
    // if no winner and no move is available show modal
  };

  const handleClick = (event: any, index: number) => {
    setBoardState([
      ...boardState,
      { index: index, player: currentPlayer }
    ]);
    setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
  }

  return (
    <>
      <main className="mainContainer">
        <div className="headerPart">
          Current Player: {currentPlayer}
          <button className="headerButton px-4">RESET</button>
        </div>
        <Gameboard onChange={handleChange}>
          {BoardBlockCount.map((i) => <BoardBlock 
            className={!!boardState.find((val) => val.index == i) ? " clicked " + boardState.find((val) => val.index == i).player : "" }
            index={i} 
            key={i} 
            onClick={(ev: any) => !!boardState.find((val) => val.index == i) ? null : handleClick(ev, i)}
          />)}
        </Gameboard>
      </main>
    </>
  );
}
