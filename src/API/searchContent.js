function searchContent() {
  document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const loadingSpinner = document.getElementById('loading-spinner');
    const searchResults = document.getElementById('search-results');
    const searchResultsList = document.getElementById('search-results-list');
    const searchClose = document.getElementById('search-close');
    const searchContent = document.getElementById('search-content');
    const sections = document.querySelectorAll('section');

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      performSearch();
    });

    searchInput.addEventListener('input', () => {
      if (searchInput.value.trim() === '') {
        loadingSpinner.style.display = 'none';
        searchResults.style.visibility = 'hidden';
      } else {
        loadingSpinner.style.display = 'block';
        setTimeout(performSearch, 1000); // Delay for demo purposes
      }
    });

    searchClose.addEventListener('click', () => {
      searchContent.classList.remove('show-search');
      searchInput.value = '';
      searchResults.style.visibility = 'hidden';
      loadingSpinner.style.display = 'none';
    });

    document.addEventListener('click', (event) => {
      if (!searchContent.contains(event.target)) {
        clearHighlights();
      }
    });

    function performSearch() {
      const query = searchInput.value.trim().toLowerCase();
      loadingSpinner.style.display = 'none';
      searchResultsList.innerHTML = '';

      if (query === '') {
        searchResults.style.visibility = 'hidden';
        return;
      }

      const results = [];

      sections.forEach((section) => {
        const sectionText = section.innerText.toLowerCase();
        if (sectionText.includes(query)) {
          results.push({ id: section.id, text: section.innerText });
        }
      });

      if (results.length > 0) {
        results.forEach((result) => {
          const li = document.createElement('li');
          const a = document.createElement('a');
          a.href = `#${result.id}`;
          a.textContent = result.text.split('\n')[0];
          a.addEventListener('click', (event) => {
            event.preventDefault();
            searchContent.classList.remove('show-search');
            highlightText(result.id, query);
          });
          li.appendChild(a);
          searchResultsList.appendChild(li);
        });
        searchResults.style.visibility = 'visible';
      } else {
        const li = document.createElement('li');
        li.textContent = 'No results found.';
        searchResultsList.appendChild(li);
        searchResults.style.visibility = 'visible';
      }
    }

    function highlightText(sectionId, query) {
      clearHighlights();
      const section = document.getElementById(sectionId);
      const textNodes = getTextNodes(section);
      const regex = new RegExp(`(${query})`, 'gi');

      textNodes.forEach((node) => {
        const match = node.nodeValue.match(regex);
        if (match) {
          const span = document.createElement('span');
          span.className = 'highlight';
          const parts = node.nodeValue.split(regex);
          parts.forEach((part) => {
            if (part.toLowerCase() === query) {
              const highlightSpan = document.createElement('span');
              highlightSpan.className = 'highlight';
              highlightSpan.textContent = part;
              span.appendChild(highlightSpan);
            } else {
              span.appendChild(document.createTextNode(part));
            }
          });
          node.parentNode.replaceChild(span, node);
        }
      });
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function clearHighlights() {
      const highlightedElements = document.querySelectorAll('.highlight');
      highlightedElements.forEach((element) => {
        const parent = element.parentNode;
        parent.replaceChild(
          document.createTextNode(element.textContent),
          element
        );
        parent.normalize();
      });
    }

    function getTextNodes(node) {
      const textNodes = [];
      function recurse(currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
          textNodes.push(currentNode);
        } else {
          currentNode.childNodes.forEach(recurse);
        }
      }
      recurse(node);
      return textNodes;
    }
  });
}

export default searchContent;
