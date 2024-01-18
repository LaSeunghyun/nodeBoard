import express from "express";
import boardRouter from "./routes/boardRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
import loginRouter from "./routes/loginRoutes.js";
import session from "express-session";
import bodyParser from "body-parser";
import { sequelize } from "./data/db.index.js";

const app = express();
const port = 3000;

sequelize
  .sync()
  .then(() => console.log("connected database"))
  .catch((err) => console.error("occurred error in database connecting", err));

app.use(express.json());
// 쿠키 파싱용 미들웨어
app.use(cookieParser("cookieParserKeyTest"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    // HTTPONLY : JS를 통해 Session, Cookie 사용불가
    HttpOnly: true,
    secure: true,
    secret: "sessionTest",
    saveUninitialized: true,
  })
);

app.use("/api/board", boardRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);

app.listen(port, () => {
  console.log(`${port} PORT 접속 성공 !`);
});
