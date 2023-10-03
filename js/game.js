const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const restartButton = document.getElementById('restartButton');

const pairs = [
  { question: 'Qual a Cor da Uva', answer: 'A cor da Uva é Azul' },
  { question: 'Pergunta 2', answer: 'Resposta 2' },
  { question: 'Pergunta 3', answer: 'Resposta 3' },
  { question: 'Pergunta 4', answer: 'Resposta 4' },
  { question: 'Pergunta 5', answer: 'Resposta 5' },
  { question: 'Pergunta 6', answer: 'Resposta 6' },
  { question: 'Pergunta 7', answer: 'Resposta 7' },
  { question: 'Pergunta 8', answer: 'Resposta 8' },
  { question: 'Pergunta 9', answer: 'Resposta 9' },
  { question: 'Pergunta 10', answer: 'Resposta 10' },
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
  const disabledPairs = document.querySelectorAll('.disabled-pair');

  if (disabledPairs.length === 10) {
    clearInterval(this.loop);
    alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}s - Prof. Ástrid`);
  }
}

const checkCards = () => {
  const firstPair = firstCard.getAttribute('data-pair');
  const secondPair = secondCard.getAttribute('data-pair');

  if (firstPair === secondPair) {
    firstCard.classList.add('disabled-pair');
    secondCard.classList.add('disabled-pair');

    firstCard = '';
    secondCard = '';

    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');

      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (pair, isQuestion) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  if (isQuestion) {
    front.textContent = pair.question;
  } else {
    front.textContent = pair.answer;
  }

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-pair', pair.question); // Pode usar qualquer propriedade única do par como identificador

  return card;
}

const loadGame = () => {
  const duplicatePairs = [...pairs, ...pairs];

  const shuffledArray = duplicatePairs.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((pair, index) => {
    const isQuestion = index % 2 === 0; // Alternar entre pergunta e resposta
    const card = createCard(pair, isQuestion);
    grid.appendChild(card);
  });
}

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML;
    timer.innerHTML = currentTime + 1;
  }, 1000);
}

window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem('player');
  startTimer();
  loadGame();
}

restartButton.addEventListener('click', () => {
  clearInterval(this.loop);
  window.location.href = '../index.html'; // Substitua '../' pelo caminho correto, se necessário
});
