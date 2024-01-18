// import { db } from "./__database.js";

// export async function createBoard(newBoard) {
//   console.log(newBoard);
//   const { idx, subject, content, created, user_id, user_name, hit } = newBoard;

//   const query =
//     "INSERT INTO tb_board (idx, subject, content, created, user_id, user_name, hit) VALUES(?, ?, ?, ?, ?, ?, ?)";

//   try {
//     const [result] = await db.execute(query, [
//       idx,
//       subject,
//       content,
//       new Date(),
//       user_id,
//       user_name,
//       hit,
//     ]);
//     const insertId = result.insertId;
//     console.log(insertId);
//     return insertId;
//   } catch (error) {
//     console.error("데이터 삽입 중 오류", error);
//     throw error;
//   }
// }

// export async function getBoardInfo() {
//   const query = "SELECT * FROM tb_board";
//   return await db.execute(query).then((result) => result[0]);
// }

// export async function getBoardIdInfo(idx) {
//   console.log(idx);
//   const query = "SELECT * FROM tb_board where idx = ?";
//   return await db.execute(query, [idx]).then((result) => result[0]);
// }

// export async function delBoardIdInfo(idx) {
//   const query = "DELETE FROM tb_board where idx = ?";
//   return await db.execute(query, [idx]).then((result) => result[0]);
// }

// export async function putBoardIdInfo(req) {
//   const { idx, subject, content } = req;
//   const article = "SELECT * FROM tb_board where idx =" + idx;
//   const selectInfo = await db.execute(article).then((result) => result[0][0]);
//   if (selectInfo.idx != Number(idx)) {
//     return "매칭되는 정보가 없습니다.";
//   }
//   const query = "UPDATE tb_board SET subject = ?, content = ? WHERE idx = ?";
//   const changedRows = await db
//     .execute(query, [subject, content, idx])
//     .then((result) => result[0]);
//   return changedRows.changedRows;
// }
