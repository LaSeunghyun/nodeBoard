import express from "express";
import { User } from "../data/db.index.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const users = await User.create({
      user_name: req.body.userName,
      email: req.body.email,
      password: req.body.password,
    }).then((user) => {
      console.log(user.toJSON());
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    const result = users.map((user) => ({
      userIdx: user.user_idx,
      userEmail: user.email,
      userName: user.user_name,
      status: user.status,
    }));
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:idx", async (req, res) => {
  const idx = req.params.idx;
  try {
    const users = await User.findOne({
      where: { user_idx: idx },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.put("/", async (req, res) => {
  const idx = req.body.idx;
  const email = req.body.email;
  const password = req.body.password;
  const userName = req.body.userName;
  try {
    const users = await User.update(
      {
        email: email,
        password: password,
        user_name: userName,
      },
      {
        where: {
          user_idx: idx,
        },
      }
    );
    if (users[0] === 1) res.send("변경완료");
    else if (users[0] === 0) res.send("변경된 내용이 없습니다.");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.delete("/:idx", async (req, res) => {
  const idx = req.params.idx;
  try {
    const users = await User.destroy({
      where: {
        user_idx: idx,
      },
    });
    if (users === 1) res.send("삭제완료");
    else if (users === 0) res.send("삭제된 내용이 없습니다.");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
