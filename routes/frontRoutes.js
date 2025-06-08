// Importa o módulo 'express' para criar e gerenciar rotas.
const express = require('express');
// Cria uma instância de Router do Express para definir rotas.
const router = express.Router();

// Importa a configuração do pool de conexão com o banco de dados.
const pool = require('../config/database'); 

// Importa os Modelos para interagir com o banco de dados.
const EventoModel = require('../models/eventoModel');
const UsuarioModel = require('../models/UsuarioModel');
const InscricaoModel = require('../models/InscricaoModel');
const FavoritoModel = require('../models/FavoritoModel'); 

// Importa o middleware de autenticação para proteger certas rotas.
const isAuthenticated = require('../middleware/auth');

// Rota para a página inicial (Home Page)
// Exibe uma lista de eventos em destaque e passa o objeto 'filters' (vazio por padrão).
router.get('/', async (req, res) => {
  try {
    // Busca todos os eventos do banco de dados.
    const eventos = await EventoModel.findAll();
    // Renderiza a página 'layout/home.ejs'.
    // Importante: Passa 'filters' como um objeto vazio para evitar 'filters is not defined'.
    // Passa 'user' (nulo se não logado) e os primeiros 6 eventos.
    res.render('layout/home', {
      eventos: eventos.slice(0, 6), // Limita aos 6 primeiros eventos.
      user: req.session.user || null, // Garante que 'user' seja sempre definido.
      filters: {} // Adiciona 'filters' para evitar ReferenceError no EJS.
    });
  } catch (err) {
    // Em caso de erro ao carregar a página, loga e renderiza uma página de erro 500.
    console.error('Erro ao carregar página inicial:', err);
    res.status(500).render('error', {
      message: 'Erro ao carregar página inicial',
      error: err
    });
  }
});

// Rota para a página de login. Redireciona se o usuário já estiver logado.
router.get('/login', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/'); // Redireciona para home se já logado.
  }
  // Renderiza a página de login com um erro inicial nulo.
  res.render('layout/login', { error: null });
});

// Rota para processar o formulário de login (POST)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Valida as credenciais do usuário usando o UsuarioModel.
    const user = await UsuarioModel.validateLogin(email, password);

    if (user) {
      // Se o login for bem-sucedido, armazena informações do usuário na sessão.
      req.session.user = {
        id: user.id,
        nome_usuario: user.nome_usuario,
        email: user.email
      };
      res.redirect('/'); // Redireciona para a página inicial.
    } else {
      // Se as credenciais forem inválidas, renderiza a página de login com erro.
      res.render('layout/login', { error: 'Email ou senha inválidos' });
    }
  } catch (err) {
    // Em caso de erro, loga e renderiza a página de login com erro genérico.
    console.error('Erro no login:', err);
    res.render('layout/login', { error: 'Erro ao fazer login. Tente novamente.' });
  }
});

// Rota para a página de registro. Redireciona se o usuário já estiver logado.
router.get('/register', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/'); // Redireciona para home se já logado.
  }
  // Renderiza a página de registro com um erro inicial nulo.
  res.render('layout/register', { error: null });
});

// Rota para processar o formulário de registro (POST)
router.post('/register', async (req, res) => {
  try {
    const { nome, email, data_nascimento, localizacao, senha } = req.body;
    // Verifica se já existe um usuário com o email fornecido.
    const existingUser = await UsuarioModel.findByEmail(email);

    if (existingUser) {
      // Se o email já estiver cadastrado, renderiza a página de registro com erro.
      return res.render('layout/register', { error: 'Este email já está cadastrado' });
    }
    // Cria um novo usuário no banco de dados.
    const user = await UsuarioModel.create({
      nome_usuario: nome,
      email,
      data_nascimento,
      localizacao,
      senha
    });
    // Armazena as informações do novo usuário na sessão.
    req.session.user = {
      id: user.id,
      nome_usuario: user.nome_usuario,
      email: user.email
    };
    res.redirect('/'); // Redireciona para a página inicial após o registro.
  } catch (err) {
    // Em caso de erro, loga e renderiza a página de registro com erro genérico.
    console.error('Erro no cadastro:', err);
    res.render('layout/register', { error: 'Erro ao realizar cadastro. Tente novamente.' });
  }
});

