const express = require('express'); 
const router = express.Router(); 
const isAuthenticated = require('../../middleware/auth'); // Importa middleware de autenticação.
const InscricaoModel = require('../../models/InscricaoModel'); // Importa o modelo de Inscrição.

// Rota POST para realizar uma nova inscrição em um evento. Usa 'isAuthenticated' para garantir que apenas usuários logados possam se inscrever.
router.post('/', isAuthenticated, async (req, res) => {
  try {
    // Verifica se o usuário está autenticado e se o ID do usuário está disponível na sessão.
    if (!req.session || !req.session.user || !req.session.user.id) {
      return res.status(401).json({ success: false, message: 'Usuário não autenticado.' });
    }

    const userId = req.session.user.id; // Obtém o ID do usuário da sessão.
    const { evento_id } = req.body;      // Extrai o ID do evento do corpo da requisição.
    const eventoIdNum = parseInt(evento_id, 10); // Converte o ID do evento para número.

    // Valida se o ID do evento é um número válido.
    if (isNaN(eventoIdNum)) {
      return res.status(400).json({ success: false, message: 'ID do evento inválido.' });
    }

    // Verifica se o usuário já está inscrito no evento.
    const inscrito = await InscricaoModel.findSubscription(userId, eventoIdNum);

    // Se já estiver inscrito, retorna um conflito (status 409).
    if (inscrito) {
      return res.status(409).json({ success: false, message: 'Você já está inscrito neste evento.' });
    }

    // Cria a nova inscrição no banco de dados.
    await InscricaoModel.create(userId, eventoIdNum);
    // Retorna uma resposta de sucesso.
    res.json({ success: true, message: 'Inscrição realizada com sucesso!' });
  } catch (err) {
    // Loga o erro e retorna uma mensagem de erro genérica.
    console.error('Erro ao inscrever:', err);
    res.status(500).json({ success: false, message: 'Erro ao inscrever' });
  }
});

module.exports = router; 