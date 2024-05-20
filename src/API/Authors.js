async function fetchAuthorsData() {
  const authorIds = [
    'OL67096A', 
    'OL23919A', 
    'OL9388A',
    'OL21594A', 
    'OL24638A', 
    'OL40776A',
    'OL6787970A',
    'OL67096A'
  ];

  try {
    const authorsWrapper = document.getElementById('authors-wrapper');
    authorsWrapper.innerHTML = '';

    for (const authorId of authorIds) {
      const response = await fetch(
        `https://openlibrary.org/authors/${authorId}.json`
      );
      const data = await response.json();

      const name = data.name;
      const bio = data.bio
        ? typeof data.bio === 'string'
          ? data.bio
          : data.bio.value
        : 'No bio available.';
      const truncatedBio = bio.split(' ').slice(0, 30).join(' ') + '...';
      const imageId = data.photos ? data.photos[0] : null;
      const imageUrl = imageId
        ? `https://covers.openlibrary.org/b/id/${imageId}-L.jpg`
        : 'images/default_author.jpg';

      const testimonialCardHTML = document.createElement('article');
      testimonialCardHTML.className = 'testimonial__card swiper-slide';
      testimonialCardHTML.innerHTML = `
        <img src="${imageUrl}" alt="Author Image" class="testimonial__img">
        <h2 class="testimonial__title">${name}</h2>
        <p class="testimonial__description">${truncatedBio}</p>
        <div class="testimonial__stars">
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-fill"></i>
          <i class="bi bi-star-half"></i>
        </div>
      `;

      testimonialCardHTML.addEventListener('click', () => {
        localStorage.setItem('searchQuery', name);
        window.location.href = 'second_page/IndexSearch.html';
      });

      authorsWrapper.appendChild(testimonialCardHTML);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
  document.addEventListener('DOMContentLoaded', fetchAuthorsData);
}

export default fetchAuthorsData;
