const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sidebar = document.querySelector('.sidebar');
const container = document.querySelector('.container');
const mainSlide = document.querySelector('.main-slide');
const slidesLength = mainSlide.querySelectorAll('div').length;

let activeSlideIndex = 0;

sidebar.style.top = `-${(slidesLength - 1) * 100}vh`;

upBtn.addEventListener('click', (e) => {
  changeSlide('up');
});
downBtn.addEventListener('click', (e) => {
  changeSlide('down');
});

document.addEventListener('keydown', (e) => {
  if (e.key === "ArrowDown") {
    changeSlide('down');
  } else if (e.key === 'ArrowUp') {
    changeSlide('up');
  } else {
    return;
  }
});


function changeSlide(direction) {

  if (direction === "up") {
    activeSlideIndex++
    upBtn.classList.add('up-buttonActive');
    setTimeout(() => {
      upBtn.classList.remove('up-buttonActive');
    }, 200);
    if (activeSlideIndex === slidesLength) {
      activeSlideIndex = 0;
    }
  } else if (direction === "down") {
    activeSlideIndex--
    downBtn.classList.add('down-buttonActive');
    setTimeout(() => {
      downBtn.classList.remove('down-buttonActive');
    }, 200);
    if (activeSlideIndex < 0) {
      activeSlideIndex = slidesLength - 1;
    }
  }

  const height = container.clientHeight;
  mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
  sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;
}

function autoSlider(time) {
  setInterval(() => {

    activeSlideIndex++
    upBtn.classList.add('up-buttonActive');
    setTimeout(() => {
      upBtn.classList.remove('up-buttonActive');
    }, 200);
    if (activeSlideIndex === slidesLength) {
      activeSlideIndex = 0;
    }

    const height = container.clientHeight;
    mainSlide.style.transform = `translateY(-${activeSlideIndex * height}px)`;
    sidebar.style.transform = `translateY(${activeSlideIndex * height}px)`;

  }, time);
}

autoSlider(2000);
