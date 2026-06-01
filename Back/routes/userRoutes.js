import express from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMinddlewares.js";
import adminMiddleware from "../middlewares/adminMiddlewares.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, userController.getAllUser);
router.get("/:id/", authMiddleware, adminMiddleware, userController.getUserById);
router.put("/:id",authMiddleware, userController.updateUser);
router.patch("/:id/ativo", authMiddleware, userController.userDesativate);

export default router;