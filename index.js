import express from "express";
import boardRouter from "./routes/boardRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import * as loginController from "./controller/loginController.js";
import path from "path";
import cors from "cors";

const app = express();
const port = 3000;

// 쿠키 KEY
const USER_COOKIE_KEY = "COOKIE";

app.use(express.json());
// 쿠키 파싱용 미들웨어
app.use(cookieParser());
// x-www-form-urlencoded 타입의 form 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/login", async (req, res) => {
  try {
    const userIdInfo = await loginController.getUserLoginInfo(req, res);
    if (!userIdInfo) {
      return `${req.body.user_id} 계정이 확인되질 않습니다.`;
    }

    if (userIdInfo) {
      const expirationDate = new Date(Date.now() + 3600000);
      console.log(userIdInfo);
      res.cookie(USER_COOKIE_KEY, JSON.stringify(userIdInfo), {
        expires: expirationDate,
      });
    }

    res.send("로그인 성공");
  } catch (error) {
    console.error("에러 발생:", error);
    // 에러 응답
    res.status(500).send("서버 에러");
  }
});

app.use("/board", boardRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`${port} PORT 접속 성공 !`);
});
