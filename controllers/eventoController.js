const EventoModel = require('../models/eventoModel');

// Criar um novo evento
exports.criarEvento = async (req, res) => {
  const { nome_evento, tipo, localizacao_evento, data_evento, duracao } = req.body;
  try {
    const evento = await EventoModel.create(nome_evento, tipo, localizacao_evento, data_evento, duracao);
    res.status(201).json(evento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todos os eventos
exports.listarEventos = async (req, res) => {
  try {
    const eventos = await EventoModel.findAll();
    res.status(200).json(eventos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar um evento
exports.editarEvento = async (req, res) => {
  const { id } = req.params;
  const { nome_evento, tipo, localizacao_evento, data_evento, duracao } = req.body;
  try {
    const evento = await EventoModel.update(id, nome_evento, tipo, localizacao_evento, data_evento, duracao);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json(evento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir um evento
exports.excluirEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await EventoModel.delete(id);
    if (!evento) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }
    res.status(200).json({ message: 'Evento excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};