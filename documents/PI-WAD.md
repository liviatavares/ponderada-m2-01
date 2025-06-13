# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto

EventCalendar

### Autor do projeto

Lívia Sabóia Tavares 

T18, Módulo 2, Grupo 01

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução

O **EventCalendar**, uma plataforma de eventos com gerenciamento de inscrições (opção 3), é um website simples e acessível, que tem como objetivo tornar mais fácil a acessibilidade a inscrições em eventos e compra de ingressos. Com ele, é possível:

1. Visualizar eventos a um certo raio de distância do usuário e filtrar por proximidade

2. Visualizar eventos por tipo (congresso, show, festival, exposição, ...) e demais filtros (artista, gênero musical, área de estudo, palestrante...)

3. Inscrever-se no evento desejado e, assim, unificar o cadastro em sites populares de eventos ou demais websites, visando a otimização do tempo na hora da compra de um ingresso

4. Receber lembretes constantes, por email e pelo site, de eventos desejados que estão chegando e de abertura das vendas de futuros eventos

5. Explorar características de eventos, como data, local, horário, artista e preço

6. Ser redirecionado diretamente para os sites/formulários/links externos daqueles que despertam interesse, unificando a experiência

Sua interface será objetiva e visualmente agradável, e terá como missão facilitar a vida do usuário e estimular a visibilidade de diversos eventos.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas

<div align="center">
<sub>Figura 00 - Persona 01 - Julia Rodrigues</sub>
<br>
<br>
<p align="center">
<a><img src="/assets/persona1.png" alt="Persona 1 - Julia Rodrigues" border="0"></a>
</p>
<sup>Fonte: Material produzido pela autora (2025)</sup>
<br>
<br>
</div>

### 2.2. User Stories

<div align="center">
<sub>Tabela 01 - US01</sub>
<br>
<br>

Identificação | US01
--- | ---
Persona | Julia Rodrigues
User Story | "Como alguém que não consegue lembrar muito bem de datas de shows, quero receber notificações quando as vendas de um show se aproximarem, para não perder nenhuma oportunidade de ir a esses eventos"
Critério de aceite 1 | CR1: as notificações devem chegar ao usuário por meio de emails. Um email deve ser mandado ao usuário quando faltar, respectivamente, 1 semana e 1 dia para o início das vendas.
Critério de aceite 2 | CR2: as notificações devem também aparecer no site. Quando entrar no site, no período de tempo de lembrete para o evento, uma notificação deve aparecer.
Critérios INVEST | A garantia das notificações não interfere em demais features do site (I); Pode ser ajustada com base no interesse do usuário em atender ou não tal evento (N); Soluciona uma das dores da persona (o não lembrete constante) (V); É fácil de ser estimada em duração e complexidade pelo time de desenvolvimento, e não atrapalha o desenvolvimento de demais integrações (E); Pode ser completa em um período de tempo razoável, por não ser uma contribuição muito complicada ao projeto (S); Pode ser facilmente testada após realizarem-se os critérios de testes para o aceite (por exemplo, demonstrar interesse em um evento no site deve ser o bastante para garantir o funcionamento dessa usabilidade) (T).

</div>

<div align="center">
<sub>Tabela 02 - US02</sub>
<br>
<br>

Identificação | US02
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero que o cadastro nos sites de eventos seja unificado, para que isso não se torne um empecilho para comprar um ingresso de um show"
Critério de aceite 1 | CR1: O usuário, ao se cadastrar no EventCalendar, poderá compartilhar seus dados e criar automaticamente um cadastro utilizando os mesmos dados no site externo. Os dados do usuário devem ser um item em comum entre os bancos de dados do site externo e do EventCalendar, após o usuário demonstrar interesse em comprar um evento deste site.
Critério de aceite 2 | O cadastro somente será criado no site que o usuário demonstrar interesse em comprar o evento, e deverá ser checado por cybersegurança, garantindo que não serão compartilhados com mais nenhum.

</div>

<div align="center">
<sub>Tabela 03 - US03</sub>
<br>
<br>

Identificação | US03
--- | ---
Persona | Julia Rodrigues
User Story | "como usuária, quero poder filtrar os eventos por proximidade, para ver resultados mais relevantes para mim"
Critério de aceite 1 | CR1: O usuário deve poder compartilhar sua localização com o site, que calculará a distância dos eventos a ele, e mostrará apenas aqueles a um certo raio de distância.
Critério de aceite 2 | CR2: O usuário poderá também selecionar manualmente sua localização, caso esteja procurando eventos que ocorram perto de outro local. Ao selecionar outra localização senão a atual, o site também mostrará o pedido

</div>
---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados

#### 3.1.1 Diagrama físico e lógico do banco de dados

O diagrama a seguir foi realizado com o dbdiagram.io. Nele, podem-se observar todas as tabelas criadas.

<div align="center">
    <sub>Figura 01: Diagrama de tabelas do banco de dados</sub>
    <br>
    <img src="/assets/modelo_banco.png" width="80%">
    <br>
    <sub> Como foi preciso atualizar algumas informações do banco de dados, a imagem acima não está devidamente atualizada, pois contém as tabelas "categoria_evento", "categorias" e não contém algumas colunas adicionadas posteriormente. A imagem abaixo mostra o diagrama atualizado. </sub>
    <br>
    <img src="/assets/diagrama.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa imagem, mostra-se o schema produzido pelo Supabase.

<div align="center">
    <sub>Figura 02: Schema</sub>
    <br>
    <img src="/assets/schema.png" width="80%">
    <br>
    <sub> Como foi preciso atualizar algumas informações do banco de dados, a imagem acima não está devidamente atualizada, pois contém as tabelas "categoria_evento", "categorias" e não contém algumas colunas adicionadas posteriormente. A imagem abaixo mostra o schema atualizado. </sub>
    <br>
    <img src="/assets/schema2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>


