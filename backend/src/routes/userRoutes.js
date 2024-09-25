import express from "express";
import {
	loginUser,
	logOutUser,
	registerUser,
	getUser,
	updateUser,
} from "../controllers/auth/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);
router.get("/user", protect, getUser);
router.patch("/user", protect, updateUser);

export default router;
