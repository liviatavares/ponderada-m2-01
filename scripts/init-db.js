const { Pool } = require('pg'); // Importa a classe Pool do pacote 'pg' para gerenciar conexões com o PostgreSQL.
const fs = require('fs');         // Importa o módulo 'fs' para operações de sistema de arquivos (ler arquivos).
const path = require('path');     // Importa o módulo 'path' para lidar com caminhos de arquivos.
require('dotenv').config();       // Carrega variáveis de ambiente do arquivo .env.

const isSSL = process.env.DB_SSL === 'true'; // Verifica se a conexão SSL deve ser ativada, baseando-se na variável de ambiente.

// Configuração do pool de conexão com o banco de dados PostgreSQL.
const pool = new Pool({
  user: process.env.DB_USER,         
  host: process.env.DB_HOST,         
  database: process.env.DB_DATABASE, 
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,         
  ssl: isSSL ? { rejectUnauthorized: false } : false,
  max: 20,                           
  idleTimeoutMillis: 30000,          
  connectionTimeoutMillis: 10000,    
  keepAlive: true                    
});

// Função assíncrona para inicializar o banco de dados executando um script SQL.
async function initDatabase() {
  try {
    // Constrói o caminho completo para o arquivo 'database.sql'.
    const sqlFile = path.join(__dirname, '..', 'database.sql');
    // Lê o conteúdo do arquivo SQL de forma síncrona.
    const sql = fs.readFileSync(sqlFile, 'utf8');

    // Executa os comandos SQL lidos do arquivo.
    await pool.query(sql);
    console.log('Database initialized successfully!'); // Loga sucesso.
  } catch (err) {
    console.error('Error initializing database:', err); // Loga erro se houver falha.
  } finally {
    await pool.end(); // Garante que o pool de conexão seja encerrado após a operação.
  }
}

initDatabase(); // Chama a função para iniciar o processo de inicialização do banco de dados.