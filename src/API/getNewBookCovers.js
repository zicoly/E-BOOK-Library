async function fetchBooks(subject) {
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject}.json?limit=20`
  );
  const data = await response.json();
  return data.works;
}

function getNewBookCovers() {
  const subjects = [
    'love',
    'romance',
    'adventure',
    'mystery',
    'fantasy',
    'science_fiction',
  ];
  const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

  function generateBookHTML(book) {
    const title = book.title;
    const imgSrc = book.cover_id
      ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
      : 'images/default.jpg';
    const discountPrice = (Math.random() * 10).toFixed(2);
    const originalPrice = (discountPrice * 2).toFixed(2);

    const bookCard = document.createElement('a');
    bookCard.className = 'new__card swiper-slide';
    bookCard.href = '#';
    bookCard.innerHTML = `
      <img src="${imgSrc}" alt="${title}" class="new__img">
      <div>
        <h2 class="new__title">${title}</h2>
        <div class="new__prices">
          <span class="new__discount">$${discountPrice}</span>
          <span class="new__price">$${originalPrice}</span>
        </div>
        <div class="new__stars">
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
        </div>
      </div>
    `;

    bookCard.addEventListener('click', () => {
      localStorage.setItem('searchQuery', title);
      window.location.href = 'second_page/IndexSearch.html';
    });

    return bookCard;
  }

  function populateBooks(wrapperId, books) {
    const wrapper = document.getElementById(wrapperId);
    wrapper.innerHTML = '';
    books.forEach(book => wrapper.appendChild(generateBookHTML(book)));
  }

  async function initializeBooks() {
    const books = await fetchBooks(randomSubject);
    const firstTenBooks = books.slice(0, 10);
    const secondTenBooks = books.slice(10, 20);

    populateBooks('new-books-wrapper-1', firstTenBooks);
populateBooks('new-books-wrapper-2', secondTenBooks);
}

document.addEventListener('DOMContentLoaded', initializeBooks);
}

export default getNewBookCovers;

