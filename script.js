// Бургерное меню

const burger = document.getElementById('burger');
const navList = document.querySelector('.menu');

burger.addEventListener('click', () => {
  navList.classList.toggle('active');
});

document.addEventListener('click', (e) => {
  if (!burger.contains(e.target) && !navList.contains(e.target)) {
    navList.classList.remove('active');
  }
});


// Слайдер игроков
const container = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let index = 0;

function updateSlider() {
const slideWidth = slides[0].offsetWidth + 15;
container.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
if (index < slides.length - 1) {
    index++;
}
updateSlider();
});

prevBtn.addEventListener("click", () => {
if (index > 0) {
    index--;
}
updateSlider();
});

window.addEventListener("resize", updateSlider);










const daysContainer = document.getElementById('days');
const calendarTitle = document.getElementById('calendar-title');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth(); // 0-11

const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const firstDay = new Date(year, month, 1).getDay(); // 0-6, где 0 — воскресенье
const daysInMonth = new Date(year, month + 1, 0).getDate();
const today = date.getDate();

calendarTitle.textContent = `${monthNames[month]} ${year}`;

// Начало с ПОНЕДЕЛЬНИКА (делаем offset)
let start = firstDay === 0 ? 6 : firstDay - 1;

let html = '';
for (let i = 0; i < start; i++) {
  html += `<div></div>`;
}

for (let d = 1; d <= daysInMonth; d++) {
  const isToday = d === today ? 'today' : '';
  html += `<div class="${isToday}">${d}</div>`;
}

daysContainer.innerHTML = html;



















const newsData = [
  {
    title: "🔥 Победа в товарищеском матче",
    text: "Сипар одержал уверенную победу со счётом 3:1 против местной команды. Матч проходил при полном стадионе и стал настоящим праздником для болельщиков. Особенно отличился капитан команды, оформивший дубль за первый тайм.",
    date: "17.05.2025",
    image: "images/image-1.png"
  },
  {
    title: "📅 Объявлен график летних сборов",
    text: "Сборы начнутся 1 июня и продлятся две недели в высокогорной зоне Варзоба. Команда сосредоточится на физической подготовке и командной игре. В планах — несколько товарищеских матчей против клубов из Узбекистана.",
    date: "16.05.2025",
    image: ""
  },
  {
    title: "🆕 Новое пополнение в команде",
    text: "Подписан контракт с молодым полузащитником из юношеской лиги. Он уже начал тренировки с основной командой. Тренерский штаб видит в нём будущего лидера средней линии. Ожидается его дебют в следующем месяце.",
    date: "13.05.2025",
    image: ""
  },
  {
    title: "🎎 Международный фестиваль в Худжанде",
    text: "Подписан контракт с молодым полузащитником из юношеской лиги. Он уже начал тренировки с основной командой. Тренерский штаб видит в нём будущего лидера средней линии. Ожидается его дебют в следующем месяце.",
    date: "10.05.2025",
    image: ""
  },
  {
    title: "🎎 Международный фестиваль в Худжанде",
    text: "С 26 по 29 мая 2025 года в городе Худжанд, на арене спортивного комплекса «Касри Варзиш», состоится масштабное событие в мире футзала — Международный фестиваль и турнир «Кубок Тавхидбанка», организованный Руководством Федерацией футбола Таджикистана, Председателем Согдийской области и футбольным клубом «Сипар» при поддержке генерального спонсора — Первого исламского банка Таджикистана — ОАО «Тавхидбанк».",
    date: "10.05.2025",
    image: ""
  }
];

const news_container = document.getElementById('news-grid');
news_container.innerHTML = "";

const isFresh = (dateStr) => {
  const newsDate = new Date(dateStr.split('.').reverse().join('-'));
  const today = new Date();
  const diffDays = (today - newsDate) / (1000 * 60 * 60 * 24);
  return diffDays <= 3;
};

const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, ${50 + Math.random() * 30}%, ${40 + Math.random() * 20}%)`;

const getRandomGradient = () => {
  const angle = Math.floor(Math.random() * 360);
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  const color3 = getRandomColor();
  return `linear-gradient(${angle}deg, ${color1}, ${color2}, ${color3})`;
};

// Показываем максимум 5 новостей
for (let i = 0; i < Math.min(newsData.length, 3); i++) {
  const news = newsData[i];
  const card = document.createElement('div');
  card.className = 'news-card';

  if (isFresh(news.date)) {
    card.classList.add('fresh');
    const tag = document.createElement("div");
    tag.className = "tag";
    tag.textContent = "НОВОЕ";
    card.appendChild(tag);
  }

  if (news.image) {
    const img = document.createElement('img');
    img.src = news.image;
    img.alt = 'Новость';
    card.appendChild(img);
  } else {
    const gradDiv = document.createElement('div');
    gradDiv.className = 'gradient-bg';
    gradDiv.style.background = getRandomGradient();
    card.appendChild(gradDiv);
  }

  const title = document.createElement('h3');
  title.textContent = news.title;

  const text = document.createElement('p');
  text.textContent = news.text;

  const date = document.createElement('div');
  date.className = 'news-date';
  date.textContent = news.date;

  card.appendChild(title);
  card.appendChild(text);
  card.appendChild(date);
  news_container.appendChild(card);
}

document.addEventListener('click', e => {
  const clickedCard = e.target.closest('.news-card');
  if (!clickedCard) return;

  document.querySelectorAll('.news-card').forEach(card => {
    if (card !== clickedCard) {
      card.classList.remove('open');
    }
  });
  clickedCard.classList.toggle('open');
});
