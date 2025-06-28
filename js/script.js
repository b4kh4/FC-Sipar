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


// Баннер
const images = [
    '../images/banner/The Central Asian Festival 2025-1.JPG',
    '../images/banner/The Central Asian Festival 2025-2.JPG',
    '../images/banner/The Central Asian Festival 2025-3.JPG'
];

let current = images.length - 1;
const track = document.getElementById('slider-track');
const dotsContainer = document.getElementById('dots');

// Заполняем трек картинками
track.innerHTML = images.map(src => `<img src="${src}">`).join('');

function updateSliderB() {
    track.style.transform = `translateX(-${current * 100}%)`;
    dotsContainer.innerHTML = images.map((_, i) =>
        `<span class="${i === current ? 'active' : ''}" onclick="goTo(${i})"></span>`
    ).join('');
}

function next() {
    current = (current + 1) % images.length;
    updateSliderB();
}
function prev() {
    current = (current - 1 + images.length) % images.length;
    updateSliderB();
}
function goTo(i) {
    current = i;
    updateSliderB();
}

document.querySelector('.left').onclick = prev;
document.querySelector('.right').onclick = next;
updateSliderB();
setInterval(next, 5000);



// Матчи
// ...


// Календарь
const daysContainer = document.getElementById('days');
const calendarTitle = document.getElementById('calendar-title');

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();

const monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

const firstDay = new Date(year, month, 1).getDay();
const daysInMonth = new Date(year, month + 1, 0).getDate();
const today = date.getDate();

calendarTitle.textContent = `${monthNames[month]} ${year}`;

let start = firstDay === 0 ? 6 : firstDay - 1; // Начало с ПН

let html = '';
for (let i = 0; i < start; i++) {
    html += `<div></div>`;
}

for (let d = 1; d <= daysInMonth; d++) {
    const isToday = d === today ? 'today' : '';
    html += `<div class="${isToday}">${d}</div>`;
}

daysContainer.innerHTML = html;


// Слайдер игроков
const sliderContainer = document.querySelector(".slider-container");
const slides = document.querySelectorAll(".slide");
const sliderNextBtn = document.querySelector(".players-slider-btn.right");
const sliderPrevBtn = document.querySelector(".players-slider-btn.left");
let index = 0;

function updateSliderP() {
const slideWidth = slides[0].offsetWidth + 15;
sliderContainer.style.transform = `translateX(-${index * slideWidth}px)`;
}

sliderNextBtn.addEventListener("click", () => {
if (index < slides.length - 1) {
    index++;
}
updateSliderP();
});

sliderPrevBtn.addEventListener("click", () => {
if (index > 0) {
    index--;
}
updateSliderP();
});

window.addEventListener("resize", updateSliderP);


// Новости
const newsData = [
    {
        title: "🔥 «Сипар» завоевал бронзовые медали Суперлиги Таджикистана по футзалу",
        text: "Футзальная команда «Сипар» из Худжанда заняла третье место в сезоне‑2025 Суперлиги Таджикистана. В решающем ответном матче за 3-е место на родном паркете одолели «Амонатбонк» со счётом 5:4.Первый матч в Душанбе завершился убедительной победой «Сипара» — 4:2. В драматичной встрече в Худжанде «Амонатбонк» активно атаковал, но «Сипар» уверенно контролировал ход игры. Болельщики увидели целых девять забитых мячей. Это достижение является достойным итогом сезона для команды.",
        date: "20.06.2025",
        image: ""
    },
    {
        title: "📅 «Сипар» возвращается в чемпионат",
        text: "По итогам сезона команда вновь вошла в число призёров Суперлиги, продемонстрировав стабильную и высококлассную игру . После выхода из полуфинала команда сохранила боевой дух и показала крепкий характер. Поддержка трибун в Худжанде сыграла ключевую роль в мотивации игроков. Этот сезон стал одним из самых успешных за последние годы, несмотря на небольшую потерю финального матча. Бронзовые медали укрепили репутацию «Сипара» как серьёзного конкурента в таджикском футзале.",
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
        title: "🎎 Домашняя победа в 6‑м туре Суперлиги",
        text: "Команда под руководством Валичона Валиева стала единоличным лидером Суперлиги Таджикистана после домашней победы над аутсайдером в 6‑м туре. Подчеркивается уверенность команды и поддержка болельщиков. Победа укрепила позиции «Сипара» в таблице. Этот успех рассматривается как важный шаг к завоеванию призовых мест в сезоне.",
        date: "4.07.2024",
        image: ""
    }
];

const newsContainer = document.getElementById('news-grid');
newsContainer.innerHTML = "";

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
for (let i = 0; i < Math.min(newsData.length, 5); i++) {
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
    newsContainer.appendChild(card);
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