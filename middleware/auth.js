// middleware/auth.js

// Este middleware verifica se o usuário está autenticado
const isAuthenticated = (req, res, next) => {
  // Verifica se existe uma sessão e se há um usuário logado na sessão
  if (req.session && req.session.user) {
    // Se o usuário estiver autenticado, chama a próxima função middleware ou rota
    return next();
  }
  // Se o usuário não estiver autenticado, redireciona para a página de login
  res.redirect('/login');
};

// Exporta a função isAuthenticated para ser usada como middleware em rotas protegidas
module.exports = isAuthenticated;