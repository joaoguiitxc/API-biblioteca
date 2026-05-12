
import loan from "../models/loan.js";
import user from "../models/user.js";
import book from "../models/book.js";

const createLoan = async (data) => {
    const { userId, bookId, diasParaDevolucao } = data;

    if (!userId || !bookId || !diasParaDevolucao) {
        const error = new Error("userId,bookId,dias para devolução são");
        error.statusCode = 400;
        throw error;
    }

    const userCreate = await user.findById(userId);

    if (!userCreate) {
        const error = new Error("Usuário não encontrado");
        error.statusCode = 404;
        throw error;
    }

    const loans = await loan.find({ userId });

    const livroJaEmprestado = loans.some(
        (item) =>
            item.bookId.toString() === bookId &&
            item.status === "pendente"
    );

    if (livroJaEmprestado) {
        const error = new Error("voce ja tem um livro desse em sua posse");
        error.statusCode = 400;
        throw error;
    }

  const books = await book.findById(bookId);

    const updateBook = await book.findByIdAndUpdate(
        bookId,
        {
           quantidadeDisponivel: books.quantidadeDisponivel - 1,
        }
    )

    const Loan = await loan.create({
        userId: userId,
        bookId: bookId,
        dataPrevistaDevolucao: Date.now()+7,
    })

    return Loan;

}



export default {
    createLoan
}
