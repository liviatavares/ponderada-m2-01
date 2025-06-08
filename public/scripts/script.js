
// Adiciona um listener para garantir que o script só execute depois que o DOM estiver completamente carregado.
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona todos os elementos com a classe 'checkbox'.
  const checkboxes = document.querySelectorAll('.checkbox');
  // Itera sobre cada checkbox encontrada.
  checkboxes.forEach(checkbox => {
    // Adiciona um listener de clique a cada checkbox.
    checkbox.addEventListener('click', function() {
      // Alterna a classe 'checked' no elemento clicado. Isso pode ser usado para mudar o estilo visual do checkbox.
      this.classList.toggle('checked');
    });
  });

  // Seleciona todos os elementos com a classe 'select'.
  const selects = document.querySelectorAll('.select');
  // Itera sobre cada elemento 'select' encontrado.
  selects.forEach(select => {
    // Adiciona um listener de clique a cada elemento 'select'.
    select.addEventListener('click', function() {
      // Alterna a classe 'active' no elemento clicado. 
      this.classList.toggle('active');
    });
  });

  // Seleciona o elemento com a classe 'slider'.
  const slider = document.querySelector('.slider');
  // Verifica se o slider existe na página antes de tentar manipulá-lo.
  if (slider) {
    // Seleciona o "dedo" do slider e a "trilha" preenchida dentro do slider.
    const thumb = slider.querySelector('.slider-thumb');
    const track = slider.querySelector('.slider-track');

    // Adiciona um listener de clique ao slider principal.
    slider.addEventListener('mousedown', function(e) {
      // Obtém a posição e o tamanho do slider na tela.
      const rect = slider.getBoundingClientRect();
      // Calcula a posição X do clique dentro do slider.
      const x = e.clientX - rect.left;
      // Calcula a porcentagem da posição do clique em relação à largura total do slider.
      const percentage = (x / rect.width) * 100;

      // Define a posição horizontal do 'thumb' do slider.
      thumb.style.left = `${percentage}%`;
      // Define a largura da 'track' do slider para corresponder à posição do 'thumb'.
      track.style.width = `${percentage}%`;
    });
  }
});