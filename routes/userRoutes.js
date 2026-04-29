import express from "express";
import userController from "../controllers/userController.js";

const router = express.Router();

router.post("/", userController.createUser);
router.get("/", userController.getAllUser);
router.get("/:id/", userController.getUserById);
// router.put("/:id", userController.updateUser);
// router.patch("/:id", userController.deactivateUser);

export default router;