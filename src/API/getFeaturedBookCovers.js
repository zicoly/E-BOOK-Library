async function fetchBooksForSubject(subject) {
    try {
        const response = await fetch(`https://openlibrary.org/subjects/${subject}.json?limit=20`);
        const data = await response.json();
        
        let books = data.works.map(book => ({
            cover: book.cover_id ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg` : 'images/default.jpg',
            title: book.title
        }));

        books = books.sort(() => Math.random() - 0.5);

        return books.slice(0, 12);
    } catch (error) {
        console.error(`Error fetching books for subject ${subject}:`, error);
        return [];
    }
}

async function getFeaturedBookCovers() {
    const subjects = ['love', 'romance', 'adventure', 'mystery', 'fantasy'];

    let allBooks = [];
    for (const subject of subjects) {
        const books = await fetchBooksForSubject(subject);
        allBooks = allBooks.concat(books);
    }

    allBooks = allBooks.sort(() => Math.random() - 0.5);

    let selectedBooks = allBooks.slice(0, 12);

    let swiperWrapper = document.getElementById('featured-swiper-wrapper');
    swiperWrapper.innerHTML = '';
    selectedBooks.forEach((book, index) => {
        let article = document.createElement('article');
        article.className = 'featured__card swiper-slide';
        let img = document.createElement('img');
        img.src = book.cover;
        img.alt = `Book Cover ${index + 1}`;
        img.className = 'featured__img';
        let title = document.createElement('h2');
        title.className = 'featured__title';
        title.textContent = book.title;
        let prices = document.createElement('div');
        prices.className = 'featured__prices';
        let discount = document.createElement('span');
        discount.className = 'featured__discount';
        discount.textContent = `$${(Math.random() * 10 + 5).toFixed(2)}`;
        let price = document.createElement('span');
        price.className = 'featured__price';
        price.textContent = `$${(Math.random() * 10 + 15).toFixed(2)}`;
        prices.appendChild(discount);
        prices.appendChild(price);
        let button = document.createElement('button');
        button.className = 'button';
        button.textContent = 'Read more';
        button.addEventListener('click', () => {
            searchBookInSecondPage(book.title);
        });
        let actions = document.createElement('div');
        actions.className = 'featured__actions';
        let searchButton = document.createElement('button');
        searchButton.innerHTML = '<i class="bi bi-search"></i>';
        let heartButton = document.createElement('button');
        heartButton.innerHTML = '<i class="bi bi-heart"></i>';
        let eyeButton = document.createElement('button');
        eyeButton.innerHTML = '<i class="bi bi-eye"></i>';
        actions.appendChild(searchButton);
        actions.appendChild(heartButton);
        actions.appendChild(eyeButton);
        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(prices);
        article.appendChild(button);
        article.appendChild(actions);
        swiperWrapper.appendChild(article);
    });
}

function searchBookInSecondPage(bookTitle) {
    localStorage.setItem('searchQuery', bookTitle);
    window.location.href = 'second_page/IndexSearch.html';
}

document.addEventListener('DOMContentLoaded', getFeaturedBookCovers);

export default getFeaturedBookCovers;
