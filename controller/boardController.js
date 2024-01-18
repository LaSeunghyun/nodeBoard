import * as data from "../data/__boardData.js";

export async function createBoard(req, res) {
  const newBoard = req.body;
  const insertId = await data.createBoard(newBoard);
  res.status(201).json({ insertId: insertId });
}

export async function getBoardInfo(req, res) {
  console.log(req.signedCookies);
  if (req.signedCookies.isLogin) {
    const boardInfo = await data.getBoardInfo();
    let boardList = "";
    boardInfo.forEach((board) => {
      boardList += `
      <li>Subject : ${board.subject}</li>
      <li>Created : ${board.created}</li>
      <li>User_id : ${board.user_id}</li>
      <li>Hit : ${board.hit}</li>
      <br />
      `;
    });
    res.send(`
    ${req.signedCookies.userId}님 만나서 반가워요 | <a href='/api/login/logout'>logout</a>
    <ul>
      ${boardList}
    </ul>
    `);
  } else {
    res.send(`
      <h1>Welcome</h1>
      <a href='/api/login/'>Login</a>
    `);
  }
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
