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

  const userId = await user.findById(id);

  if (!userId) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return userId;
}

const updateUser = async (id, data) => {
  const userUpdate = await user.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!userUpdate) {
    const error = new Error("Usuário não encontrado");
    error.statusCode = 404;
    throw error;
  }

  return userUpdate;
}

const userDesativate = async (id) => {
  const userDesativate = await user.findById(id)
 

  if (!userDesativate) {
    const error = new Error("não foi possível encontrar usuário!");
    error.statusCode = 404;
    throw error;
  }

 userDesativate.ativo = false
await userDesativate.save();

return userDesativate;
}




export default {
  createUser,
  getAllUser,
  getUserById,
  updateUser,
  userDesativate,
}









