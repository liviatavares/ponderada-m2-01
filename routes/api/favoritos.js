const express = require('express');
const router = express.Router();  
const FavoritoModel = require('../../models/FavoritoModel'); // Importa o modelo de Favoritos.

// Função auxiliar para obter o ID do usuário
const getUserId = (req) => req.session?.userId || 1; // user 1 fixo para testes

// Rota GET para verificar se um evento é favorito do usuário.
router.get('/check/:eventoId', async (req, res) => {
  try {
    const userId = getUserId(req);             // Obtém o ID do usuário.
    const eventoId = parseInt(req.params.eventoId); // Converte o ID do evento para inteiro.
    if (isNaN(eventoId)) return res.status(400).json({ error: 'eventoId inválido' }); // Valida o ID do evento.

    const isFav = await FavoritoModel.isFavorite(userId, eventoId); // Chama o modelo para verificar.
    res.json({ favorite: isFav }); // Retorna o status de favorito.
  } catch (error) {
    console.error('Error checking favorite status:', error); // Loga o erro.
    res.status(500).json({ error: 'Internal Server Error' }); // Retorna erro 500.
  }
});

// Rota POST para adicionar um evento aos favoritos.
router.post('/', async (req, res) => {
  try {
    const userId = req.session.userId || 1; // Obtém o ID do usuário
    const { evento_id } = req.body;      // Pega o ID do evento do corpo da requisição.

    if (!evento_id) { // Valida se o ID do evento foi fornecido.
      return res.status(400).json({ success: false, message: 'ID do evento é obrigatório.' });
    }

    const favorito = await FavoritoModel.addFavorite(userId, evento_id); // Tenta adicionar o favorito.

    // Se 'favorito' for null, significa que já existia
    if (!favorito) {
      return res.status(200).json({ success: true, message: 'Evento já está nos favoritos', favorito: null });
    }
    res.status(201).json({ success: true, favorito }); // Retorna sucesso e o favorito adicionado.
  } catch (error) {
    console.error('Error adding favorite:', error); // Loga o erro.
    res.status(500).json({ error: 'Internal Server Error' }); // Retorna erro 500.
  }
});

// Rota DELETE para remover um favorito.
router.delete('/:eventoId', async (req, res) => {
  try {
    const userId = getUserId(req);             // Obtém o ID do usuário.
    const eventoId = parseInt(req.params.eventoId); // Converte o ID do evento para inteiro.
    if (isNaN(eventoId)) return res.status(400).json({ error: 'eventoId inválido' }); // Valida o ID do evento.

    const removed = await FavoritoModel.removeFavorite(userId, eventoId); // Tenta remover o favorito.
    if (!removed) { // Se nada foi removido, significa que não foi encontrado.
      return res.status(404).json({ success: false, message: 'Favorito não encontrado' });
    }

    res.json({ success: true, message: 'Favorito removido' }); // Retorna sucesso.
  } catch (error) {
    console.error('Error removing favorite:', error); // Loga o erro.
    res.status(500).json({ error: 'Internal Server Error' }); // Retorna erro 500.
  }
});

// Rota GET para listar todos os favoritos de um usuário.
router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req); // Obtém o ID do usuário.
    const favoritos = await FavoritoModel.getUserFavorites(userId); // Busca todos os favoritos do usuário.
    res.json(favoritos); // Retorna a lista de favoritos.
  } catch (error) {
    console.error('Error fetching favorites:', error); // Loga o erro.
    res.status(500).json({ error: 'Internal Server Error' }); // Retorna erro 500.
  }
});

module.exports = router; // Exporta o router.