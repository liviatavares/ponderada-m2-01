const db = require('../config/database'); // Importa a conexão com o banco de dados.

class UsuarioModel {
  // Busca um usuário pelo email.
  static async findByEmail(email) {
    try {
      // Executa uma query SQL para encontrar um usuário pelo email.
      const result = await db.query(
        'SELECT * FROM usuarios WHERE email = $1',
        [email]
      );
      // Retorna o primeiro usuário encontrado (ou undefined se nenhum for encontrado).
      return result.rows[0];
    } catch (err) {
      // Loga o erro no console e o relança para ser tratado externamente.
      console.error('Error in UsuarioModel.findByEmail:', err);
      throw err;
    }
  }

  // Busca um usuário pelo ID, retornando apenas dados seguros (sem senha).
  static async findById(id) {
    try {
      // Executa uma query SQL para encontrar um usuário pelo ID, selecionando colunas específicas.
      const result = await db.query(
        'SELECT id, nome_usuario, email, localizacao, data_nascimento FROM usuarios WHERE id = $1',
        [id]
      );
      // Retorna o primeiro usuário encontrado.
      return result.rows[0];
    } catch (err) {
      // Loga o erro e o relança.
      console.error('Error in UsuarioModel.findById:', err);
      throw err;
    }
  }

  // Valida as credenciais de login (email e senha).
  static async validateLogin(email, password) {
    try {
      // Executa uma query SQL para encontrar um usuário com email e senha correspondentes.
      const result = await db.query(
        'SELECT * FROM usuarios WHERE email = $1 AND senha = $2',
        [email, password]
      );
      // Retorna o usuário se as credenciais forem válidas, ou undefined caso contrário.
      return result.rows[0];
    } catch (err) {
      // Loga o erro e o relança.
      console.error('Error in UsuarioModel.validateLogin:', err);
      throw err;
    }
  }

  // Cria um novo usuário no banco de dados.
  static async create({ nome_usuario, email, data_nascimento, localizacao, senha }) {
    try {
      // Query SQL para inserir um novo usuário.
      const query = `
        INSERT INTO usuarios (nome_usuario, email, data_nascimento, localizacao, senha)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nome_usuario, email, localizacao, data_nascimento
      `;
      // Executa a query com os dados do novo usuário.
      const result = await db.query(query, [
        nome_usuario,
        email,
        data_nascimento,
        localizacao,
        senha
      ]);
      // Retorna o usuário recém-criado.
      return result.rows[0];
    } catch (err) {
      // Loga o erro e o relança.
      console.error('Error in UsuarioModel.create:', err);
      throw err;
    }
  }
}

module.exports = UsuarioModel; // Exporta a classe UsuarioModel para ser usada em outras partes da aplicação.