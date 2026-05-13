import express from "express";
import loanController from "../controllers/loanController.js";

const router = express.Router();

router.post("/", loanController.createLoan);
router.get("/", loanController.getAllLoan);
router.get("/:id", loanController.getLoanById);
router.get("/user/:userId", loanController.getLoanUserId);
router.get("/activate/algcoisa", loanController.getLoanActivate);
export default router;