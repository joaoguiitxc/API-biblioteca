import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        bookId: {
            type: String,
            ref: "Book",
            required: true,
        },
        dataEmprestimo: {
            type: Date,
            required: true,
            default: Date.now,
        },
        dataPrevistaDevolucao: {
            type: Date,
            required: true,
        },
        dataDevolucao: {
            type: Date,
        },
        status: {
            type: String,
            enum: ["pendente", "devolvido", "cancelada"],
            required: true,
            default: "pendente",
        },
        multa: {
            type: Number,
        }
    },
    {
        collection: "loan",
        timestamps: true,
    }
);

export default mongoose.model("Loan", loanSchema);