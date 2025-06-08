const express = require('express');       
const router = express.Router();         

const isAuthenticated = require('../middleware/auth'); 
const FavoritoModel = require('../models/FavoritoModel'); // Modelo para operações de favoritos.
const InscricaoModel = require('../models/InscricaoModel'); // Modelo para operações de inscrição.

// Rota POST para adicionar ou remover eventos dos favoritos de um usuário.
router.post('/favoritos', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;      // Obtém o ID do usuário autenticado.
    const { evento_id } = req.body;          // Pega o ID do evento do corpo da requisição.
    const eventoIdNum = parseInt(evento_id, 10); // Converte para número.

    // Valida se o ID do evento é um número válido.
    if (isNaN(eventoIdNum)) {
      return res.status(400).json({ success: false, message: 'evento_id inválido' });
    }

    // Chama o modelo para alternar o status de favorito (adicionar/remover).
    const result = await FavoritoModel.toggleFavorite(userId, eventoIdNum);
    // Retorna a resposta com base no resultado da operação de toggle.
    res.json({
      success: true,
      message: result.favorited ? 'Adicionado aos favoritos' : 'Removido dos favoritos',
      isFavorite: result.favorited,
    });
  } catch (err) {
    console.error(err); // Loga o erro.
    res.status(500).json({ success: false, message: 'Erro interno' }); // Retorna erro genérico.
  }
});

// Rota GET para verificar se um evento é favorito de um usuário.
router.get('/favoritos/check/:evento_id', isAuthenticated, async (req, res) => {
  try {
    const userId = req.session.user.id;      // Obtém o ID do usuário.
    const eventoId = parseInt(req.params.evento_id, 10); // Converte para número.

    // Valida se o ID do evento é um número válido.
    if (isNaN(eventoId)) {
      return res.status(400).json({ success: false, message: 'evento_id inválido' });
    }

    const isFavorito = await FavoritoModel.isFavorite(userId, eventoId);
    res.json({ isFavorite: isFavorito }); // Retorna o status de favorito.
  } catch (err) {
    console.error(err); // Loga o erro.
    res.status(500).json({ isFavorite: false }); // Retorna erro.
  }
});

// Rota POST para inscrever um usuário em um evento.
router.post('/inscricoes', async (req, res) => {
  const { evento_id } = req.body;      // Pega o ID do evento.
  const userId = req.session.userId || 1; // Obtém o ID do usuário

  // Verifica se o usuário já está inscrito.
  const alreadySubscribed = await InscricaoModel.checkSubscription(userId, evento_id);
  if (alreadySubscribed) {
    return res.status(409).json({ success: false, message: 'Você já está inscrito neste evento.' });
  }

  // Se não estiver inscrito, cria a inscrição.
  await InscricaoModel.createSubscription(userId, evento_id);

  // Retorna sucesso e URL de redirecionamento.
  res.json({ success: true, redirectUrl: `/eventos/${evento_id}/confirmacao` });
});

module.exports = router; // Exporta o roteador.
