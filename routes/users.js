import express from "express";
import {
  deleteUser,
  dislikeVideo,
  getUser,
  likeVideo,
  subscribeVideo,
  unsubscribeVideo,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//update user
router.put("/:id", verifyToken, updateUser);
//delete user
router.delete("/:id", verifyToken, deleteUser);
//get a user
router.get("/find/:id", getUser);
//subscribe a user
router.put("/sub/:id", verifyToken, subscribeVideo);
//unsubscribe a user
router.put("/unsub/:id", verifyToken, unsubscribeVideo);
//like a vedio
router.put("/like/:id", verifyToken, likeVideo);
//dislike a vedio
router.put("/dislike/:id", verifyToken, dislikeVideo);
export default router;