#### 3.1.2 Código SQL

O código SQL utilizado para desenvolver as tabelas foi o seguinte:

``` sql
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
```

Para redigi-lo, foi utilizado o Supabase. Seu arquivo SQL pode ser encontrado em `scripts/db.sql`. Esse código foi atualizado em 08/06/2025.

### 3.1.3 Descrição de tabelas

#### 1. *Tabela eventos*

A tabela eventos tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, nome (texto), tipo (texto), localizacao_evento (texto), data_evento (data), acessibilidade (texto), classificacao_indicativa (texto) e duracao (time). 

#### 2. *Tabela usuários*

A tabela usuários tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, nome (texto), email (texto), senha (texto), localizacao (texto) e data_nascimento (date).

#### 3. *Tabela inscrição*

A Tabela inscrição tem como atributos id (um inteiro de até 4 dígitos), que é a *chave primária*, user_id (que se relaciona com o id do usuário), evento_id (que se relaciona com o id do evento), data_inscricao (timestamp) e status (varchar(50) - ou seja, um texto com até 50 caracteres).

#### 5. *Tabela favoritos*

A tabela favoritos tem como atributos user_id (um inteiro de até 4 dígitos), que se relaciona com o id do usuário e é a *chave primária*, e evento_id (um inteiro de até 4 dígitos), que se relaciona com o id do evento, e é outra *chave primária*.  A chave primária composta significa que um mesmo usuário só pode favoritar o mesmo evento uma vez.

### 3.2 BD, Models e Arquitetura

No projeto, criei Models para os eventos, para os usuários, para os favoritos e para as inscrições. Neles, são armazenadas as informações sobre os usuários e sobre os eventos, que posteriormente serão passadas para o controller e para os views. Segue o código do eventoModel.js, para demonstração da estrutura do model.

#### 3.2.1. **eventoModel.js**

