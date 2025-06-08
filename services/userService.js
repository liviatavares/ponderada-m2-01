const db = require('../config/db');

// Função para obter todos os usuários
const getAllUsers = async () => {
  try {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  } catch (error) {
    throw new Error('Erro ao obter usuários: ' + error.message);
  }
};

// Função para obter um usuário por ID
const getUserById = async (id) => {
  try {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao obter usuário: ' + error.message);
  }
};

// Função para criar um novo usuário
const createUser = async ({ nome_usuario, email, localizacao, data_nascimento }) => {
  try {
    const result = await db.query(
      'INSERT INTO usuarios (nome_usuario, email, localizacao, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *',
      [nome_usuario, email, localizacao, data_nascimento]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao criar usuário: ' + error.message);
  }
};

// Função para atualizar um usuário por ID
const updateUser = async (id, { nome_usuario, email, localizacao, data_nascimento }) => {
  try {
    const result = await db.query(
      'UPDATE usuarios SET nome_usuario = $1, email = $2, localizacao = $3, data_nascimento = $4 WHERE id = $5 RETURNING *',
      [nome_usuario, email, localizacao, data_nascimento, id]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao atualizar usuário: ' + error.message);
  }
};

// Função para deletar um usuário por ID
const deleteUser = async (id) => {
  try {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  } catch (error) {
    throw new Error('Erro ao deletar usuário: ' + error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};