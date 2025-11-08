// Функція для завантаження користувачів
function loadUsers() {
  const container = document.getElementById('usersContainer');
  container.innerHTML = '<h2>Завантаження даних...</h2>';

  // Отримуємо 4 випадкових користувачів
  fetch('https://randomuser.me/api/?results=4')
    .then(response => {
      if (!response.ok) {
        throw new Error('Помилка HTTP: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      const users = data.results;
      container.innerHTML = ''; // очищаємо попередні дані

      users.forEach(user => {
        const picture = user.picture.large;
        const name = `${user.name.first} ${user.name.last}`;
        const cell = user.cell;
        const city = user.location.city;
        const country = user.location.country;
        const postcode = user.location.postcode;

        // Створюємо картку користувача
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
          <img src="${picture}" alt="User picture" width="120">
          <h3>${name}</h3>
          <div class="info">
            <p><strong>Мобільний:</strong> ${cell}</p>
            <p><strong>Місто:</strong> ${city}</p>
            <p><strong>Країна:</strong> ${country}</p>
            <p><strong>Поштовий індекс:</strong> ${postcode}</p>
          </div>
        `;
        container.appendChild(card);
      });
    })
    .catch(error => {
      container.innerHTML = `
        <h2 style="color:red;">Помилка завантаження</h2>
        <p>${error.message}</p>
      `;
      console.error('Помилка:', error);
    });
}

// Завантажуємо користувачів при першому відкритті сторінки
loadUsers();

// Додаємо подію натискання на кнопку
document.getElementById('loadUsers').addEventListener('click', loadUsers);
