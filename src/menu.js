function menu() {
  // SEARCH
  const searchButton = document.getElementById('search-button'),
    searchClose = document.getElementById('search-close'),
    searchContent = document.getElementById('search-content');

  if (searchButton) {
    searchButton.addEventListener('click', () => {
      searchContent.classList.add('show-search');
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchContent.classList.remove('show-search');
    });
  }

  // LOGIN
  const loginButton = document.getElementById('login-button'),
    loginClose = document.getElementById('login-close'),
    loginContent = document.getElementById('login-content');

  if (loginButton) {
    loginButton.addEventListener('click', () => {
      loginContent.classList.add('show-login');
    });
  }

  if (loginClose) {
    loginClose.addEventListener('click', () => {
      loginContent.classList.remove('show-login');
    });
  }
}

export default menu;
