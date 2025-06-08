// Importa a classe Pool do pacote 'pg'.
// 'Pool' é usado para gerenciar um pool de conexões com o banco de dados.
// Isso melhora a performance, pois não é necessário criar uma nova conexão para cada requisição.
const { Pool } = require('pg');

// Carrega as variáveis de ambiente do arquivo .env para process.env.
require('dotenv').config();

// Verifica se a variável de ambiente DB_SSL está definida como 'true'.
const isSSL = process.env.DB_SSL === 'true';

// Cria uma nova instância de Pool com as configurações do banco de dados.
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  // Configuração SSL/TLS para a conexão.
  // Se 'isSSL' for true, ele configura 'rejectUnauthorized: false',
  // o que significa que o cliente aceitará certificados SSL não verificados.
  ssl: isSSL ? { rejectUnauthorized: false } : false,
  // Número máximo de clientes (conexões) que o pool manterá abertos.
  max: 20,
  // Tempo em milissegundos que um cliente ocioso no pool pode ficar sem ser usado antes de ser desconectado.
  idleTimeoutMillis: 30000,
  // Tempo em milissegundos para tentar estabelecer uma conexão com o banco de dados.
  connectionTimeoutMillis: 20000,
  keepAlive: true,
  keepAliveInitialDelayMillis: 10000
});

// captura erros inesperados que podem ocorrer em clientes ociosos (conexões que não estão em uso ativo).
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
});

// Função assíncrona para testar a conexão com o banco de dados.
const testConnection = async () => {
  try {
    // Tenta obter um cliente do pool, o que estabelece uma conexão se nenhuma estiver disponível.
    const client = await pool.connect();
    console.log('Successfully connected to the database');
    // Libera o cliente de volta para o pool para que possa ser reutilizado.
    client.release();
  } catch (err) {
    // Se ocorrer um erro ao conectar, ele é logado.
    console.error('Error connecting to the database:', err);
    // Tenta reconectar após 5 segundos.
    setTimeout(testConnection, 5000);
  }
};

// Chama a função testConnection para verificar a conectividade do banco de dados
testConnection();

// Exporta um objeto contendo métodos para interagir com o pool de conexões.
module.exports = {
  // Método 'query' que executa uma consulta SQL.
  // Ele usa 'await pool.query' para executar a consulta de forma assíncrona.
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (err) {
      // Se a consulta falhar, o erro é logado e relançado para que a função chamadora possa tratá-lo.
      console.error('Error executing query:', err);
      throw err;
    }
  },
  // Método 'connect' que expõe a função 'pool.connect()'.
  connect: () => pool.connect()
};