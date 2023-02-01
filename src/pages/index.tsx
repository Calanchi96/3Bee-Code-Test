import Gameboard from "../components/Gameboard/Gameboard";
import BoardBlock from "../components/BoardBlock/BoardBlock";
import { useEffect, useState } from "react";

const BoardBlockCount = ['0','1','2','3','4','5','6','7','8'];

export default function Home() {
  const [boardState, setBoardState] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("in progress...");

  const handleChange = (boardState: any, currentPlayer: any) => {
    // check if there are other moves available
    // fetch api to check if there is a winner
    // if winner open modal to show who is the winner
    // if no winner but moves available keep going
    // if no winner and no move is available show modal
    if (boardState && boardState.length > 0) {
      getApi()
      .then(res => res.json())
      .then(json => {
        if (json.winner === "X" || json.winner === "O") {
          alert("Player " + json.winner + " has won the game!");
          setGameStatus("finished");
        } else if (json.winner === "Draw") {
          alert("No winner! It's a draw");
          setGameStatus("finished");
        }
      });
    }
  };

  async function getApi() {
    const data = boardState;
    return await fetch(location.origin + "/api/post-winner", {
      method: 'POST',
      mode: "no-cors",
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(boardState)
    })
  } 

  useEffect(() => {
    handleChange(boardState, currentPlayer);
  },[boardState])

  const handleClick = (event: any, index: any) => {
    const newBoardState: any = [...boardState, { index: index, player: currentPlayer}];
    setBoardState(newBoardState);
    setCurrentPlayer(currentPlayer == "X" ? "O" : "X");
  }

  return (
    <>
      <main className="mainContainer">
        <div className="headerPart">
          Current Player: {currentPlayer}
          <button className="headerButton px-4" onClick={() => resetGame()}>RESET</button>
        </div>
        <Gameboard onChange={handleChange} className={gameStatus}>
          {BoardBlockCount.map((i) => 
          <BoardBlock 
            className={!!getCurrentBlock(i) ? " clicked " + getCurrentBlock(i)?.player : "" }
            index={i} 
            key={i} 
            player={getCurrentBlock(i)?.player}
            onClick={(ev: any) => !!getCurrentBlock(i) ? null : handleClick(ev, i)}
          >{getCurrentBlock(i)?.player}</BoardBlock>)}
        </Gameboard>
      </main>
    </>
  );

  function getCurrentBlock(i: any): any {
    return boardState.find((val: any) => val.index == i);
  }

  function resetGame(): any {
    setBoardState([]); 
    setCurrentPlayer("X"); 
    setGameStatus("in progress...");
  }
}
