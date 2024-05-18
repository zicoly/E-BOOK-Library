import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';
function swiper() {
  const shadowHeader = () => {
    const header = document.getElementById('header');
    window.scrollY > 50
      ? header.classList.add('shadow-header')
      : header.classList.remove('shadow-header');
  };
  window.addEventListener('scroll', shadowHeader);

  const swiperHome = new Swiper('.home__swiper', {
    loop: true,
    spaceBetween: -24,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    breakpoints: {
      1220: {
        spaceBetween: -32,
      },
    },
  });

  const swiperFeatured = new Swiper('.featured__swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      1150: {
        slidesPerView: 4,
        centeredSlides: false,
      },
    },
  });

  const swiperNew = new Swiper('.new__swiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 'auto',

    breakpoints: {
      1150: {
        slidesPerView: 3,
      },
    },
  });

  const swiperTestimonial = new Swiper('.testimonial__swiper', {
    loop: true,
    spaceBetween: 16,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    breakpoints: {
      1150: {
        slidesPerView: 3,
        centeredSlides: false,
      },
    },
  });

  swiperHome;
  swiperFeatured;
  swiperNew;
  swiperTestimonial;
}

export default swiper;
