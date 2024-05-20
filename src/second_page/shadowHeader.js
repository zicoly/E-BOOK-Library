const shadowHeader = () => {
  const header = document.getElementById('header');
  window.scrollY > 50
    ? header.classList.add('shadow-header')
    : header.classList.remove('shadow-header');
};
window.addEventListener('scroll', shadowHeader);
