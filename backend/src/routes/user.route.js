import { Router } from "express";
import {
  addFavorite,
  getFavorites,
  getUser,
  login,
  register,
  removeFavorite,
} from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getUser);

router.post("/favorites", authMiddleware, addFavorite);
router.get("/favorites", authMiddleware, getFavorites);
router.delete("/favorites/:cca3", authMiddleware, removeFavorite);

export default router;
