(function initHomePage() {
  const searchInput = document.getElementById('searchInput');
  const searchHint = document.getElementById('searchHint');
  const toolsGrid = document.getElementById('toolsGrid');
  const noResults = document.getElementById('noResults');

  if (!window.TOOLS_CATALOG || !window.TOOLS_DESCRIPTIONS) return;

  const allTools = [];
  window.TOOLS_CATALOG.forEach(category => {
    category.tools.forEach(toolName => {
      allTools.push({
        name: toolName,
        category: category.category,
        description: window.TOOLS_DESCRIPTIONS[toolName] || 'No description available.'
      });
    });
  });

  function renderTools(tools) {
    if (tools.length === 0) {
      toolsGrid.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    let currentCategory = '';
    let html = '';

    tools.forEach(tool => {
      if (tool.category !== currentCategory) {
        if (currentCategory !== '') {
          html += '</div>';
        }
        html += `<div class="category-section">
          <h3 class="category-header">${tool.category}</h3>
          <div class="category-tools">`;
        currentCategory = tool.category;
      }

      const searchParams = new URLSearchParams();
      searchParams.set('category', tool.category);
      searchParams.set('tool', tool.name);
      const link = `index.html?${searchParams.toString()}`;

      html += `<a href="${link}" class="tool-card">
        <span class="tool-badge">${tool.category}</span>
        <h4 class="tool-title">${tool.name}</h4>
        <p class="tool-description">${tool.description}</p>
      </a>`;
    });

    if (currentCategory !== '') {
      html += '</div></div>';
    }

    toolsGrid.innerHTML = html;
  }

  function filterTools(query) {
    const q = query.toLowerCase().trim();
    if (!q) return allTools;

    return allTools.filter(tool =>
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q)
    );
  }

  let debounceTimer;
  function handleSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = searchInput.value;
      const filtered = filterTools(query);
      renderTools(filtered);
      searchHint.textContent = filtered.length > 0
        ? `${filtered.length} tool${filtered.length !== 1 ? 's' : ''} found`
        : query ? 'No results' : '';
    }, 150);
  }

  searchInput.addEventListener('input', handleSearch);

  renderTools(allTools);
})();
