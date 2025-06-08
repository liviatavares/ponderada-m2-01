const express = require('express');
const router = express.Router();
const EventoModel = require('../models/eventoModel');
const isAuthenticated = require('../middleware/auth');

// GET /eventos busca e retorna todos os eventos disponíveis.
router.get('/eventos', async (req, res) => {
  try {
    const eventos = await EventoModel.findAll();
    res.json(eventos);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar eventos'
    });
  }
});

// GET /eventos/filter filtra eventos com base em parâmetros de query 
router.get('/eventos/filter', async (req, res) => {
  try {
    const { tipo, data, localizacao, classificacao_indicativa, acessibilidade } = req.query;

    const eventos = await EventoModel.findByFilters({
      tipo,
      data,
      localizacao,
      classificacao_indicativa,
      acessibilidade
    });

    res.json({
      success: true,
      eventos
    });
  } catch (err) {
    console.error('Error filtering events:', err);
    console.error('Stack trace:', err.stack);

    res.status(500).json({
      success: false,
      message: 'Erro ao filtrar eventos',
      error: err.message
    });
  }
});

// GET /eventos/:id busca e retorna um evento específico pelo seu ID.
router.get('/eventos/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);

  // Validação: Garante que o ID é um número inteiro válido.
  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID inválido. Deve ser um número inteiro.'
    });
  }

  try {
    const evento = await EventoModel.findById(id);

    // Verifica se o evento foi encontrado.
    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado'
      });
    }

    res.json(evento);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar evento'
    });
  }
});

// POST /eventos cria um novo evento no banco de dados.
router.post('/eventos', isAuthenticated, async (req, res) => {
  try {
    const {
      nome_evento,
      tipo,
      localizacao_evento,
      data_evento,
      duracao,
      classificacao_indicativa,
      acessibilidade
    } = req.body;

    const evento = await EventoModel.create({
      nome_evento,
      tipo,
      localizacao_evento,
      data_evento,
      duracao,
      classificacao_indicativa,
      acessibilidade
    });

    res.status(201).json({ // Status 201 indica "Created"
      success: true,
      message: 'Evento criado com sucesso',
      evento
    });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao criar evento'
    });
  }
});

// PUT /eventos/:id atualiza um evento existente pelo seu ID.
router.put('/eventos/:id', isAuthenticated, async (req, res) => {
  try {
    const {
      nome_evento,
      tipo,
      localizacao_evento,
      data_evento,
      duracao,
      classificacao_indicativa,
      acessibilidade
    } = req.body;

    const evento = await EventoModel.update(req.params.id, {
      nome_evento,
      tipo,
      localizacao_evento,
      data_evento,
      duracao,
      classificacao_indicativa,
      acessibilidade
    });

    // Verifica se o evento foi encontrado para atualização.
    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento atualizado com sucesso',
      evento
    });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar evento'
    });
  }
});

// DELETE /eventos/:id
// Exclui um evento pelo seu ID. Requer autenticação.
router.delete('/eventos/:id', isAuthenticated, async (req, res) => {
  try {
    const evento = await EventoModel.delete(req.params.id);

    // Verifica se o evento foi encontrado para exclusão.
    if (!evento) {
      return res.status(404).json({
        success: false,
        message: 'Evento não encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Evento excluído com sucesso'
    });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({
      success: false,
      message: 'Erro ao excluir evento'
    });
  }
});

module.exports = router;