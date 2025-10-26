document.addEventListener('DOMContentLoaded', function() {
  const n = 2;
  const firstIndex = (n % 10) + 1;
  const secondIndex = firstIndex + 1;

  // Основне зображення
  const secondContainer = document.getElementById('secondImageContainer');
  const addBtn = document.getElementById('addImage');
  const incBtn = document.getElementById('increaseImage');
  const decBtn = document.getElementById('decreaseImage');
  const delBtn = document.getElementById('removeImage');

  // друга картинка і параметри масштабування (ширина у відсотках)
  let secondImage = null;
  let widthPercent = 100;     // 100% початково
  const STEP = 10;            // крок збільшення/зменшення у відсотках
  const MIN = 40;             // мінімальна ширина %
  const MAX = 250;            // максимальна ширина %

  // Функція перемикання кольорів
  function toggleColors(element, bgColor, textColor) {
    const currentBg = element.style.backgroundColor;
    if (currentBg === bgColor) {
      element.style.backgroundColor = '';
      element.style.color = '';
    } else {
      element.style.backgroundColor = bgColor;
      element.style.color = textColor;
    }
  }

  // Присвоєння id видимим елементам
  const allElements = Array.from(document.querySelectorAll('body *'));
  const visibleElements = allElements.filter(el => {
    const style = window.getComputedStyle(el);
    return style.display !== 'none' && style.visibility !== 'hidden' && el.offsetWidth > 0 && el.offsetHeight > 0;
  });
  visibleElements.forEach((el, index) => (el.id = 'el' + (index + 1)));

  // Вибір двох елементів із різними кольорами
  const firstEl = document.getElementById('el' + firstIndex);
  const secondEl = document.querySelector('#el' + secondIndex);

  if (firstEl)
    firstEl.addEventListener('click', e => {
      e.stopPropagation();
      toggleColors(firstEl, 'green', 'black');
    });

  if (secondEl)
    secondEl.addEventListener('click', e => {
      e.stopPropagation();
      toggleColors(secondEl, 'blue', 'white');
    });


   addBtn.addEventListener('click', () => {
    if (!secondImage) {
      secondImage = document.createElement('img');
      secondImage.src = 'images/Kyiv.jpg';
      secondImage.alt = 'Друге фото міста';
      secondImage.id = 'secondCityImage';
      secondImage.style.width = widthPercent + '%'; // керуємо розміром через width
      secondImage.style.height = 'auto';
      secondImage.style.borderRadius = '6px';
      secondImage.style.display = 'block';
      secondImage.style.transition = 'width 0.25s ease';
      // додаємо картинку в контейнер
      secondContainer.appendChild(secondImage);
    }
  });

  incBtn.addEventListener('click', () => {
    if (!secondImage) return;
    widthPercent = Math.min(MAX, widthPercent + STEP);
    secondImage.style.width = widthPercent + '%';
  });

  decBtn.addEventListener('click', () => {
    if (!secondImage) return;
    widthPercent = Math.max(MIN, widthPercent - STEP);
    secondImage.style.width = widthPercent + '%';
  });

  delBtn.addEventListener('click', () => {
    if (!secondImage) return;
    secondImage.remove();
    secondImage = null;
    widthPercent = 100;
  });
});
