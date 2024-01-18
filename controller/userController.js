import * as data from "../data/__userData.js";

export async function createUser(req, res) {
  const newUser = req.body;
  const insertId = await data.createUser(newUser);
  res.status(201).json({ insertId: insertId });
}

export async function getUserInfo(req, res) {
  const userInfo = await data.getUserInfo();
  // return userInfo;
  res.send(userInfo);
}

export async function getUserIdInfo(req, res) {
  const { user_id } = req.body;
  const userIdInfo = await data.getUserIdInfo(user_id);
  return userIdInfo[0];
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
