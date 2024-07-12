import express from "express";
import {
  addVideo,
  addViews,
  deleteVideo,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trends,
  updateVideo,
} from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();

//create a vedio
router.post("/", verifyToken, addVideo);
//update vedio
router.put("/:id", verifyToken, updateVideo);
//delete user
router.delete("/:id", verifyToken, deleteVideo);
//get a vedio
router.get("/find/:id", getVideo);
//views
router.put("/views/:id", addViews);
//trend video
router.get("/trend", trends);
//random video
router.get("/random", random);
//subscribe channel video
router.get("/sub", verifyToken, sub);
//tag
router.get("/tags", getByTag);
//search by title
router.get("/search", search);
export default router;
