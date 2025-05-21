// controllers/eventoController.js
const pool = require('../config/database');

// Criar uma nova tarefa
exports.criarEvento = async (req, res) => {
  const { nome_evento, tipo, localizacao_evento, data_evento, duracao } = req.body;

  const query = `
    INSERT INTO eventos (nome_evento, tipo, localizacao_evento, data_evento, duracao)
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [nome_evento, tipo, localizacao_evento, data_evento, duracao];

  try {
    const result = await pool.query(query, values);
    const evento = result.rows[0];
    res.status(201).json(evento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as Eventos
exports.listarEventos = async (req, res) => {
  const query = 'SELECT * FROM eventos';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma Evento
exports.editarEvento = async (req, res) => {
  const { id } = req.params;
  const { nome_evento, tipo, localizacao_evento, data_evento, duracao } = req.body;

  const query = `
    UPDATE eventos SET nome_evento = $1, tipo = $2, localizacao_evento = $3, data_evento = $4, duracao = $5
    WHERE id = $6 RETURNING *`;
  const values = [nome_evento, tipo, localizacao_evento, data_evento, duracao, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma Evento
exports.excluirEvento = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM eventos WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};