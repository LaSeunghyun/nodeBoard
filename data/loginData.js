import { db } from "./database.js";

export async function getUserLoginInfo(userInfo) {
  console.log(userInfo, "<<<<<<");
  const user_id = userInfo.user_id;
  const query = "SELECT * FROM tb_user where user_id = ?";
  try {
    const result = await db.execute(query, [user_id]);
    // if (result[0] ) {
    //   return "존재하는 아이디가 없습니다.";
    // }
    if (result[0][0].password != userInfo.password) {
      return "패스워드가 일치하지 않습니다.";
    }
    return result[0][0];
  } catch (error) {
    console.error("Login DATA 페이지에서 오류 발생", error);
    throw new Error("사용자 정보를 가져오는 도중 오류가 발생했습니다.");
  }
}
