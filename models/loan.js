// import mongoose from "mongoose";

// const loanSchema = new mongoose.Schema(
//     {
//         userId: {
//             type: Number,
//             ref: "User",
//             required: true,
//         },
//         bookId: {
//             type: Number,
//             ref: "Book",
//             required: true,
//         },
//         dataEmprestimo: {
//             type: Number,
//             required: true,
//         },
//         dataPrevistaDevolucao: {
//             type: String,
//             required: true,
//             enum: ["22/05", "23/05", "24/05", "25/05"],
//         },
//         dataDevolucao: {
//             type: Date,
//             default: Date.now,
//         },
//         status: {
//             type: Boolean,
//             enum: ["pendente", "devolvido", "cancelada"],
//           default: true,
//         },
//         multa: {
//             type: Number,
//             required: true,
//         }
//     },
//     {
//         collection: "loan",
//         timestamps: true,
//     }
// );

// export default mongoose.model("Loan", loanSchema);