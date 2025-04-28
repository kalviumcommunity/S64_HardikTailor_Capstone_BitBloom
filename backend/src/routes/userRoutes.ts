import express from "express";
import { signup, login, googleAuth } from "../controller/authController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/google-auth" , googleAuth);

export default router;
