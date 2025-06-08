// controllers/userController.js

const userService = require('../services/userService');

// Buscar todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    // Retorna os usuários com status 200 (OK)
    res.status(200).json(users);
  } catch (error) {
    // Em caso de erro, retorna status 500 (Erro Interno do Servidor) e a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

// Buscar usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      // Se o usuário for encontrado, retorna-o com status 200 (OK)
      res.status(200).json(user);
    } else {
      // Se o usuário não for encontrado, retorna status 404 (Não Encontrado)
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    // Em caso de erro, retorna status 500 (Erro Interno do Servidor) e a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

// Criar novo usuário
const createUser = async (req, res) => {
  try {
    const { nome_usuario, email, localizacao, data_nascimento } = req.body;
    // Chama o serviço para criar o novo usuário
    const newUser = await userService.createUser({ nome_usuario, email, localizacao, data_nascimento });
    // Retorna o novo usuário criado com status 201 (Criado)
    res.status(201).json(newUser);
  } catch (error) {
    // Em caso de erro, retorna status 500 (Erro Interno do Servidor) e a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

// Atualizar usuário existente
const updateUser = async (req, res) => {
  try {
    const { nome_usuario, email, localizacao, data_nascimento } = req.body;
    // Chama o serviço para atualizar o usuário pelo ID e os novos dados
    const updatedUser = await userService.updateUser(req.params.id, { nome_usuario, email, localizacao, data_nascimento });
    if (updatedUser) {
      // Se o usuário for atualizado com sucesso, retorna-o com status 200 (OK)
      res.status(200).json(updatedUser);
    } else {
      // Se o usuário não for encontrado para atualização, retorna status 404 (Não Encontrado)
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    // Em caso de erro, retorna status 500 (Erro Interno do Servidor) e a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

// Excluir usuário
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (deletedUser) {
      // Se o usuário for excluído com sucesso, retorna status 200 (OK) e uma mensagem de sucesso
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } else {
      // Se o usuário não for encontrado para exclusão, retorna status 404 (Não Encontrado)
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    // Em caso de erro, retorna status 500 (Erro Interno do Servidor) e a mensagem de erro
    res.status(500).json({ error: error.message });
  }
};

// Exporta todas as funções do controller para serem usadas por outras partes da aplicação
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};