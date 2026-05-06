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

//     const getBookById = async (id) => {
//         const book = await book.findById(id);

//         if (!book) {
//             const error = new Error("livro não encontrado");
//             error.statusCode = 404;
//             throw error;
//         }

//         return book;
//     }

//     const getCarByTitle = async (id) => {
//         const book = await book.findById(id);

//         if (!book) {
//             const error = new Error("Carro não encontrado");
//             error.statusCode = 404;
//             throw error;
//         }

//         return book;
//     }

//     const getBookByCategory = async ()


//     const getAvailableBook = async () => {
//         return book.find({ disponivel: true });
//     }

//     const updateBook = async (id, data) => {
//         const book = await Book.findById(id);

//         if (!book) {
//             const error = new Error("Livro não encontrado");
//             error.statusCode = 404;
//             throw error;
//         }

//         // valores atuais
//         const quantidadeTotalAtual = book.quantidadeTotal;
//         const quantidadeDisponivelAtual = book.quantidadeDisponivel;

//         const emprestados = quantidadeTotalAtual - quantidadeDisponivelAtual;

//         // se estiver tentando alterar quantidadeTotal
//         if (data.quantidadeTotal !== undefined) {
//             if (data.quantidadeTotal < emprestados) {
//                 const error = new Error(
//                     "Quantidade total não pode ser menor que a quantidade emprestada"
//                 );
//                 error.statusCode = 400;
//                 throw error;
//             }
//         }

//         // faz o update
//         Object.assign(book, data);

//         await book.save();

//         return book;
//     }


//     const deactivateBook = async (id) => {
//         const book = await book.findByIdAndUpdate(
//             id,
//             { ativo: false },
//             { new: true }
//         );

//         if (!book) {
//             throw new Error("Livro não encontrado");
//         }

//         return user;
//     };

export default {
    createBook,
    getAllBook
}

