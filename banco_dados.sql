CREATE TABLE "usuarios" (
  "id" SERIAL PRIMARY KEY,
  "nome_usuario" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "localizacao" TEXT NOT NULL,
  "data_nascimento" DATE
);

CREATE TABLE "eventos" (
  "id" SERIAL PRIMARY KEY,
  "nome_evento" TEXT NOT NULL,
  "tipo" TEXT NOT NULL,
  "localizacao_evento" TEXT NOT NULL,
  "data_evento" DATE,
  "duracao" TIME
);

CREATE TABLE "inscricao" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT,
  "evento_id" INT,
  "data_inscricao" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "status" VARCHAR(50)
);

CREATE TABLE "categorias" (
  "id" SERIAL PRIMARY KEY,
  "nome_categoria" TEXT
);

CREATE TABLE "categoria_evento" (
  "evento_id" INT,
  "categoria_id" INT,
  PRIMARY KEY ("evento_id", "categoria_id")
);

CREATE TABLE "favoritos" (
  "user_id" INT,
  "evento_id" INT,
  PRIMARY KEY ("user_id", "evento_id")
);

ALTER TABLE "inscricao" ADD FOREIGN KEY ("user_id") REFERENCES "usuarios" ("id") ON DELETE CASCADE;

ALTER TABLE "inscricao" ADD FOREIGN KEY ("evento_id") REFERENCES "eventos" ("id") ON DELETE CASCADE;

ALTER TABLE "categoria_evento" ADD FOREIGN KEY ("evento_id") REFERENCES "eventos" ("id");

ALTER TABLE "categoria_evento" ADD FOREIGN KEY ("categoria_id") REFERENCES "categorias" ("id");

ALTER TABLE "favoritos" ADD FOREIGN KEY ("user_id") REFERENCES "usuarios" ("id");

ALTER TABLE "favoritos" ADD FOREIGN KEY ("evento_id") REFERENCES "eventos" ("id");
