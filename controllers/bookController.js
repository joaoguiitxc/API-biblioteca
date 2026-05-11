import bookService from "../services/bookService.js";

const createBook = async (req, res, next) => {
    try {
        const book = await bookService.createBook(req.body);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
}

const getAllBook = async (req, res, next) => {
    try {
        const book = await bookService.getAllBook();
        res.json(book);
    } catch (error) {
        next(error);
    }
}

const getBookById = async (req, res, next) => {
    try {
        const bookId = await bookService.getBookById(req.params.id);
        res.json(bookId);
    } catch (error) {
        next(error);
    }
}


const getBookByTitle = async (req, res, next) => {
    try {
        const bookTitle = await bookService.getBookByTitle(req.params.titulo);
        res.json(bookTitle);
    } catch (error) {
        next(error);
    }
}

const getBookByCategory = async (req, res, next) => {
    try {
        const bookCategory = await bookService.getBookByCategory(req.params.categoria);
        res.json(bookCategory);
    } catch (error) {
        next(error);
    }
}

const getAvailableBook = async (req, res, next) => {
    try {
        const bookAvailable = await bookService.getAvailableBook();
        res.json(bookAvailable);
    } catch (error) {
        next(error);
    }
};

const updateBook = async (req, res, next) => {
    try {
        const updateBook = await bookService.updateBook(req.params.id, req.body);
        res.json(updateBook);
    } catch (error) {
        next(error);
    }
};


const desactivateBook = async (req, res, next) => {
    try {
        const offBook = await bookService.desactivateBook(req.params.id);
        res.json(offBook);
    } catch (error) {
        next(error);
    }
};




export default {
    createBook,
    getAllBook,
    getBookById,
    getBookByTitle,
    getBookByCategory,
    getAvailableBook,
    updateBook,
    desactivateBook
}




