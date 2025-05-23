const db = require('../config/database'); // Importa a conexão com o banco de dados

module.exports = {
  // Busca todos os eventos, ordenando pelo nome do evento
  async findAll() {
    const result = await db.query('SELECT * FROM eventos ORDER BY nome_evento ASC');
    return result.rows; // Retorna todos os eventos encontrados
  },

  // Cria um novo evento com os dados fornecidos
  async create(nome_evento, tipo, localizacao_evento, data_evento, duracao) {
    const query = `
      INSERT INTO eventos (nome_evento, tipo, localizacao_evento, data_evento, duracao)
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await db.query(query, [nome_evento, tipo, localizacao_evento, data_evento, duracao]);
    return result.rows[0]; // Retorna o evento criado
  },

  // Atualiza um evento existente pelo ID com os novos dados fornecidos
  async update(id, nome_evento, tipo, localizacao_evento, data_evento, duracao) {
    const query = `
      UPDATE eventos SET nome_evento = $1, tipo = $2, localizacao_evento = $3, data_evento = $4, duracao = $5
      WHERE id = $6 RETURNING *`;
    const result = await db.query(query, [nome_evento, tipo, localizacao_evento, data_evento, duracao, id]);
    return result.rows[0]; // Retorna o evento atualizado
  },

  // Exclui um evento pelo ID
  async delete(id) {
    await db.query('DELETE FROM eventos WHERE id = $1', [id]);
    // Não retorna nada, apenas executa a exclusão
  }
};