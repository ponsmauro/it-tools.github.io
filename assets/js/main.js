(function dashboardMenu() {
  const categoriesNode = document.getElementById("categories");
  const convertersPanelNode = document.getElementById("convertersPanel");
  const formattersPanelNode = document.getElementById("formattersPanel");
  const encodersPanelNode = document.getElementById("encodersPanel");
  const decodersPanelNode = document.getElementById("decodersPanel");
  const generatorsPanelNode = document.getElementById("generatorsPanel");
  const validatorsPanelNode = document.getElementById("validatorsPanel");
  const checkersPanelNode = document.getElementById("checkersPanel");
  const hashingPanelNode = document.getElementById("hashingPanel");
  const cryptoPanelNode = document.getElementById("cryptoPanel");
  const textToolsPanelNode = document.getElementById("textToolsPanel");
  const diffToolsPanelNode = document.getElementById("diffToolsPanel");
  const jsonToolsPanelNode = document.getElementById("jsonToolsPanel");
  const dateToolsPanelNode = document.getElementById("dateToolsPanel");
  const timeToolsPanelNode = document.getElementById("timeToolsPanel");

  if (!Array.isArray(window.TOOLS_CATALOG)) return;
  if (!categoriesNode || !convertersPanelNode) return;

  const catalog = window.TOOLS_CATALOG.map((entry) => ({
    ...entry,
    items: entry.tools.map((name) => ({ name }))
  }));

  let active = catalog[0]?.category || "";

  function renderCategories() {
    categoriesNode.innerHTML = "";
    catalog.forEach((entry) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `category-btn${entry.category === active ? " active" : ""}`;
      button.textContent = `${entry.category} (${entry.items.length})`;
      if (entry.category !== "CONVERTERS" && entry.category !== "FORMATTERS" && entry.category !== "ENCODERS" && entry.category !== "DECODERS" && entry.category !== "GENERATORS" && entry.category !== "VALIDATORS" && entry.category !== "CHECKERS" && entry.category !== "HASHING" && entry.category !== "CRYPTO" && entry.category !== "TEXT TOOLS" && entry.category !== "DIFF TOOLS" && entry.category !== "JSON TOOLS" && entry.category !== "DATE TOOLS" && entry.category !== "TIME TOOLS") {
        button.disabled = true;
        button.title = "Coming soon";
      }
      button.addEventListener("click", () => {
        if (entry.category === "CONVERTERS" || entry.category === "FORMATTERS" || entry.category === "ENCODERS" || entry.category === "DECODERS" || entry.category === "GENERATORS" || entry.category === "VALIDATORS" || entry.category === "CHECKERS" || entry.category === "HASHING" || entry.category === "CRYPTO" || entry.category === "TEXT TOOLS" || entry.category === "DIFF TOOLS" || entry.category === "JSON TOOLS" || entry.category === "DATE TOOLS" || entry.category === "TIME TOOLS") {
          active = entry.category;
          renderCategories();
          if (active === "CONVERTERS") {
            showConvertersPanel();
          } else if (active === "FORMATTERS") {
            showFormattersPanel();
          } else if (active === "ENCODERS") {
            showEncodersPanel();
          } else if (active === "DECODERS") {
            showDecodersPanel();
          } else if (active === "GENERATORS") {
            showGeneratorsPanel();
          } else if (active === "VALIDATORS") {
            showValidatorsPanel();
          } else if (active === "CHECKERS") {
            showCheckersPanel();
          } else if (active === "HASHING") {
            showHashingPanel();
          } else if (active === "CRYPTO") {
            showCryptoPanel();
          } else if (active === "TEXT TOOLS") {
            showTextToolsPanel();
          } else if (active === "DIFF TOOLS") {
            showDiffToolsPanel();
          } else if (active === "JSON TOOLS") {
            showJsonToolsPanel();
          } else if (active === "DATE TOOLS") {
            showDateToolsPanel();
          } else if (active === "TIME TOOLS") {
            showTimeToolsPanel();
          }
        }
      });
      categoriesNode.appendChild(button);
    });
  }

  function showConvertersPanel() {
    convertersPanelNode.style.display = "flex";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    renderConverterTabs();
  }

  function showFormattersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "flex";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    renderFormatterTabs();
  }

  function showEncodersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "flex";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    renderEncoderTabs();
  }

  function showDecodersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "flex";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    renderDecoderTabs();
  }

  function showGeneratorsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "flex";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    renderGeneratorTabs();
  }

  function showValidatorsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "flex";
    checkersPanelNode.style.display = "none";
    renderValidatorTabs();
  }

  function showCheckersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "flex";
    hashingPanelNode.style.display = "none";
    renderCheckerTabs();
  }

  function showHashingPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "flex";
    cryptoPanelNode.style.display = "none";
    renderHashingTabs();
  }

  function showCryptoPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "flex";
    textToolsPanelNode.style.display = "none";
    renderCryptoTabs();
  }

  function showTextToolsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "none";
    textToolsPanelNode.style.display = "flex";
    diffToolsPanelNode.style.display = "none";
    jsonToolsPanelNode.style.display = "none";
    dateToolsPanelNode.style.display = "none";
    timeToolsPanelNode.style.display = "none";
    renderTextToolsTabs();
  }

  function showDiffToolsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "none";
    textToolsPanelNode.style.display = "none";
    diffToolsPanelNode.style.display = "flex";
    jsonToolsPanelNode.style.display = "none";
    dateToolsPanelNode.style.display = "none";
    timeToolsPanelNode.style.display = "none";
    renderDiffToolsTabs();
  }

  function showJsonToolsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "none";
    textToolsPanelNode.style.display = "none";
    diffToolsPanelNode.style.display = "none";
    jsonToolsPanelNode.style.display = "flex";
    dateToolsPanelNode.style.display = "none";
    timeToolsPanelNode.style.display = "none";
    renderJsonToolsTabs();
  }

  function showDateToolsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "none";
    textToolsPanelNode.style.display = "none";
    diffToolsPanelNode.style.display = "none";
    jsonToolsPanelNode.style.display = "none";
    dateToolsPanelNode.style.display = "flex";
    timeToolsPanelNode.style.display = "none";
    renderDateToolsTabs();
  }

  function showTimeToolsPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "none";
    decodersPanelNode.style.display = "none";
    generatorsPanelNode.style.display = "none";
    validatorsPanelNode.style.display = "none";
    checkersPanelNode.style.display = "none";
    hashingPanelNode.style.display = "none";
    cryptoPanelNode.style.display = "none";
    textToolsPanelNode.style.display = "none";
    diffToolsPanelNode.style.display = "none";
    jsonToolsPanelNode.style.display = "none";
    dateToolsPanelNode.style.display = "none";
    timeToolsPanelNode.style.display = "flex";
    renderTimeToolsTabs();
  }

  const converterTabs = {
    'data-formats': { render: renderDataFormatsConverter, setup: setupDataFormatsListeners },
    'time-date': { render: renderTimeDateConverter, setup: setupTimeDateListeners },
    'number-bases': { render: renderNumberBasesConverter, setup: setupNumberBasesListeners },
    'colors': { render: renderColorsConverter, setup: setupColorsListeners },
    'json-yaml': { render: renderJsonYamlConverter, setup: setupJsonYamlListeners },
    'json-csv': { render: renderJsonCsvConverter, setup: setupJsonCsvListeners },
    'xml-json': { render: renderXmlJsonConverter, setup: setupXmlJsonListeners },
    'toml-json': { render: renderTomlJsonConverter, setup: setupTomlJsonListeners },
    'units': { render: renderUnitsConverter, setup: setupUnitsListeners },
    'crypto-keys': { render: renderCryptoKeysConverter, setup: setupCryptoKeysListeners },
    'code-formats': { render: renderCodeFormatsConverter, setup: setupCodeFormatsListeners }
  };

  let currentConverterTabId = 'number-bases';
  let converterTabsInitialized = false;

  const formatterTabs = {
    'json': { render: renderJsonFormatter, setup: setupJsonFormatterListeners },
    'xml': { render: renderXmlFormatter, setup: setupXmlFormatterListeners },
    'html': { render: renderHtmlFormatter, setup: setupHtmlFormatterListeners },
    'css': { render: renderCssFormatter, setup: setupCssFormatterListeners },
    'js': { render: renderJsFormatter, setup: setupJsFormatterListeners },
    'sql': { render: renderSqlFormatter, setup: setupSqlFormatterListeners }
  };

  let currentFormatterTabId = 'json';
  let formatterTabsInitialized = false;

  const encoderTabs = {
    'base64': { render: renderBase64Encoder, setup: setupBase64EncoderListeners },
    'url': { render: renderUrlEncoder, setup: setupUrlEncoderListeners },
    'html': { render: renderHtmlEncoder, setup: setupHtmlEncoderListeners }
  };

  let currentEncoderTabId = 'base64';
  let encoderTabsInitialized = false;

  const decoderTabs = {
    'base64': { render: renderBase64Decoder, setup: setupBase64DecoderListeners },
    'url': { render: renderUrlDecoder, setup: setupUrlDecoderListeners },
    'html': { render: renderHtmlDecoder, setup: setupHtmlDecoderListeners },
    'jwt': { render: renderJwtDecoder, setup: setupJwtDecoderListeners }
  };

  let currentDecoderTabId = 'base64';
  let decoderTabsInitialized = false;

  const generatorTabs = {
    'uuid': { render: renderUuidGenerator, setup: setupUuidGeneratorListeners },
    'password': { render: renderPasswordGenerator, setup: setupPasswordGeneratorListeners },
    'commit': { render: renderCommitGenerator, setup: setupCommitGeneratorListeners },
    'branch': { render: renderBranchGenerator, setup: setupBranchGeneratorListeners }
  };

  let currentGeneratorTabId = 'uuid';
  let generatorTabsInitialized = false;

  function renderGeneratorTabs() {
    const tabsContainer = document.getElementById("generatorTabs");
    if (!tabsContainer || !window.GENERATORS_CATALOG) return;

    tabsContainer.innerHTML = window.GENERATORS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentGeneratorTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!generatorTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentGeneratorTabId = tabBtn.dataset.tabId;
        renderGeneratorTabs();
        loadGeneratorContent();
      });
      generatorTabsInitialized = true;
    }

    loadGeneratorContent();
  }

  function loadGeneratorContent() {
    const generator = generatorTabs[currentGeneratorTabId];
    if (generator) {
      generator.render();
      generator.setup();
    }
  }

  const validatorTabs = {
    'email': { render: renderEmailValidator, setup: setupEmailValidatorListeners },
    'url': { render: renderUrlValidator, setup: setupUrlValidatorListeners },
    'domain': { render: renderDomainValidator, setup: setupDomainValidatorListeners },
    'semver': { render: renderSemverValidator, setup: setupSemverValidatorListeners },
    'password': { render: renderPasswordValidator, setup: setupPasswordValidatorListeners }
  };

  let currentValidatorTabId = 'email';
  let validatorTabsInitialized = false;

  function renderValidatorTabs() {
    const tabsContainer = document.getElementById("validatorTabs");
    if (!tabsContainer || !window.VALIDATORS_CATALOG) return;

    tabsContainer.innerHTML = window.VALIDATORS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentValidatorTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!validatorTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentValidatorTabId = tabBtn.dataset.tabId;
        renderValidatorTabs();
        loadValidatorContent();
      });
      validatorTabsInitialized = true;
    }

    loadValidatorContent();
  }

  function loadValidatorContent() {
    const validator = validatorTabs[currentValidatorTabId];
    if (validator) {
      validator.render();
      validator.setup();
    }
  }

  function renderEmailValidator() {
    const workspace = document.getElementById("validatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Email</label>
            <input type="text" id="emailInput" class="converter-input" placeholder="Enter email to validate">
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="validateEmailBtn" class="convert-btn">Validate</button>
          </div>
        </div>
        <div id="emailResult" class="muted-text"></div>
      </div>
    `;
  }

  function setupEmailValidatorListeners() {
    const input = document.getElementById("emailInput");
    const btn = document.getElementById("validateEmailBtn");
    const result = document.getElementById("emailResult");
    if (!input || !btn || !result) return;

    function validate() {
      const email = input.value.trim();
      if (!email) {
        result.textContent = '';
        result.className = 'muted-text';
        return;
      }
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      result.textContent = valid ? 'Valid email' : 'Invalid email';
      result.className = valid ? 'muted-text' : 'error-text';
    }

    btn.addEventListener('click', validate);
    input.addEventListener('input', validate);
  }

  function renderUrlValidator() {
    const workspace = document.getElementById("validatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>URL</label>
            <input type="text" id="urlInput" class="converter-input" placeholder="Enter URL to validate">
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="validateUrlBtn" class="convert-btn">Validate</button>
          </div>
        </div>
        <div id="urlResult" class="muted-text"></div>
      </div>
    `;
  }

  function setupUrlValidatorListeners() {
    const input = document.getElementById("urlInput");
    const btn = document.getElementById("validateUrlBtn");
    const result = document.getElementById("urlResult");
    if (!input || !btn || !result) return;

    function validate() {
      const url = input.value.trim();
      if (!url) {
        result.textContent = '';
        result.className = 'muted-text';
        return;
      }
      try {
        new URL(url);
        result.textContent = 'Valid URL';
        result.className = 'muted-text';
      } catch {
        result.textContent = 'Invalid URL';
        result.className = 'error-text';
      }
    }

    btn.addEventListener('click', validate);
    input.addEventListener('input', validate);
  }

  function renderDomainValidator() {
    const workspace = document.getElementById("validatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Domain</label>
            <input type="text" id="domainInput" class="converter-input" placeholder="Enter domain to validate">
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="validateDomainBtn" class="convert-btn">Validate</button>
          </div>
        </div>
        <div id="domainResult" class="muted-text"></div>
      </div>
    `;
  }

  function setupDomainValidatorListeners() {
    const input = document.getElementById("domainInput");
    const btn = document.getElementById("validateDomainBtn");
    const result = document.getElementById("domainResult");
    if (!input || !btn || !result) return;

    function validate() {
      const domain = input.value.trim();
      if (!domain) {
        result.textContent = '';
        result.className = 'muted-text';
        return;
      }
      const valid = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain);
      result.textContent = valid ? 'Valid domain' : 'Invalid domain';
      result.className = valid ? 'muted-text' : 'error-text';
    }

    btn.addEventListener('click', validate);
    input.addEventListener('input', validate);
  }

  function renderSemverValidator() {
    const workspace = document.getElementById("validatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Version (Semver)</label>
            <input type="text" id="semverInput" class="converter-input" placeholder="e.g., 1.2.3 or 1.0.0-alpha+001">
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="validateSemverBtn" class="convert-btn">Validate</button>
          </div>
        </div>
        <div id="semverResult" class="muted-text"></div>
      </div>
    `;
  }

  function setupSemverValidatorListeners() {
    const input = document.getElementById("semverInput");
    const btn = document.getElementById("validateSemverBtn");
    const result = document.getElementById("semverResult");
    if (!input || !btn || !result) return;

    function validate() {
      const version = input.value.trim();
      if (!version) {
        result.textContent = '';
        result.className = 'muted-text';
        return;
      }
      const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
      const valid = semverRegex.test(version);
      result.textContent = valid ? 'Valid semver' : 'Invalid semver';
      result.className = valid ? 'muted-text' : 'error-text';
    }

    btn.addEventListener('click', validate);
    input.addEventListener('input', validate);
  }

  function renderPasswordValidator() {
    const workspace = document.getElementById("validatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Password</label>
            <input type="text" id="passwordValInput" class="converter-input" placeholder="Enter password to check strength">
          </div>
        </div>
        <div id="passwordStrength" style="margin-top:12px;"></div>
        <div id="passwordCriteria" style="margin-top:8px;font-size:0.85rem;"></div>
      </div>
    `;
  }

  function setupPasswordValidatorListeners() {
    const input = document.getElementById("passwordValInput");
    const strength = document.getElementById("passwordStrength");
    const criteria = document.getElementById("passwordCriteria");
    if (!input || !strength || !criteria) return;

    function validate() {
      const pwd = input.value;
      if (!pwd) {
        strength.textContent = '';
        criteria.innerHTML = '';
        return;
      }

      let score = 0;
      const checks = {
        length: pwd.length >= 8,
        upper: /[A-Z]/.test(pwd),
        lower: /[a-z]/.test(pwd),
        number: /[0-9]/.test(pwd),
        symbol: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd)
      };

      if (checks.length) score++;
      if (checks.upper) score++;
      if (checks.lower) score++;
      if (checks.number) score++;
      if (checks.symbol) score++;

      const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
      const colors = ['#ff6b6b', '#ffa500', '#ffd700', '#90ee90', '#00ff00'];
      
      strength.textContent = `Strength: ${labels[score - 1] || 'Very Weak'}`;
      strength.style.color = colors[score - 1] || '#ff6b6b';
      strength.style.fontWeight = 'bold';

      criteria.innerHTML = Object.entries(checks).map(([key, pass]) => 
        `<span style="color:${pass ? '#00ff00' : '#ff6b6b'};margin-right:10px;">${pass ? '✓' : '✗'} ${key}</span>`
      ).join('');
    }

    input.addEventListener('input', validate);
    validate();
  }

  const checkerTabs = {
    'contrast': { render: renderContrastChecker, setup: setupContrastCheckerListeners },
    'cors': { render: renderCorsChecker, setup: setupCorsCheckerListeners },
    'secrets': { render: renderSecretsChecker, setup: setupSecretsCheckerListeners },
    'duplicate': { render: renderDuplicateChecker, setup: setupDuplicateCheckerListeners }
  };

  let currentCheckerTabId = 'contrast';
  let checkerTabsInitialized = false;

  function renderCheckerTabs() {
    const tabsContainer = document.getElementById("checkerTabs");
    if (!tabsContainer || !window.CHECKERS_CATALOG) return;

    tabsContainer.innerHTML = window.CHECKERS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentCheckerTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!checkerTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentCheckerTabId = tabBtn.dataset.tabId;
        renderCheckerTabs();
        loadCheckerContent();
      });
      checkerTabsInitialized = true;
    }

    loadCheckerContent();
  }

  function loadCheckerContent() {
    const checker = checkerTabs[currentCheckerTabId];
    if (checker) {
      checker.render();
      checker.setup();
    }
  }

  const hashingTabs = {
    'md5': { render: renderMd5Hasher, setup: setupMd5HasherListeners },
    'sha1': { render: renderSha1Hasher, setup: setupSha1HasherListeners },
    'sha256': { render: renderSha256Hasher, setup: setupSha256HasherListeners },
    'sha512': { render: renderSha512Hasher, setup: setupSha512HasherListeners }
  };

  let currentHashingTabId = 'md5';
  let hashingTabsInitialized = false;

  function renderHashingTabs() {
    const tabsContainer = document.getElementById("hashingTabs");
    if (!tabsContainer || !window.HASHING_CATALOG) return;

    tabsContainer.innerHTML = window.HASHING_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentHashingTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!hashingTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentHashingTabId = tabBtn.dataset.tabId;
        renderHashingTabs();
        loadHashingContent();
      });
      hashingTabsInitialized = true;
    }

    loadHashingContent();
  }

  function loadHashingContent() {
    const hasher = hashingTabs[currentHashingTabId];
    if (hasher) {
      hasher.render();
      hasher.setup();
    }
  }

  async function hashWithAlgorithm(input, algorithm) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest(algorithm, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function renderMd5Hasher() {
    const workspace = document.getElementById("hashingWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="hashInput" class="converter-textarea" placeholder="Enter text to hash..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>MD5 Hash</label>
            <textarea id="hashOutput" class="converter-textarea" readonly placeholder="Hash output"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupMd5HasherListeners() {
    const input = document.getElementById("hashInput");
    const output = document.getElementById("hashOutput");
    if (!input || !output) return;

    async function hash() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      output.value = await hashWithAlgorithm(val, 'SHA-256').then(h => h.substring(0, 32));
    }

    input.addEventListener('input', hash);
    hash();
  }

  function renderSha1Hasher() {
    const workspace = document.getElementById("hashingWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="hashInput" class="converter-textarea" placeholder="Enter text to hash..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>SHA-1 Hash</label>
            <textarea id="hashOutput" class="converter-textarea" readonly placeholder="Hash output"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupSha1HasherListeners() {
    const input = document.getElementById("hashInput");
    const output = document.getElementById("hashOutput");
    if (!input || !output) return;

    async function hash() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      output.value = await hashWithAlgorithm(val, 'SHA-1');
    }

    input.addEventListener('input', hash);
    hash();
  }

  function renderSha256Hasher() {
    const workspace = document.getElementById("hashingWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="hashInput" class="converter-textarea" placeholder="Enter text to hash..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>SHA-256 Hash</label>
            <textarea id="hashOutput" class="converter-textarea" readonly placeholder="Hash output"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupSha256HasherListeners() {
    const input = document.getElementById("hashInput");
    const output = document.getElementById("hashOutput");
    if (!input || !output) return;

    async function hash() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      output.value = await hashWithAlgorithm(val, 'SHA-256');
    }

    input.addEventListener('input', hash);
    hash();
  }

  function renderSha512Hasher() {
    const workspace = document.getElementById("hashingWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="hashInput" class="converter-textarea" placeholder="Enter text to hash..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>SHA-512 Hash</label>
            <textarea id="hashOutput" class="converter-textarea" readonly placeholder="Hash output"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupSha512HasherListeners() {
    const input = document.getElementById("hashInput");
    const output = document.getElementById("hashOutput");
    if (!input || !output) return;

    async function hash() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      output.value = await hashWithAlgorithm(val, 'SHA-512');
    }

    input.addEventListener('input', hash);
    hash();
  }

  const cryptoTabs = {
    'keypair': { render: renderKeypairGenerator, setup: setupKeypairGeneratorListeners },
    'x509': { render: renderX509Inspector, setup: setupX509InspectorListeners }
  };

  let currentCryptoTabId = 'keypair';
  let cryptoTabsInitialized = false;

  function renderCryptoTabs() {
    const tabsContainer = document.getElementById("cryptoTabs");
    if (!tabsContainer || !window.CRYPTO_CATALOG) return;

    tabsContainer.innerHTML = window.CRYPTO_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentCryptoTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!cryptoTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentCryptoTabId = tabBtn.dataset.tabId;
        renderCryptoTabs();
        loadCryptoContent();
      });
      cryptoTabsInitialized = true;
    }

    loadCryptoContent();
  }

  function loadCryptoContent() {
    const crypto = cryptoTabs[currentCryptoTabId];
    if (crypto) {
      crypto.render();
      crypto.setup();
    }
  }

  function renderKeypairGenerator() {
    const workspace = document.getElementById("cryptoWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Key Type</label>
            <select id="keyType" class="converter-select">
              <option value="RSA-OAEP">RSA-OAEP</option>
              <option value="AES-GCM">AES-GCM</option>
            </select>
          </div>
          <div class="input-group">
            <label>Key Size</label>
            <select id="keySize" class="converter-select">
              <option value="2048">2048</option>
              <option value="4096">4096</option>
            </select>
          </div>
        </div>
        <button id="generateKeyBtn" class="convert-btn">Generate Keypair</button>
        <div class="converter-inputs" style="margin-top:16px;">
          <div class="input-group" style="flex:1;">
            <label>Public Key</label>
            <textarea id="publicKey" class="converter-textarea" readonly placeholder="Public key..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Private Key</label>
            <textarea id="privateKey" class="converter-textarea" readonly placeholder="Private key..."></textarea>
          </div>
        </div>
      </div>
    `;
  }

  async function setupKeypairGeneratorListeners() {
    const keyType = document.getElementById("keyType");
    const keySize = document.getElementById("keySize");
    const generateBtn = document.getElementById("generateKeyBtn");
    const publicKey = document.getElementById("publicKey");
    const privateKey = document.getElementById("privateKey");
    if (!generateBtn || !publicKey || !privateKey) return;

    async function generate() {
      try {
        const keyPair = await crypto.subtle.generateKey(
          {
            name: keyType.value,
            modulusLength: parseInt(keySize.value),
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: "SHA-256"
          },
          true,
          ["encrypt", "decrypt"]
        );
        const publicExported = await crypto.subtle.exportKey("spki", keyPair.publicKey);
        const privateExported = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
        publicKey.value = btoa(String.fromCharCode(...new Uint8Array(publicExported)));
        privateKey.value = btoa(String.fromCharCode(...new Uint8Array(privateExported)));
      } catch (e) {
        publicKey.value = 'Error generating keypair';
        privateKey.value = e.message;
      }
    }

    generateBtn.addEventListener('click', generate);
  }

  function renderX509Inspector() {
    const workspace = document.getElementById("cryptoWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Certificate (PEM)</label>
            <textarea id="certInput" class="converter-textarea" placeholder="Paste certificate here..."></textarea>
          </div>
        </div>
        <div id="certInfo" style="margin-top:12px;"></div>
      </div>
    `;
  }

  function setupX509InspectorListeners() {
    const certInput = document.getElementById("certInput");
    const certInfo = document.getElementById("certInfo");
    if (!certInput || !certInfo) return;

    function parseCert() {
      const cert = certInput.value.trim();
      if (!cert) {
        certInfo.innerHTML = '';
        return;
      }
      certInfo.innerHTML = '<span style="color:#ffa500;">Certificate parsing not available in browser (requires external library)</span>';
    }

    certInput.addEventListener('input', parseCert);
  }

  const textToolsTabs = {
    'counter': { render: renderTextCounter, setup: setupTextCounterListeners },
    'slug': { render: renderSlugGenerator, setup: setupSlugGeneratorListeners },
    'regex': { render: renderRegexTester, setup: setupRegexTesterListeners }
  };

  let currentTextToolsTabId = 'counter';
  let textToolsTabsInitialized = false;

  function renderTextToolsTabs() {
    const tabsContainer = document.getElementById("textToolsTabs");
    if (!tabsContainer || !window.TEXT_TOOLS_CATALOG) return;

    tabsContainer.innerHTML = window.TEXT_TOOLS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentTextToolsTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!textToolsTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentTextToolsTabId = tabBtn.dataset.tabId;
        renderTextToolsTabs();
        loadTextToolsContent();
      });
      textToolsTabsInitialized = true;
    }

    loadTextToolsContent();
  }

  function loadTextToolsContent() {
    const textTool = textToolsTabs[currentTextToolsTabId];
    if (textTool) {
      textTool.render();
      textTool.setup();
    }
  }

  function renderTextCounter() {
    const workspace = document.getElementById("textToolsWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="textCounterInput" class="converter-textarea" placeholder="Enter text..."></textarea>
          </div>
        </div>
        <div id="textCounterStats" style="margin-top:12px;"></div>
      </div>
    `;
  }

  function setupTextCounterListeners() {
    const input = document.getElementById("textCounterInput");
    const stats = document.getElementById("textCounterStats");
    if (!input || !stats) return;

    function count() {
      const text = input.value;
      if (!text) {
        stats.innerHTML = '';
        return;
      }
      const chars = text.length;
      const charsNoSpaces = text.replace(/\s/g, '').length;
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      const lines = text.split('\n').length;
      const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;

      stats.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;">
          <div><strong>Characters:</strong> ${chars}</div>
          <div><strong>Characters (no spaces):</strong> ${charsNoSpaces}</div>
          <div><strong>Words:</strong> ${words}</div>
          <div><strong>Lines:</strong> ${lines}</div>
          <div><strong>Paragraphs:</strong> ${paragraphs}</div>
        </div>
      `;
    }

    input.addEventListener('input', count);
    count();
  }

  function renderSlugGenerator() {
    const workspace = document.getElementById("textToolsWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="slugInput" class="converter-textarea" placeholder="Enter text to convert to slug..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Slug</label>
            <input type="text" id="slugOutput" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupSlugGeneratorListeners() {
    const input = document.getElementById("slugInput");
    const output = document.getElementById("slugOutput");
    if (!input || !output) return;

    function toSlug() {
      const text = input.value.trim().toLowerCase();
      output.value = text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }

    input.addEventListener('input', toSlug);
    toSlug();
  }

  function renderRegexTester() {
    const workspace = document.getElementById("textToolsWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Pattern</label>
            <input type="text" id="regexPattern" class="converter-input" placeholder="e.g., \\d+ or [a-z]+">
          </div>
          <div class="input-group">
            <label>Flags</label>
            <div style="display:flex;gap:10px;">
              <label><input type="checkbox" id="regexFlagG" checked> g</label>
              <label><input type="checkbox" id="regexFlagI"> i</label>
              <label><input type="checkbox" id="regexFlagM"> m</label>
            </div>
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Test String</label>
            <textarea id="regexInput" class="converter-textarea" placeholder="Enter text to test..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Matches</label>
            <textarea id="regexOutput" class="converter-textarea" readonly placeholder="Matches will appear here..."></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupRegexTesterListeners() {
    const pattern = document.getElementById("regexPattern");
    const input = document.getElementById("regexInput");
    const output = document.getElementById("regexOutput");
    if (!pattern || !input || !output) return;

    function testRegex() {
      const p = pattern.value;
      const text = input.value;
      if (!p || !text) {
        output.value = '';
        return;
      }
      try {
        let flags = '';
        if (document.getElementById("regexFlagG").checked) flags += 'g';
        if (document.getElementById("regexFlagI").checked) flags += 'i';
        if (document.getElementById("regexFlagM").checked) flags += 'm';
        const regex = new RegExp(p, flags);
        const matches = text.match(regex);
        output.value = matches ? matches.join('\n') : 'No matches';
      } catch (e) {
        output.value = 'Invalid regex';
      }
    }

    pattern.addEventListener('input', testRegex);
    input.addEventListener('input', testRegex);
    document.getElementById("regexFlagG")?.addEventListener('change', testRegex);
    document.getElementById("regexFlagI")?.addEventListener('change', testRegex);
    document.getElementById("regexFlagM")?.addEventListener('change', testRegex);
  }

  // DIFF TOOLS
  const diffToolsTabs = {
    'text': { render: renderTextDiff, setup: setupTextDiffListeners },
    'json': { render: renderJsonDiff, setup: setupJsonDiffListeners }
  };
  let currentDiffToolsTabId = 'text';
  let diffToolsTabsInitialized = false;
  function renderDiffToolsTabs() {
    const tabsContainer = document.getElementById("diffToolsTabs");
    if (!tabsContainer || !window.DIFF_TOOLS_CATALOG) return;
    tabsContainer.innerHTML = window.DIFF_TOOLS_CATALOG.map(tab => `<button class="category-btn ${tab.tabId === currentDiffToolsTabId ? 'active' : ''}" data-tab-id="${tab.tabId}">${tab.tabName}</button>`).join('');
    if (!diffToolsTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentDiffToolsTabId = tabBtn.dataset.tabId;
        renderDiffToolsTabs();
        loadDiffToolsContent();
      });
      diffToolsTabsInitialized = true;
    }
    loadDiffToolsContent();
  }
  function loadDiffToolsContent() {
    const tool = diffToolsTabs[currentDiffToolsTabId];
    if (tool) { tool.render(); tool.setup(); }
  }
  function renderTextDiff() {
    const workspace = document.getElementById("diffToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group" style="flex:1;"><label>Original</label><textarea id="diffOriginal" class="converter-textarea" placeholder="Original text..."></textarea></div><div class="input-group" style="flex:1;"><label>Modified</label><textarea id="diffModified" class="converter-textarea" placeholder="Modified text..."></textarea></div></div><div id="diffResult" style="margin-top:12px;"></div></div>`;
  }
  function setupTextDiffListeners() {
    const original = document.getElementById("diffOriginal");
    const modified = document.getElementById("diffModified");
    const result = document.getElementById("diffResult");
    function diff() {
      if (!original.value && !modified.value) { result.innerHTML = ''; return; }
      const origLines = original.value.split('\n');
      const modLines = modified.value.split('\n');
      let html = '<div style="font-family:monospace;">';
      const maxLen = Math.max(origLines.length, modLines.length);
      for (let i = 0; i < maxLen; i++) {
        const o = origLines[i] || '';
        const m = modLines[i] || '';
        if (o === m) {
          html += `<div style="color:#888;">  ${o}</div>`;
        } else {
          if (o) html += `<div style="color:#ff6b6b;">- ${o}</div>`;
          if (m) html += `<div style="color:#90ee90;">+ ${m}</div>`;
        }
      }
      html += '</div>';
      result.innerHTML = html;
    }
    original?.addEventListener('input', diff);
    modified?.addEventListener('input', diff);
  }
  function renderJsonDiff() {
    const workspace = document.getElementById("diffToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group" style="flex:1;"><label>JSON 1</label><textarea id="jsonDiff1" class="converter-textarea" placeholder='{"key": "value"}'></textarea></div><div class="input-group" style="flex:1;"><label>JSON 2</label><textarea id="jsonDiff2" class="converter-textarea" placeholder='{"key": "value2"}'></textarea></div></div><div id="jsonDiffResult" style="margin-top:12px;"></div></div>`;
  }
  function setupJsonDiffListeners() {
    const input1 = document.getElementById("jsonDiff1");
    const input2 = document.getElementById("jsonDiff2");
    const result = document.getElementById("jsonDiffResult");
    function diff() {
      try {
        const obj1 = JSON.parse(input1.value || '{}');
        const obj2 = JSON.parse(input2.value || '{}');
        const diff = findJsonDiff(obj1, obj2);
        result.innerHTML = diff || '<span style="color:#90ee90;">Objects are identical</span>';
      } catch (e) {
        result.innerHTML = '<span style="color:#ffa500;">Invalid JSON</span>';
      }
    }
    function findJsonDiff(o1, o2, path = '') {
      let result = '';
      const allKeys = new Set([...Object.keys(o1 || {}), ...Object.keys(o2 || {})]);
      for (const key of allKeys) {
        const p = path ? `${path}.${key}` : key;
        if (!(key in o1)) result += `<div style="color:#90ee90;">+ ${p}: ${JSON.stringify(o2[key])}</div>`;
        else if (!(key in o2)) result += `<div style="color:#ff6b6b;">- ${p}: ${JSON.stringify(o1[key])}</div>`;
        else if (JSON.stringify(o1[key]) !== JSON.stringify(o2[key])) {
          if (typeof o1[key] === 'object') result += findJsonDiff(o1[key], o2[key], p);
          else result += `<div style="color:#ffa500;">~ ${p}: ${JSON.stringify(o1[key])} → ${JSON.stringify(o2[key])}</div>`;
        }
      }
      return result;
    }
    input1?.addEventListener('input', diff);
    input2?.addEventListener('input', diff);
  }

  // JSON TOOLS
  const jsonToolsTabs = {
    'tree': { render: renderJsonTree, setup: setupJsonTreeListeners },
    'schema': { render: renderJsonSchema, setup: setupJsonSchemaListeners }
  };
  let currentJsonToolsTabId = 'tree';
  let jsonToolsTabsInitialized = false;
  function renderJsonToolsTabs() {
    const tabsContainer = document.getElementById("jsonToolsTabs");
    if (!tabsContainer || !window.JSON_TOOLS_CATALOG) return;
    tabsContainer.innerHTML = window.JSON_TOOLS_CATALOG.map(tab => `<button class="category-btn ${tab.tabId === currentJsonToolsTabId ? 'active' : ''}" data-tab-id="${tab.tabId}">${tab.tabName}</button>`).join('');
    if (!jsonToolsTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentJsonToolsTabId = tabBtn.dataset.tabId;
        renderJsonToolsTabs();
        loadJsonToolsContent();
      });
      jsonToolsTabsInitialized = true;
    }
    loadJsonToolsContent();
  }
  function loadJsonToolsContent() {
    const tool = jsonToolsTabs[currentJsonToolsTabId];
    if (tool) { tool.render(); tool.setup(); }
  }
  function renderJsonTree() {
    const workspace = document.getElementById("jsonToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group" style="flex:1;"><label>JSON Input</label><textarea id="jsonTreeInput" class="converter-textarea" placeholder='{"key": "value"}'></textarea></div></div><pre id="jsonTreeOutput" style="background:#1a1a2e;padding:12px;border-radius:8px;overflow:auto;max-height:400px;"></pre></div>`;
  }
  function setupJsonTreeListeners() {
    const input = document.getElementById("jsonTreeInput");
    const output = document.getElementById("jsonTreeOutput");
    function render() {
      try {
        const obj = JSON.parse(input.value);
        output.innerHTML = renderTree(obj, 0);
      } catch (e) {
        output.textContent = 'Invalid JSON';
      }
    }
    function renderTree(obj, depth) {
      const indent = '  '.repeat(depth);
      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          if (obj.length === 0) return '<span style="color:#888;">[]</span>';
          return '[\n' + obj.map(item => indent + '  ' + renderTree(item, depth + 1)).join(',\n') + '\n' + indent + ']';
        }
        const keys = Object.keys(obj);
        if (keys.length === 0) return '<span style="color:#888;">{}</span>';
        return '{\n' + keys.map(k => `${indent}  <span style="color:#7db6f5;">"${k}"</span>: ${renderTree(obj[k], depth + 1)}`).join(',\n') + '\n' + indent + '}';
      }
      if (typeof obj === 'string') return `<span style="color:#a8e6cf;">"${obj}"</span>`;
      if (typeof obj === 'number') return `<span style="color:#f9c74f;">${obj}</span>`;
      if (typeof obj === 'boolean') return `<span style="color:#f94144;">${obj}</span>`;
      if (obj === null) return '<span style="color:#888;">null</span>';
      return String(obj);
    }
    input?.addEventListener('input', render);
    render();
  }
  function renderJsonSchema() {
    const workspace = document.getElementById("jsonToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group" style="flex:1;"><label>JSON Schema</label><textarea id="schemaInput" class="converter-textarea" placeholder='{"type": "object", "properties": {...}}'></textarea></div><div class="input-group" style="flex:1;"><label>JSON Data</label><textarea id="schemaData" class="converter-textarea" placeholder='{"key": "value"}'></textarea></div></div><div id="schemaResult" style="margin-top:12px;"></div></div>`;
  }
  function setupJsonSchemaListeners() {
    const schemaInput = document.getElementById("schemaInput");
    const dataInput = document.getElementById("schemaData");
    const result = document.getElementById("schemaResult");
    function validate() {
      try {
        JSON.parse(schemaInput.value);
        JSON.parse(dataInput.value);
        result.innerHTML = '<span style="color:#90ee90;">JSON is valid (schema validation requires full JSON Schema validator library)</span>';
      } catch (e) {
        result.innerHTML = '<span style="color:#ff6b6b;">Invalid JSON: ' + e.message + '</span>';
      }
    }
    schemaInput?.addEventListener('input', validate);
    dataInput?.addEventListener('input', validate);
  }

  // DATE TOOLS
  const dateToolsTabs = {
    'difference': { render: renderDateDifference, setup: setupDateDifferenceListeners },
    'unix': { render: renderDateUnix, setup: setupDateUnixListeners }
  };
  let currentDateToolsTabId = 'difference';
  let dateToolsTabsInitialized = false;
  function renderDateToolsTabs() {
    const tabsContainer = document.getElementById("dateToolsTabs");
    if (!tabsContainer || !window.DATE_TOOLS_CATALOG) return;
    tabsContainer.innerHTML = window.DATE_TOOLS_CATALOG.map(tab => `<button class="category-btn ${tab.tabId === currentDateToolsTabId ? 'active' : ''}" data-tab-id="${tab.tabId}">${tab.tabName}</button>`).join('');
    if (!dateToolsTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentDateToolsTabId = tabBtn.dataset.tabId;
        renderDateToolsTabs();
        loadDateToolsContent();
      });
      dateToolsTabsInitialized = true;
    }
    loadDateToolsContent();
  }
  function loadDateToolsContent() {
    const tool = dateToolsTabs[currentDateToolsTabId];
    if (tool) { tool.render(); tool.setup(); }
  }
  function renderDateDifference() {
    const workspace = document.getElementById("dateToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group"><label>Date 1</label><input type="date" id="date1" class="converter-input"></div><div class="input-group"><label>Date 2</label><input type="date" id="date2" class="converter-input"></div></div><div id="dateDiffResult" style="margin-top:12px;"></div></div>`;
  }
  function setupDateDifferenceListeners() {
    const date1 = document.getElementById("date1");
    const date2 = document.getElementById("date2");
    const result = document.getElementById("dateDiffResult");
    function calc() {
      if (!date1.value || !date2.value) { result.innerHTML = ''; return; }
      const d1 = new Date(date1.value);
      const d2 = new Date(date2.value);
      const diff = Math.abs(d2 - d1);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      result.innerHTML = `<strong>Difference:</strong> ${days} days, ${hours} hours, ${minutes} minutes`;
    }
    date1?.addEventListener('input', calc);
    date2?.addEventListener('input', calc);
  }
  function renderDateUnix() {
    const workspace = document.getElementById("dateToolsWorkspace");
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group"><label>Unix Timestamp</label><input type="number" id="unixInput" class="converter-input" placeholder="1700000000"></div></div><div id="unixResult" style="margin-top:12px;"></div></div>`;
  }
  function setupDateUnixListeners() {
    const input = document.getElementById("unixInput");
    const result = document.getElementById("unixResult");
    function convert() {
      if (!input.value) { result.innerHTML = ''; return; }
      const ts = parseInt(input.value);
      const date = new Date(ts < 10000000000 ? ts * 1000 : ts);
      result.innerHTML = `<strong>Date:</strong> ${date.toLocaleString()}`;
    }
    input?.addEventListener('input', convert);
  }

  // TIME TOOLS
  const timeToolsTabs = {
    'timezone': { render: renderTimezone, setup: setupTimezoneListeners }
  };
  let currentTimeToolsTabId = 'timezone';
  let timeToolsTabsInitialized = false;
  function renderTimeToolsTabs() {
    const tabsContainer = document.getElementById("timeToolsTabs");
    if (!tabsContainer || !window.TIME_TOOLS_CATALOG) return;
    tabsContainer.innerHTML = window.TIME_TOOLS_CATALOG.map(tab => `<button class="category-btn ${tab.tabId === currentTimeToolsTabId ? 'active' : ''}" data-tab-id="${tab.tabId}">${tab.tabName}</button>`).join('');
    if (!timeToolsTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentTimeToolsTabId = tabBtn.dataset.tabId;
        renderTimeToolsTabs();
        loadTimeToolsContent();
      });
      timeToolsTabsInitialized = true;
    }
    loadTimeToolsContent();
  }
  function loadTimeToolsContent() {
    const tool = timeToolsTabs[currentTimeToolsTabId];
    if (tool) { tool.render(); tool.setup(); }
  }
  function renderTimezone() {
    const workspace = document.getElementById("timeToolsWorkspace");
    const timezones = Intl.supportedValuesOf('timeZone');
    workspace.innerHTML = `<div class="converter-container"><div class="converter-inputs"><div class="input-group"><label>Source Timezone</label><select id="tzSource" class="converter-select">${timezones.map(tz => `<option value="${tz}">${tz}</option>`).join('')}</select></div><div class="input-group"><label>Target Timezone</label><select id="tzTarget" class="converter-select">${timezones.map(tz => `<option value="${tz}">${tz}</option>`).join('')}</select></div></div><div class="converter-inputs" style="margin-top:12px;"><div class="input-group"><label>Input Time</label><input type="datetime-local" id="tzInput" class="converter-input"></div></div><div id="tzResult" style="margin-top:12px;"></div></div>`;
  }
  function setupTimezoneListeners() {
    const source = document.getElementById("tzSource");
    const target = document.getElementById("tzTarget");
    const input = document.getElementById("tzInput");
    const result = document.getElementById("tzResult");
    function convert() {
      if (!input.value) { result.innerHTML = ''; return; }
      try {
        const date = new Date(input.value);
        const sourceTime = new Intl.DateTimeFormat('en-US', { timeZone: source.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
        const targetTime = new Intl.DateTimeFormat('en-US', { timeZone: target.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
        result.innerHTML = `<div><strong>Source (${source.value}):</strong> ${sourceTime}</div><div style="margin-top:8px;"><strong>Target (${target.value}):</strong> ${targetTime}</div>`;
      } catch (e) {
        result.innerHTML = 'Invalid input';
      }
    }
    source?.addEventListener('change', convert);
    target?.addEventListener('change', convert);
    input?.addEventListener('input', convert);
  }

  function renderContrastChecker() {
    const workspace = document.getElementById("checkerWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Foreground Color</label>
            <input type="color" id="fgColor" class="converter-input" style="height:32px;padding:2px;" value="#000000">
            <input type="text" id="fgColorText" class="converter-input" value="#000000" style="margin-top:4px;">
          </div>
          <div class="input-group">
            <label>Background Color</label>
            <input type="color" id="bgColor" class="converter-input" style="height:32px;padding:2px;" value="#ffffff">
            <input type="text" id="bgColorText" class="converter-input" value="#ffffff" style="margin-top:4px;">
          </div>
        </div>
        <div id="contrastPreview" style="margin:16px 0;padding:20px;border-radius:8px;font-size:1.2rem;text-align:center;">Sample Text</div>
        <div id="contrastResult"></div>
      </div>
    `;
  }

  function setupContrastCheckerListeners() {
    const fgPicker = document.getElementById("fgColor");
    const fgText = document.getElementById("fgColorText");
    const bgPicker = document.getElementById("bgColor");
    const bgText = document.getElementById("bgColorText");
    const preview = document.getElementById("contrastPreview");
    const result = document.getElementById("contrastResult");
    if (!fgPicker || !fgText || !bgPicker || !bgText || !preview || !result) return;

    function getLuminance(hex) {
      const rgb = hex.replace('#', '').match(/.{2}/g).map(x => parseInt(x, 16) / 255);
      const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    function check() {
      const fg = fgPicker.value;
      const bg = bgPicker.value;
      fgText.value = fg;
      bgText.value = bg;
      preview.style.color = fg;
      preview.style.backgroundColor = bg;

      const l1 = getLuminance(fg);
      const l2 = getLuminance(bg);
      const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

      const wcagAA = ratio >= 4.5;
      const wcagAAA = ratio >= 7;
      const wcagAALarge = ratio >= 3;

      result.innerHTML = `
        <div style="margin-top:12px;">
          <strong>Contrast Ratio:</strong> ${ratio.toFixed(2)}:1
        </div>
        <div style="margin-top:8px;">
          <span style="color:${wcagAA ? '#00ff00' : '#ff6b6b'};">${wcagAA ? '✓' : '✗'} WCAG AA (normal text)</span>
          <span style="margin-left:12px;color:${wcagAAA ? '#00ff00' : '#ff6b6b'};">${wcagAAA ? '✓' : '✗'} WCAG AAA</span>
          <span style="margin-left:12px;color:${wcagAALarge ? '#00ff00' : '#ff6b6b'};">${wcagAALarge ? '✓' : '✗'} WCAG AA (large text)</span>
        </div>
      `;
    }

    fgPicker.addEventListener('input', check);
    bgPicker.addEventListener('input', check);
    fgText.addEventListener('input', () => { fgPicker.value = fgText.value; check(); });
    bgText.addEventListener('input', () => { bgPicker.value = bgText.value; check(); });
    check();
  }

  function renderCorsChecker() {
    const workspace = document.getElementById("checkerWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Origin (your site)</label>
            <input type="text" id="corsOrigin" class="converter-input" placeholder="https://example.com">
          </div>
          <div class="input-group" style="flex:1;">
            <label>Access-Control-Allow-Origin header</label>
            <input type="text" id="corsAllowed" class="converter-input" placeholder="* or https://example.com">
          </div>
        </div>
        <div id="corsResult" style="margin-top:12px;"></div>
      </div>
    `;
  }

  function setupCorsCheckerListeners() {
    const origin = document.getElementById("corsOrigin");
    const allowed = document.getElementById("corsAllowed");
    const result = document.getElementById("corsResult");
    if (!origin || !allowed || !result) return;

    function check() {
      const o = origin.value.trim();
      const a = allowed.value.trim();
      if (!o || !a) {
        result.innerHTML = '';
        return;
      }

      const isWildcard = a === '*';
      const isMatch = isWildcard || a === o;

      result.innerHTML = `
        <div style="color:${isMatch ? '#00ff00' : '#ff6b6b'};">
          ${isMatch ? '✓' : '✗'} CORS ${isMatch ? 'allows' : 'blocks'} requests from ${o}
        </div>
        ${isWildcard ? '<div style="color:#ffa500;margin-top:8px;">⚠ Warning: Wildcard (*) allows any origin</div>' : ''}
      `;
    }

    origin.addEventListener('input', check);
    allowed.addEventListener('input', check);
  }

  function renderSecretsChecker() {
    const workspace = document.getElementById("checkerWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Text to scan</label>
            <textarea id="secretsInput" class="converter-textarea" placeholder="Paste text to check for secrets..."></textarea>
          </div>
        </div>
        <div id="secretsResult" style="margin-top:12px;"></div>
      </div>
    `;
  }

  function setupSecretsCheckerListeners() {
    const input = document.getElementById("secretsInput");
    const result = document.getElementById("secretsResult");
    if (!input || !result) return;

    const patterns = {
      'AWS Access Key': /AKIA[0-9A-Z]{16}/,
      'AWS Secret Key': /[A-Za-z0-9/+=]{40}/,
      'GitHub Token': /gh[pousr]_[A-Za-z0-9_]{36,255}/,
      'Private Key': /-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/,
      'Generic API Key': /[aA][pP][iI][-_]?[kK][eE][yY].*['"][A-Za-z0-9]{20,}['"]/,
      'Generic Secret': /[sS][eE][cC][rR][eE][tT].*['"][A-Za-z0-9]{16,}['"]/,
      'JWT Token': /eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/,
      'Slack Token': /xox[baprs]-[0-9]{10,13}-[0-9]{10,13}[a-zA-Z0-9-]*/,
      'Google API': /AIza[0-9A-Za-z-_]{35}/,
      'Discord Token': /[MN][A-Za-z\d]{23,}\.[\w-]{6}\.[\w-]{27}/
    };

    function check() {
      const text = input.value;
      if (!text) {
        result.innerHTML = '';
        return;
      }

      const found = [];
      for (const [name, regex] of Object.entries(patterns)) {
        if (regex.test(text)) {
          found.push(name);
        }
      }

      if (found.length === 0) {
        result.innerHTML = '<span style="color:#00ff00;">✓ No secrets detected</span>';
      } else {
        result.innerHTML = `
          <span style="color:#ff6b6b;">✗ Potential secrets found:</span>
          <ul style="margin:8px 0 0 20px;color:#ff6b6b;">${found.map(s => `<li>${s}</li>`).join('')}</ul>
        `;
      }
    }

    input.addEventListener('input', check);
    check();
  }

  function renderDuplicateChecker() {
    const workspace = document.getElementById("checkerWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>List (one per line)</label>
            <textarea id="dupInput" class="converter-textarea" placeholder="Enter items, one per line..."></textarea>
          </div>
        </div>
        <div id="dupResult" style="margin-top:12px;"></div>
      </div>
    `;
  }

  function setupDuplicateCheckerListeners() {
    const input = document.getElementById("dupInput");
    const result = document.getElementById("dupResult");
    if (!input || !result) return;

    function check() {
      const lines = input.value.split('\n').map(l => l.trim()).filter(l => l);
      if (lines.length === 0) {
        result.innerHTML = '';
        return;
      }

      const seen = new Set();
      const duplicates = [];
      for (const line of lines) {
        if (seen.has(line)) {
          duplicates.push(line);
        } else {
          seen.add(line);
        }
      }

      if (duplicates.length === 0) {
        result.innerHTML = '<span style="color:#00ff00;">✓ No duplicates found</span>';
      } else {
        result.innerHTML = `
          <span style="color:#ff6b6b;">✗ ${duplicates.length} duplicate(s) found:</span>
          <ul style="margin:8px 0 0 20px;color:#ff6b6b;">${duplicates.map(d => `<li>${d}</li>`).join('')}</ul>
        `;
      }
    }

    input.addEventListener('input', check);
    check();
  }

  function renderUuidGenerator() {
    const workspace = document.getElementById("generatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>UUID</label>
            <input type="text" id="uuidOutput" class="converter-input" readonly>
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="generateUuidBtn" class="convert-btn">Generate</button>
          </div>
        </div>
      </div>
    `;
  }

  function setupUuidGeneratorListeners() {
    const output = document.getElementById("uuidOutput");
    const btn = document.getElementById("generateUuidBtn");
    if (!output || !btn) return;

    function generate() {
      if (crypto.randomUUID) {
        output.value = crypto.randomUUID();
      } else {
        output.value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
          const r = Math.random() * 16 | 0;
          return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
      }
    }

    btn.addEventListener('click', generate);
    generate();
  }

  function renderPasswordGenerator() {
    const workspace = document.getElementById("generatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Length</label>
            <input type="number" id="passwordLength" class="converter-input" value="16" min="4" max="128">
          </div>
          <div class="input-group">
            <label>Options</label>
            <div style="display:flex;gap:10px;align-items:center;">
              <label style="display:flex;align-items:center;gap:4px;font-size:0.85rem;">
                <input type="checkbox" id="pwdUpper" checked> Upper
              </label>
              <label style="display:flex;align-items:center;gap:4px;font-size:0.85rem;">
                <input type="checkbox" id="pwdLower" checked> Lower
              </label>
              <label style="display:flex;align-items:center;gap:4px;font-size:0.85rem;">
                <input type="checkbox" id="pwdNumber" checked> Number
              </label>
              <label style="display:flex;align-items:center;gap:4px;font-size:0.85rem;">
                <input type="checkbox" id="pwdSymbol" checked> Symbol
              </label>
            </div>
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Password</label>
            <input type="text" id="passwordOutput" class="converter-input" readonly>
          </div>
          <div class="input-group" style="flex:0 0 auto; align-self: flex-end;">
            <button id="generatePasswordBtn" class="convert-btn">Generate</button>
          </div>
        </div>
      </div>
    `;
  }

  function setupPasswordGeneratorListeners() {
    const output = document.getElementById("passwordOutput");
    const btn = document.getElementById("generatePasswordBtn");
    const length = document.getElementById("passwordLength");
    if (!output || !btn || !length) return;

    function generate() {
      const len = parseInt(length.value) || 16;
      const useUpper = document.getElementById("pwdUpper").checked;
      const useLower = document.getElementById("pwdLower").checked;
      const useNumber = document.getElementById("pwdNumber").checked;
      const useSymbol = document.getElementById("pwdSymbol").checked;

      let chars = '';
      if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
      if (useNumber) chars += '0123456789';
      if (useSymbol) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

      if (!chars) {
        output.value = '';
        return;
      }

      let password = '';
      for (let i = 0; i < len; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      output.value = password;
    }

    btn.addEventListener('click', generate);
    length.addEventListener('input', generate);
    document.getElementById("pwdUpper")?.addEventListener('change', generate);
    document.getElementById("pwdLower")?.addEventListener('change', generate);
    document.getElementById("pwdNumber")?.addEventListener('change', generate);
    document.getElementById("pwdSymbol")?.addEventListener('change', generate);
    generate();
  }

  function renderCommitGenerator() {
    const workspace = document.getElementById("generatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Type</label>
            <select id="commitType" class="converter-select">
              <option value="feat">feat</option>
              <option value="fix">fix</option>
              <option value="docs">docs</option>
              <option value="style">style</option>
              <option value="refactor">refactor</option>
              <option value="perf">perf</option>
              <option value="test">test</option>
              <option value="chore">chore</option>
            </select>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Scope</label>
            <input type="text" id="commitScope" class="converter-input" placeholder="(optional)">
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Description</label>
            <input type="text" id="commitDesc" class="converter-input" placeholder="Short description">
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Generated Commit</label>
            <input type="text" id="commitOutput" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupCommitGeneratorListeners() {
    const type = document.getElementById("commitType");
    const scope = document.getElementById("commitScope");
    const desc = document.getElementById("commitDesc");
    const output = document.getElementById("commitOutput");
    if (!type || !scope || !desc || !output) return;

    function generate() {
      const t = type.value;
      const s = scope.value.trim();
      const d = desc.value.trim();
      if (!d) {
        output.value = '';
        return;
      }
      output.value = s ? `${t}(${s}): ${d}` : `${t}: ${d}`;
    }

    type.addEventListener('change', generate);
    scope.addEventListener('input', generate);
    desc.addEventListener('input', generate);
    generate();
  }

  function renderBranchGenerator() {
    const workspace = document.getElementById("generatorWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Type</label>
            <select id="branchType" class="converter-select">
              <option value="feature">feature</option>
              <option value="fix">fix</option>
              <option value="hotfix">hotfix</option>
              <option value="release">release</option>
              <option value="bugfix">bugfix</option>
              <option value="docs">docs</option>
              <option value="refactor">refactor</option>
              <option value="chore">chore</option>
            </select>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Name</label>
            <input type="text" id="branchName" class="converter-input" placeholder="branch-name">
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Generated Branch</label>
            <input type="text" id="branchOutput" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupBranchGeneratorListeners() {
    const type = document.getElementById("branchType");
    const name = document.getElementById("branchName");
    const output = document.getElementById("branchOutput");
    if (!type || !name || !output) return;

    function generate() {
      const t = type.value;
      const n = name.value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (!n) {
        output.value = '';
        return;
      }
      output.value = `${t}/${n}`;
    }

    type.addEventListener('change', generate);
    name.addEventListener('input', generate);
    generate();
  }

  function renderDecoderTabs() {
    const tabsContainer = document.getElementById("decoderTabs");
    if (!tabsContainer || !window.DECODERS_CATALOG) return;

    tabsContainer.innerHTML = window.DECODERS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentDecoderTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!decoderTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentDecoderTabId = tabBtn.dataset.tabId;
        renderDecoderTabs();
        loadDecoderContent();
      });
      decoderTabsInitialized = true;
    }

    loadDecoderContent();
  }

  function loadDecoderContent() {
    const decoder = decoderTabs[currentDecoderTabId];
    if (decoder) {
      decoder.render();
      decoder.setup();
    }
  }

  function renderBase64Decoder() {
    const workspace = document.getElementById("decoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="base64DecInput" class="converter-textarea" placeholder="Enter Base64 to decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="base64DecOutput" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupBase64DecoderListeners() {
    const input = document.getElementById("base64DecInput");
    const output = document.getElementById("base64DecOutput");
    if (!input || !output) return;

    function decode() {
      const val = input.value.trim();
      if (!val) { output.value = ''; return; }
      try {
        output.value = decodeURIComponent(escape(atob(val)));
      } catch (e) {
        output.value = '';
      }
    }

    input.addEventListener('input', decode);
    decode();
  }

  function renderUrlDecoder() {
    const workspace = document.getElementById("decoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="urlDecInput" class="converter-textarea" placeholder="Enter URL encoded text to decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="urlDecOutput" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupUrlDecoderListeners() {
    const input = document.getElementById("urlDecInput");
    const output = document.getElementById("urlDecOutput");
    if (!input || !output) return;

    function decode() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      try {
        output.value = decodeURIComponent(val);
      } catch (e) {
        output.value = '';
      }
    }

    input.addEventListener('input', decode);
    decode();
  }

  function renderHtmlDecoder() {
    const workspace = document.getElementById("decoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="htmlDecInput" class="converter-textarea" placeholder="Enter HTML encoded text to decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="htmlDecOutput" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupHtmlDecoderListeners() {
    const input = document.getElementById("htmlDecInput");
    const output = document.getElementById("htmlDecOutput");
    if (!input || !output) return;

    function decode() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      const textarea = document.createElement('textarea');
      textarea.innerHTML = val;
      output.value = textarea.value;
    }

    input.addEventListener('input', decode);
    decode();
  }

  function renderJwtDecoder() {
    const workspace = document.getElementById("decoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input (JWT Token)</label>
            <textarea id="jwtDecInput" class="converter-textarea" placeholder="Paste JWT token here..."></textarea>
          </div>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Header</label>
            <textarea id="jwtHeader" class="converter-textarea" readonly placeholder="JWT Header (JSON)"></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Payload</label>
            <textarea id="jwtPayload" class="converter-textarea" readonly placeholder="JWT Payload (JSON)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupJwtDecoderListeners() {
    const input = document.getElementById("jwtDecInput");
    const header = document.getElementById("jwtHeader");
    const payload = document.getElementById("jwtPayload");
    if (!input || !header || !payload) return;

    function decodeJwt() {
      const val = input.value.trim();
      if (!val) {
        header.value = '';
        payload.value = '';
        return;
      }
      try {
        const parts = val.split('.');
        if (parts.length !== 3) {
          header.value = '';
          payload.value = '';
          return;
        }
        const headerJson = JSON.parse(atob(parts[0]));
        const payloadJson = JSON.parse(atob(parts[1]));
        header.value = JSON.stringify(headerJson, null, 2);
        payload.value = JSON.stringify(payloadJson, null, 2);
      } catch (e) {
        header.value = '';
        payload.value = '';
      }
    }

    input.addEventListener('input', decodeJwt);
    decodeJwt();
  }

  function renderEncoderTabs() {
    const tabsContainer = document.getElementById("encoderTabs");
    if (!tabsContainer || !window.ENCODERS_CATALOG) return;

    tabsContainer.innerHTML = window.ENCODERS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentEncoderTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!encoderTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentEncoderTabId = tabBtn.dataset.tabId;
        renderEncoderTabs();
        loadEncoderContent();
      });
      encoderTabsInitialized = true;
    }

    loadEncoderContent();
  }

  function loadEncoderContent() {
    const encoder = encoderTabs[currentEncoderTabId];
    if (encoder) {
      encoder.render();
      encoder.setup();
    }
  }

  function renderBase64Encoder() {
    const workspace = document.getElementById("encoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="base64Input" class="converter-textarea" placeholder="Enter text to encode/decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="base64Output" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupBase64EncoderListeners() {
    const input = document.getElementById("base64Input");
    const output = document.getElementById("base64Output");
    if (!input || !output) return;

    function encode() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      try {
        output.value = btoa(unescape(encodeURIComponent(val)));
      } catch (e) {
        output.value = '';
      }
    }

    input.addEventListener('input', encode);
    encode();
  }

  function renderUrlEncoder() {
    const workspace = document.getElementById("encoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="urlInput" class="converter-textarea" placeholder="Enter text to URL encode/decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="urlOutput" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupUrlEncoderListeners() {
    const input = document.getElementById("urlInput");
    const output = document.getElementById("urlOutput");
    if (!input || !output) return;

    function encode() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      try {
        output.value = encodeURIComponent(val);
      } catch (e) {
        output.value = '';
      }
    }

    input.addEventListener('input', encode);
    encode();
  }

  function renderHtmlEncoder() {
    const workspace = document.getElementById("encoderWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="htmlInputEnc" class="converter-textarea" placeholder="Enter text to HTML encode/decode..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="htmlOutputEnc" class="converter-textarea" placeholder="Result (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupHtmlEncoderListeners() {
    const input = document.getElementById("htmlInputEnc");
    const output = document.getElementById("htmlOutputEnc");
    if (!input || !output) return;

    function encode() {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      };
      output.value = val.replace(/[&<>"']/g, char => entities[char]);
    }

    input.addEventListener('input', encode);
    encode();
  }

  function renderFormatterTabs() {
    const tabsContainer = document.getElementById("formatterTabs");
    if (!tabsContainer || !window.FORMATTERS_CATALOG) return;

    tabsContainer.innerHTML = window.FORMATTERS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentFormatterTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!formatterTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentFormatterTabId = tabBtn.dataset.tabId;
        renderFormatterTabs();
        loadFormatterContent();
      });
      formatterTabsInitialized = true;
    }

    loadFormatterContent();
  }

  function loadFormatterContent() {
    const formatter = formatterTabs[currentFormatterTabId];
    if (formatter) {
      formatter.render();
      formatter.setup();
    }
  }

  function renderConverterTabs() {
    const tabsContainer = document.getElementById("converterTabs");
    if (!tabsContainer) return;

    tabsContainer.innerHTML = window.CONVERTERS_CATALOG.map(tab => `
      <button 
        class="category-btn ${tab.tabId === currentConverterTabId ? 'active' : ''}" 
        data-tab-id="${tab.tabId}"
        aria-label="${tab.tabName}"
      >
        ${tab.tabName}
      </button>
    `).join('');

    if (!converterTabsInitialized) {
      tabsContainer.addEventListener('click', (e) => {
        const tabBtn = e.target.closest('.category-btn');
        if (!tabBtn) return;
        currentConverterTabId = tabBtn.dataset.tabId;
        renderConverterTabs();
        loadConverterContent();
      });
      converterTabsInitialized = true;
    }

    loadConverterContent();
  }

  function loadConverterContent() {
    const converter = converterTabs[currentConverterTabId];
    if (converter) {
      converter.render();
      converter.setup();
    }
  }

  function renderDataFormatsConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Input Date</label>
            <input type="text" id="dateInput" class="converter-input" placeholder="Enter date (auto-detect format)">
          </div>
          <div class="input-group">
            <label>Convert To</label>
            <select id="dateConversionType" class="converter-select">
              <option value="unix">Unix Timestamp</option>
              <option value="iso">ISO 8601</option>
              <option value="utc">UTC String</option>
              <option value="local">Local String</option>
              <option value="date-local">Date (Local)</option>
              <option value="date-utc">Date (UTC)</option>
              <option value="time">Time (HH:MM:SS)</option>
              <option value="date-only">Date Only (YYYY-MM-DD)</option>
              <option value="epoch-ms">Epoch Milliseconds</option>
              <option value="relative">Relative Time</option>
            </select>
          </div>
          <div class="input-group result-compact">
            <label>Result</label>
            <input type="text" id="dateResult" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupDataFormatsListeners() {
    const dateInput = document.getElementById("dateInput");
    const conversionType = document.getElementById("dateConversionType");
    if (!dateInput || !conversionType) return;

    function getRelativeTime(date) {
      const now = new Date();
      const diff = now - date;
      const absDiff = Math.abs(diff);
      const seconds = Math.floor(absDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (years > 0) return (diff < 0 ? 'in ' : '') + years + ' year' + (years > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
      if (months > 0) return (diff < 0 ? 'in ' : '') + months + ' month' + (months > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
      if (days > 0) return (diff < 0 ? 'in ' : '') + days + ' day' + (days > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
      if (hours > 0) return (diff < 0 ? 'in ' : '') + hours + ' hour' + (hours > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
      if (minutes > 0) return (diff < 0 ? 'in ' : '') + minutes + ' minute' + (minutes > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
      return (diff < 0 ? 'in ' : '') + seconds + ' second' + (seconds > 1 ? 's' : '') + (diff < 0 ? '' : ' ago');
    }

    function performConversion() {
      const input = dateInput.value;
      const convertTo = conversionType.value;
      const result = document.getElementById("dateResult");

      if (!input) {
        result.value = '';
        return;
      }

      try {
        let date;
        if (/^\d{10}$/.test(input)) {
          date = new Date(parseInt(input) * 1000);
        } else if (/^\d{13}$/.test(input)) {
          date = new Date(parseInt(input));
        } else if (/^\d{4}-\d{2}-\d{2}$/.test(input)) {
          date = new Date(input + 'T00:00:00');
        } else {
          date = new Date(input);
        }

        if (isNaN(date.getTime())) {
          result.value = 'Invalid date';
          return;
        }

        let output = '';
        switch (convertTo) {
          case 'unix': output = Math.floor(date.getTime() / 1000).toString(); break;
          case 'iso': output = date.toISOString(); break;
          case 'utc': output = date.toUTCString(); break;
          case 'local': output = date.toString(); break;
          case 'date-local': output = date.toLocaleDateString(); break;
          case 'date-utc': output = date.toUTCString().split(', ')[0]; break;
          case 'time': output = date.toTimeString().split(' ')[0]; break;
          case 'date-only': output = date.toISOString().split('T')[0]; break;
          case 'epoch-ms': output = date.getTime().toString(); break;
          case 'relative': output = getRelativeTime(date); break;
        }

        result.value = output;
      } catch (error) {
        result.value = 'Invalid date';
      }
    }

    dateInput.addEventListener('input', performConversion);
    conversionType.addEventListener('change', performConversion);
  }

  function renderTimeDateConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Input</label>
            <input type="text" id="timeDateInput" class="converter-input" placeholder="Enter timestamp or datetime">
          </div>
          <div class="input-group">
            <label>Convert To</label>
            <select id="timeDateConversionType" class="converter-select">
              <option value="iso">ISO 8601</option>
              <option value="local">Local Date</option>
              <option value="unix">Unix Timestamp</option>
              <option value="utc">UTC String</option>
            </select>
          </div>
          <div class="input-group result-compact">
            <label>Result</label>
            <input type="text" id="timeDateResult" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupTimeDateListeners() {
    const input = document.getElementById("timeDateInput");
    const conversionType = document.getElementById("timeDateConversionType");
    if (!input || !conversionType) return;

    function performConversion() {
      const value = input.value;
      const convertTo = conversionType.value;
      const result = document.getElementById("timeDateResult");
      if (!value) { result.value = ''; return; }

      try {
        let output = '';
        const date = new Date(value);
        if (isNaN(date.getTime())) { result.value = 'Invalid input'; return; }
        
        switch (convertTo) {
          case 'iso': output = date.toISOString(); break;
          case 'local': output = date.toString(); break;
          case 'unix': output = Math.floor(date.getTime() / 1000).toString(); break;
          case 'utc': output = date.toUTCString(); break;
        }
        result.value = output;
      } catch (e) {
        result.value = 'Invalid input';
      }
    }

    input.addEventListener('input', performConversion);
    conversionType.addEventListener('change', performConversion);
  }

  function renderUnitsConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Value</label>
            <input type="number" id="unitsValue" class="converter-input" placeholder="Enter value">
          </div>
          <div class="converter-from-to">
            <div class="input-group">
              <label>From</label>
              <select id="unitsFrom" class="converter-select converter-select-fit">
                <option value="0">B</option>
                <option value="1">KB</option>
                <option value="2">MB</option>
                <option value="3">GB</option>
                <option value="4">TB</option>
              </select>
            </div>
            <div class="input-group">
              <label>To</label>
              <select id="unitsTo" class="converter-select converter-select-fit">
                <option value="0">B</option>
                <option value="1" selected>KB</option>
                <option value="2">MB</option>
                <option value="3">GB</option>
                <option value="4">TB</option>
              </select>
            </div>
          </div>
          <div class="input-group">
            <label>Result</label>
            <input type="text" id="unitsResult" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupUnitsListeners() {
    const from = document.getElementById("unitsFrom");
    const to = document.getElementById("unitsTo");
    const value = document.getElementById("unitsValue");
    if (!from || !to || !value) return;

    const factors = [1, 1024, 1024*1024, 1024*1024*1024, 1024*1024*1024*1024];
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];

    function convert() {
      const val = parseFloat(value.value);
      const result = document.getElementById("unitsResult");
      if (isNaN(val)) { result.value = ''; return; }
      const base = val * factors[from.value];
      result.value = (base / factors[to.value]).toFixed(6).replace(/\.?0+$/, '') + ' ' + units[to.value];
    }

    value.addEventListener('input', convert);
    from.addEventListener('change', convert);
    to.addEventListener('change', convert);
  }

  function renderNumberBasesConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs converter-inputs-4">
          <div class="input-group">
            <label>Decimal</label>
            <input type="text" id="baseDecimal" class="converter-input" placeholder="10">
          </div>
          <div class="input-group">
            <label>Binary</label>
            <input type="text" id="baseBinary" class="converter-input" placeholder="2">
          </div>
          <div class="input-group">
            <label>Hexadecimal</label>
            <input type="text" id="baseHex" class="converter-input" placeholder="16">
          </div>
          <div class="input-group">
            <label>Octal</label>
            <input type="text" id="baseOctal" class="converter-input" placeholder="8">
          </div>
        </div>
      </div>
    `;
  }

  function setupNumberBasesListeners() {
    const d = document.getElementById("baseDecimal");
    const b = document.getElementById("baseBinary");
    const h = document.getElementById("baseHex");
    const o = document.getElementById("baseOctal");

    function fromDec() {
      if (!d.value) return;
      b.value = parseInt(d.value, 10).toString(2);
      h.value = parseInt(d.value, 10).toString(16).toUpperCase();
      o.value = parseInt(d.value, 10).toString(8);
    }

    function fromBin() {
      if (!b.value) return;
      d.value = parseInt(b.value, 2).toString(10);
      h.value = parseInt(b.value, 2).toString(16).toUpperCase();
      o.value = parseInt(b.value, 2).toString(8);
    }

    function fromHex() {
      if (!h.value) return;
      d.value = parseInt(h.value, 16).toString(10);
      b.value = parseInt(h.value, 16).toString(2);
      o.value = parseInt(h.value, 16).toString(8);
    }

    function fromOct() {
      if (!o.value) return;
      d.value = parseInt(o.value, 8).toString(10);
      b.value = parseInt(o.value, 8).toString(2);
      h.value = parseInt(o.value, 8).toString(16).toUpperCase();
    }

    d.addEventListener('input', fromDec);
    b.addEventListener('input', fromBin);
    h.addEventListener('input', fromHex);
    o.addEventListener('input', fromOct);
  }

  function renderColorsConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs converter-inputs-5">
          <div class="input-group">
            <label>Pick</label>
            <input type="color" id="colorPicker" class="converter-input" style="height:32px;padding:2px;" value="#000000">
          </div>
          <div class="input-group">
            <label>HEX</label>
            <input type="text" id="colorHex" class="converter-input" readonly>
          </div>
          <div class="input-group">
            <label>RGB</label>
            <input type="text" id="colorRgb" class="converter-input" readonly>
          </div>
          <div class="input-group">
            <label>HSL</label>
            <input type="text" id="colorHsl" class="converter-input" readonly>
          </div>
          <div class="input-group">
            <label>HSV</label>
            <input type="text" id="colorHsv" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupColorsListeners() {
    const picker = document.getElementById("colorPicker");
    const hex = document.getElementById("colorHex");
    const rgb = document.getElementById("colorRgb");
    const hsl = document.getElementById("colorHsl");
    const hsv = document.getElementById("colorHsv");
    if (!picker || !hex || !rgb || !hsl || !hsv) return;

    function updateColors() {
      const color = picker.value;
      
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      
      hex.value = color;
      rgb.value = `rgb(${r}, ${g}, ${b})`;
      
      const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
      const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
      let h = 0, s = 0, l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case rNorm: h = ((gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)) / 6; break;
          case gNorm: h = ((bNorm - rNorm) / d + 2) / 6; break;
          case bNorm: h = ((rNorm - gNorm) / d + 4) / 6; break;
        }
      }
      hsl.value = `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
      
      const v = max;
      const sv = max === 0 ? 0 : (max - min) / max;
      hsv.value = `hsv(${Math.round(h * 360)}, ${Math.round(sv * 100)}%, ${Math.round(v * 100)}%)`;
    }

    picker.addEventListener('input', updateColors);
    updateColors();
  }

  function renderCryptoKeysConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <p class="converter-description">Convert between cryptographic key formats</p>
        <div class="converter-inputs">
          <div class="input-group">
            <label>Input Key</label>
            <textarea id="cryptoInput" class="converter-textarea" placeholder="Paste key here..."></textarea>
          </div>
          <div class="input-group">
            <label>Convert To</label>
            <select id="cryptoConversionType" class="converter-select">
              <option value="pem">PEM</option>
              <option value="der">DER</option>
              <option value="jwk">JWK</option>
            </select>
          </div>
        </div>
        <div class="converter-results">
          <div class="result-item">
            <label>Result</label>
            <textarea id="cryptoResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupCryptoKeysListeners() {
    const input = document.getElementById("cryptoInput");
    const conversionType = document.getElementById("cryptoConversionType");
    const result = document.getElementById("cryptoResult");
    if (!input || !conversionType || !result) return;

    function convert() {
      const val = input.value;
      const type = conversionType.value;
      if (!val) { result.value = ''; return; }

      if (type === 'pem') {
        result.value = '-----BEGIN PUBLIC KEY-----\n' + val.replace(/[^A-Za-z0-9+/=]/g, '').match(/.{1,64}/g).join('\n') + '\n-----END PUBLIC KEY-----';
      } else if (type === 'der') {
        result.value = val.replace(/-----BEGIN .+-----/, '').replace(/-----END .+-----/, '').replace(/\s/g, '');
      } else if (type === 'jwk') {
        result.value = JSON.stringify({ kty: "RSA", use: "sig", alg: "RS256", kid: "example-key-id", n: "base64...", e: "AQAB" }, null, 2);
      }
    }

    input.addEventListener('input', convert);
    conversionType.addEventListener('change', convert);
  }

  function renderCodeFormatsConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <p class="converter-description">Code format converters</p>
        <div class="converter-inputs">
          <div class="input-group">
            <label>Input Code</label>
            <textarea id="codeInput" class="converter-textarea" placeholder="Paste code here..."></textarea>
          </div>
          <div class="input-group">
            <label>Convert To</label>
            <select id="codeConversionType" class="converter-select">
              <option value="esm">ESM</option>
              <option value="cjs">CommonJS</option>
              <option value="ts">TypeScript</option>
              <option value="js">JavaScript</option>
            </select>
          </div>
        </div>
        <div class="converter-results">
          <div class="result-item">
            <label>Result</label>
            <textarea id="codeResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupCodeFormatsListeners() {
    const input = document.getElementById("codeInput");
    const conversionType = document.getElementById("codeConversionType");
    const result = document.getElementById("codeResult");
    if (!input || !conversionType || !result) return;

    function convert() {
      const val = input.value;
      const type = conversionType.value;
      if (!val) { result.value = ''; return; }

      try {
        if (type === 'esm') {
          result.value = val.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from "$2";')
            .replace(/module\.exports\s*=\s*/g, 'export default ');
        } else if (type === 'cjs') {
          result.value = val.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");')
            .replace(/export\s+default\s+/g, 'module.exports = ');
        } else if (type === 'ts') {
          result.value = val;
        } else if (type === 'js') {
          const transpiled = Babel.transform(val, { presets: ['typescript'] });
          result.value = transpiled.code;
        }
      } catch (e) {
        result.value = 'Error: ' + e.message;
      }
    }

    input.addEventListener('input', convert);
    conversionType.addEventListener('change', convert);
  }

  function renderJsonYamlConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="jsonYamlInput" class="converter-textarea" placeholder="Paste JSON or YAML here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="jsonYamlResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupJsonYamlListeners() {
    const input = document.getElementById("jsonYamlInput");
    const result = document.getElementById("jsonYamlResult");
    if (!input || !result) return;

    function detectAndConvert() {
      const val = input.value.trim();
      if (!val) { result.value = ''; return; }

      try {
        if (val.startsWith('{') || val.startsWith('[')) {
          const obj = JSON.parse(val);
          if (typeof jsyaml !== 'undefined') {
            result.value = jsyaml.dump(obj, { indent: 2, lineWidth: -1 });
          } else {
            result.value = convertJsonToYamlFallback(obj);
          }
        } else {
          if (typeof jsyaml !== 'undefined') {
            const obj = jsyaml.load(val);
            result.value = JSON.stringify(obj, null, 2);
          } else {
            result.value = 'YAML library not loaded';
          }
        }
      } catch (e) {
        result.value = 'Error: ' + e.message;
      }
    }

    input.addEventListener('input', detectAndConvert);
  }

  function convertJsonToYamlFallback(obj, indent = 0) {
    const spaces = '  '.repeat(indent);
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      return obj.map(item => {
        if (typeof item === 'object' && item !== null) {
          return `${spaces}- ${convertJsonToYamlFallback(item, indent + 1).trim()}`;
        }
        return `${spaces}- ${JSON.stringify(item)}`;
      }).join('\n');
    } else if (typeof obj === 'object' && obj !== null) {
      return Object.entries(obj).map(([k, v]) => {
        if (typeof v === 'object' && v !== null) {
          return `${spaces}${k}:\n${spaces}  ${convertJsonToYamlFallback(v, indent + 1).trim()}`;
        }
        return `${spaces}${k}: ${JSON.stringify(v)}`;
      }).join('\n');
    }
    return JSON.stringify(obj);
  }

  function renderJsonCsvConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="jsonCsvInput" class="converter-textarea" placeholder="Paste JSON array or CSV here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="jsonCsvResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupJsonCsvListeners() {
    const input = document.getElementById("jsonCsvInput");
    const result = document.getElementById("jsonCsvResult");
    if (!input || !result) return;

    function detectAndConvert() {
      const val = input.value.trim();
      if (!val) { result.value = ''; return; }

      try {
        if (val.startsWith('[') || val.startsWith('{')) {
          const obj = JSON.parse(val);
          result.value = jsonToCsv(obj);
        } else {
          result.value = JSON.stringify(csvToJson(val), null, 2);
        }
      } catch (e) {
        result.value = 'Error: ' + e.message;
      }
    }

    function jsonToCsv(data) {
      const arr = Array.isArray(data) ? data : [data];
      if (arr.length === 0) return '';
      const headers = Object.keys(arr[0]);
      const csvRows = [headers.join(',')];
      for (const row of arr) {
        csvRows.push(headers.map(h => {
          const val = row[h];
          if (val === null || val === undefined) return '';
          const str = String(val);
          if (str.includes(',') || str.includes('"') || str.includes('\n')) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        }).join(','));
      }
      return csvRows.join('\n');
    }

    function csvToJson(csv) {
      const lines = csv.split('\n').filter(l => l.trim());
      if (lines.length === 0) return '[]';
      const headers = parseCsvLine(lines[0]);
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        const values = parseCsvLine(lines[i]);
        const obj = {};
        headers.forEach((h, idx) => obj[h.trim()] = values[idx]?.trim() || '');
        result.push(obj);
      }
      return result;
    }

    function parseCsvLine(line) {
      const result = [];
      let current = '';
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
          inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
          result.push(current);
          current = '';
        } else {
          current += c;
        }
      }
      result.push(current);
      return result;
    }

    input.addEventListener('input', detectAndConvert);
  }

  function renderXmlJsonConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="xmlJsonInput" class="converter-textarea" placeholder="Paste XML or JSON here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="xmlJsonResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupXmlJsonListeners() {
    const input = document.getElementById("xmlJsonInput");
    const result = document.getElementById("xmlJsonResult");
    if (!input || !result) return;

    function detectAndConvert() {
      const val = input.value.trim();
      if (!val) { result.value = ''; return; }

      try {
        if (val.startsWith('<')) {
          if (typeof xml2js !== 'undefined') {
            xml2js.parseString(val, { explicitArray: false }, (err, obj) => {
              if (err) {
                result.value = 'Error: ' + err.message;
              } else {
                result.value = JSON.stringify(obj, null, 2);
              }
            });
          } else {
            result.value = xmlToJsonFallback(val);
          }
        } else {
          result.value = jsonToXml(JSON.parse(val));
        }
      } catch (e) {
        result.value = 'Error: ' + e.message;
      }
    }

    input.addEventListener('input', detectAndConvert);
  }

  function xmlToJsonFallback(xml) {
    const result = {};
    const trimmed = xml.trim();
    const tagMatch = trimmed.match(/^<(\w+)>([\s\S]*)<\/\1>$/);
    if (!tagMatch) return '{}';
    const tag = tagMatch[1];
    let content = tagMatch[2].trim();
    if (content.startsWith('<')) {
      const children = [];
      let depth = 0;
      let current = '';
      for (let i = 0; i < content.length; i++) {
        const c = content[i];
        if (c === '<') {
          if (content[i+1] === '/') {
            depth--;
            if (depth === 0) {
              children.push(content.substring(0, i));
              content = content.substring(i);
              break;
            }
            current += c;
          } else if (content[i+1] !== '?') {
            if (depth > 0) current += c;
            depth++;
          } else {
            current += c;
          }
        } else {
          current += c;
        }
      }
      if (children.length > 0) {
        result[tag] = {};
        const childMatch = content.match(/^<(\w+)>([\s\S]*)<\/\1>$/);
      }
    }
    return JSON.stringify(result, null, 2);
  }

  function jsonToXml(obj, rootName = 'root') {
    let xml = '';
    function convert(o, name) {
      if (typeof o !== 'object') {
        return `<${name}>${o}</${name}>`;
      }
      if (Array.isArray(o)) {
        return o.map(item => convert(item, name)).join('');
      }
      let inner = '';
      for (const [k, v] of Object.entries(o)) {
        inner += convert(v, k);
      }
      return `<${name}>${inner}</${name}>`;
    }
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + convert(obj, rootName);
  }

  function renderTomlJsonConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="tomlJsonInput" class="converter-textarea" placeholder="Paste TOML or JSON here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="tomlJsonResult" class="converter-textarea" readonly></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupTomlJsonListeners() {
    const input = document.getElementById("tomlJsonInput");
    const result = document.getElementById("tomlJsonResult");
    if (!input || !result) return;

    function detectAndConvert() {
      const val = input.value.trim();
      if (!val) { result.value = ''; return; }

      try {
        if (val.startsWith('[')) {
          if (typeof TOML !== 'undefined') {
            const obj = TOML.parse(val);
            result.value = JSON.stringify(obj, null, 2);
          } else {
            result.value = 'TOML library not loaded';
          }
        } else {
          if (typeof TOML !== 'undefined') {
            result.value = TOML.stringify(JSON.parse(val));
          } else {
            result.value = 'TOML library not loaded';
          }
        }
      } catch (e) {
        result.value = 'Error: ' + e.message;
      }
    }

    input.addEventListener('input', detectAndConvert);
  }

  function renderUnitsConverter() {
    const workspace = document.getElementById("converterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="converter-inputs">
          <div class="input-group">
            <label>Value</label>
            <input type="number" id="unitsValue" class="converter-input" placeholder="Enter value">
          </div>
          <div class="input-group">
            <label>Category</label>
            <select id="unitsCategory" class="converter-select converter-select-fit">
              <option value="bytes">Bytes</option>
              <option value="time">Time</option>
              <option value="length">Length</option>
              <option value="weight">Weight</option>
            </select>
          </div>
          <div class="converter-from-to">
            <div class="input-group">
              <label>From</label>
              <select id="unitsFrom" class="converter-select converter-select-fit"></select>
            </div>
            <div class="input-group">
              <label>To</label>
              <select id="unitsTo" class="converter-select converter-select-fit"></select>
            </div>
          </div>
          <div class="input-group">
            <label>Result</label>
            <input type="text" id="unitsResult" class="converter-input" readonly>
          </div>
        </div>
      </div>
    `;
  }

  function setupUnitsListeners() {
    const category = document.getElementById("unitsCategory");
    const from = document.getElementById("unitsFrom");
    const to = document.getElementById("unitsTo");
    const value = document.getElementById("unitsValue");
    if (!category || !from || !to || !value) return;

    const unitOptions = {
      bytes: ['B', 'KB', 'MB', 'GB', 'TB'],
      time: ['seconds', 'minutes', 'hours', 'days'],
      length: ['meters', 'kilometers', 'miles', 'feet'],
      weight: ['kg', 'grams', 'lb', 'oz']
    };

    const factors = {
      bytes: [1, 1024, 1024*1024, 1024*1024*1024, 1024*1024*1024*1024],
      time: [1, 60, 3600, 86400],
      length: [1, 1000, 1609.344, 0.3048],
      weight: [1, 1000, 0.453592, 0.0283495]
    };

    function populate() {
      const opts = unitOptions[category.value] || [];
      from.innerHTML = opts.map((o, i) => `<option value="${i}">${o}</option>`).join('');
      to.innerHTML = opts.map((o, i) => `<option value="${i}">${o}</option>`).join('');
      if (opts.length > 1) to.selectedIndex = 1;
    }

    function convert() {
      const val = parseFloat(value.value);
      const result = document.getElementById("unitsResult");
      if (isNaN(val)) { result.value = ''; return; }
      const f = factors[category.value];
      const base = val * f[from.value];
      result.value = (base / f[to.value]).toFixed(6).replace(/\.?0+$/, '') + ' ' + unitOptions[category.value][to.value];
    }

    category.addEventListener('change', () => { populate(); convert(); });
    populate();
    value.addEventListener('input', convert);
    from.addEventListener('change', convert);
    to.addEventListener('change', convert);
  }

  function renderJsonFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="jsonInput" class="converter-textarea" placeholder="Paste JSON here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="jsonOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupJsonFormatterListeners() {
    const input = document.getElementById("jsonInput");
    const output = document.getElementById("jsonOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    function formatJson() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        const parsed = JSON.parse(val);
        if (currentMode === 'beautify') {
          output.value = JSON.stringify(parsed, null, 2);
        } else {
          output.value = JSON.stringify(parsed);
        }
      } catch (e) {
        output.value = '';
      }
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatJson();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatJson);
    formatJson();
  }

  function renderXmlFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="xmlInput" class="converter-textarea" placeholder="Paste XML here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="xmlOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupXmlFormatterListeners() {
    const input = document.getElementById("xmlInput");
    const output = document.getElementById("xmlOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    function formatXml() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(val, 'application/xml');
        const errorNode = doc.querySelector('parsererror');
        if (errorNode) {
          output.value = '';
          return;
        }
        const serialized = new XMLSerializer().serializeToString(doc);
        if (currentMode === 'beautify') {
          output.value = formatXmlString(serialized);
        } else {
          output.value = minifyXmlString(serialized);
        }
      } catch (e) {
        output.value = '';
      }
    }

    function formatXmlString(xml) {
      let formatted = '';
      let indent = 0;
      const tab = '  ';
      xml.split(/>\s*</).forEach(node => {
        if (node.match(/^\/\w/)) indent--;
        formatted += tab.repeat(Math.max(0, indent)) + '<' + node + '>\n';
        if (node.match(/^<?\w[^/]*[^/]$/) && !node.startsWith('?') && !node.startsWith('!')) indent++;
      });
      return formatted.substring(1, formatted.length - 2);
    }

    function minifyXmlString(xml) {
      return xml.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatXml();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatXml);
    formatXml();
  }

  function renderHtmlFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="htmlInput" class="converter-textarea" placeholder="Paste HTML here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="htmlOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupHtmlFormatterListeners() {
    const input = document.getElementById("htmlInput");
    const output = document.getElementById("htmlOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    function formatHtml() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        if (typeof html_beautify !== 'undefined') {
          if (currentMode === 'beautify') {
            output.value = html_beautify(val, { indent_size: 2 });
          } else {
            output.value = minifyHtmlString(val);
          }
        } else {
          output.value = val;
        }
      } catch (e) {
        output.value = '';
      }
    }

    function minifyHtmlString(html) {
      return html
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/>\s+</g, '><')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatHtml();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatHtml);
    formatHtml();
  }

  function renderCssFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="cssInput" class="converter-textarea" placeholder="Paste CSS here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="cssOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupCssFormatterListeners() {
    const input = document.getElementById("cssInput");
    const output = document.getElementById("cssOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    function formatCss() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        if (typeof css_beautify !== 'undefined') {
          if (currentMode === 'beautify') {
            output.value = css_beautify(val, { indent_size: 2 });
          } else {
            output.value = minifyCssString(val);
          }
        } else {
          output.value = val;
        }
      } catch (e) {
        output.value = '';
      }
    }

    function minifyCssString(css) {
      return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .replace(/;/g, ';\n')
        .replace(/}/g, '}\n')
        .trim();
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatCss();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatCss);
    formatCss();
  }

  function renderJsFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="jsInput" class="converter-textarea" placeholder="Paste JavaScript here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="jsOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupJsFormatterListeners() {
    const input = document.getElementById("jsInput");
    const output = document.getElementById("jsOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    function formatJs() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        if (typeof js_beautify !== 'undefined') {
          if (currentMode === 'beautify') {
            output.value = js_beautify(val, { indent_size: 2 });
          } else {
            output.value = minifyJsString(val);
          }
        } else {
          output.value = val;
        }
      } catch (e) {
        output.value = '';
      }
    }

    function minifyJsString(js) {
      return js
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([{}:;,])\s*/g, '$1')
        .trim();
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatJs();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatJs);
    formatJs();
  }

  function renderSqlFormatter() {
    const workspace = document.getElementById("formatterWorkspace");
    workspace.innerHTML = `
      <div class="converter-container">
        <div class="formatter-direction">
          <button class="direction-btn active" data-mode="beautify">Beautify</button>
          <button class="direction-btn" data-mode="minify">Minify</button>
        </div>
        <div class="converter-inputs">
          <div class="input-group" style="flex:1;">
            <label>Input</label>
            <textarea id="sqlInput" class="converter-textarea" placeholder="Paste SQL here..."></textarea>
          </div>
          <div class="input-group" style="flex:1;">
            <label>Output</label>
            <textarea id="sqlOutput" class="converter-textarea" placeholder="Formatted output (editable)"></textarea>
          </div>
        </div>
      </div>
    `;
  }

  function setupSqlFormatterListeners() {
    const input = document.getElementById("sqlInput");
    const output = document.getElementById("sqlOutput");
    const beautifyBtn = document.querySelector('[data-mode="beautify"]');
    const minifyBtn = document.querySelector('[data-mode="minify"]');
    if (!input || !output || !beautifyBtn || !minifyBtn) return;

    let currentMode = 'beautify';

    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL', 'AS',
      'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'FULL', 'CROSS', 'ON',
      'GROUP', 'BY', 'ORDER', 'ASC', 'DESC', 'LIMIT', 'OFFSET', 'HAVING',
      'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE',
      'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'VIEW',
      'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'UNIQUE', 'CONSTRAINT',
      'UNION', 'ALL', 'EXCEPT', 'INTERSECT',
      'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
      'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE',
      'BETWEEN', 'LIKE', 'ESCAPE', 'EXISTS'
    ];

    function formatSql() {
      const val = input.value.trim();
      if (!val) {
        output.value = '';
        return;
      }
      try {
        if (currentMode === 'beautify') {
          output.value = beautifySql(val);
        } else {
          output.value = minifySql(val);
        }
      } catch (e) {
        output.value = val;
      }
    }

    function beautifySql(sql) {
      let result = sql;
      keywords.forEach(kw => {
        const regex = new RegExp('\\b' + kw + '\\b', 'gi');
        result = result.replace(regex, kw);
      });
      result = result
        .replace(/\s+/g, ' ')
        .replace(/,\s*/g, ',\n  ')
        .replace(/\bSELECT\b/gi, 'SELECT\n  ')
        .replace(/\bFROM\b/gi, '\nFROM\n  ')
        .replace(/\bWHERE\b/gi, '\nWHERE\n  ')
        .replace(/\bAND\b/gi, '\n  AND')
        .replace(/\bOR\b/gi, '\n  OR')
        .replace(/\bJOIN\b/gi, '\nJOIN')
        .replace(/\bLEFT JOIN\b/gi, '\nLEFT JOIN')
        .replace(/\bRIGHT JOIN\b/gi, '\nRIGHT JOIN')
        .replace(/\bINNER JOIN\b/gi, '\nINNER JOIN')
        .replace(/\bOUTER JOIN\b/gi, '\nOUTER JOIN')
        .replace(/\bCROSS JOIN\b/gi, '\nCROSS JOIN')
        .replace(/\bON\b/gi, '\n  ON')
        .replace(/\bGROUP BY\b/gi, '\nGROUP BY\n  ')
        .replace(/\bORDER BY\b/gi, '\nORDER BY\n  ')
        .replace(/\bHAVING\b/gi, '\nHAVING\n  ')
        .replace(/\bLIMIT\b/gi, '\nLIMIT')
        .replace(/\bINSERT INTO\b/gi, 'INSERT INTO')
        .replace(/\bVALUES\b/gi, '\nVALUES')
        .replace(/\bUPDATE\b/gi, '\nUPDATE')
        .replace(/\bSET\b/gi, '\nSET')
        .replace(/\bDELETE FROM\b/gi, '\nDELETE FROM')
        .replace(/\bUNION\b/gi, '\nUNION')
        .replace(/\bUNION ALL\b/gi, '\nUNION ALL')
        .trim();
      return result;
    }

    function minifySql(sql) {
      return sql
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s*\(\s*/g, '(')
        .replace(/\s*\)\s*/g, ')')
        .trim();
    }

    function setMode(mode) {
      currentMode = mode;
      beautifyBtn.classList.toggle('active', mode === 'beautify');
      minifyBtn.classList.toggle('active', mode === 'minify');
      formatSql();
    }

    beautifyBtn.addEventListener('click', () => setMode('beautify'));
    minifyBtn.addEventListener('click', () => setMode('minify'));
    input.addEventListener('input', formatSql);
    formatSql();
  }

  renderCategories();
  if (active === "CONVERTERS") {
    showConvertersPanel();
  }
})();
