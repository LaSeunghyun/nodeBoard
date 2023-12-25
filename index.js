import express from "express";
import boardRouter from "./routes/boardRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import * as loginController from "./controller/loginController.js";

const app = express();
const port = 3000;

// 쿠키 KEY
const USER_COOKIE_KEY = "COOKIE";

app.use(express.json());
// 쿠키 파싱용 미들웨어
app.use(cookieParser());
// x-www-form-urlencoded 타입의 form 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));

app.post("/login", async (req, res) => {
  const userIdInfo = await loginController.getUserLoginInfo(req, res);
  if (!userIdInfo) {
    return `${req.body.user_id} 계정이 확인되질 않습니다.`;
  }

  res.cookie(USER_COOKIE_KEY, JSON.stringify(userIdInfo), {
    expires: new Date.now() + 3600000,
  });
});

app.use("/board", boardRouter);
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`${port} PORT 접속 성공 !`);
});
