// validate.js

document.getElementById('submitBtn').addEventListener('click', function() {
  // Отримуємо елементи та робимо trim() перед перевіркою
  const pibEl = document.getElementById('pib');
  const group = document.getElementById('group');
  const phone = document.getElementById('phone');
  const idcard = document.getElementById('idcard');
  const faculty = document.getElementById('faculty');

  const pibVal = pibEl.value.trim();
  const groupVal = group.value.trim();
  const phoneVal = phone.value.trim();
  const idcardVal = idcard.value.trim();
  const facultyVal = faculty.value.trim();

  // Явно прописуємо українські великі та малі букви у класах
  // Верхні: А-Я plus ІЇЄҐ
  // Нижні: а-я plus іїєґ
  const upper = 'А-ЯІЇЄҐ';
  const lower = 'а-яіїєґ';

  // Регулярні вирази (оновлені)
  const patterns = {
    // прізвище (1+ літер, допускає апостроф і дефіс) + пробіл + 2 ініціали (кириличні) з крапками
    pib: new RegExp(
      '^[' + upper + '][' + upper + lower + "'\\-]+\\s[" + upper + ']\\.[' + upper + ']\\.$'
    ),
    group: new RegExp('^[' + upper + ']{2}-\\d{2}$'),
    phone: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
    idcard: new RegExp('^[' + upper + ']{2}\\s№\\d{6}$'),
    faculty: new RegExp('^[' + upper + ']{4}$')
  };

  // debug — покажемо в консоль, що перевіряється
  console.log('ПІБ value:', pibVal);
  console.log('ПІБ pattern:', patterns.pib);

  const inputs = {
    pib: { el: pibEl, val: pibVal },
    group: { el: group, val: groupVal },
    phone: { el: phone, val: phoneVal },
    idcard: { el: idcard, val: idcardVal },
    faculty: { el: faculty, val: facultyVal }
  };

  let valid = true;

  // Перевірка кожного поля
  for (let key in inputs) {
    const { el, val } = inputs[key];
    const pat = patterns[key];

    // Якщо pattern — RegExp обʼєкт
    const ok = pat.test(val);
    if (!ok) {
      el.classList.add('error');
      valid = false;
      console.log(`Поле ${key} НЕ пройшло валідацію. value="${val}"`);
    } else {
      el.classList.remove('error');
      console.log(`Поле ${key} OK.`);
    }
  }

  // Результат
  if (valid) {
    const info = `
ПІБ: ${pibVal}
Група: ${groupVal}
Телефон: ${phoneVal}
ID-card: ${idcardVal}
Факультет: ${facultyVal}
`;
    alert("Введена інформація:\n" + info);
  } else {
    alert("Будь ласка, перевірте правильність введених даних!");
  }
});
