import express, { Router } from "express";
import bookController from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authMinddlewares.js";
import adminMiddleware from "../middlewares/adminMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, bookController.createBook);
router.get("/", authMiddleware, bookController.getAllBook);
router.get("/:id", authMiddleware, bookController.getBookById);
router.get("/search/:titulo", authMiddleware, bookController.getBookByTitle);
router.get("/categoria/:categoria", authMiddleware, bookController.getBookByCategory);
router.get("/quantidadedisponivel/qnt", authMiddleware, bookController.getAvailableBook);
router.put("/:id", authMiddleware, adminMiddleware, bookController.updateBook)
router.patch("/:id/desactivate", authMiddleware, adminMiddleware, bookController.desactivateBook);
export default router;
