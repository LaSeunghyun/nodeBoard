import express from "express";
import * as userController from "../controller/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getUserInfo);
router.get("/:userIdx", userController.getUserIdInfo);
router.delete("/:userIdx", userController.delUserIdInfo);
router.put("/", userController.putUserIdInfo);

export default router;
