import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true,
        },

        autor: {
            type: String,
            required: true,
            // unique: true,
            lowercase: true,
            trim: true,
        },

        categoria: {
            type: String,
            required: true,
            trim: true,
        },

        quantidadeDisponivel: {
            type: Number,
            required: true,
            trim: true,
        },

        quantidadeTotal: {
            type: Number,
            required: true,
            trim: true,
        },

        ano: {
            type: String,
            required: true,
            trim: true,
        },

        ativo: {
            type: Boolean,
            default: true,
        },

    },
    {
        collection: "book",
        timestamps: true,
    }
);

export default mongoose.model("Book", bookSchema);