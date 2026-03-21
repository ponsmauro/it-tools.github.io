(function dashboardMenu() {
  const categoriesNode = document.getElementById("categories");
  const convertersPanelNode = document.getElementById("convertersPanel");
  const formattersPanelNode = document.getElementById("formattersPanel");
  const encodersPanelNode = document.getElementById("encodersPanel");

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
      if (entry.category !== "CONVERTERS" && entry.category !== "FORMATTERS" && entry.category !== "ENCODERS") {
        button.disabled = true;
        button.title = "Coming soon";
      }
      button.addEventListener("click", () => {
        if (entry.category === "CONVERTERS" || entry.category === "FORMATTERS" || entry.category === "ENCODERS") {
          active = entry.category;
          renderCategories();
          if (active === "CONVERTERS") {
            showConvertersPanel();
          } else if (active === "FORMATTERS") {
            showFormattersPanel();
          } else if (active === "ENCODERS") {
            showEncodersPanel();
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
    renderConverterTabs();
  }

  function showFormattersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "flex";
    encodersPanelNode.style.display = "none";
    renderFormatterTabs();
  }

  function showEncodersPanel() {
    convertersPanelNode.style.display = "none";
    formattersPanelNode.style.display = "none";
    encodersPanelNode.style.display = "flex";
    renderEncoderTabs();
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
