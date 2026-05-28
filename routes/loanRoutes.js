import express from "express";
import loanController from "../controllers/loanController.js";

const router = express.Router();

router.post("/", loanController.createLoan);
router.get("/", loanController.getAllLoan);
router.get("/:id", loanController.getLoanById);
router.get("/user/:userId", loanController.getLoanUserId);
router.get("/activate/algcoisa", loanController.getLoanActivate);
router.get("/:id/return", loanController.returnBook);
router.get("/loan/overdue", loanController.listOverdueLoans);
router.post("/loan/:id/fine/simulate", loanController.simulateFine);
router.get("/admin/dashbord/", loanController.dashBordGeral);
router.get("/admin/users/with-active-loans", loanController.listUsersWithActiveLoans);
router.get("/admin/books/most-borrowed", loanController.listMostBorrowedBooks);
router.get("/admin/fines", loanController.listFines);
export default router;