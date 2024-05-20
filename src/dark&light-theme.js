function dark_light() {
  const themeButton = document.getElementById('theme-button');
  const darkTheme = 'dark-theme';
  const iconThemeMoon = 'bi-moon';
  const iconThemeSun = 'bi-brightness-high';

  const selectedTheme = localStorage.getItem('selected-theme');
  const selectedIcon = localStorage.getItem('selected-icon');

  const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
  const getCurrentIcon = () => themeButton.classList.contains(iconThemeMoon) ? iconThemeMoon : iconThemeSun;

  if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === iconThemeMoon ? 'add' : 'remove'](iconThemeMoon);
    themeButton.classList[selectedIcon === iconThemeSun ? 'add' : 'remove'](iconThemeSun);
  } else {
    themeButton.classList.add(iconThemeMoon);
  }

  themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    if (getCurrentTheme() === 'dark') {
      themeButton.classList.remove(iconThemeMoon);
      themeButton.classList.add(iconThemeSun);
    } else {
      themeButton.classList.remove(iconThemeSun);
      themeButton.classList.add(iconThemeMoon);
    }
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
  });
}

export default dark_light;