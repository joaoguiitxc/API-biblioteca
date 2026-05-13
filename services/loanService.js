
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
}

const getAllLoan = async () => {
  return loan.find()
};

const getLoanById = async (id) => {
  const loanId = await loan.findById(id);

  if (!loanId) {
    const error = new Error("empréstimo não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return loanId;
};

const getLoanUserId = async (userId) => {
  return loan.find({ userId: userId })
    .populate("userId")
    .populate("bookId");
};

const getLoanActivate = async () => {
  return loan.find({ status: "pendente" })
    .populate("userId")
    .populate("bookId");
};

// const patchBook = async () => {
// }

export default {
  createLoan,
  getAllLoan,
  getLoanById,
  getLoanUserId,
  getLoanActivate
}
