document.addEventListener("DOMContentLoaded", () => {
  // Inicializa funcionalidades JS após o DOM estar pronto.

  // --- Funcionalidade do Slider ---
  const sliderThumb = document.querySelector(".slider-thumb"); // Seleciona o "puxador" do slider.
  const sliderTrack = document.querySelector(".slider-track"); // Seleciona a trilha do slider.

  if (sliderThumb && sliderTrack) { // Verifica se os elementos existem.
    let isDragging = false; // Flag para controlar o arrasto.

    // Inicia o arrasto ao pressionar o botão do mouse no thumb.
    sliderThumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      e.preventDefault(); // Previne o comportamento padrão (ex: seleção de texto).
    });

    // Move o thumb e a trilha quando o mouse é arrastado (se 'isDragging' for true).
    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return; // Sai se não estiver arrastando.

      const trackRect = sliderTrack.getBoundingClientRect(); // Obtém as dimensões da trilha.
      // Calcula a nova posição percentual do thumb baseada no mouse.
      let newPosition = (e.clientX - trackRect.left) / trackRect.width;

      // Limita a posição entre 0 e 1 (0% e 100%).
      newPosition = Math.max(0, Math.min(1, newPosition));

      // Atualiza a posição visual do thumb e a largura da trilha preenchida.
      sliderThumb.style.left = newPosition * 100 + "%";
      sliderTrack.style.width = newPosition * 100 + "%";
    });

    // Para o arrasto ao soltar o botão do mouse em qualquer lugar.
    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  // --- Funcionalidade do Checkbox ---
  const checkboxes = document.querySelectorAll(".checkbox"); // Seleciona todos os checkboxes.

  // Adiciona um listener de clique para cada checkbox.
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const checkMark = this.querySelector(".check-mark"); // Tenta encontrar um checkmark existente.

      if (checkMark) {
        checkMark.remove(); // Se existir, remove-o.
      } else {
        // Caso contrário, cria e adiciona um novo checkmark.
        const newCheckMark = document.createElement("div");
        newCheckMark.className = "check-mark";
        this.appendChild(newCheckMark);
      }
    });
  });

  // --- Funcionalidade de Dropdown (Select) ---
  const selects = document.querySelectorAll(".select"); // Seleciona todos os elementos de seleção.

  // Adiciona um listener de clique para cada select.
  selects.forEach((select) => {
    select.addEventListener("click", () => {
      // Placeholder para futura implementação da funcionalidade de dropdown.
      alert("Dropdown functionality would be implemented here");
    });
  });
});