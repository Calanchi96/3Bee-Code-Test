import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get board state and currentPlayer
  // If no winner return 404
  // IF winner return 200 body {winner: "X"}
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  
  const body = req.body;

  const Winner = checkWinningCondition(body);
  if (!Winner) {
    res.status(404).json({ winner: "no winner"});
  } else if (checkWinningCondition(body) === "X" || checkWinningCondition(body) === "O") {
    res.status(200).json({ winner: Winner });
  } else {
    res.status(200).json({ winner: "Draw" });
  }
}

function checkWinningCondition(req: any): any {
  let Winner: string = "";
  let GameFinished: boolean = false;
  if (req.length >= 9) {
    GameFinished = true;
  };
  
  const xPos = req?.filter((val: any) => val.player === "X");
  const oPos = req?.filter((val: any) => val.player === "O");

  const positions: {xPos: any[], oPos: any[]} = {xPos: xPos.sort((a: any,b: any) => sortByIndex(a, b)), oPos: oPos.sort((a: any,b: any) => sortByIndex(a, b))};

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

function sortByIndex(a: any, b: any) {
    if (a.index > b.index) {
        return 1;
    } else if (a.index < b.index) {
        return -1;
    }
    return 0;
}

function returnWinningCondition(val: any): any {
    const xPos = val.xPos.map((val: any) => val.index);
    const oPos = val.oPos.map((val: any) => val.index);
  const winningCondition1 = ["0","1","2"];
  const winningCondition2 = ["3","4","5"];
  const winningCondition3 = ["6","7","8"];
  const winningCondition4 = ["0","4","8"];
  const winningCondition5 = ["2","4","6"];

  return (
    winningCondition1.every((x: any) => xPos.includes(x)) ||
    winningCondition2.every((x: any) => xPos.includes(x)) ||
    winningCondition3.every((x: any) => xPos.includes(x)) ||
    winningCondition4.every((x: any) => xPos.includes(x)) ||
    winningCondition5.every((x: any) => xPos.includes(x))
    ) ? 
  "X" : 
  (
    winningCondition1.every((o: any) => oPos.includes(o)) ||
    winningCondition2.every((o: any) => oPos.includes(o)) ||
    winningCondition3.every((o: any) => oPos.includes(o)) ||
    winningCondition4.every((o: any) => oPos.includes(o)) ||
    winningCondition5.every((o: any) => oPos.includes(o))) ? 
  "O" : 
  false;
}

function stringify(array: Array<any>) {
  return JSON.stringify(array);
}
