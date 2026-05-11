import book from "../models/book.js";
// import loan from "../models/loan.js"


const createBook = async (data) => {
    const { titulo, autor, categoria, ano, quantidadeTotal, quantidadeDisponivel } = data;

    if (!titulo || !autor || !quantidadeTotal > 0 || quantidadeTotal === quantidadeDisponivel) {
        const error = new Error("título, autor, quantidade total e quantidade disponível  são obrigatórios");
        error.statusCode = 400;
        throw error;
    }

    return book.create({
        titulo,
        autor,
        categoria,
        ano,
        quantidadeDisponivel,
        quantidadeTotal
    })
}


const getAllBook = async () => {
    return book.find();
}

const getBookById = async (id) => {
    const bookId = await book.findById(id);

    if (!bookId) {
        const error = new Error("livro não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return bookId;
}

const getBookByTitle = async (titulo) => {
    return book.find({
        titulo: { $regex: titulo, $options: "i" }
    });
};

const getBookByCategory = async (categoria) => {
    return book.find({
        categoria: { $regex: categoria, $options: "i" }
    });
};


const getAvailableBook = async () => {
    return book.find({
        quantidadeDisponivel: { $gte: 0 },
    });

}


const updateBook = async (id, data) => {
    const updateBook = await book.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

    if (!updateBook) {
        const error = new Error("livro não encontrado");
        error.statusCode = 404;
        throw error;
    }

    return updateBook;
};

const desactivateBook = async (id) => {
    const offBook = await book.findByIdAndUpdate(
        id,
        { ativo: false },
        { new: true }
    );

    if (!offBook) {
        throw new Error("Livro não encontrado");
    }

    return offBook;
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

