const fs = require('fs');     // Importa o módulo 'fs' para operações de sistema de arquivos.
const path = require('path'); // Importa o módulo 'path' para manipulação de caminhos.
const { Pool } = require('pg'); // Importa a classe Pool do pacote 'pg'.
require('dotenv').config();   // Carrega variáveis de ambiente do arquivo .env.

// Configuração do pool de conexão com o banco de dados PostgreSQL.
const pool = new Pool({
  user: process.env.DB_USER,   
  host: process.env.DB_HOST,   
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD, 
  port: process.env.DB_PORT,     
  ssl: {                        
    rejectUnauthorized: false, 
  },
});

// Função assíncrona para executar um script SQL.
const runSQLScript = async () => {
  // Constrói o caminho completo para o arquivo 'init.sql'.
  const filePath = path.join(__dirname, 'init.sql');
  // Lê o conteúdo do arquivo SQL.
  const sql = fs.readFileSync(filePath, 'utf8');

  try {
    // Executa o script SQL no banco de dados.
    await pool.query(sql);
    console.log('Script SQL executado com sucesso!'); // Loga o sucesso.
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err); // Loga o erro.
  } finally {
    await pool.end(); // Garante que o pool de conexão seja encerrado.
  }
};

runSQLScript(); // Chama a função para executar o script SQL.