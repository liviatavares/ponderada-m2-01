const pool = require('../config/database');

class FavoritoModel {
  // Adiciona favorito
  static async addFavorite(userId, eventoId) {
    if (!userId || !eventoId) {
      throw new Error(`Parâmetros inválidos em addFavorite: userId=${userId}, eventoId=${eventoId}`);
    }

    try {
      const query = `
        INSERT INTO favoritos (user_id, evento_id)
        VALUES ($1, $2)
        ON CONFLICT (user_id, evento_id) DO NOTHING
        RETURNING *
      `;
      const result = await pool.query(query, [userId, eventoId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Erro ao adicionar favorito (userId=${userId}, eventoId=${eventoId}):`, error);
      throw error;
    }
  }

  // Busca todos os eventos favoritados por um usuário
  static async findByUserId(userId) {
    try {
      const query = `
        SELECT e.*
        FROM favoritos f
        JOIN eventos e ON f.evento_id = e.id
        WHERE f.user_id = $1
        ORDER BY e.data_evento ASC
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error(`Erro ao buscar favoritos do usuário ${userId}:`, error);
      throw error;
    }
  }

  // Remove um evento dos favoritos
  static async removeFavorite(userId, eventoId) {
    try {
      const query = `
        DELETE FROM favoritos
        WHERE user_id = $1 AND evento_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [userId, eventoId]);
      return result.rows[0] || null;
    } catch (error) {
      console.error(`Erro ao remover favorito (userId=${userId}, eventoId=${eventoId}):`, error);
      throw error;
    }
  }

  // Verifica se um evento está nos favoritos do usuário
  static async isFavorite(userId, eventoId) {
    try {
      const query = `
        SELECT 1 FROM favoritos
        WHERE user_id = $1 AND evento_id = $2
        LIMIT 1
      `;
      const result = await pool.query(query, [userId, eventoId]);
      return result.rows.length > 0;
    } catch (error) {
      console.error(`Erro ao verificar favorito (userId=${userId}, eventoId=${eventoId}):`, error);
      throw error;
    }
  }

  // Lista todos os eventos favoritados por um usuário
  static async getUserFavorites(userId) {
    try {
      const query = `
        SELECT e.*
        FROM favoritos f
        JOIN eventos e ON f.evento_id = e.id
        WHERE f.user_id = $1
        ORDER BY e.data_evento ASC
      `;
      const result = await pool.query(query, [userId]);
      return result.rows;
    } catch (error) {
      console.error(`Erro ao obter favoritos do usuário ${userId}:`, error);
      throw error;
    }
  }

  // Alterna favorito: se for favorito, remove; se não for, adiciona
  static async toggleFavorite(userId, eventoId) {
    try {
      const isFav = await this.isFavorite(userId, eventoId);
      if (isFav) {
        const removed = await this.removeFavorite(userId, eventoId);
        return { favorited: false, success: !!removed };
      } else {
        const added = await this.addFavorite(userId, eventoId);
        return { favorited: true, success: !!added };
      }
    } catch (error) {
      console.error(`Erro ao alternar favorito (userId=${userId}, eventoId=${eventoId}):`, error);
      throw error;
    }
  }
}

module.exports = FavoritoModel;
