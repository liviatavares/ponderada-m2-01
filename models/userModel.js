const db = require('../config/db'); // Importa a conexão com o banco de dados

// Define a classe User para manipulação dos usuários no banco
class User {
  // Busca todos os usuários
  static async getAll() {
    const result = await db.query('SELECT * FROM usuarios');
    return result.rows;
  }

  // Busca um usuário pelo ID
  static async getById(id) {
    const result = await db.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Cria um novo usuário com os dados fornecidos
  static async create(data) {
    const result = await db.query(
      'INSERT INTO usuarios (nome_usuario, email, localizacao, data_nascimento) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.nome_usuario, data.email, data.localizacao, data.data_nascimento]
    );
    return result.rows[0];
  }

  // Atualiza um usuário existente pelo ID
  static async update(id, data) {
    const result = await db.query(
      'UPDATE usuarios SET nome_usuario = $1, email = $2, localizacao = $3, data_nascimento = $4 WHERE id = $5 RETURNING *',
      [data.nome_usuario, data.email, data.localizacao, data.data_nascimento, id]
    );
    return result.rows[0];
  }

  // Exclui um usuário pelo ID
  static async delete(id) {
    const result = await db.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0; // Retorna true se algum usuário foi deletado
  }
}

module.exports = User; // Exporta a classe User para uso em outros arquivos