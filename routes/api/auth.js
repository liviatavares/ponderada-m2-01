const express = require('express'); 
const router = express.Router();     
const db = require('../database');   // Importa a conexão com o banco de dados.

// Rota POST para login de usuário.
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body; // Pega o email do corpo da requisição.

    // Busca o usuário no banco de dados pelo email.
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await db.query(query, [email]);

    // Se nenhum usuário for encontrado, retorna erro 401.
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const user = result.rows[0]; // Pega o primeiro (e único) usuário encontrado.

    delete user.senha; // Remove a senha do objeto do usuário antes de enviar a resposta.

    res.json({ user }); // Retorna os dados do usuário (sem a senha).
  } catch (err) {
    console.error('Erro no login:', err); // Loga qualquer erro ocorrido.
    res.status(500).json({ error: 'Erro interno no servidor' }); // Retorna um erro genérico 500.
  }
});

module.exports = router; // Exporta o router para ser usado pela aplicação principal.
