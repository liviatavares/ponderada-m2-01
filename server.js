const express = require('express');   // Importa o framework Express.js.
const path = require('path');         // Importa o módulo 'path' para lidar com caminhos de arquivos.
const cors = require('cors');         // Importa o middleware CORS para permitir requisições de outras origens.
const session = require('express-session'); // Importa o middleware 'express-session' para gerenciar sessões.
require('dotenv').config();           // Carrega variáveis de ambiente do arquivo .env.
const InscricaoModel = require('./models/InscricaoModel'); // Importa o modelo de Inscrição.
const FavoritoModel = require('./models/FavoritoModel');   // Importa o modelo de Favorito.

const app = express(); // Cria uma instância do aplicativo Express.
const port = process.env.PORT || 3000; // Define a porta do servidor, usando a variável de ambiente ou 3000 como padrão.

// --- Middlewares Essenciais ---
app.use(cors()); // Habilita o CORS para todas as rotas (permite requisições de domínios diferentes).
app.use(express.json({ strict: false })); // Habilita o parsing de JSON para o corpo das requisições (strict: false permite não-objetos JSON).
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de dados de formulário URL-encoded.

// --- Configuração de Sessão ---
app.use(session({
  secret: 'your-secret-key', // Chave secreta para assinar o cookie de sessão (essencial para segurança!).
  resave: false,             // Não salva a sessão se não houver modificações.
  saveUninitialized: true,   // Salva sessões que são novas mas não modificadas.
  cookie: { secure: false } // Define se o cookie deve ser enviado apenas via HTTPS (defina como true em produção com HTTPS).
}));

// --- Configuração do View Engine (EJS) ---
app.set('view engine', 'ejs'); // Define EJS como o motor de template.
app.set('views', path.join(__dirname, 'views')); // Define o diretório onde os arquivos .ejs estão localizados.

// --- Middleware de Debug (apenas para desenvolvimento) ---
app.use((req, res, next) => {
  // Loga detalhes da requisição para depuração no console do servidor.
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body,
    session: req.session,
    contentType: req.headers['content-type']
  });
  next(); // Passa a requisição para o próximo middleware/rota.
});

// --- Servindo Arquivos Estáticos ---
app.use(express.static(path.join(__dirname, 'public'))); // Serve arquivos estáticos da pasta 'public' diretamente.
app.use('/assets', express.static(path.join(__dirname, 'assets'))); // Serve arquivos estáticos da pasta 'assets' sob o prefixo '/assets'.

// --- Rota de Teste para Arquivos Estáticos ---
app.get('/test-static', (req, res) => {
  // Rota simples para verificar se os arquivos estáticos estão sendo servidos corretamente.
  res.send(`
    <html>
      <head><title>Static File Test</title></head>
      <body>
        <h1>Static File Test</h1>
        <img src="/assets/calendar-icon.png" alt="Calendar Icon">
        <img src="/assets/profile.png" alt="Profile Icon">
        <img src="/assets/local.png" alt="Location Icon">
        <img src="/assets/109613.png" alt="Time Icon">
      </body>
    </html>
  `);
});

// --- Conexão com o Banco de Dados ---
const pool = require('./config/database'); // Importa o pool de conexão do banco de dados.
pool.connect() // Tenta conectar ao banco de dados.
  .then(() => console.log('Successfully connected to the database')) // Loga sucesso na conexão.
  .catch(err => {
    console.error('Error connecting to the database:', err); // Loga erro na conexão.
    console.log('Server will continue without database connection'); // Informa que o servidor continuará.
  });

// --- Rotas da API ---
const routes = require('./routes');         // Rota API principal (genérica, talvez para usuários, auth).
const apiExtrasRoutes = require('./routes/apiExtras'); // Rotas adicionais para recursos da API.
const apiRoutes = require('./routes/apiRoutes');     // Rotas para eventos (APIs mais gerais).
const inscricoesRoutes = require('./routes/api/inscricoes'); // Rotas específicas para gerenciamento de inscrições via API.

