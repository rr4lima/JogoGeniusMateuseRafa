const sons = {
  vermelho: new Audio('sounds/vermelho.mp3'),
  azul: new Audio('sounds/azul.mp3'),
  verde: new Audio('sounds/verde.mp3'),
  amarelo: new Audio('sounds/amarelo.mp3')
};

const somVitoria = new Audio('sounds/ganhou.wav');
const somDerrota = new Audio('sounds/perdeu.wav');

const comecar = document.getElementById('comecar');
const btns = document.getElementsByClassName('botao-cor');
const startDiv = document.getElementById('start');
const conteudoJogo = document.getElementById('conteudoJogo');
const voltarBtn = document.getElementById('voltarBtn');
const starBtn = document.getElementById('startBtn');

const titulo = document.getElementById('titulo');
const header = document.getElementById('header');

const vermelho = document.getElementById('vermelho');
const azul = document.getElementById('azul');
const verde = document.getElementById('verde');
const amarelo = document.getElementById('amarelo');
const placarDiv = document.getElementById('placar');
const timer = document.getElementById('timer');

const cores = [vermelho, azul, verde, amarelo];

let sequencia = [];
let sequenciaUsuario = [];
let pontuacao = 0;
let tempo = 5;
let intervalo;
const limite = 20;

let jogoAtivo = false;
let podeClicar = false;

comecar.addEventListener('click', () => {
  comecar.style.display = 'none';
  conteudoJogo.classList.remove('escondido');
  conteudoJogo.style.display = 'flex';
  titulo.style.display = 'none';
  header.style.display = 'flex';
  atualizarPlacar();
});

voltarBtn.addEventListener('click', reiniciarJogo);

starBtn.addEventListener('click', () => {
  if (sequencia.length >= limite) {
    alert('Você atingiu o limite máximo de sequência. Parabéns!');
    return;
  }
  if (!jogoAtivo) {
    jogoAtivo = true;
    sequencia = [];
    pontuacao = 0;
    atualizarPlacar();
  }
  const sortear = Math.floor(Math.random() * cores.length);
  sequencia.push(cores[sortear]);
  console.log("Sequência de cores sorteadas:", sequencia.map(cor => cor.id));
  selecionar();
});

function selecionar() {
  starBtn.disabled = true;
  sequenciaUsuario = [];
  desabilitarBotoes(true);
  podeClicar = false;

  sequencia.forEach((cor, index) => {
    setTimeout(() => {
      cor.classList.add('selecionado');
      sons[cor.id].currentTime = 0;
      sons[cor.id].play();
      setTimeout(() => cor.classList.remove('selecionado'), 500);
    }, 800 * index);
  });

  setTimeout(() => {
    starBtn.disabled = false;
    desabilitarBotoes(false);
    podeClicar = true;
    iniciarTimer();
  }, sequencia.length * 800);
}

function desabilitarBotoes(desabilitar) {
  for (let botao of cores) botao.disabled = desabilitar;
}

function verificarClique(corClicada) {
  if (!jogoAtivo || !podeClicar) return;

  sons[corClicada.id].currentTime = 0;
  sons[corClicada.id].play();

  animarClique(corClicada);
  sequenciaUsuario.push(corClicada);

  const indexAtual = sequenciaUsuario.length - 1;

  if (sequenciaUsuario[indexAtual].id === sequencia[indexAtual].id) {
    if (sequenciaUsuario.length === sequencia.length) {
      pararTimer();
      pontuacao++;
      atualizarPlacar();
      podeClicar = false;

      if (sequencia.length >= limite) {
        somVitoria.play();
        alert('Parabéns! Você completou a sequência máxima.');
        reiniciarJogo();
      } else {
        setTimeout(() => {
          const sortear = Math.floor(Math.random() * cores.length);
          sequencia.push(cores[sortear]);
          selecionar();
        }, 1000);
      }
    }
  } else {
    pararTimer();
    somDerrota.play();
    alert('Você errou a sequência. Reiniciando...');
    reiniciarJogo();
  }
}

function atualizarPlacar() {
  placarDiv.textContent = `Placar: ${pontuacao}`;
}

function iniciarTimer() {
  tempo = 7;
  atualizarTimer();
  pararTimer();
  intervalo = setInterval(() => {
    tempo--;
    atualizarTimer();
    if (tempo <= 0) {
      pararTimer();
      somDerrota.play();
      alert('Tempo esgotado. Reiniciando...');
      reiniciarJogo();
    }
  }, 1000);
}

function atualizarTimer() {
  const minutos = String(Math.floor(tempo / 60)).padStart(2, '0');
  const segundos = String(tempo % 60).padStart(2, '0');
  timer.textContent = `${minutos}:${segundos}`;
}

function pararTimer() {
  clearInterval(intervalo);
}

function reiniciarJogo() {
  conteudoJogo.style.display = 'none';
  comecar.style.display = 'inline-block';
  titulo.style.display = 'flex';
  header.style.display = 'none';
  sequencia = [];
  sequenciaUsuario = [];
  pontuacao = 0;
  atualizarPlacar();
  pararTimer();
  jogoAtivo = false;
  podeClicar = false;
  timer.textContent = '00:00';
  desabilitarBotoes(true);
}

function animarClique(botao) {
  botao.classList.add('selecionado');
  setTimeout(() => botao.classList.remove('selecionado'), 500);
}

vermelho.addEventListener('click', () => verificarClique(vermelho));
azul.addEventListener('click', () => verificarClique(azul));
verde.addEventListener('click', () => verificarClique(verde));
amarelo.addEventListener('click', () => verificarClique(amarelo));


window.addEventListener('DOMContentLoaded', () => {
  const musica = document.getElementById('musicaFundo');
  musica.volume = 0.2; 
  musica.play().catch(e => console.log("Autoplay bloqueado:", e));
});


document.getElementById('comecar').addEventListener('click', function () {
  const musica = document.getElementById('musicaFundo');
  musica.volume = 0.2;
  musica.play().catch(e => console.log("Erro ao tentar tocar áudio:", e));
});
