import loanService from "../services/loanService.js";

const createLoan = async (req, res, next) => {
    try {
        const loan = await loanService.createLoan(req.body);
        res.status(201).json(loan);
    } catch (error) {
        next(error);
    }
}

const getAllLoan = async (req, res, next) => {
    try {
        const loan = await loanService.getAllLoan();
        res.json(loan);
    } catch (error) {
        next(error);
    }
}

const getLoanById = async (req, res, next) => {
    try {
        const loanId = await loanService.getLoanById(req.params.id);
        res.json(loanId);
    } catch (error) {
        next(error);
    }
}

const getLoanUserId = async (req, res, next) => {
    try {
        const loanUserId = await loanService.getLoanUserId(req.params.userId);
        res.json(loanUserId);
    } catch (error) {
        next(error);
    }
}

const getLoanActivate = async (req, res, next) => {
    try {
        const loanActivate = await loanService.getLoanActivate(req.params.status);
        res.json(loanActivate);
    } catch (error) {
        next(error);
    }
}
const returnBook = async (req, res, next) => {
    try {
        const loan = await loanService.returnBook(req.params.id);
        res.json(loan);
    } catch (error) {
        next(error);
    }
}

const listOverdueLoans = async (req, res, next) => {
    try {
        const loan = await loanService.listOverdueLoans(req.params.status);
        res.json(loan);
    } catch (error) {
        next(error);
    }
}

const simulateFine = async (req, res, next) => {
    try {
        const loanSimulateFine = await loanService.simulateFine(req.params.id);
        res.json(loanSimulateFine);
    } catch (error) {
        next(error);
    }
};

const dashBordGeral = async (req, res, next) => {
    try {
        const dashboard = await loanService.dashBordGeral();
        res.json(dashboard);
    } catch (error) {
        next(error);
    }
};

const listUsersWithActiveLoans = async (req, res, next) => {
    try {
        const lsti = await loanService.listUsersWithActiveLoans();
        res.json(lsti);
    } catch (error) {
        next(error);
    }
};


const listMostBorrowedBooks = async (req, res, next) => {
    try {
        const listBooks = await loanService.listMostBorrowedBooks();
        res.json(listBooks);
    } catch (error) {
        next(error);
    }
};

export default {
    createLoan,
    getAllLoan,
    getLoanById,
    getLoanUserId,
    getLoanActivate,
    returnBook,
    listOverdueLoans,
    simulateFine,
    dashBordGeral,
    listUsersWithActiveLoans,
    listMostBorrowedBooks
}

