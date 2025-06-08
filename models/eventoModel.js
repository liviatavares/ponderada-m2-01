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
