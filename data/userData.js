import { db } from "./database.js";

export async function createUser(newUser) {
  const { user_idx, user_id, user_name, email, password, profile_picture } =
    newUser;

  const query =
    "INSERT INTO tb_user (user_idx, user_id, user_name, email, password, created_at, last_login, is_admin, profile_picture, status) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const [result] = await db.execute(query, [
      user_idx,
      user_id,
      user_name,
      email,
      password,
      new Date(),
      new Date(),
      0,
      profile_picture,
      "active",
    ]);
    const insertId = result.insertId;
    return insertId;
  } catch (error) {
    console.error("데이터 삽입 중 오류", error);
    throw error;
  }
}

export async function getUserInfo() {
  const query = "SELECT * FROM tb_user";
  return await db.execute(query).then((result) => result[0]);
}

export async function getUserIdInfo(idx) {
  console.log(idx);
  const query = "SELECT * FROM tb_user where user_idx = ?";
  return await db.execute(query, [idx]).then((result) => result[0]);
}

export async function delUserIdInfo(idx) {
  const query = "DELETE FROM tb_user where user_idx = ?";
  return await db.execute(query, [idx]).then((result) => result[0]);
}

export async function putUserIdInfo(req) {
  const { idx, subject, content } = req;
  const article = "SELECT * FROM tb_user where user_idx =" + idx;
  const selectInfo = await db.execute(article).then((result) => result[0][0]);
  if (selectInfo.idx != Number(idx)) {
    return "매칭되는 정보가 없습니다.";
  }
  const query =
    "UPDATE tb_user SET subject = ?, content = ? WHERE user_idx = ?";
  const changedRows = await db
    .execute(query, [subject, content, idx])
    .then((result) => result[0]);
  return changedRows.changedRows;
}
