const pool = require('../config/database');

class InscricaoModel {
  // Criar uma nova inscrição
  static async create(user_id, evento_id, status = 'confirmado') {
    try {
      const query = `
        INSERT INTO inscricao (user_id, evento_id, status)
        VALUES ($1, $2, $3)
        RETURNING *
      `;
      const result = await pool.query(query, [user_id, evento_id, status]);
      return result.rows[0];
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  // Verifica se já está inscrito
  static async findSubscription(user_id, evento_id) {
    try {
      const query = `
        SELECT * FROM inscricao
        WHERE user_id = $1 AND evento_id = $2
      `;
      const result = await pool.query(query, [user_id, evento_id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error finding subscription:', error);
      throw error;
    }
  }

  // Buscar todas as inscrições
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM inscricao ORDER BY data_inscricao DESC');
      return result.rows;
    } catch (error) {
      console.error('Error fetching all subscriptions:', error);
      throw error;
    }
  }

  // Buscar inscrições por usuário
  static async findByUserId(user_id) {
    try {
      const result = await pool.query(
        'SELECT * FROM inscricao WHERE user_id = $1 ORDER BY data_inscricao DESC',
        [user_id]
      );
      return result.rows;
    } catch (error) {
      console.error('Error fetching user subscriptions:', error);
      throw error;
    }
  }

  // Buscar eventos inscritos por um usuário
  static async getUserSubscribedEvents(user_id) {
    try {
      const query = `
        SELECT e.*, i.data_inscricao, i.status
        FROM inscricao i
        JOIN eventos e ON i.evento_id = e.id
        WHERE i.user_id = $1
        ORDER BY e.data_evento ASC
      `;
      const result = await pool.query(query, [user_id]);
      return result.rows;
    } catch (error) {
      console.error('Error fetching user events:', error);
      throw error;
    }
  }

  // Atualizar status
  static async updateStatus(user_id, evento_id, status) {
    try {
      const query = `
        UPDATE inscricao
        SET status = $3
        WHERE user_id = $1 AND evento_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [user_id, evento_id, status]);
      return result.rows[0];
    } catch (error) {
      console.error('Error updating subscription status:', error);
      throw error;
    }
  }

  // Cancelar inscrição
  static async delete(user_id, evento_id) {
    try {
      await pool.query(
        'DELETE FROM inscricao WHERE user_id = $1 AND evento_id = $2',
        [user_id, evento_id]
      );
    } catch (error) {
      console.error('Error deleting subscription:', error);
      throw error;
    }
  }
}

module.exports = InscricaoModel;
