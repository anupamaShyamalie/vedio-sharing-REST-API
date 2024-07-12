import express from "express";
import { googleAuth, login, register } from "../controllers/auth.js";
const router = express.Router();

//crate a user
router.post("/register", register);
//login user
router.post("/login", login);
//google authentication
router.post("/google", googleAuth);
export default router;
