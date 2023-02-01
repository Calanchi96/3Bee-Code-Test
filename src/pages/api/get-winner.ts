import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get board state and currentPlayer
  // If no winner return 404
  // IF winner return 200 body {winner: "X"}
  const Winner = checkWinningCondition(req);
  if (!Winner) {
      res.status(404);
  } else if (checkWinningCondition(req) === "X" || checkWinningCondition(req) === "O") {
    res.status(200).json({ winner: Winner });
  } else {
    res.status(200).json({ winner: "Draw" });
  }

  return res;
}

function checkWinningCondition(req: any): any {
  let Winner: string = "";
  let GameFinished: boolean = false;
  if (req.length >= 9) {
    return GameFinished = true;
  }

  const positions: {xPos: any[], oPos: any[]} = {xPos: req.filter((val: any) => val.value === "X"), oPos: req.filter((val: any) => val.value === "O")};

  switch(returnWinningCondition(positions)) {
    case 'X':
      Winner = "X";
      GameFinished = true;
      break;
    case "O":
      Winner = "O";
      GameFinished = true;
      break;
    case false:
      return GameFinished;
  }

  return Winner;
}

function returnWinningCondition(val: any): any {
  const winningCondition1 = [0,1,2];
  const winningCondition2 = [3,4,5];
  const winningCondition3 = [6,7,8];
  const winningCondition4 = [0,4,8];
  const winningCondition5 = [2,4,6];

  return (val.xPos == winningCondition1 || val.xPos == winningCondition2 || val.xPos == winningCondition3 || val.xPos == winningCondition4 || val.xPos == winningCondition5) ? 
  "X" : 
  (val.oPos == winningCondition1 || val.oPos == winningCondition2 || val.oPos == winningCondition3 || val.oPos == winningCondition4 || val.oPos == winningCondition5) ? 
  "O" : 
  false;
}

function stringify(array: Array<any>) {
  return JSON.stringify(array);
}
