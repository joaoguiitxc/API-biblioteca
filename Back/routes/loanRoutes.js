import express from "express";
import loanController from "../controllers/loanController.js";
import authController from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMinddlewares.js";
import adminMiddleware from "../middlewares/adminMiddlewares.js";

const router = express.Router();

router.post("/", authMiddleware, loanController.createLoan);
router.get("/", authMiddleware, loanController.getAllLoan);
router.get("/:id", authMiddleware, loanController.getLoanById);
router.get("/user/:userId", authMiddleware, loanController.getLoanUserId);
router.get("/activate/algcoisa", authMiddleware, loanController.getLoanActivate);
router.get("/:id/return", authMiddleware, loanController.returnBook);
router.get("/loan/overdue", authMiddleware, loanController.listOverdueLoans);
router.post("/loan/:id/fine/simulate", authMiddleware, adminMiddleware, loanController.simulateFine);
router.get("/admin/dashbord/",authMiddleware, adminMiddleware, loanController.dashBordGeral);
router.get("/admin/users/with-active-loans",authMiddleware,adminMiddleware, loanController.listUsersWithActiveLoans);
router.get("/admin/books/most-borrowed",authMiddleware,adminMiddleware, loanController.listMostBorrowedBooks);
router.get("/admin/fines",authMiddleware, loanController.listFines);
export default router;