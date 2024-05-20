function scrollup() {
  const scrollUp = () => {
    const scrollUpElement = document.getElementById('scroll-up');
    if (scrollUpElement) {
      window.scrollY > 350
        ? scrollUpElement.classList.add('show-scroll')
        : scrollUpElement.classList.remove('show-scroll');
    }
  };
  window.addEventListener('scroll', scrollUp);

  const sections = document.querySelectorAll('section[id]');

  const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight,
        sectionTop = current.offsetTop - 58,
        sectionId = current.getAttribute('id'),
        sectionsClass = document.querySelector(
          '.nav__menu a[href*=' + sectionId + ']'
        );

      if (sectionsClass) {
        if (
          scrollDown > sectionTop &&
          scrollDown <= sectionTop + sectionHeight
        ) {
          sectionsClass.classList.add('active-link');
        } else {
          sectionsClass.classList.remove('active-link');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);

  //    SCROLL REVEAL ANIMATION
  const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true,
  });

  sr.reveal(
    `.home__data, .featured__container, .new__container, .join__data, .testimonial__container, .footer`
  );
  sr.reveal(`.home__images`, { interval: 600 });
  sr.reveal(`.services__card`, { delay: 500 });
  sr.reveal(`.discount__data`, { origin: 'left' });
  sr.reveal(`.discount__images`, { origin: 'right' });
}

export default scrollup;