``` javascript
const pool = require("../config/database") // Importa o objeto 'pool' do arquivo de configuração do banco de dados, que gerencia as conexões com o PostgreSQL.

// Define o objeto EventoModel que conterá todas as funções para interagir com a tabela 'eventos'.
const EventoModel = {
  // Função assíncrona para buscar todos os eventos no banco de dados.
  async findAll() {
    try {
      // Executa uma query SQL para selecionar todos os registros da tabela 'eventos', ordenando-os pela data do evento.
      const result = await pool.query("SELECT * FROM eventos ORDER BY data_evento ASC")
      return result.rows
    } catch (error) {
      // Em caso de erro durante a execução da query, exibe uma mensagem de erro no console.
      console.error("Erro ao buscar eventos:", error)
      // Lança o erro novamente para que ele possa ser tratado em níveis superiores.
      throw error
    }
  },

  // Função assíncrona para buscar um evento específico pelo seu ID.
  async findById(id) {
    try {
      // Executa uma query SQL para selecionar um evento onde o 'id' corresponde ao valor fornecido.
      const result = await pool.query("SELECT * FROM eventos WHERE id = $1", [id])
      // Retorna a primeira linha do resultado (o evento encontrado), ou 'undefined' se nenhum for encontrado.
      return result.rows[0]
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro no console.
      console.error("Erro ao buscar evento por ID:", error)
      // Lança o erro.
      throw error
    }
  },

  // Função assíncrona para buscar eventos com base em filtros dinâmicos.
  async findByFilters(filters) {
    try {
      // Inicia a query SQL base. 
      let query = "SELECT * FROM eventos WHERE 1=1"
      // Array para armazenar os valores dos parâmetros da query.
      const params = []
      // Contador para os placeholders de parâmetros ($1, $2, etc.).
      let paramCount = 1

      // Verifica se o filtro 'tipo' foi fornecido.
      if (filters.tipo) {
        // Adiciona a condição 'tipo' à query.
        query += ` AND tipo = $${paramCount}`
        // Adiciona o valor do tipo ao array de parâmetros.
        params.push(filters.tipo)
        // Incrementa o contador de parâmetros.
        paramCount++
      }

      // Verifica se o filtro 'data_evento' foi fornecido.
      if (filters.data_evento) {
        // Adiciona a condição para comparar apenas a data (ignorando a hora) do evento.
        query += ` AND DATE(data_evento) = $${paramCount}`
        // Adiciona o valor da data ao array de parâmetros.
        params.push(filters.data_evento)
        // Incrementa o contador.
        paramCount++
      }

      // Verifica se o filtro 'localizacao_evento' foi fornecido.
      if (filters.localizacao_evento) {
        // Adiciona a condição para buscar localização que contenha parcialmente o texto (case-insensitive - ILIKE).
        query += ` AND localizacao_evento ILIKE $${paramCount}`
        // Adiciona o valor da localização (com wildcards %) ao array de parâmetros.
        params.push(`%${filters.localizacao_evento}%`)
        // Incrementa o contador.
        paramCount++
      }

      // Verifica se o filtro 'classificacao_indicativa' foi fornecido.
      if (filters.classificacao_indicativa) {
        const classificacao_indicativa = filters.classificacao_indicativa

        // Lógica para incluir classificações menores ou iguais à selecionada.
        if (classificacao_indicativa === "L") {
          query += ` AND classificacao_indicativa = $${paramCount}`
          params.push("L")
          paramCount++
        } else if (classificacao_indicativa === "+10") {
          query += ` AND classificacao_indicativa = ANY($${paramCount})`
          params.push(["L", "+10"])
          paramCount++
        } else if (classificacao_indicativa === "+14") {
          query += ` AND classificacao_indicativa = ANY($${paramCount})`
          params.push(["L", "+10", "+14"])
          paramCount++
        } else if (classificacao_indicativa === "+16") {
          query += ` AND classificacao_indicativa = ANY($${paramCount})`
          params.push(["L", "+10", "+14", "+16"])
          paramCount++
        } else if (classificacao_indicativa === "+18") {
          query += ` AND classificacao_indicativa = ANY($${paramCount})`
          params.push(["L", "+10", "+14", "+16", "+18"])
          paramCount++
        }
      }

      // Verifica se o filtro 'acessibilidade' foi fornecido.
      if (filters.acessibilidade) {
        // Adiciona a condição de acessibilidade.
        query += ` AND acessibilidade = $${paramCount}`
        // Adiciona o valor da acessibilidade ao array de parâmetros.
        params.push(filters.acessibilidade)
        // Incrementa o contador.
        paramCount++
      }

      // Adiciona a ordenação final à query.
      query += " ORDER BY data_evento ASC"

      // Executa a query com os parâmetros construídos dinamicamente.
      const result = await pool.query(query, params)
      // Retorna os eventos filtrados.
      return result.rows
    } catch (error) {
      // Em caso de erro, exibe uma mensagem de erro e lança o erro.
      console.error("Erro ao buscar eventos com filtros:", error)
      throw error
    }
  },

  // Função assíncrona para buscar as inscrições de um usuário.
  async findUserSubscriptions(userId) {
    try {
      // Define a query SQL para buscar eventos nos quais um usuário está inscrito.
      // Realiza um JOIN entre 'eventos' e 'inscricao' e filtra pelo ID do usuário.
      const query = `
                SELECT e.*, i.status, i.data_inscricao
                FROM eventos e 
                INNER JOIN inscricao i ON e.id = i.evento_id 
                WHERE i.user_id = $1 
                ORDER BY e.data_evento ASC
            `
      // Executa a query com o ID do usuário como parâmetro.
      const result = await pool.query(query, [userId])
      // Retorna os eventos inscritos pelo usuário.
      return result.rows
    } catch (error) {
      // Em caso de erro (ex: tabelas não existirem), exibe uma mensagem.
      console.error("Erro ao buscar inscrições do usuário:", error)
      // Retorna um array vazio para indicar que não há inscrições ou houve um problema.
      return []
    }
  },

  // Função assíncrona para buscar os eventos favoritos de um usuário.
  async findUserFavorites(userId) {
    try {
      // Define a query SQL para buscar eventos que um usuário marcou como favoritos.
      // Realiza um JOIN entre 'eventos' e 'favoritos' e filtra pelo ID do usuário.
      const query = `
                SELECT e.* FROM eventos e 
                INNER JOIN favoritos f ON e.id = f.evento_id 
                WHERE f.user_id = $1 
                ORDER BY e.data_evento ASC
            `
      // Executa a query com o ID do usuário como parâmetro.
      const result = await pool.query(query, [userId])
      // Retorna os eventos favoritos do usuário.
      return result.rows
    } catch (error) {
      // Em caso de erro, exibe uma mensagem.
      console.error("Erro ao buscar favoritos do usuário:", error)
      // Retorna um array vazio.
      return []
    }
  },

  // Função assíncrona para verificar se um evento é favorito de um usuário.
  async isFavorite(userId, eventoId) {
    try {
      // Query para verificar a existência de um registro na tabela 'favoritos' para o par userId/eventoId.
      const query = "SELECT 1 FROM favoritos WHERE user_id = $1 AND evento_id = $2"
      // Executa a query.
      const result = await pool.query(query, [userId, eventoId])
      // Retorna true se houver alguma linha (ou seja, é favorito), false caso contrário.
      return result.rows.length > 0
    } catch (error) {
      // Em caso de erro, exibe mensagem e retorna false.
      console.error("Erro ao verificar favorito:", error)
      return false
    }
  },

  // Função assíncrona para adicionar ou remover um evento dos favoritos de um usuário (toggle).
  async toggleFavorite(userId, eventoId) {
    try {
      // Primeiro, verifica se o evento já é favorito.
      const isFav = await this.isFavorite(userId, eventoId)

      if (isFav) {
        // Se já for favorito, remove o registro da tabela 'favoritos'.
        await pool.query("DELETE FROM favoritos WHERE user_id = $1 AND evento_id = $2", [userId, eventoId])
        // Retorna um objeto indicando que foi removido.
        return { isFavorite: false, message: "Removido dos favoritos" }
      } else {
        // Se não for favorito, insere um novo registro na tabela 'favoritos'.
        await pool.query("INSERT INTO favoritos (user_id, evento_id) VALUES ($1, $2)", [userId, eventoId])
        // Retorna um objeto indicando que foi adicionado.
        return { isFavorite: true, message: "Adicionado aos favoritos" }
      }
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao alterar favorito:", error)
      throw error
    }
  },

  // Função assíncrona para verificar se um usuário já está inscrito em um evento.
  async isSubscribed(userId, eventoId) {
    try {
      // Query para verificar a existência de um registro na tabela 'inscricao' para o par userId/eventoId.
      const query = "SELECT 1 FROM inscricao WHERE user_id = $1 AND evento_id = $2"
      // Executa a query.
      const result = await pool.query(query, [userId, eventoId])
      // Retorna true se houver alguma linha (ou seja, está inscrito), false caso contrário.
      return result.rows.length > 0
    } catch (error) {
      // Em caso de erro, exibe mensagem e retorna false.
      console.error("Erro ao verificar inscrição:", error)
      return false
    }
  },

  // Função assíncrona para inscrever um usuário em um evento.
  async subscribe(userId, eventoId) {
    try {
      // Primeiro, verifica se o usuário já está inscrito no evento.
      const isAlreadySubscribed = await this.isSubscribed(userId, eventoId)

      if (isAlreadySubscribed) {
        // Se já estiver inscrito, retorna uma mensagem informando.
        return { success: false, message: "Você já está inscrito neste evento" }
      }

      // Se não estiver inscrito, insere um novo registro na tabela 'inscricao' com status "Confirmado".
      await pool.query("INSERT INTO inscricao (user_id, evento_id, status) VALUES ($1, $2, $3)", [
        userId,
        eventoId,
        "Confirmado",
      ])

      // Retorna um objeto indicando sucesso na inscrição.
      return { success: true, message: "Inscrição realizada com sucesso!" }
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao inscrever usuário:", error)
      throw error
    }
  },

  // Função assíncrona para cancelar a inscrição de um usuário em um evento.
  async unsubscribe(userId, eventoId) {
    try {
      // Deleta o registro da tabela 'inscricao' para o par userId/eventoId.
      const result = await pool.query("DELETE FROM inscricao WHERE user_id = $1 AND evento_id = $2", [userId, eventoId])

      // Verifica se alguma linha foi afetada (se a inscrição existia e foi deletada).
      if (result.rowCount > 0) {
        // Retorna sucesso e mensagem de cancelamento.
        return { success: true, message: "Inscrição cancelada com sucesso!" }
      } else {
        // Se nenhuma linha foi afetada, significa que a inscrição não existia.
        return { success: false, message: "Você não está inscrito neste evento" }
      }
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao cancelar inscrição:", error)
      throw error
    }
  },

  // Função assíncrona para criar um novo evento.
  async create(eventoData) {
    try {
      // Define a query SQL para inserir um novo evento na tabela 'eventos'.
      // 'RETURNING *' faz com que a query retorne o registro recém-criado, incluindo seu ID gerado.
      const query = `
        INSERT INTO eventos (nome_evento, tipo, localizacao_evento, data_evento, duracao, classificacao_indicativa, acessibilidade, descricao)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `
      // Array com os dados do evento na ordem correta para a query.
      const params = [
        eventoData.nome_evento,
        eventoData.tipo,
        eventoData.localizacao_evento,
        eventoData.data_evento,
        eventoData.duracao,
        eventoData.classificacao_indicativa,
        eventoData.acessibilidade,
        eventoData.descricao,
      ]

      // Executa a query de inserção.
      const result = await pool.query(query, params)
      // Retorna o evento recém-criado.
      return result.rows[0]
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao criar evento:", error)
      throw error
    }
  },

  // Função assíncrona para atualizar um evento existente.
  async update(id, eventoData) {
    try {
      // Define a query SQL para atualizar os dados de um evento.
      // O 'WHERE id = $9' garante que apenas o evento com o ID correspondente seja atualizado.
      // 'RETURNING *' retorna o registro atualizado.
      const query = `
        UPDATE eventos 
        SET nome_evento = $1, tipo = $2, localizacao_evento = $3, data_evento = $4, duracao = $5, classificacao_indicativa = $6, acessibilidade = $7, descricao = $8
        WHERE id = $9
        RETURNING *
      `
      // Array com os dados atualizados do evento, incluindo o ID no final.
      const params = [
        eventoData.nome_evento,
        eventoData.tipo,
        eventoData.localizacao_evento,
        eventoData.data_evento,
        eventoData.duracao,
        eventoData.classificacao_indicativa,
        eventoData.acessibilidade,
        eventoData.descricao,
        id, // O ID do evento a ser atualizado.
      ]

      // Executa a query de atualização.
      const result = await pool.query(query, params)
      // Retorna o evento atualizado.
      return result.rows[0]
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao atualizar evento:", error)
      throw error
    }
  },

  // Função assíncrona para deletar um evento pelo seu ID.
  async delete(id) {
    try {
      // Executa a query SQL para deletar um registro da tabela 'eventos' com o ID fornecido.
      const result = await pool.query("DELETE FROM eventos WHERE id = $1", [id])
      // Retorna true se alguma linha foi deletada (rowCount > 0), false caso contrário.
      return result.rowCount > 0
    } catch (error) {
      // Em caso de erro, exibe mensagem e lança o erro.
      console.error("Erro ao deletar evento:", error)
      throw error
    }
  },
}

// Exporta o EventoModel para que suas funções possam ser usadas por outras partes da aplicação.
module.exports = EventoModel
```

