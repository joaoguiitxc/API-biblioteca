import user from "../models/user.js";

// create user
const createUser = async (data) => {
  const { nome, email, telefone, ativo } = data;

  if (!nome || !email || !telefone || !ativo === undefined) {
    const error = new Error("Nome, email e telefone, são obrigatórios");
    error.statusCode = 400;
    throw error;
  }

  const userExists = await user.findOne({ email });

  if (userExists) {
    const error = new Error("Já existe um usuário com esse email");
    error.statusCode = 400;
    throw error;
  }


  return user.create({ nome, email, telefone, ativo })
}

//list user
const getAllUser = async () => {
  return user.find();
}

//list user by id
const getUserById = async (id) => {
  const userId = await userId.findById(id);

  if (!userId) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return userId.find();
}

// const updateUser = async (id, data) => {
//   const user = await user.findByIdAndUpdate(id, data, {
//     new: true,
//     runValidators: true,
//   });

//   if (!user) {
//     const error = new Error("Usuário não encontrado");
//     error.statusCode = 404;
//     throw error;
//   }

//   return user;
// }

// const deactivateUser = async (id) => {
//   const user = await user.findByIdAndUpdate(
//     id,
//     { ativo: false },
//     { new: true }
//   );

//   if (!user) {
//     throw new Error("Usuário não encontrado");
//   }

//   return user;




export default {
  createUser,
  getAllUser,
  getUserById,
}
//    
//   
//     updateUser,
//     deactivateUser






