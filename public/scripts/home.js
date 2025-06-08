console.log('Homepage JS loaded'); // Loga uma mensagem no console para indicar que o script JavaScript da página inicial foi carregado.

// Define uma função assíncrona para buscar e exibir eventos.
async function fetchEvents() {
  // Faz uma requisição assíncrona para a rota '/eventos' 
  const res = await fetch('/eventos');
  // Converte a resposta da requisição para JSON.
  const events = await res.json();
  // Loga os eventos recebidos no console para depuração.
  console.log('Fetched events:', events);

  // Obtém o elemento HTML com o ID 'eventsGrid', que será o contêiner para os cartões de eventos.
  const grid = document.getElementById('eventsGrid');
  // Limpa qualquer conteúdo HTML existente dentro do 'eventsGrid' antes de adicionar novos eventos.
  grid.innerHTML = '';

  // Itera sobre cada evento retornado da API.
  events.forEach(event => {
    // Cria um novo elemento 'div' para representar o cartão de cada evento.
    const card = document.createElement('div');
    // Adiciona classes CSS ao cartão para estilização. 
    card.className = `event-card ${event.borderColor || 'blue'}-border`;
    // Adiciona um evento de clique ao cartão.
    card.onclick = () => {
      // Loga o ID do evento clicado.
      console.log('Event clicked:', event.id);
      // Redireciona o navegador para a página de detalhes do evento usando o ID.
      window.location.href = `/event/${event.id}`;
    };

    // Define o conteúdo HTML interno do cartão do evento usando um template string.
    card.innerHTML = `
      <div class="event-content">
        <h3 class="event-title">${event.nome_evento}</h3>
        <div class="event-details">
          <div class="event-detail">
            <img src="/assets/profile.png" alt="User" class="event-icon">
            <span>${event.classificacao_indicativa || '+18'}</span>
          </div>
          <div class="event-detail">
            <img src="/assets/local.png" alt="Location" class="event-icon">
            <span>${event.localizacao_evento}</span>
          </div>
          <div class="event-detail">
            <img src="/assets/109613.png" alt="Time" class="event-icon">
            <span>${event.duracao || '21:00'}</span>
          </div>
        </div>
      </div>
    `;
    // Adiciona o cartão de evento criado ao 'eventsGrid' na página.
    grid.appendChild(card);
  });
}

// Define uma função auxiliar para navegar para a página de detalhes de um evento.
function goToEvent(eventId) {
  // Redireciona a janela do navegador para a URL do evento específico.
  window.location.href = `/event/${eventId}`;
}

// Chama a função fetchEvents() assim que o script é executado para carregar e exibir os eventos na página.
fetchEvents();