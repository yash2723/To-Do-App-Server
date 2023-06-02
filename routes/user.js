import express from "express";
import { getAllUsers, register, login, getMyProfile, logout } from "../controllers/user.js";
import { isAuthenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout)

router.get("/me", isAuthenticate, getMyProfile);

export default router;