const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause-btn");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress-container");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// formata o tempo (minutos:segundos)
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

// Atualiza o botão Play/Pause
playPauseBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = "❚❚"; // Botão de pausa
  } else {
    audio.pause();
    playPauseBtn.textContent = "▶"; // Botão de play
  }
});

// Atualiza a barra de progresso e o tempo decorrido
audio.addEventListener("timeupdate", () => {
  const progressoPorcentagem = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = `${progressoPorcentagem}%`;

  currentTime.textContent = formatTime(audio.currentTime);
});

// Permite clicar na barra de progresso para ajustar o áudio
progressContainer.addEventListener("click", (e) => {
  const clickX = e.offsetX;
  const width = progressContainer.clientWidth;
  const novoTempo = (clickX / width) * audio.duration;
  audio.currentTime = novoTempo;
});

// Carrega os dados de duração ao iniciar
audio.addEventListener("loadedmetadata", () => {
  duration.textContent = formatTime(audio.duration);
});

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeSidebar = document.getElementById("close-sidebar");

  hamburger.addEventListener("click", () => {
    sidebar.style.right = "0"; // Abre a sidebar
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.style.right = "-250px"; // Fecha a sidebar
  });
});

// Seleciona os elementos necessários
const carousel = document.querySelector(".comentarios-carousel");
const prevButton = document.querySelector(".comentarios-container::before");
const nextButton = document.querySelector(".comentarios-container::after");

// Variáveis para controlar o estado do carousel
let currentIndex = 0;
const slideWidth = document.querySelector(".comentarios-slide").offsetWidth; // Largura de cada slide

// Função para atualizar a posição do carousel
function updateCarousel() {
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Evento para o botão "Anterior"
prevButton.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// Evento para o botão "Próximo"
nextButton.addEventListener("click", () => {
  if (currentIndex < carousel.children.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

// Ajuste para atualizar a largura dos slides ao redimensionar a tela
window.addEventListener("resize", () => {
  updateCarousel();
});
