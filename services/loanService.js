
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
    },
    { new: true, runValidators: true }

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

const returnBook = async (id) => {

  const loanReturn = await loan.findById(id)

  if (!loanReturn) {
    const error = new Error("empréstimo não encontrado");
    error.statusCode = 404;
    throw error;
  }

  if (loanReturn.quantidadeDisponivel <= 0) {
    const error = new Error("esse livro não está disponível para empréstimos");
    error.statusCode = 400;
    throw error;
  }

  const datedevolution = await loan.findByIdAndUpdate(
    id,
    {
      datadevolucao: Date.now(),
    },
    { new: true, runValidators: true }
  )

  const statusback = await loan.findByIdAndUpdate(
    id,
    {
      status: "devolvido",
    },
    { new: true, runValidators: true }
  )

  const increaseAvailableQuantity = await book.findByIdAndUpdate(
    id,
    {
      $inc: { quantidadeDisponivel: 1 }
    },
    { new: true, runValidators: true }

  )

  const milissegundosDeAtraso = Date.now() - loanReturn.dataPrevistaDevolucao;
  const dias = parseInt(milissegundosDeAtraso / (1000 * 60 * 60 * 24));
  const multa = dias > 0 ? dias * 2 : 0;

  const advertence = await loan.findByIdAndUpdate(
    id,
    {
      multa
    },
    { new: true, runValidators: true }

  )

  return {
    loanReturn,
    multa
  }
}

const listOverdueLoans = async () => {
  const overdueLoans = await loan.find({
    status: "pendente", dataPrevistaDevolucao: { $lte: new Date() }
  })

  return overdueLoans;
}

const simulateFine = async (id) => {
  const loanSimulateFine = await loan.findById(id)

  if (!loanSimulateFine) {
    const error = new Error("empréstimo não encontrado")
    error.statusCode = 404;
    throw error;
  }

  const dias = (Date.now() - loan.dataPrevistaDevolucao) / (1000 * 60 * 60 * 24);
  const multa = dias > 0 ? dias * 2 : 0;

  return {
    multa
  }
}
const dashBordGeral = async () => {
  const totalUsuarios = await user.countDocuments();
  const totalUsuariosAtivos = await user.countDocuments({
    status: "ativo"
  })
  const totalLivros = await book.countDocuments();
  const totalLivrosAtivos = await book.countDocuments({
    status: "ativo"
  })
  const totalLivrosDisponiveis = await book.countDocuments({
    quantidadeDisponivel: { $gt: 0 }
  })
  const totalEmprestimos = await loan.countDocuments();
  const totalEmprestimosAtivos = await loan.countDocuments({
    status: "pendente"
  })
  const totalEmprestimosAtrasados = await loan.countDocuments({
    status: "pendente",
    dataPrevistaDevolucao: { $lt: new Date() }
  })
  const multas = await loan.find();

  const totalMultasGeradas = await loan.countDocuments({
    multa: { $gt: 0 }
  })

  return {
    totalUsuarios,
    totalUsuariosAtivos,
    totalLivros,
    totalLivrosAtivos,
    totalLivrosDisponiveis,
    totalEmprestimos,
    totalEmprestimosAtivos,
    totalEmprestimosAtrasados,
    totalMultasGeradas
  }
}

const listUsersWithActiveLoans = async () => {
  const lsti = await loan.find
    ({
      status: "pendente"
    })
  return lsti;
}



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
  dashBordGeral,
  listUsersWithActiveLoans,
  listMostBorrowedBooks

}
