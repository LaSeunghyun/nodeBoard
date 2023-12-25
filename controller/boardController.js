import * as data from "../data/boardData.js";

export async function createBoard(req, res) {
  const newBoard = req.body;
  const insertId = await data.createBoard(newBoard);
  res.status(201).json({ insertId: insertId });
}

export async function getBoardInfo(req, res) {
  const boardInfo = await data.getBoardInfo();
  res.send(boardInfo);
}

export async function getBoardIdInfo(req, res) {
  const { boardIdx } = req.params;
  const boardIdInfo = await data.getBoardIdInfo(boardIdx);
  res.send(boardIdInfo);
}

export async function delBoardIdInfo(req, res) {
  const { boardIdx } = req.params;
  const delIdInfo = await data.delBoardIdInfo(boardIdx);
  res.send(delIdInfo);
}

export async function putBoardIdInfo(req, res) {
  const changedRows = await data.putBoardIdInfo(req.body);
  res.status(201).json({ changedRows: changedRows });
}
