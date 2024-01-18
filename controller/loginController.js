import * as data from "../data/__loginData.js";

export async function getUserLoginInfo(req, res) {
  try {
    const output = `
    <h1>Login</h1>
    <form action="/api/login/" method="post">
      <p>
        <input type="text" name="user_id" placeholder="username">
        <input type="password" name="password" placeholder="password">
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
    `;
    res.send(output);
  } catch (error) {
    console.error("/login 라우트 페이지 에러 발생", error);
    res.status(500).json({ error: "Internet Server Error" });
  }
}

export async function authLogin(req, res) {
  const authPassword = req.body.password;
  const authUserId = req.body.user_id;

  const user = await data.getUserLoginInfo(authUserId);
  const { user_id, password } = user;

  if (user_id === authUserId && password === authPassword) {
    res.cookie("userId", user_id, { signed: true });
    res.cookie("isLogin", true, { signed: true });
    req.session.save(function () {
      res.redirect("/api/board/");
    });
  } else {
    res.send("로그인이 필요하세요? <a href='/api/login'>login</a>");
  }
}

export async function authLogout(req, res) {
  req.session.destroy(function (err) {
    res.redirect("/api/login");
  });
}