app.use('/api', routes);           // Monta rotas base da API.
app.use('/api/extras', apiExtrasRoutes); // Monta rotas extras da API.
app.use('/api/eventos', apiRoutes);     // Monta rotas relacionadas a eventos.
app.use('/api/inscricoes', inscricoesRoutes); // Monta rotas de inscrições.

// --- Rotas de Frontend (Renderização de Páginas) ---
const frontRoutes = require('./routes/frontRoutes'); // Importa rotas que renderizam páginas HTML.
app.use('/', frontRoutes); // Monta as rotas de frontend na raiz.

// --- Rota Específica: Lista Eventos (API) ---
// Esta rota GET '/eventos' lista eventos, com dados mockados em caso de erro de DB.
app.get('/eventos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos'); // Consulta todos os eventos do DB.
    res.json(result.rows); // Retorna os eventos como JSON.
  } catch (error) {
    console.error('Error fetching events:', error); // Loga erro.
    // Retorna dados mockados (hardcoded) se o DB falhar.
    res.json([
      {
        id: 1,
        nome_evento: 'Show de Rock',
        classificacao_indicativa: '+18',
        localizacao_evento: 'Arena Show',
        duracao: '21:00',
        borderColor: 'blue'
      },
      {
        id: 2,
        nome_evento: 'Festival de Música',
        classificacao_indicativa: 'Livre',
        localizacao_evento: 'Parque da Cidade',
        duracao: '19:00',
        borderColor: 'yellow'
      }
    ]);
  }
});

// --- Rota Específica: Detalhes do Evento ---
// Rota GET '/event/:id' para exibir os detalhes de um evento específico.
app.get('/event/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos WHERE id = $1', [req.params.id]); // Busca evento pelo ID.
    if (result.rows.length === 0) {
      // Se evento não encontrado, renderiza página de erro 404.
      return res.status(404).render('event-details', { 
        title: 'Evento não encontrado',
        evento: null
      });
    }
    // Renderiza a página de detalhes do evento com os dados encontrados.
    res.render('event-details', { 
      title: result.rows[0].nome_evento,
      evento: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching event details:', error); // Loga o erro.
    // Em caso de erro do servidor, renderiza uma página de erro genérica.
    res.status(500).render('event-details', { 
      title: 'Erro ao carregar evento',
      evento: null
    });
  }
});

// --- Rota para Favoritos (API) ---
const favoritosRoutes = require('./routes/api/favoritos'); // Importa as rotas de favoritos.
app.use('/api/favoritos', favoritosRoutes); // Monta as rotas de favoritos.

// --- Rota para "Meus Eventos" (Frontend) ---
// Rota GET '/meus-eventos' para exibir eventos inscritos e favoritados do usuário.
app.get('/meus-eventos', async (req, res) => {
  try {
    // Obtém o ID do usuário da sessão (ou usa 1 para teste).
    const userId = req.session.userId || 1; 

    // Busca eventos inscritos e favoritos usando os modelos.
    const inscricoes = await InscricaoModel.getUserSubscribedEvents(userId);
    const favoritos = await FavoritoModel.getUserFavorites(userId);

    // Renderiza a página 'meus-eventos' com os dados.
    res.render('meus-eventos', {
      title: 'Meus Eventos',
      inscricoes,
      favoritos
    });
  } catch (error) {
    console.error('Erro ao carregar Meus Eventos:', error); // Loga erro.
    res.status(500).send('Erro ao carregar Meus Eventos'); // Envia resposta de erro.
  }
});

// --- Global Error Handler ---
// Middleware de tratamento de erros, captura erros não tratados em outras rotas.
app.use((err, req, res, next) => {
  console.error('Error:', err); // Loga o erro completo no console.
  res.status(500).json({ error: 'Something broke!' }); // Retorna uma resposta JSON de erro genérico.
});

// --- Inicia o Servidor ---
// Ouve as conexões na porta definida.
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`); // Loga a URL do servidor ao iniciar.
});