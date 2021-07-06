const items = document.querySelectorAll('.item');
const placeholders = document.querySelectorAll('.placeholder');
const btn = document.getElementById('btn-create');
const sections = document.querySelectorAll('.section');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  createItem();
});


for (const item of items) {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
}

for (const placeholder of placeholders) {
  placeholder.addEventListener('dragover', dragOver);
  placeholder.addEventListener('dragenter', dragEnter);
  placeholder.addEventListener('dragleave', dragLeave);
  placeholder.addEventListener('drop', dragDrop);
}

function dragStart(e) {
  e.target.classList.add('hold');
  setTimeout(() => e.target.classList.add('hide'), 0);
  activatePlaceholderTarget();
  // Maybe can be removed
  if (e.target.parentElement.nextElementSibling !== null
    && e.target.parentElement.nextElementSibling.classList.contains('placeholder')
    && e.target.parentElement.nextElementSibling.childElementCount === 0) {
    e.target.parentElement.nextElementSibling.remove()
  }
}

function dragEnd(e) {
  stopPlaceholderTarget();
  e.target.className = "item";
  const parent = e.target.closest('.section');
  if (parent.children[0].classList.contains('done')) {
    parent.children[0].classList.add('finishedAnim');
    setTimeout(() => {
      parent.children[0].classList.remove('finishedAnim');
    }, 300);
  }
  renderPlaceholder(parent, e.target);
  checkEmptyPlaceholders();
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.target.classList.add('hovered');
}

function dragLeave(e) {
  e.target.classList.remove('hovered');
}

function dragDrop(e) {
  e.target.classList.remove('hovered');
  if (e.target.textContent === undefined) {
    return
  }
  const currentItem = [...document.querySelectorAll('.item')].findIndex(item => item.classList.contains('hold'));
  if (!e.target.classList.contains('item')) {
    if (e.target.previousElementSibling.classList.contains('placeholder') && !e.target.previousElementSibling.childNodes.length) {
      return
    }
    e.target.append(document.querySelectorAll('.item')[currentItem])
  }
}

function activatePlaceholderTarget() {
  document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.classList.add('holder');
  });
}

function stopPlaceholderTarget() {
  document.querySelectorAll('.placeholder').forEach(placeholder => {
    placeholder.classList.remove('holder');
  });
}

function renderPlaceholder(section, item) {
  const placeholder = document.createElement('div');
  placeholder.className = "placeholder";
  placeholder.addEventListener('dragover', dragOver);
  placeholder.addEventListener('dragenter', dragEnter);
  placeholder.addEventListener('dragleave', dragLeave);
  placeholder.addEventListener('drop', dragDrop);
  if (item.parentElement.nextElementSibling === null) {
    section.append(placeholder);
  }
  return;
}

function createItem() {
  const label = prompt('Please type the item name.', '');
  const container = sections[0];
  const containerPlaceholder = [...sections[0].querySelectorAll('.placeholder')];
  const lastPlaceholderIndex = containerPlaceholder.length - 1;
  const lastPlaceholderElem = containerPlaceholder[lastPlaceholderIndex]

  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.addEventListener('dragover', dragOver);
  placeholder.addEventListener('dragenter', dragEnter);
  placeholder.addEventListener('dragleave', dragLeave);
  placeholder.addEventListener('drop', dragDrop);

  const elem = document.createElement('div');
  elem.className = "item";
  elem.draggable = true;
  elem.textContent = label;
  elem.addEventListener('dragstart', dragStart);
  elem.addEventListener('dragend', dragEnd);
  lastPlaceholderElem.append(elem);
  container.append(placeholder);
}

function checkEmptyPlaceholders() {
  for (const section of sections) {
    const placeholders = section.querySelectorAll('.placeholder');
    if (placeholders.length >= 2) {
      const lastElem = placeholders.length - 1;
      placeholders.forEach(item => {
        if (item.childElementCount === 0 && item !== placeholders[lastElem]) {
          item.remove();
        }
      });
    }
  }
}