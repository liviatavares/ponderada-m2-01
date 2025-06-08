-- Criação da tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
    nome_usuario TEXT NOT NULL,
    data_nascimento DATE NOT NULL,
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    localizacao TEXT,
    senha TEXT NOT NULL
);

-- Criação da tabela de eventos
CREATE TABLE IF NOT EXISTS eventos (
    id SERIAL PRIMARY KEY,
    nome_evento TEXT NOT NULL,
    data_evento DATE NOT NULL,
    localizacao_evento TEXT NOT NULL,
    tipo TEXT NOT NULL,
    duracao TIME NOT NULL,
    classificacao_indicativa TEXT NOT NULL,
    acessibilidade TEXT NOT NULL
);

-- Criação da tabela de inscrições
CREATE TABLE IF NOT EXISTS inscricao (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios(id),
    evento_id INTEGER REFERENCES eventos(id),
    data_inscricao TIMESTAMP NOT NULL,
    status TEXT NOT NULL
);

-- Criação da tabela de favoritos
CREATE TABLE IF NOT EXISTS favoritos (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES usuarios(id),
    evento_id INTEGER REFERENCES eventos(id),
    data_favorito TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, evento_id)
);

INSERT INTO eventos (nome_evento, tipo, localizacao_evento, data_evento, duracao, classificacao_indicativa, acessibilidade) VALUES
('Show do Angra', 'Show de Rock', 'São Paulo, SP', '2025-06-01', '03:00:00', '+18', 'Sim'),
('Show do System of a Down', 'Show de Rock', 'São Paulo, SP', '2025-06-01', '03:00:00', '+16', 'Não'),
('Rock in Rio Revival', 'Show de Rock', 'Recife, PE', '2025-07-12', '03:00:00', '+16', 'Sim'),
('Hamlet ao Vivo', 'Festival de Comida', 'Fortaleza, CE', '2025-09-19', '04:00:00', '+16', 'Não'),
('Sabores do Brasil', 'Stand-up Comedy', 'Belo Horizonte, MG', '2025-10-14', '02:00:00', 'L', 'Sim'),
('Mestres do Impressionismo', 'Peça de Teatro', 'Brasília, DF', '2025-06-21', '03:00:00', 'L', 'Não'),
('Noites de Riso', 'Peça de Teatro', 'Porto Alegre, RS', '2025-08-25', '05:00:00', 'L', 'Sim'),
('Festival Sertanejo', 'Exposição de Arte', 'São Paulo, SP', '2025-10-10', '04:00:00', '+18', 'Não'),
('Romeu e Julieta', 'Show de Rock', 'Curitiba, PR', '2025-11-22', '03:00:00', '+14', 'Sim'),
('Comida de Rua SP', 'Show de Rock', 'Rio de Janeiro, RJ', '2025-07-09', '02:00:00', '+14', 'Não'),
('Arte Moderna Nacional', 'Festival de Comida', 'Salvador, BA', '2025-12-06', '05:00:00', 'L', 'Sim'),
('Risadas em Cena', 'Exposição de Arte', 'Goiânia, GO', '2025-08-15', '03:00:00', '+10', 'Sim');

INSERT INTO usuarios (nome_usuario, email, localizacao, data_nascimento, senha) VALUES
('Ana Clara Ribeiro', 'ana.ribeiro@email.com', 'São Paulo, SP', '1992-04-15', 'ana123'),
('Marcos Vinícius Silva', 'marcos.silva@email.com', 'Belo Horizonte, MG', '1988-12-03', 'marcos88'),
('Juliana Costa Duarte', 'juliana.duarte@email.com', 'Curitiba, PR', '1995-07-21', 'juliana95'),
('Rafael Gomes Lima', 'rafael.lima@email.com', 'Recife, PE', '1990-10-08', 'rafael90'),
('Camila Torres Almeida', 'camila.almeida@email.com', 'Salvador, BA', '1993-03-17', 'camila93'),
('Pedro Henrique Souza', 'pedro.souza@email.com', 'Porto Alegre, RS', '1987-06-29', 'pedro87'),
('Larissa Rocha Mendes', 'larissa.mendes@email.com', 'Brasília, DF', '1996-11-12', 'larissa96'),
('Lucas Martins Oliveira', 'lucas.oliveira@email.com', 'Goiânia, GO', '1991-08-25', 'lucas91'),
('Fernanda Nogueira Luz', 'fernanda.luz@email.com', 'Manaus, AM', '1994-05-06', 'fernanda94'),
('João Victor Ferreira', 'joao.ferreira@email.com', 'Fortaleza, CE', '1989-01-30', 'joao89');