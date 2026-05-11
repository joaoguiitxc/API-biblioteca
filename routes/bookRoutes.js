import express, { Router } from "express";
import bookController from "../controllers/bookController.js";

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBook);
router.get("/:id", bookController.getBookById);
router.get("/search/:titulo", bookController.getBookByTitle);
router.get("/categoria/:categoria", bookController.getBookByCategory);
router.get("/quantidadedisponivel/qnt", bookController.getAvailableBook);
router.put("/:id", bookController.updateBook)
router.patch("/:id/desactivate", bookController.desactivateBook);
export default router;
