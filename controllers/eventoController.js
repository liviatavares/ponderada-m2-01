const EventoModel = require("../models/eventoModel") // Importa o modelo de Evento para interagir com o banco de dados.

const eventoController = {
  // Método para buscar eventos com filtros
  // Lida com requisições para a página de eventos, aplicando filtros ou buscando todos os eventos.
  async buscarEventosComFiltros(req, res) {
    try {
      // Extrai os parâmetros de filtro da query string da requisição.
      const { tipo, data, localizacao, classificacao_indicativa, acessibilidade } = req.query

      let eventos // Variável para armazenar os eventos encontrados.
      let filters = { tipo, data, localizacao, classificacao_indicativa, acessibilidade } // Objeto para manter os filtros aplicados.

      // Verifica se algum filtro foi fornecido.
      if (tipo || data || localizacao || classificacao_indicativa || acessibilidade) {
        // Se houver filtros, busca eventos no modelo aplicando esses filtros.
        eventos = await EventoModel.findByFilters({
          tipo,
          data_evento: data,
          localizacao_evento: localizacao,
          classificacao_indicativa: classificacao_indicativa,
          acessibilidade,
        })
      } else {
        // Se não houver filtros, busca todos os eventos.
        eventos = await EventoModel.findAll()
        filters = {} // Limpa os filtros se nenhum foi usado.
      }

      // Renderiza a página 'eventos' (EJS), passando os eventos, filtros e dados do usuário da sessão.
      res.render("layout/eventos", {
        eventos,
        filters,
        user: req.session.user || null,
      })
    } catch (err) {
      // Em caso de erro, loga e renderiza uma página de erro 500.
      console.error("Erro ao carregar eventos:", err)
      res.status(500).render("error", {
        message: "Erro ao carregar eventos",
        error: err,
      })
    }
  },

  // Método para buscar um evento específico por ID
  async buscarEventoPorId(req, res) {
    try {
      // Busca o evento pelo ID fornecido nos parâmetros da URL.
      const evento = await EventoModel.findById(req.params.id)

      // Se o evento não for encontrado, renderiza uma página de erro 404.
      if (!evento) {
        return res.status(404).render("error", {
          message: "Evento não encontrado",
        })
      }

      // Renderiza a página 'event-details' (EJS), passando os detalhes do evento e o usuário.
      res.render("layout/event-details", {
        evento,
        user: req.session.user || null,
      })
    } catch (err) {
      // Em caso de erro, loga e renderiza uma página de erro 500.
      console.error("Erro ao carregar detalhes do evento:", err)
      res.status(500).render("error", {
        message: "Erro ao carregar detalhes do evento",
        error: err,
      })
    }
  },

  // Método para criar um evento (Ainda não implementado)
  async criarEvento(req, res) {
    try {
      // Retorna uma resposta JSON indicando que a funcionalidade não está implementada ainda.
      res.status(501).json({
        success: false,
        message: "Funcionalidade ainda não implementada",
      })
    } catch (err) {
      // Em caso de erro, loga e retorna um JSON de erro 500.
      console.error("Erro ao criar evento:", err)
      res.status(500).json({
        success: false,
        message: "Erro ao criar evento",
        error: err.message,
      })
    }
  },

  // Método para editar um evento (Ainda não implementado)
  async editarEvento(req, res) {
    try {
      // Retorna uma resposta JSON indicando que a funcionalidade não está implementada ainda.
      res.status(501).json({
        success: false,
        message: "Funcionalidade ainda não implementada",
      })
    } catch (err) {
      // Em caso de erro, loga e retorna um JSON de erro 500.
      console.error("Erro ao editar evento:", err)
      res.status(500).json({
        success: false,
        message: "Erro ao editar evento",
        error: err.message,
      })
    }
  },

  // Método para excluir um evento (Ainda não implementado)
  async excluirEvento(req, res) {
    try {
      // Retorna uma resposta JSON indicando que a funcionalidade não está implementada ainda.
      res.status(501).json({
        success: false,
        message: "Funcionalidade ainda não implementada",
      })
    } catch (err) {
      // Em caso de erro, loga e retorna um JSON de erro 500.
      console.error("Erro ao excluir evento:", err)
      res.status(500).json({
        success: false,
        message: "Erro ao excluir evento",
        error: err.message,
      })
    }
  },
}

module.exports = eventoController // Exporta o controller para ser usado nas rotas.