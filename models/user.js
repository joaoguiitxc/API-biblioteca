import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        telefone: {
            type: Number,
            required: true,
            trim: true,
        },
        ativo: {
            type: Boolean,
         default: true,
        }

    },
    {
        collection: "user",
        timestamps: true,
    }
);

export default mongoose.model("user", userSchema);