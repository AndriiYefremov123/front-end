

const table = document.getElementById("tbl");
const colorPicker = document.getElementById("colorPicker");
//зміна коліру лінії 
colorPicker.addEventListener("input", function() {
  colorPicker.style.backgroundColor = colorPicker.value;})

const rows = 6, cols = 6;
let counter = 1;
const variant = 2; 

//створення таблиці 
for (let i = 0; i < rows; i++) {
  const tr = document.createElement("tr");
  for (let j = 0; j < cols; j++) {
    const td = document.createElement("td");
    td.textContent = counter;
    td.dataset.num = counter;
    tr.appendChild(td);
    counter++;
  }
  table.appendChild(tr);
}

//генерація випадкового кольору 
function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}


//допоміжна функція для контрастного тексту 
function getContrastColor(hexColor) {

  hexColor = hexColor.replace("#", "");
  
  // розбиваємо на R, G, B
  const r = parseInt(hexColor.substring(0, 2), 16);
  const g = parseInt(hexColor.substring(2, 4), 16);
  const b = parseInt(hexColor.substring(4, 6), 16);

  // формула для відносної яскравості
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // якщо фон темний робимо текст білим, інакше чорним
  return brightness < 128 ? "white" : "black";
}

//подія наведення 
table.addEventListener("mouseover", (e) => {
  const cell = e.target.closest("td");
  if (!cell) return;
  if (Number(cell.dataset.num) === variant) {
    const bg = randomColor();
    cell.style.backgroundColor = bg;
    cell.style.color = getContrastColor(bg);
  }
});

//подія кліку
table.addEventListener("click", (e) => {
  const cell = e.target.closest("td");
  if (!cell) return;
  if (Number(cell.dataset.num) === variant) {
    const bg = colorPicker.value;
    cell.style.backgroundColor = bg;
    cell.style.color = getContrastColor(bg);
  }
});

//подія подвійного кліку 
table.addEventListener("dblclick", (e) => {
  const cell = e.target.closest("td");
  if (!cell) return;

  const num = Number(cell.dataset.num);
  if (num !== variant) return; // спрацьовує лише для клітинки з номером варіанта

  const colIndex = cell.cellIndex;

  // Варіант 2: зміна кольору відповідного стовпця
  for (let r of table.rows) {
    const bg = colorPicker.value;
    r.cells[colIndex].style.backgroundColor = bg;
    r.cells[colIndex].style.color = getContrastColor(bg);
  }
});
