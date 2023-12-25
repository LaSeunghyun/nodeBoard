import * as data from "../data/userData.js";

export async function createUser(req, res) {
  const newUser = req.body;
  const insertId = await data.createUser(newUser);
  res.status(201).json({ insertId: insertId });
}

export async function getUserInfo(req, res) {
  const userInfo = await data.getUserInfo();
  res.send(userInfo);
}

export async function getUserIdInfo(req, res) {
  const { userIdx } = req.params;
  const userIdInfo = await data.getUserIdInfo(userIdx);
  res.send(userIdInfo);
}

export async function delUserIdInfo(req, res) {
  const { userIdx } = req.params;
  const delIdInfo = await data.delUserIdInfo(userIdx);
  res.send(delIdInfo);
}

export async function putUserIdInfo(req, res) {
  const changedRows = await data.putUserIdInfo(req.body);
  res.status(201).json({ changedRows: changedRows });
}
