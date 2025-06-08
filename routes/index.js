const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/eventoController');

// Rotas para o CRUD de Eventos e de filtragem
router.get("/eventos/filter", EventoController.buscarEventosComFiltros) 
router.post('/eventos', EventoController.criarEvento);
router.get("/eventos", EventoController.buscarEventosComFiltros)
router.put('/eventos/:id', EventoController.editarEvento);
router.delete('/eventos/:id', EventoController.excluirEvento);
router.get("/eventos/:id", EventoController.buscarEventoPorId)

module.exports = router;''

