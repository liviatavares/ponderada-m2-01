// routes/index.js
const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');

// Rotas para o CRUD de Eventos
router.post('/eventos', EventoController.criarEvento);
router.get('/eventos', EventoController.listarEventos);
router.put('/eventos/:id', EventoController.editarEvento);
router.delete('/eventos/:id', EventoController.excluirEvento);

module.exports = router;''