#### 3.2.3 Arquitetura

#### 3.2.3.1 O que é Arquitetura MVC?

Um diagrama de arquitetura ajuda na construção e visualização de um banco de dados indiretamente, ao organizar a forma como a aplicação interage com os dados. Ele contribui com clareza na separação de responsabilidades, ajuda a identificar claramente quais classes precisam acessar o banco, e quais dados são importantes.

#### 3.2.3.2 A arquitetura do projeto

Nessa imagem, pode-se observar a arquitetura realizada para o EventCalendar, mostrando todas as relações do framework model, view e controller.

<div align="center">
    <sub>Figura 03: Arquitetura MVC</sub>
    <br>
    <img src="/assets/arquitetura.png" width="100%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

### 3.3. Wireframes

### 3.3.1 Introdução: o que são wireframes?

Wireframes são representações visuais simples e esquemáticas de uma página ou tela de um sistema, site ou aplicativo. Eles mostram a estrutura básica do layout, como a disposição de elementos (como menus, botões, imagens e textos), sem focar em design visual ou cores. Em um projeto, os wireframes ajudam a, por exemplo, planejar a navegação e a hierarquia de informações de forma clara e a economizar tempo e recursos, evitando retrabalho no desenvolvimento. Eles funcionam como um “esqueleto” do projeto, servindo de base para as próximas etapas de design e implementação.

