import * as data from "../data/loginData.js";

export async function getUserLoginInfo(req, res) {
  try {
    const userInfo = req.body;
    const userIdInfo = await data.getUserLoginInfo(userInfo);
    if (!userIdInfo) {
      return res
        .status(400)
        .json({ error: "사용자 정보를 찾을 수 없습니다. " });
    }
    return userIdInfo;
  } catch (error) {
    console.error("/login 라우트 페이지 에러 발생", error);
    res.status(500).json({ error: "Internet Server Error" });
  }
}
