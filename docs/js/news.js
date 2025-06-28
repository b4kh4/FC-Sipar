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

const container = document.getElementById('news-grid');
container.innerHTML = "";

// Помощник для перевода номера месяца в название на русском
const monthNames = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

// Проверка, свежая ли новость (3 дня)
const isFresh = (dateStr) => {
    const parts = dateStr.split('.');
    const newsDate = new Date(+parts[2], parts[1] - 1, +parts[0]);
    const today = new Date();
    const diffMs = today - newsDate;
    const diffDays = diffMs / (1000 * 60 * 60 * 24);
    return diffDays <= 3 && diffDays >= 0;
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

// Функция для получения ключа вида "месяц-год"
const getMonthYearKey = (dateStr) => {
    const parts = dateStr.split('.');
    return `${parts[1]}-${parts[2]}`;
};

// Функция для красивого заголовка "Месяц Год"
const getMonthYearTitle = (key) => {
    const [month, year] = key.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    return `${monthNames[monthIndex]} ${year}`;
};

// Группируем новости по месяцам и годам
const groupedNews = newsData.reduce((acc, news) => {
    const key = getMonthYearKey(news.date);
    if (!acc[key]) acc[key] = [];
    acc[key].push(news);
    return acc;
}, {});

// Отрисовка групп
// Сортируем ключи от новых к старым (год, месяц)
const sortedKeys = Object.keys(groupedNews).sort((a, b) => {
    const [m1, y1] = a.split('-').map(Number);
    const [m2, y2] = b.split('-').map(Number);
    if (y2 !== y1) return y2 - y1;
    return m2 - m1;
});

sortedKeys.forEach(key => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'news-group';

    const h1 = document.createElement('h1');
    h1.textContent = getMonthYearTitle(key);
    h1.className = 'nameOfMonth';
    groupDiv.appendChild(h1);

    groupedNews[key].forEach(news => {
        const card = document.createElement('div');
        card.className = 'news-card';

        if (isFresh(news.date)) {
            card.classList.add('fresh');
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.textContent = 'НОВОЕ';
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
        card.appendChild(title);

        const text = document.createElement('p');
        text.textContent = news.text;
        card.appendChild(text);

        const dateDiv = document.createElement('div');
        dateDiv.className = 'news-date';
        dateDiv.textContent = news.date;
        card.appendChild(dateDiv);

        groupDiv.appendChild(card);
    });

    container.appendChild(groupDiv);
});

// Обработчик клика для открытия/закрытия карточек
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