### 3.3.2 Wireframes do projeto

#### 1. *Tela inicial da interface*

<div align="center">
    <sub>Figura 04: Wireframe 01</sub>
    <br>
    <img src="/assets/wireframe1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar a homepage do EventCalendar. Nela, é possível ver, de cima para baixo:

1. A header do site, com a logo à esquerda, uma caixa que indica o usuário logado à direita e uma caixa de "meus eventos"

2. Uma barra lateral à esquerda com filtros que o usuário pode aplicar nos eventos, como proximidade, tipo ou duração

3. Os eventos, representados por retângulos, e símbolos que descreveriam brevemente suas características

4. Um texto, acima dos eventos, que convida o usuário a procurar um evento (Algo como "Comece a buscar o melhor evento para você")

Essa tela, além de ser a tela principal do site, atende à funcionalidade pedida pela US03, que diz que o usuário deseja poder filtrar os eventos.

#### 2. *Tela com um lembrete para usuário*

<div align="center">
    <sub>Figura 05: Wireframe 02</sub>
    <br>
    <img src="/assets/wireframe2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar o processo de lembrete de um evento que está se aproximando. Ela aparece após o usuário inscrever-se ou favoritar um evento, na tela de visualização de evento. O evento, na homepage, fica em destaque, para indicar sua maior relevância, e uma notificação aparece no site, lembrando que a data do evento está se aproximando.

#### 3. *Tela de visualização de um evento*

<div align="center">
    <sub>Figura 06: Wireframe 03</sub>
    <br>
    <img src="/assets/wireframe3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Nessa tela, pode-se observar a tela de visualização de um evento após clicar nele na tela inicial. Nela, pode-se observar:

1. A header do site, com a logo à esquerda, uma caixa que indica o usuário logado à direita e uma caixa de "meus eventos"

2. Uma foto do evento

3. Uma descrição do evento, com todas as informações necessárias

4. Um botão de inscrever-se e uma estrela que representa o botão de "favoritar um evento"

Essa tela se relaciona com a usabilidade geral do usuário no website.

