function getContents() {
  document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const searchBox = document.getElementById('search-box');
    const main = document.getElementById('main');
    const loaderSpinner = document.getElementById('loader-spinner');

    searchButton.addEventListener('click', searchHandler);
    searchBox.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        searchHandler();
      }
    });

    async function searchHandler() {
      const query = searchBox.value.trim();
      if (query === '') return;

      loaderSpinner.style.display = 'block';
      main.innerHTML = '';

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        displayResults(data);
      } catch (error) {
        main.innerHTML = '<p>Error fetching results. Please try again.</p>';
      } finally {
        loaderSpinner.style.display = 'none';
      }
    }

    function displayResults(data) {
      if (!data.docs || data.docs.length === 0) {
        main.innerHTML = '<p>No results found.</p>';
        return;
      }

      data.docs.forEach((item) => {
        const isBook = item.type === 'work' || item.title;
        const card = document.createElement('div');
        card.classList.add('card');

        if (isBook) {
          const coverId = item.cover_i
            ? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`
            : 'https://via.placeholder.com/300x200?text=No+Cover+Image';
          const bookName = item.title || 'No title available';
          const authorName = item.author_name
            ? item.author_name.join(', ')
            : 'No author available';
          const description = item.first_sentence
            ? item.first_sentence.join(' ')
            : 'No description available';

          card.innerHTML = `
                        <img src="${coverId}" alt="${bookName}">
                        <div class="card-content">
                            <h2>${bookName}</h2>
                            <p><strong>Author:</strong> ${authorName}</p>
                            <p><strong>Description:</strong> ${description
                              .split(' ')
                              .slice(0, 20)
                              .join(' ')}...</p>
                        </div>
                    `;

          card.addEventListener('click', () => displayBookDetails(item));
        } else {
          const authorId = item.key.split('/').pop();
          const authorUrl = `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg`;
          const authorName = item.name || 'No name available';
          const birthDate = item.birth_date || 'No birth date available';
          const bio = item.bio
            ? typeof item.bio === 'string'
              ? item.bio
              : item.bio.value
            : 'No bio available';

          card.innerHTML = `
                        <img src="${authorUrl}" alt="${authorName}">
                        <div class="card-content">
                            <h2>${authorName}</h2>
                            <p><strong>Born:</strong> ${birthDate}</p>
                            <p><strong>Bio:</strong> ${bio
                              .split(' ')
                              .slice(0, 20)
                              .join(' ')}...</p>
                        </div>
                    `;

          card.addEventListener('click', () => displayAuthorDetails(item));
        }

        main.appendChild(card);
      });
    }

    async function displayBookDetails(book) {
      const coverId = book.cover_i
        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
        : 'https://via.placeholder.com/300x200?text=No+Cover+Image';
      const bookName = book.title || 'No title available';
      const authorName = book.author_name
        ? book.author_name.join(', ')
        : 'No author available';
      const description = book.first_sentence
        ? book.first_sentence.join(' ')
        : 'No description available';

      showModal(`
                <div class="modal-content">
                    <img src="${coverId}" alt="${bookName}" class="modal-image">
                    <div class="modal-text">
                        <h2>${bookName}</h2>
                        <p><strong>Author:</strong> <a href="#" class="author-link">${authorName}</a></p>
                        <p><strong>Description:</strong></p>
                        <div class="description-container">${description}</div>
                        <p><strong>Number of Pages:</strong> ${
                          book.number_of_pages_median || 'Not available'
                        }</p>
                        <p><strong>Subjects:</strong></p>
                        <div class="subjects-container">${
                          book.subject
                            ? book.subject.join(', ')
                            : 'Not available'
                        }</div>
                    </div>
                    <button id="close-modal" class="close-modal">Close</button>
                </div>
            `);

      document
        .querySelector('.author-link')
        .addEventListener('click', async (event) => {
          event.preventDefault();
          displayLoadingMessage('Loading... Please wait');
          const authorKey = book.author_key ? book.author_key[0] : null;
          if (authorKey) {
            const response = await fetch(
              `https://openlibrary.org/authors/${authorKey}.json`
            );
            if (response.ok) {
              const author = await response.json();
              displayAuthorDetails(author, book);
            }
          }
        });

      document.getElementById('close-modal').addEventListener('click', () => {
        closeModal();
      });
    }

    async function displayAuthorDetails(author, previousBook) {
      const authorId = author.key.split('/').pop();
      const authorUrl = `https://covers.openlibrary.org/a/olid/${authorId}-L.jpg`;
      const authorName = author.name || 'No name available';
      const birthDate = author.birth_date || 'No birth date available';
      const bio = author.bio
        ? typeof author.bio === 'string'
          ? author.bio
          : author.bio.value
        : 'No bio available';

      try {
        const response = await fetch(
          `https://openlibrary.org/authors/${authorId}/works.json`
        );
        const works = await response.json();

        showModal(`
                    <div class="modal-content">
                        <img src="${authorUrl}" alt="${authorName}" class="modal-image">
                        <div class="modal-text">
                            <h2>${authorName}</h2>
                            <p><strong>Born:</strong> ${birthDate}</p>
                            <p><strong>Bio:</strong></p>
                            <div class="description-container">${bio}</div>
                            <p><strong>Number of Works:</strong> ${
                              works.entries.length
                            }</p>
                            <p><strong>Works:</strong></p>
                            <div class="subjects-container">${works.entries
                              .map((work) => work.title)
                              .join(', ')}</div>
                        </div>
                        <button id="close-modal" class="close-modal">Close</button>
                    </div>
                `);

        document.getElementById('close-modal').addEventListener('click', () => {
          closeModal();
        });
      } catch (error) {
        showModal(`
                    <div class="modal-content">
                        <img src="${authorUrl}" alt="${authorName}" class="modal-image">
                        <div class="modal-text">
                            <h2>${authorName}</h2>
                            <p><strong>Born:</strong> ${birthDate}</p>
                            <p><strong>Bio:</strong></p>
                            <div class="description-container">${bio}</div>
                            <p>Error fetching works. Please try again.</p>
                        </div>
                        <button id="close-modal" class="close-modal">Close</button>
                    </div>
                `);

        document.getElementById('close-modal').addEventListener('click', () => {
          closeModal();
        });
      }
    }

    function showModal(content) {
      const modal = document.createElement('div');
      modal.classList.add('modal');
      modal.innerHTML = `
                <div class="modal-backdrop"></div>
                <div class="modal-dialog">
                    ${content}
                </div>
            `;

      document.body.appendChild(modal);

      const closeModalButton = modal.querySelector('.close-modal');
      if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
          closeModal();
        });
      }
    }

    function closeModal() {
      const modals = document.querySelectorAll('.modal');
      modals.forEach((modal) => {
        document.body.removeChild(modal);
      });
    }

    function displayLoadingMessage(message) {
      showModal(`
                <div class="modal-content">
                    <div class="loading-message">${message}</div>
                </div>
            `);
    }

    let directSearchActive;

    async function displayDefaultBooks() {
      if (directSearchActive) return;

      loaderSpinner.style.display = 'block';
      main.innerHTML = '';

      try {
        const response = await fetch(
          `https://openlibrary.org/subjects/fiction.json`
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const books = data.works.sort(() => 0.5 - Math.random()).slice(0, 10);

        if (books && books.length > 0) {
          books.forEach((book) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const coverId = book.cover_id
              ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
              : 'https://via.placeholder.com/300x200?text=No+Cover+Image';
            const bookName = book.title || 'No title available';
            const authorName = book.authors
              ? book.authors.map((author) => author.name).join(', ')
              : 'No author available';
            const description = book.first_sentence
              ? book.first_sentence
              : 'No description available';

            card.innerHTML = `
                            <img src="${coverId}" alt="${bookName}">
                            <div class="card-content">
                                <h2>${bookName}</h2>
                                <p><strong>Author:</strong> ${authorName}</p>
                                <p><strong>Description:</strong> ${description
                                  .split(' ')
                                  .slice(0, 20)
                                  .join(' ')}...</p>
                            </div>
                        `;

            card.addEventListener('click', () => displayBookDetails(book));
            main.appendChild(card);
          });
        } else {
          main.innerHTML = '<p>No results found.</p>';
        }
      } catch (error) {
        main.innerHTML = '<p>Error fetching results. Please try again.</p>';
      } finally {
        loaderSpinner.style.display = 'none';
      }
    }

    function directSearch() {
      const searchQuery = localStorage.getItem('searchQuery');
      if (searchQuery) {
        directSearchActive = true;
        searchBox.value = searchQuery;
        searchButton.click();
      }
    }

    directSearch();
    displayDefaultBooks();
  });
}

getContents();
