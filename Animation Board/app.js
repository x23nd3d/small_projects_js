const board = document.getElementById('board');
const SQUARES_NUMBER = 500;

for (let i = 0; i < SQUARES_NUMBER; i++) {
  const square = document.createElement('div');
  square.classList.add('square');
  square.addEventListener('mouseover', () => {
    setColor(square)
  });

  square.addEventListener('mouseleave', () => {
    removeColor(square)
  });

  board.append(square);
}


function setColor(element) {
  const randomColor = getRandomColor();
  element.style.backgroundColor = randomColor;
  element.style.boxShadow = `0 0 4px 3px ${randomColor}, 0 0 10px ${randomColor}`
  element.style.transform = "rotate(0)"
}

function removeColor(element) {
  element.style.backgroundColor = 'rgb(128 128 128)';
  element.style.boxShadow = `0 0 4px 3px #000`
  element.style.transform = "rotate(45deg)";

  setTimeout(() => {
    element.style.backgroundColor = '#1d1d1d';
    element.style.transform = "rotate(0)";
    element.style.boxShadow = `0 0 2px #000`
  }, 500);

}

function getRandomColor() {
  const prefixes = '0123456789ABCDEF';
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += prefixes[Math.floor(Math.random() * prefixes.length)];
  }
  return color;

}