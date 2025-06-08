-- tabela de usuários: contém o nome, id, email, localização e aniversário do usuário.
-- essas informações são todas extremamente necessárias. por exemplo, a localização ajuda a filtrar
-- os shows mais perto, e a idade ajuda a não recomendar shows +18 para usuários menores de idade
CREATE TABLE usuarios IF NOT EXISTS (
  id SERIAL PRIMARY KEY,
  nome_usuario TEXT NOT NULL,
  email TEXT NOT NULL,
  localizacao TEXT NOT NULL,
  data_nascimento DATE,
  senha TEXT
);

-- os eventos contém id, nome, tipo (show de música, show de humor, peça de teatro...), localização, data e duração (em horas)
CREATE TABLE eventos IF NOT EXISTS (
  id SERIAL PRIMARY KEY,
  nome_evento TEXT NOT NULL,
  tipo TEXT NOT NULL,
  localizacao_evento TEXT NOT NULL,
  data_evento DATE,
  duracao TIME,
  classificacao_indicativa TEXT,
  acessibilidade TEXT
);

-- a inscrição contém id da inscrição, id do usuário e do evento, data da inscrição e status.
-- status pode ser, por exemplo, 'confirmado', 'pendente' ou 'cancelado'.
CREATE TABLE inscricao IF NOT EXISTS (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES usuarios(id) on DELETE CASCADE,
    evento_id INT REFERENCES eventos(id) on DELETE CASCADE,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) 
);

-- aqui, o usuário pode marcar um evento como favorito, relacionando os usuários com os eventos
CREATE TABLE favoritos IF NOT EXISTS (
    user_id INT REFERENCES usuarios(id),
    evento_id INT REFERENCES eventos(id),
    PRIMARY KEY (user_id, evento_id)
);