// Rota para a página de perfil do usuário (protegida por autenticação)
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    // Busca os detalhes completos do usuário logado pelo ID da sessão.
    const user = await UsuarioModel.findById(req.session.user.id);
    // Se o usuário não for encontrado (ex: removido do DB), redireciona para logout.
    if (!user) {
      return res.redirect('/logout');
    }
    // Renderiza a página de perfil, passando os dados do usuário.
    res.render('layout/profile', { user });
  } catch (err) {
    // Em caso de erro, loga e redireciona para logout (como fallback de segurança).
    console.error('Erro ao buscar perfil:', err);
    res.redirect('/logout');
  }
});

// Rota para a página de listagem de eventos com filtros
router.get('/eventos', async (req, res) => {
  try {
    // Coleta todos os parâmetros de query string como o objeto 'filters'.
    const filters = req.query;

    let eventos;
    // Verifica se há *quaisquer* parâmetros de filtro na URL.
    if (Object.keys(filters).length > 0) {
      // Se houver filtros, busca os eventos que correspondem aos critérios.
      eventos = await EventoModel.findByFilters(filters);
    } else {
      // Se não houver filtros, busca todos os eventos.
      eventos = await EventoModel.findAll();
    }

    // Renderiza a página, passando a lista de eventos, os filtros aplicados e os dados do usuário.
    res.render('layout/index', { // Assumindo 'layout/index.ejs' é a página de listagem principal
      eventos,
      filters, // 'filters' é passado diretamente como o objeto req.query.
      user: req.session.user || null // Garante que 'user' seja sempre definido.
    });
  } catch (err) {
    // Em caso de erro, loga e renderiza uma página de erro 500.
    console.error('Erro ao carregar eventos:', err);
    res.status(500).render('error', {
      message: 'Erro ao carregar eventos',
      error: err
    });
  }
});

// Rota para logout
router.get('/logout', (req, res) => {
  // Destrói a sessão do usuário.
  req.session.destroy(() => {
    // Redireciona o usuário para a página de login após o logout.
    res.redirect('/login');
  });
});

// Rota para detalhes de um evento específico (por ID), com múltiplas URLs possíveis.
router.get(['/event/:id', '/evento/:id', '/eventos/:id'], isAuthenticated, async (req, res) => {
  try {
    // Converte o ID do parâmetro da URL para um número inteiro.
    const id = parseInt(req.params.id, 10);

    // Validação: Garante que o ID é um número válido.
    if (isNaN(id)) {
      return res.status(400).render('error', { message: 'ID do evento inválido', error: { status: 400 } });
    }

    // Busca o evento pelo ID usando o EventoModel.
    const evento = await EventoModel.findById(id);

    // Se o evento não for encontrado, renderiza uma página de erro 404.
    if (!evento) {
      return res.status(404).render('error', { message: 'Evento não encontrado', error: { status: 404 } });
    }

    // Renderiza a página de detalhes do evento, passando os dados do evento e do usuário.
    res.render('layout/event-details', { evento, user: req.session.user || null });
  } catch (err) {
    // Em caso de erro, loga e renderiza uma página de erro 500.
    console.error('Erro ao buscar detalhes do evento:', err);
    res.status(500).render('error', { message: 'Erro ao carregar detalhes do evento', error: err });
  }
});

// Rota para a página "Meus Eventos" (eventos do usuário logado)
router.get("/meus-eventos", async (req, res) => {
  // Verifica se há um usuário na sessão. Se não, redireciona para o login.
  if (!req.session.user) {
    return res.redirect("/login");
  }

  try {
    // Busca as inscrições do usuário logado usando o InscricaoModel (específico para inscrições).
    const inscricao = await InscricaoModel.getUserSubscribedEvents(req.session.user.id);
    // Busca os favoritos do usuário logado usando o FavoritoModel (específico para favoritos).
    const favoritos = await FavoritoModel.getUserFavorites(req.session.user.id);

    // Renderiza a página 'layout/meus-eventos.ejs', passando as informações do usuário, suas inscrições e seus eventos favoritos.
    res.render("layout/meus-eventos", {
      user: req.session.user,
      inscricao: inscricao, // Passando o array de inscrições.
      favoritos: favoritos,
    });
  } catch (err) {
    // Em caso de erro, loga e renderiza uma página de erro 500.
    console.error("Erro ao carregar meus eventos:", err);
    res.status(500).render("error", {
      message: "Erro ao carregar seus eventos",
      error: err,
    });
  }
});

// Exporta o router para ser usado no arquivo principal da aplicação.
module.exports = router;