[Clique aqui](https://www.figma.com/design/dexDPEvhRXG7GlU4GPbB7h/Untitled?node-id=0-1&t=uEx67nqFiP5MppRX-1) para acessar o figma com os wireframes mais detalhadamente.

### 3.4. Guia de estilos

#### O que é um guia de estilos?

Um guia de estilos é um documento que define padrões visuais e de comunicação para um site ou marca. Ele especifica elementos como tipografia, cores principais e secundárias, uso de logotipos e estilo de botões, formulários e ícones. O guia de estilos garante consistência visual e eficiência no desenvolvimento, pois ajuda a seguir as mesmas diretrizes. Isso facilita a manutenção do site, acelera a criação de novas páginas e melhora a experiência do usuário, já que tudo fica coeso e profissional.

#### Guia de estilos do projeto

Essas são as páginas do guia de estilos desenvolvido para o EventCalendar.

<div align="center">
    <sub>Figura 07: Guia de estilos </sub>
    <br>
    <img src="/assets/guia_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 08: Sumário </sub>
    <br>
    <img src="/assets/guia_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 09: Overview </sub>
    <br>
    <img src="/assets/guia_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 10: Tipografia (1) </sub>
    <br>
    <img src="/assets/guia_4.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 11: Tipografia (2) </sub>
    <br>
    <img src="/assets/guia_5.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 12: Paleta de cores </sub>
    <br>
    <img src="/assets/guia_6.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 13: Botões </sub>
    <br>
    <img src="/assets/guia_7.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 14: Layout Geral </sub>
    <br>
    <img src="/assets/guia_8.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 15: Uso da logo </sub>
    <br>
    <img src="/assets/guia_9.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

[Clique aqui](https://www.canva.com/design/DAGoBYBX1SQ/Ef2gMc6JqNgwMdkON2iWFg/edit?utm_content=DAGoBYBX1SQ&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton) para acessar o canva com o guia de estilos mais detalhadamente.


#### 3.4.1. Cores

Como foi possível observar no guia de estilos, as cores principais são azul (#1667A9), amarelo (#F8C531), cinza-claro (#F2F2F2) e cinza-escuro (#252626). Algumas dessas cores também compõem a logo.

#### 3.4.2. Tipografia

Como foi possível observar no guia de estilos, as fontes principais são League Spartan e Montserrat. A primeira é mais usada para títulos e outros textos em destaque. A Montserrat, podendo ser usada tanto na versão normal quanto em negrito, é incorporada aos demais textos do site.

#### 3.4.3. Iconografia e imagens 

Como foi possível ver no guia de estilos, os ícones utilizados são principalmente botões. Na figura 13, podem-se observar ícones que seguem a paleta de cores principal, e representam, respectivamente (observando o lado direito da imagem; de cima para baixo; da esquerda para a direita), o ícone de notificações; o mesmo ícone mas com uma notificação não lida, o ícone que direciona para o perfil do usuário, o botão de configurações, um botão de estrela que significa "adicionar como favorito" e uma caixa de marcação, a ser usada na área de filtros, marcada com um *checkmark*.

### 3.5. Protótipo de alta fidelidade

#### 3.5.1 O que é um protótipo de alta fidelidade?

Um protótipo de alta fidelidade é uma simulação visual detalhada de um site ou aplicativo que se assemelha muito ao produto final. Ele inclui layouts realistas, tipografia e cores definidas e imagens e ícones finais ou próximos dos finais. Ele ajuda no desenvolvimento de um website de plataforma de eventos pois traz uma visualização clara do site antes da codificação, além de oferecer uma base para desenvolvimento, servindo como referência direta para a implementação do site, acelerando o processo e garantindo fidelidade ao design.

#### 3.5.2 O protótipo do projeto

Aqui, encontram-se algumas imagens do protótipo de alta fidelidade desenvolvido usando o Figma com base nos wireframes. As alterações feitas desde o wireframe foram apenas melhorias, com nenhuma alteração nos elementos visuais, apenas nos filtros, que agora se encontram com uma barra de seleção para o tipo de filtro ou barra para ajuste de localização. Essas alterações visam cumprir ainda mais com a US03.

<div align="center">
    <sub>Figura 16: página inicial </sub>
    <br>
    <img src="/assets/mockup_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 17: página de eventos </sub>
    <br>
    <img src="/assets/mockup_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 18: página inicial com notificação </sub>
    <br>
    <img src="/assets/mockup_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

[Clique aqui](https://www.figma.com/design/j7xBOORsDUbtFjDBXRXs43/prototipo?node-id=20-36&t=7PaeUd4BrP8VEseA-1) para acessar o protótipo diretamente no figma. Lá, podem-se observar, também, os wireframes para comparação e algumas anotações sobre usabilidade.

#### 3.5.3 Uso de grids

O protótipo foi desenvolvido pensando na coerência visual e também detalhista. Por isso, o uso de grids foi constante para alinhar as informações na página da melhor forma possível. Isso pode ser observado pelas imagens a seguir:

<div align="center">
    <sub>Figura 19: página inicial com grid </sub>
    <br>
    <img src="/assets/grid_1.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 20: página de eventos com grid </sub>
    <br>
    <img src="/assets/grid_2.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

<div align="center">
    <sub>Figura 21: página inicial com notificação com grid </sub>
    <br>
    <img src="/assets/grid_3.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

### 3.6. WebAPI e endpoints

#### 3.6.1 O que são endpoints?

Uma Web API (Interface de Programação de Aplicações Web) é um conjunto de regras e protocolos que permite que diferentes aplicações se comuniquem entre si através da web. Nesse contexto, os endpoints são os pontos de acesso específicos dentro de uma Web API. Eles são os URLs para os quais as requisições HTTP são enviadas e de onde as respostas são recebidas. Cada endpoint corresponde a um recurso ou uma ação específica que a API pode realizar (por exemplo, /eventos para listar eventos, /users/:id para buscar um usuário por ID, /favoritos para gerenciar favoritos). Combinados com métodos HTTP (como GET, POST, PUT, DELETE), eles definem as operações que podem ser executadas. Esses conceitos são muito importantes para o projeto pois eles permitem que o frontend se comunique com o backend. A estrutura de endpoints e Web APIs força a separação clara entre a interface do usuário e a lógica do servidor. 

#### 3.6.1.2 Endpoints do projeto

Atualmente, os endpoints do projeto são:

1. **Endpoints de Frontend (presentes em frontRoutes.js e index.js)**
Estes são as URLs que o navegador do usuário acessaria diretamente para ver as páginas HTML (renderizadas por EJS).

##### GET /

**Propósito:** Página inicial do aplicativo. É a rota principal que leva à home page, funcionando como ponto de entrada.

##### GET /login

**Propósito:** Página de login do usuário. Contém um formulário para o usuário inserir suas credenciais e acessar o sistema.

##### GET /register

**Propósito:** Página de registro de novo usuário. Oferece um formulário para que novos usuários possam criar uma conta.

##### GET /meus-eventos

**Propósito:** Página que exibe os eventos em que o usuário está inscrito e os eventos que ele favoritou. Requer que o usuário esteja logado e busca informações de InscricaoModel e FavoritoModel para personalizar o conteúdo.

##### GET /profile

**Propósito:** Página de perfil do usuário. Permite ao usuário visualizar e gerenciar suas informações pessoais e configurações de conta.

##### GET /eventos

**Propósito:** Página de listagem de eventos disponíveis. Permite a aplicação de filtros via parâmetros de query string e oferece alternância de visualização entre grid e lista.

##### GET /event/:id

**Propósito:** Página de detalhes de um evento específico. :id é um parâmetro na URL que identifica o evento a ser exibido (ex: /event/123).

##### GET /forgot-password

**Propósito:** Página para iniciar o processo de recuperação de senha. Não implementado devidamente.

2. **Endpoints de API (presentes em /api/auth.js, /api/favoritos.js, apiExtras.js, apiRoutes.js e /api/inscricoes.js)**

Estes são os URLs que o JavaScript do frontend ou outros serviços consumiriam para interagir com os dados do backend.

##### POST /login

**Propósito:** Autenticar um usuário. Recebe credenciais (email) no corpo da requisição e tenta realizar o login.

##### GET /eventos

**Propósito:** Retorna uma lista de todos os eventos em formato JSON. Implementada diretamente no arquivo principal do servidor, serve como um endpoint de API para listar eventos.

##### POST /api/eventos

**Propósito:** Criar um novo evento. Espera dados de evento (nome, tipo, localização, data, duração, classificação, acessibilidade) no corpo da requisição para adicionar um novo registro ao banco de dados.

##### GET /api/eventos/:id

**Propósito:** Obter os detalhes de um evento específico em formato JSON. :id representa o identificador único do evento.

##### PUT /api/eventos/:id

**Propósito:** Atualizar as informações de um evento existente. :id indica o evento a ser modificado, e os novos dados são enviados no corpo da requisição.

##### DELETE /api/eventos/:id

**Propósito:** Remover um evento do sistema. :id especifica qual evento deve ser excluído.

##### POST /api/inscricoes

**Propósito:** Inscrever um usuário em um evento. Recebe o ID do evento no corpo da requisição. Requer que o usuário esteja autenticado.

##### GET /api/favoritos/check/:eventoId

**Propósito:** Verificar se um evento específico está marcado como favorito pelo usuário logado. Retorna um status booleano (verdadeiro/falso).

##### POST /api/favoritos

**Propósito:** Adicionar ou remover um evento da lista de favoritos do usuário (funcionalidade "toggle"). Com base no estado atual, adiciona se não for favorito ou remove se já for.

##### DELETE /api/favoritos/:eventoId

**Propósito:** Remover explicitamente um evento da lista de favoritos do usuário. :eventoId é o identificador do evento a ser desfavoritado.

##### GET /api/favoritos

**Propósito:** Listar todos os eventos que o usuário marcou como favoritos. Retorna os dados dos eventos favoritados em JSON.

##### POST /profile/update

**Propósito:** Atualizar as informações de perfil do usuário. Recebe os dados do perfil atualizados no corpo da requisição.

##### POST /profile/change-password

**Propósito:** Alterar a senha de um usuário. Recebe a senha atual, a nova senha e sua confirmação no corpo da requisição.

##### GET /api/eventos/filter?tipo=X&data=Y...

**Propósito:** Endpoint (implícito pelos formulários de filtro do frontend) para buscar eventos com base em diversos critérios de filtragem. Os filtros (tipo, data, localização, classificação, acessibilidade) seriam passados como parâmetros de query string na URL.

### 3.7 Interface e Navegação

#### 3.7.1 Introdução: mudanças 

##### 3.7.1.1 Mudanças no backend

Algumas informações contidas no backend previamente precisaram ser adaptadas conforme necessidade. Aqui vão todas as mudanças feitas:

1. *Atualização do banco de dados:* as tabelas `categorias` e `categoria_eventos` foram removidas pois não havia necessidade de mantê-las, já que seu propósito já estava sendo cumprido pela coluna "tipo" de `eventos`. A tabela eventos foi atualizada, para colocar duas novas colunas, `acessibilidade` e `classificacao_indicativa`, com o intuito de filtrar os eventos. Por fim, foram adicionadas informações de usuários no banco de dados. O código completo atualizado pode ser visto em `database.sql`, na raiz do projeto.

2. *Comentário de todos os códigos:* todos os códigos foram comentados para melhor entendimento de cada linha deles.

3. *Implementação dos models para os favoritos e para as inscrições em eventos:* foram criados os arquivos `InscricaoModels.js` e `FavoritoModels.js.` Esses arquivos criam a lógica por trás das operações de inscrição em um evento e favoritar o evento.

4. *Implementação do script `home.js`:* de forma semelhante ao script de eventos, esse script serve para melhorar a comunicação entre back e front, e chama funções fetch.

5. *Implementação do `custom.css`:* Esse arquivo css tem como finalidade implementar estilizações extras em todas as páginas.

6. *Separação das rotas em /api e criação de todas as rotas necessárias para a execução do projeto*

##### 3.7.1.2. Mudanças no frontend e CSS

Uma das maiores mudanças gerais foi a implementação de CSS em todo o site. Isso foi feito em cada página, usando o `<style>`, o que, apesar de não ser ideal, foi usado pela complexidade dos códigos e classes. Para conseguir implementar um CSS muito fiel ao protótipo de alta fidelidade, foi utilizado o Tailwind, uma biblioteca que oferece classes CSS prontas para serem usadas no HTML para estilizar elementos web.

Além disso, foram implementados no front end diversas páginas, conforme as rotas e o protótipo de alta fidelidade, cada uma com um propósito de utilização do usuário. A pasta views agora se subdivide em /layout (páginas do projeto), /partials (arquivos gerais para as páginas) e error.ejs (arquivo que padroniza as mensagens de erro que podem aparecer no site).

#### 3.7.2 Galeria demonstrativa

Aqui, são mostradas as fotos do site em seu estado atual, mostrando o produto final da implementação.

<div align="center">
    <sub>Figura 22: Homepage </sub>
    <br>
    <img src="/assets/homepage.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

A homepage mostra todos os eventos disponíveis, uma header comum a todas as páginas, e vários botões que direcionam para outras páginas.

<div align="center">
    <sub>Figura 23: Detalhamento de um evento </sub>
    <br>
    <img src="/assets/evento_detalhe.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Aqui é a página específica de cada evento. Pode-se observar uma descrição, uma foto do evento e as principais características dele.

<div align="center">
    <sub>Figura 24: Inscrevendo-se no evento </sub>
    <br>
    <img src="/assets/inscricao.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Após clicar no botão de inscrever-se, aparece esse alerta confirmando a inscrição (ou informando um erro).

<div align="center">
    <sub>Figura 25: Favoritando o evento </sub>
    <br>
    <img src="/assets/favoritar.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

De forma semelhante à inscrição, esse alerta surge ao apertar no ícone de estrela para favoritar.

<div align="center">
    <sub>Figura 26: Meus eventos - inscrições </sub>
    <br>
    <img src="/assets/minhas_inscricoes.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Aqui, é possível ver todas as inscrições do usuário. Essa página é acessada após clicar em "meus eventos" e também engloba os favoritos.

<div align="center">
    <sub>Figura 27: Meus eventos - favoritos </sub>
    <br>
    <img src="/assets/favoritos.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

A aba de meus favoritos mostra os eventos favoritados.

<div align="center">
    <sub>Figura 28: Login </sub>
    <br>
    <img src="/assets/login.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Página de login. O site redireciona para ela após o usuário tentar interagir com um evento na homepage se ele não estiver logado.

<div align="center">
    <sub>Figura 29: Registrar-se (caso o usuário não tenha login) </sub>
    <br>
    <img src="/assets/registrar.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Caso o usuário não possua uma conta, nessa página ele pode criar. As informações de cadastro são mandadas diretamente para o banco de dados.

<div align="center">
    <sub>Figura 30: Meu perfil </sub>
    <br>
    <img src="/assets/perfil.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Aqui, podem-se ver informações do usuário no site. Nessa aba, também é possível mudar a senha, caso necessário, e atualizar preferências de notificações.

<div align="center">
    <sub>Figura 31: Eventos filtrados (nesse caso por acessibilidade) </sub>
    <br>
    <img src="/assets/eventos_filtrados.png" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Após utilizar os filtros contidos do lado esquerdo e clicar no botão de filtrar, aparecem apenas os eventos que correspondem a esse filtro.

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web

### 4.1 Demonstração do Sistema Web

#### 4.1.1. Explicação sobre o sistema

No vídeo abaixo, pode-se observar o funcionamento do website, bem como uma breve explicação sobre a estrutura MVC e uso de funções como o fetch().

<div align="center">
    <sub>Figura 32: Vídeo Demonstrativo </sub>
    <br>
    <img src="/assets/ponderada.mp4" width="80%">
    <br>
    <sup>Fonte: Material produzido pela autora (2025)</sup>
    <br>
    <br>
</div>

Em termos de código e sistema, a aplicação está subdividida conforme a arquitetura MVC (Models, Views e Controllers). O model, por exemplo o `eventoModel.js`, cria a lógica de negócios por trás da solução, estruturando a base dos dados e a construção de uma comunicação direta com o banco de dados. O controller, por exemplo o  `eventoController.js`, mantém um intermédio entre os models e entre as views, processando requisições da view, como aquelas contidas no fetch via API, e transportando para os models, de forma a manter uma comunicação ampla entre camadas. As views, como a `home.ejs`, contém o código html e css do site, além de funções de requisição, mostrando para o usuário toda a visualização da plataforma (frontend). Além dessas 3 camadas principais, as rotas ajustam os endpoints do projeto, e o middleware funciona para trazer funções intermediárias de requisição.

#### 4.1.2. Desafios do projeto

Nesse projeto, senti algumas dificuldades. Para essas dificuldades, desenvolvi soluções e obtive importantes aprendizados:

1. Dificuldade: implementar os filtros.
Solução: Aprender um pouco mais sobre a lógica de filtragem de objetos via javascript, utilizando referência de outros sites e usando IAs para ajudar no aprendizado
Aprendizado: Como o sistema de filtros funciona e sua implementação em códigos.

2. Dificuldade: deixar o site com CSS mais parecido com o protótipo de alta fidelidade e mais fiel ao guia de estilos.
Solução: Aprender mais sobre CSS e usar o framework Tailwind para ajuste de ícones.
Aprendizado: como melhorar o css e como usar o Tailwind para facilitar o ajuste com o protótipo.

3. Dificuldade: implementação do sistema de favoritos e funcionamento para atualização dos favoritos.
Solução: Estudar sobre a lógica dos favoritos, criando novos arquivos como o `favoritoModel.js` e o `/routes/api/favorito.js`.
Aprendizado: aprendi sobre como atualizar e criar os favoritos via javascript e sua implementação na arquitetura MVC.


### 4.2 Conclusões e Trabalhos Futuros

#### 4.2.1. Pontos fortes da solução

O EventCalendar, na sua versão atual, possui diversos pontos fortes, tais quais:

1. *Uma interface simples e intuitiva:* em questões de acessibilidade, o EventCalendar não requer muita experiência com navegação web para ser totalmente compreendido.
2. *Design agradável:* Apesar do uso de cores fortes, como o azul e o amarelo, o design do site é simples, coerente e agradável aos olhos do usuário.
3. *Propósito*: uma plataforma como o EventCalendar ajuda muito os usuários na organização de seus eventos, pois unifica a experiência de procura por eventos.

#### 4.2.2. Pontos a melhorar e prospecções para o futuro

Apesar da satisfação com as atuais features do EventCalendar, há diversos pontos que poderiam ser melhorados e outros a serem adicionados em um desenvolvimento futuro.

1. *Implementação das notificações*: o uso de notificações para avisar quando o evento se aproxima é 
2. *Melhoria dos filtros e adição de novos filtros*: atualmente, o sistema de filtros ainda não está na sua melhor versão. Com um desenvolvimento futuro, a sidebar de filtragem poderia ser melhorada, e novos filtros poderiam ser adicionados ao sistema. Futuramente, eventos +18 não apareceriam como passíveis de inscrição para usuários com menos de 18 anos, por exemplo.
4. *Integração e parceria com outros sites de eventos*: isso facilitaria a experiência do usuário de inscrição em diversos eventos de diversos sites.
5. *Serviços de newsletter e avisos por email*: Isso serviria para avisar de eventos chegando e possíveis eventos que o usuário gostaria de se inscrever.

---

## <a name="c5"></a>5. Referências

Seguem as referências midiáticas que utilizei para desenvolver meu projeto:

BOILERPLATE MVC. Repositório de autoria de Afonso Brandão. Disponível em: https://github.com/afonsobrandaointeli/mvc-boilerplate/tree/main
SYMPLA. Inspiração para a plataforma de eventos. Disponível em: https://www.sympla.com.br
EVENTIM. Inspiração para a plataforma de eventos. Disponível em: https://www.eventim.com.br

---
