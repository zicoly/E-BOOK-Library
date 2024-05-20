async function getBookCovers() {
  try {
    const isbns = [
      '9780062240194',
      '0062353594',
      '1594487951',
      '9780743273565',
      '9780670012664',
      '9780451477438',
      '9780373776228',
      '9781419958684',
      '9780143105985',
      '9780451216953',
      '9780618260300',
      '9780345418265',
      '9781473212048',
    ];

    const apiUrl = `https://openlibrary.org/api/books?bibkeys=${isbns
      .map((isbn) => `ISBN:${isbn}`)
      .join(',')}&format=json`;
    let res = await fetch(apiUrl);
    let data = await res.json();

    let bookCovers = [];
    for (let key in data) {
      if (data[key].thumbnail_url) {
        bookCovers.push(data[key].thumbnail_url.replace('-S.jpg', '-L.jpg'));
      }
    }

    bookCovers = bookCovers.sort(() => Math.random() - 0.5);

    let selectedCovers = bookCovers.slice(0, 6);

    const swiperWrapper = document.getElementById('swiper-wrapper');
    swiperWrapper.innerHTML = '';
    selectedCovers.forEach((url) => {
      let article = document.createElement('article');
      article.className = 'home__article swiper-slide';
      let img = document.createElement('img');
      img.src = url;
      img.alt = 'Book cover';
      img.className = 'home__img';
      article.appendChild(img);
      swiperWrapper.appendChild(article);
    });
  } catch (error) {
    console.error('Error fetching book covers:', error);
  }
}


export default getBookCovers;
