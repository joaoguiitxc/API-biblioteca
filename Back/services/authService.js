import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

const register = async (data) => {

    const { nome, email, password, telefone, role } = data

    if (!nome || !email || !password) {
        throw new Error("Nome, email e senha são obrigatórios")
    }

    const userExists = await user.findOne({ email });

    if (userExists) {
        throw new  Error("Já existe um usuário com este email")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const User = await user.create({
        nome,
        email,
        password: hashedPassword,
        telefone,
        role: role || "user",
        ativo: true,
    });

    return {
        _id: User._id,
        nome: User.nome,
        email: User.email,
        telefone: User.telefone,
        role: User.role,
    };
}

const login = async (data) => {
    const { email, password } = data;
    if (!email || !password) {
        throw new Error("Email e senha são obrigatórios")
    }
    
const user = await user.find0ne.select("+password")

if(!user) {
    throw new Error("Email ou senha inválidos")
    
}

}

export default {
    register,
    login
}




