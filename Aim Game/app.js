const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeEl = document.getElementById('time');
const board = document.getElementById('board');

let time = 0;
let score = 0;
let isFinished = false;

startBtn.addEventListener('click', (e) => {
  e.preventDefault();
  screens[0].classList.add('up')
});


timeList.addEventListener('click', e => {
  if (e.target.classList.contains('time-btn')) {
    time = parseInt(e.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (e) => {
  if (e.target.classList.contains('circle')) {
    score++
    e.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  isFinished = false;
  const start = setInterval( () => {
    decreaseTime();
    if (isFinished) {
      clearInterval(start);
    }
  }, 1000);
  createRandomCircle();
  setTime(time);


}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`
    }
    setTime(current);
  }
}

function setTime(val) {
  timeEl.innerHTML = `00:${val}`;
}

function finishGame() {
  isFinished = true;
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1>`;
}


function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const color = `linear-gradient(60deg, ${getRandomColor()} 30%, ${getRandomColor()} 100%)`;
  const {height, width} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);


  circle.classList.add('circle');
  circle.style.background = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
 return Math.round((Math.random() * (max - min) + min));
}

function getRandomColor() {
  const prefixes = '0123456789ABCDEF';
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += prefixes[Math.floor(Math.random() * prefixes.length)];
  }
  return color;

}