(function dashboardMenu() {
  const categoriesNode = document.getElementById("categories");
  const toolsTitleNode = document.getElementById("toolsTitle");
  const toolSelectNode = document.getElementById("toolSelect");
  const openToolLinkNode = document.getElementById("openToolLink");

  if (!Array.isArray(window.TOOLS_CATALOG)) return;
  if (!categoriesNode || !toolSelectNode || !openToolLinkNode) return;

  const slugify = (value) =>
    value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const catalog = window.TOOLS_CATALOG.map((entry) => ({
    ...entry,
    items: entry.tools.map((name) => ({ name, slug: slugify(name) }))
  }));

  let active = catalog[0]?.category || "";

  function renderCategories() {
    categoriesNode.innerHTML = "";
    catalog.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `category-btn${entry.category === active ? " active" : ""}`;
      button.textContent = `${entry.category} (${entry.items.length})`;
      button.addEventListener("click", () => {
        active = entry.category;
        renderCategories();
        renderTools();
      });
      categoriesNode.appendChild(button);
    });
  }

  function renderTools() {
    const selected = catalog.find((entry) => entry.category === active) || catalog[0];
    if (!selected) return;

    toolsTitleNode.textContent = selected.category;
    toolSelectNode.innerHTML = "";

    selected.items.forEach((tool, index) => {
      const href = `tools/${tool.slug}/index.html`;

      const option = document.createElement("option");
      option.value = href;
      option.textContent = tool.name;

      if (index === 0) {
        openToolLinkNode.href = href;
      }

      toolSelectNode.appendChild(option);
    });

    toolSelectNode.onchange = () => {
      openToolLinkNode.href = toolSelectNode.value || "#";
    };
  }

  renderCategories();
  renderTools();
})();
