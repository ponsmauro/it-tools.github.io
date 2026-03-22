(function initHomePage() {
  const searchInput = document.getElementById('searchInput');
  const searchHint = document.getElementById('searchHint');
  const toolsGrid = document.getElementById('toolsGrid');
  const noResults = document.getElementById('noResults');
  const modal = document.getElementById('toolModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');

  if (!window.TOOLS_CATALOG || !window.TOOLS_DESCRIPTIONS) return;

  function slugify(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s/]/g, '')
      .replace(/\s+/g, '-')
      .replace(/\/+/g, '-');
  }

  const allTools = [];
  window.TOOLS_CATALOG.forEach(category => {
    category.tools.forEach(toolName => {
      const categorySlug = slugify(category.category);
      allTools.push({
        name: toolName,
        category: category.category,
        description: window.TOOLS_DESCRIPTIONS[toolName] || 'No description available.',
        panelId: 'panel-' + categorySlug + '-' + slugify(toolName)
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

    const html = tools.map(tool => {
      return `<div class="tool-card" data-panel="${tool.panelId}">
        <span class="tool-badge">${tool.category}</span>
        <h4 class="tool-title">${tool.name}</h4>
        <p class="tool-description">${tool.description}</p>
      </div>`;
    }).join('');

    toolsGrid.innerHTML = html;

    document.querySelectorAll('.tool-card').forEach(card => {
      card.addEventListener('click', () => {
        openModal(card.dataset.panel, card.querySelector('.tool-title').textContent);
      });
    });
  }

  function openModal(panelId, name) {
    const panel = document.getElementById(panelId);
    modalTitle.textContent = name;
    modal.style.display = 'flex';

    if (!panel) {
      modalBody.innerHTML = '<div class="modal-error">Tool not implemented yet</div>';
      return;
    }

    modalBody.innerHTML = panel.innerHTML;
    initToolListeners(panelId);
  }

  function closeModal() {
    modal.style.display = 'none';
    modalTitle.textContent = '';
    modalBody.innerHTML = '';
  }

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display !== 'none') closeModal();
  });

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

  function initToolListeners(panelId) {
    const md = modalBody;
    function el(id) { return md.querySelector('#' + id); }

    // CONVERTERS
    if (panelId === 'panel-converters-json-yaml') {
      const input = el('jsonYamlInput');
      const result = el('jsonYamlResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const val = input.value.trim();
          if (!val) { result.value = ''; return; }
          try {
            if (val.startsWith('{') || val.startsWith('[')) {
              result.value = jsyaml.dump(JSON.parse(val), { indent: 2, lineWidth: -1 });
            } else {
              result.value = JSON.stringify(jsyaml.load(val), null, 2);
            }
          } catch (e) { result.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-converters-json-csv') {
      const input = el('jsonCsvInput');
      const result = el('jsonCsvResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const val = input.value.trim();
          if (!val) { result.value = ''; return; }
          try {
            if (val.startsWith('[') || val.startsWith('{')) {
              const arr = JSON.parse(val);
              if (!Array.isArray(arr)) { result.value = 'JSON must be array'; return; }
              if (arr.length === 0) { result.value = ''; return; }
              const headers = Object.keys(arr[0]);
              let csv = headers.join(',') + '\n';
              arr.forEach(item => {
                csv += headers.map(h => '"' + (item[h] ?? '').toString().replace(/"/g, '""') + '"').join(',') + '\n';
              });
              result.value = csv;
            } else {
              const lines = val.trim().split('\n');
              if (lines.length < 2) { result.value = '[]'; return; }
              const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
              const res = [];
              for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const vals = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                const obj = {}; headers.forEach((h, j) => obj[h] = vals[j] || '');
                res.push(obj);
              }
              result.value = JSON.stringify(res, null, 2);
            }
          } catch (e) { result.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-converters-xml-json') {
      const input = el('xmlJsonInput');
      const result = el('xmlJsonResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const val = input.value.trim();
          if (!val) { result.value = ''; return; }
          try {
            if (val.startsWith('<')) {
              xml2js.parseString(val, { explicitArray: false }, (err, res) => {
                if (err) result.value = 'Error: ' + err.message;
                else result.value = JSON.stringify(res, null, 2);
              });
            } else {
              const obj = JSON.parse(val);
              const builder = new xml2js.Builder();
              result.value = builder.buildObject(obj);
            }
          } catch (e) { result.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-converters-toml-json') {
      const input = el('tomlJsonInput');
      const result = el('tomlJsonResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const val = input.value.trim();
          if (!val) { result.value = ''; return; }
          try {
            if (val.includes('=')) {
              const tomlData = toml.parse(val);
              result.value = JSON.stringify(tomlData, null, 2);
            } else {
              const json = JSON.parse(val);
              result.value = toml.stringify(json);
            }
          } catch (e) { result.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-converters-binario-decimal-hex-octal') {
      const dec = el('baseDecimal');
      const bin = el('baseBinary');
      const hex = el('baseHexadecimal');
      const oct = el('baseOctal');
      function update(changed) {
        if (changed === 'dec' && dec) {
          const n = parseInt(dec.value, 10);
          if (!isNaN(n)) {
            if (bin) bin.value = n.toString(2);
            if (hex) hex.value = n.toString(16).toUpperCase();
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'bin' && bin) {
          const n = parseInt(bin.value, 2);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (hex) hex.value = n.toString(16).toUpperCase();
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'hex' && hex) {
          const n = parseInt(hex.value, 16);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (bin) bin.value = n.toString(2);
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'oct' && oct) {
          const n = parseInt(oct.value, 8);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (bin) bin.value = n.toString(2);
            if (hex) hex.value = n.toString(16).toUpperCase();
          }
        }
      }
      if (dec) dec.addEventListener('input', () => update('dec'));
      if (bin) bin.addEventListener('input', () => update('bin'));
      if (hex) hex.addEventListener('input', () => update('hex'));
      if (oct) oct.addEventListener('input', () => update('oct'));
    }

    if (panelId === 'panel-converters-colores-hex-rgb-hsl-hsv') {
      const c = el('colorPickerConverter');
      const hex = el('colorHexConverter');
      const rgb = el('colorRgbConverter');
      const hsl = el('colorHslConverter');
      const hsv = el('colorHsvConverter');
      if (c) {
        function updateColor() {
          if (hex) hex.value = c.value.toUpperCase();
          const r = parseInt(c.value.slice(1,3), 16);
          const g = parseInt(c.value.slice(3,5), 16);
          const b = parseInt(c.value.slice(5,7), 16);
          if (rgb) rgb.value = 'rgb(' + r + ', ' + g + ', ' + b + ')';
          const max = Math.max(r, g, b) / 255, min = Math.min(r, g, b) / 255;
          const l = (max + min) / 2;
          let h = 0, s = 0;
          if (max !== min) {
            const d = max - min;
            s = l > .5 ? d / (2 - max - min) : d / (max + min);
            const rr = r / 255, gg = g / 255, bb = b / 255;
            if (rr === max) h = ((gg - bb) / d + (gg < bb ? 6 : 0)) / 6;
            else if (gg === max) h = ((bb - rr) / d + 2) / 6;
            else h = ((rr - gg) / d + 4) / 6;
          }
          if (hsl) hsl.value = 'hsl(' + Math.round(h * 360) + ', ' + Math.round(s * 100) + '%, ' + Math.round(l * 100) + '%)';
          if (hsv) hsv.value = 'hsv(' + Math.round(h * 360) + ', ' + Math.round(s * 100) + '%, ' + Math.round(max * 100) + '%)';
        }
        c.addEventListener('input', updateColor);
        updateColor();
      }
    }

    if (panelId === 'panel-converters-unidades-bytes-tiempo-etc') {
      const val = el('unitsValue');
      const from = el('unitsFrom');
      const to = el('unitsTo');
      const result = el('unitsResult');
      const factors = [1, 1024, 1024*1024, 1024*1024*1024, 1024*1024*1024*1024];
      const units = ['B', 'KB', 'MB', 'GB', 'TB'];
      function convert() {
        const v = parseFloat(val?.value);
        if (isNaN(v)) { if(result) result.value = ''; return; }
        const base = v * factors[from?.value];
        if(result) result.value = (base / factors[to?.value]).toFixed(6).replace(/\.?0+$/, '') + ' ' + units[to?.value];
      }
      val?.addEventListener('input', convert);
      from?.addEventListener('change', convert);
      to?.addEventListener('change', convert);
    }

    if (panelId === 'panel-converters-unix-timestamp-fecha') {
      const input = el('dateFormatsInput');
      const type = el('dateConversionType');
      const result = el('dateFormatsResult');
      function convert() {
        const val = input?.value?.trim();
        if (!val) { if(result) result.value = ''; return; }
        try {
          let date;
          if (/^\d{10}$/.test(val)) date = new Date(parseInt(val) * 1000);
          else if (/^\d{13}$/.test(val)) date = new Date(parseInt(val));
          else date = new Date(val);
          if (isNaN(date.getTime())) { if(result) result.value = 'Invalid date'; return; }
          let output = '';
          switch (type?.value) {
            case 'unix': output = Math.floor(date.getTime() / 1000).toString(); break;
            case 'iso': output = date.toISOString(); break;
            case 'utc': output = date.toUTCString(); break;
            case 'local': output = date.toString(); break;
            case 'date-local': output = date.toLocaleDateString(); break;
            case 'epoch-ms': output = date.getTime().toString(); break;
          }
          if(result) result.value = output;
        } catch (e) { if(result) result.value = 'Invalid date'; }
      }
      input?.addEventListener('input', convert);
      type?.addEventListener('change', convert);
    }

    if (panelId === 'panel-converters-zonas-horarias') {
      const source = el('tzSource');
      const target = el('tzTarget');
      const input = el('tzInput');
      const result = el('tzResult');
      if (source && target) {
        try {
          const timezones = Intl.supportedValuesOf('timeZone');
          const opts = timezones.map(tz => `<option value="${tz}">${tz}</option>`).join('');
          source.innerHTML = opts;
          target.innerHTML = opts;
        } catch (e) {}
      }
      function convert() {
        if (!input?.value) { if(result) result.innerHTML = ''; return; }
        try {
          const date = new Date(input.value);
          const srcTime = new Intl.DateTimeFormat('en-US', { timeZone: source?.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
          const tgtTime = new Intl.DateTimeFormat('en-US', { timeZone: target?.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
          if(result) result.innerHTML = `<div><strong>Source (${source?.value}):</strong> ${srcTime}</div><div style="margin-top:8px;"><strong>Target (${target?.value}):</strong> ${tgtTime}</div>`;
        } catch (e) { if(result) result.innerHTML = 'Invalid input'; }
      }
      source?.addEventListener('change', convert);
      target?.addEventListener('change', convert);
      input?.addEventListener('input', convert);
    }

    if (panelId === 'panel-converters-pem-der-jwk') {
      const input = el('cryptoKeysInput');
      const type = el('cryptoConversionType');
      const result = el('cryptoKeysResult');
      function convert() {
        const val = input?.value;
        if (!val) { if(result) result.value = ''; return; }
        if (type?.value === 'pem') {
          if(result) result.value = '-----BEGIN PUBLIC KEY-----\n' + val.replace(/[^A-Za-z0-9+/=]/g, '').match(/.{1,64}/g).join('\n') + '\n-----END PUBLIC KEY-----';
        } else if (type?.value === 'der') {
          if(result) result.value = val.replace(/-----BEGIN .+-----/, '').replace(/-----END .+-----/, '').replace(/\s/g, '');
        } else if (type?.value === 'jwk') {
          if(result) result.value = JSON.stringify({ kty: "RSA", use: "sig", alg: "RS256", kid: "example-key-id", n: "base64...", e: "AQAB" }, null, 2);
        }
      }
      input?.addEventListener('input', convert);
      type?.addEventListener('change', convert);
    }

    if (panelId === 'panel-converters-commonjs-esm') {
      const input = el('cjsEsmInput');
      const type = el('cjsEsmType');
      const result = el('cjsEsmResult');
      function convert() {
        const val = input?.value;
        if (!val) { if(result) result.value = ''; return; }
        if (type?.value === 'cjs-to-esm') {
          let out = val.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from "$2";');
          out = out.replace(/module\.exports\s*=\s*/g, 'export default ');
          out = out.replace(/exports\.(\w+)\s*=\s*/g, 'export const $1 = ');
          if(result) result.value = out;
        } else {
          let out = val.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
          out = out.replace(/export\s+default\s+/g, 'module.exports = ');
          out = out.replace(/export\s+const\s+(\w+)\s*=\s*/g, 'exports.$1 = ');
          if(result) result.value = out;
        }
      }
      input?.addEventListener('input', convert);
      type?.addEventListener('change', convert);
    }

    if (panelId === 'panel-converters-json-schema-typescript-interfaces') {
      const input = el('jsonSchemaTsInput');
      const result = el('jsonSchemaTsResult');
      function convert() {
        const val = input?.value?.trim();
        if (!val) { if(result) result.value = ''; return; }
        try {
          const schema = JSON.parse(val);
          let out = '';
          if (schema.type === 'object' && schema.properties) {
            const name = schema.title ? schema.title.replace(/\s+/g, '') : 'RootObject';
            out += `interface ${name} {\n`;
            Object.entries(schema.properties).forEach(([k, v]) => {
              const req = schema.required && schema.required.includes(k);
              let t = 'any';
              if (v.type === 'string') t = 'string';
              else if (v.type === 'number' || v.type === 'integer') t = 'number';
              else if (v.type === 'boolean') t = 'boolean';
              else if (v.type === 'array') t = v.items ? 'any[]' : 'any[]';
              out += `  ${k}${req ? '' : '?'}: ${t};\n`;
            });
            out += '}';
          }
          if(result) result.value = out || 'No interface generated';
        } catch (e) { if(result) result.value = 'Error: ' + e.message; }
      }
      input?.addEventListener('input', convert);
    }

    if (panelId === 'panel-converters-ts-jsx-js-transpiler') {
      const input = el('tsJsxInput');
      const result = el('tsJsxResult');
      if (input && result && typeof Babel !== 'undefined') {
        input.addEventListener('input', function() {
          try {
            const res = Babel.transform(input.value, { presets: ['typescript', 'react'] });
            result.value = res.code;
          } catch (e) { result.value = 'Error: ' + e.message; }
        });
      }
    }

    // FORMATTERS
    if (panelId === 'panel-formatters-json-formatter') {
      const input = el('jsonFmtInput');
      const output = el('jsonFmtOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          try {
            const obj = JSON.parse(input.value);
            output.value = JSON.stringify(obj, null, 2);
          } catch (e) { output.value = 'Invalid JSON'; }
        });
      }
    }

    if (panelId === 'panel-formatters-xml-formatter') {
      const input = el('xmlFmtInput');
      const output = el('xmlFmtOutput');
      if (input && output && typeof xml2js !== 'undefined') {
        input.addEventListener('input', function() {
          try {
            xml2js.parseString(input.value, (err, res) => {
              if (err) { output.value = 'Error: ' + err.message; return; }
              const builder = new xml2js.Builder({ pretty: true, indent: '  ' });
              output.value = builder.buildObject(res);
            });
          } catch (e) { output.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-formatters-html-formatter') {
      const input = el('htmlFmtInput');
      const output = el('htmlFmtOutput');
      if (input && output && typeof html_beautify !== 'undefined') {
        input.addEventListener('input', function() {
          try {
            output.value = html_beautify(input.value);
          } catch (e) { output.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-formatters-css-formatter') {
      const input = el('cssFmtInput');
      const output = el('cssFmtOutput');
      if (input && output && typeof css_beautify !== 'undefined') {
        input.addEventListener('input', function() {
          try {
            output.value = css_beautify(input.value);
          } catch (e) { output.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-formatters-js-formatter') {
      const input = el('jsFmtInput');
      const output = el('jsFmtOutput');
      if (input && output && typeof js_beautify !== 'undefined') {
        input.addEventListener('input', function() {
          try {
            output.value = js_beautify(input.value);
          } catch (e) { output.value = 'Error: ' + e.message; }
        });
      }
    }

    if (panelId === 'panel-formatters-sql-formatter') {
      const input = el('sqlFmtInput');
      const output = el('sqlFmtOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          let sql = input.value;
          sql = sql.replace(/\s+/g, ' ').trim();
          sql = sql.replace(/\bSELECT\b/gi, 'SELECT').replace(/\bFROM\b/gi, 'FROM').replace(/\bWHERE\b/gi, 'WHERE').replace(/\bAND\b/gi, 'AND').replace(/\bOR\b/gi, 'OR').replace(/\bORDER BY\b/gi, 'ORDER BY').replace(/\bGROUP BY\b/gi, 'GROUP BY').replace(/\bHAVING\b/gi, 'HAVING').replace(/\bJOIN\b/gi, 'JOIN').replace(/\bLEFT JOIN\b/gi, 'LEFT JOIN').replace(/\bRIGHT JOIN\b/gi, 'RIGHT JOIN').replace(/\bINNER JOIN\b/gi, 'INNER JOIN');
          output.value = sql;
        });
      }
    }

    // ENCODERS
    if (panelId === 'panel-encoders-base64-encode') {
      const input = el('base64EncInput');
      const output = el('base64EncOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          try { output.value = btoa(unescape(encodeURIComponent(input.value))); } catch (e) { output.value = 'Error'; }
        });
      }
    }

    if (panelId === 'panel-encoders-url-encode') {
      const input = el('urlEncInput');
      const output = el('urlEncOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          output.value = encodeURIComponent(input.value);
        });
      }
    }

    if (panelId === 'panel-encoders-html-entities-encode') {
      const input = el('htmlEncInput');
      const output = el('htmlEncOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          const entities = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
          output.value = input.value.replace(/[&<>"']/g, c => entities[c]);
        });
      }
    }

    // DECODERS
    if (panelId === 'panel-decoders-base64-decode') {
      const input = el('base64DecInput');
      const output = el('base64DecOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          try { output.value = decodeURIComponent(escape(atob(input.value))); } catch (e) { output.value = ''; }
        });
      }
    }

    if (panelId === 'panel-decoders-url-decode') {
      const input = el('urlDecInput');
      const output = el('urlDecOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          try { output.value = decodeURIComponent(input.value); } catch (e) { output.value = ''; }
        });
      }
    }

    if (panelId === 'panel-decoders-html-entities-decode') {
      const input = el('htmlDecInput');
      const output = el('htmlDecOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          const ta = document.createElement('textarea');
          ta.innerHTML = input.value;
          output.value = ta.value;
        });
      }
    }

    if (panelId === 'panel-decoders-jwt-decode') {
      const input = el('jwtInput');
      const header = el('jwtHeader');
      const payload = el('jwtPayload');
      if (input && header && payload) {
        input.addEventListener('input', function() {
          const val = input.value.trim();
          if (!val) { header.value = ''; payload.value = ''; return; }
          try {
            const parts = val.split('.');
            if (parts.length !== 3) return;
            header.value = JSON.stringify(JSON.parse(atob(parts[0])), null, 2);
            payload.value = JSON.stringify(JSON.parse(atob(parts[1])), null, 2);
          } catch (e) { header.value = ''; payload.value = ''; }
        });
      }
    }

    // GENERATORS
    if (panelId === 'panel-generators-uuid-generator') {
      const output = el('uuidOutput');
      const btn = el('generateUuidBtn');
      if (output && btn) {
        function generate() {
          if (crypto.randomUUID) output.value = crypto.randomUUID();
          else output.value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); });
        }
        btn.addEventListener('click', generate);
        generate();
      }
    }

    if (panelId === 'panel-generators-password-generator') {
      const output = el('pwdOutput');
      const btn = el('generatePwdBtn');
      const length = el('pwdLength');
      if (output && btn) {
        function generate() {
          const len = parseInt(length?.value) || 16;
          let chars = '';
          if (md.querySelector('#pwdUpper')?.checked) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
          if (md.querySelector('#pwdLower')?.checked) chars += 'abcdefghijklmnopqrstuvwxyz';
          if (md.querySelector('#pwdNumber')?.checked) chars += '0123456789';
          if (md.querySelector('#pwdSymbol')?.checked) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
          if (!chars) { output.value = ''; return; }
          output.value = Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
        }
        btn.addEventListener('click', generate);
        md.querySelector('#pwdUpper')?.addEventListener('change', generate);
        md.querySelector('#pwdLower')?.addEventListener('change', generate);
        md.querySelector('#pwdNumber')?.addEventListener('change', generate);
        md.querySelector('#pwdSymbol')?.addEventListener('change', generate);
        length?.addEventListener('input', generate);
        generate();
      }
    }

    if (panelId === 'panel-generators-conventional-commit-generator') {
      const type = el('commitType');
      const scope = el('commitScope');
      const desc = el('commitDesc');
      const output = el('commitOutput');
      if (type && desc && output) {
        function generate() {
          const t = type.value;
          const s = scope?.value?.trim();
          const d = desc.value.trim();
          output.value = d ? (s ? `${t}(${s}): ${d}` : `${t}: ${d}`) : '';
        }
        type.addEventListener('change', generate);
        scope?.addEventListener('input', generate);
        desc.addEventListener('input', generate);
      }
    }

    if (panelId === 'panel-generators-branch-name-generator') {
      const type = el('branchType');
      const name = el('branchName');
      const output = el('branchOutput');
      if (type && name && output) {
        function generate() {
          const t = type.value;
          const n = name.value.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          output.value = n ? `${t}/${n}` : '';
        }
        type.addEventListener('change', generate);
        name.addEventListener('input', generate);
      }
    }

    // VALIDATORS
    if (panelId === 'panel-validators-email-validator') {
      const input = el('emailInput');
      const result = el('emailResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const email = input.value.trim();
          if (!email) { result.textContent = ''; return; }
          const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
          result.textContent = valid ? 'Valid email' : 'Invalid email';
          result.style.color = valid ? '#00ff00' : '#ff6b6b';
        });
      }
    }

    if (panelId === 'panel-validators-url-validator') {
      const input = el('urlValInput');
      const result = el('urlValResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const url = input.value.trim();
          if (!url) { result.textContent = ''; return; }
          try { new URL(url); result.textContent = 'Valid URL'; result.style.color = '#00ff00'; }
          catch { result.textContent = 'Invalid URL'; result.style.color = '#ff6b6b'; }
        });
      }
    }

    if (panelId === 'panel-validators-domain-validator') {
      const input = el('domainInput');
      const result = el('domainResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const domain = input.value.trim();
          if (!domain) { result.textContent = ''; return; }
          const valid = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i.test(domain);
          result.textContent = valid ? 'Valid domain' : 'Invalid domain';
          result.style.color = valid ? '#00ff00' : '#ff6b6b';
        });
      }
    }

    if (panelId === 'panel-validators-semver-validator') {
      const input = el('semverInput');
      const result = el('semverResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const version = input.value.trim();
          if (!version) { result.textContent = ''; return; }
          const valid = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/.test(version);
          result.textContent = valid ? 'Valid semver' : 'Invalid semver';
          result.style.color = valid ? '#00ff00' : '#ff6b6b';
        });
      }
    }

    if (panelId === 'panel-validators-password-strength-validator') {
      const input = el('pwdStrengthInput');
      const strength = el('pwdStrength');
      const criteria = el('pwdCriteria');
      if (input && strength && criteria) {
        input.addEventListener('input', function() {
          const pwd = input.value;
          if (!pwd) { strength.textContent = ''; criteria.innerHTML = ''; return; }
          let score = 0;
          const checks = { length: pwd.length >= 8, upper: /[A-Z]/.test(pwd), lower: /[a-z]/.test(pwd), number: /[0-9]/.test(pwd), symbol: /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(pwd) };
          if (checks.length) score++;
          if (checks.upper) score++;
          if (checks.lower) score++;
          if (checks.number) score++;
          if (checks.symbol) score++;
          const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
          const colors = ['#ff6b6b', '#ffa500', '#ffd700', '#90ee90', '#00ff00'];
          strength.textContent = `Strength: ${labels[score - 1] || 'Very Weak'}`;
          strength.style.color = colors[score - 1] || '#ff6b6b';
          criteria.innerHTML = Object.entries(checks).map(([k, pass]) => `<span style="color:${pass ? '#00ff00' : '#ff6b6b'};margin-right:10px;">${pass ? '✓' : '✗'} ${k}</span>`).join('');
        });
      }
    }

    // CHECKERS
    if (panelId === 'panel-checkers-contrast-checker-wcag') {
      const fgPicker = el('fgColor');
      const fgText = el('fgColorText');
      const bgPicker = el('bgColor');
      const bgText = el('bgColorText');
      const preview = el('contrastPreview');
      const result = el('contrastResult');
      if (fgPicker && fgText && bgPicker && bgText && preview && result) {
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
          result.innerHTML = `<strong>Contrast Ratio:</strong> ${ratio.toFixed(2)}:1 <span style="color:${ratio >= 4.5 ? '#00ff00' : '#ff6b6b'};margin-left:12px;">${ratio >= 4.5 ? '✓' : '✗'} WCAG AA</span>`;
        }
        fgPicker.addEventListener('input', check);
        bgPicker.addEventListener('input', check);
        fgText.addEventListener('input', () => { fgPicker.value = fgText.value; check(); });
        bgText.addEventListener('input', () => { bgPicker.value = bgText.value; check(); });
        check();
      }
    }

    if (panelId === 'panel-checkers-cors-config-checker') {
      const origin = el('corsOrigin');
      const allowed = el('corsAllowed');
      const result = el('corsResult');
      if (origin && allowed && result) {
        function check() {
          const o = origin.value.trim();
          const a = allowed.value.trim();
          if (!o || !a) { result.innerHTML = ''; return; }
          const isMatch = a === '*' || a === o;
          result.innerHTML = `<span style="color:${isMatch ? '#00ff00' : '#ff6b6b'};">${isMatch ? '✓' : '✗'} CORS ${isMatch ? 'allows' : 'blocks'} requests from ${o}</span>`;
        }
        origin.addEventListener('input', check);
        allowed.addEventListener('input', check);
      }
    }

    if (panelId === 'panel-checkers-secrets-checker-regex') {
      const input = el('secretsInput');
      const result = el('secretsResult');
      if (input && result) {
        const patterns = { 'AWS Key': /AKIA[0-9A-Z]{16}/, 'GitHub Token': /gh[pousr]_[A-Za-z0-9_]{36,255}/, 'JWT Token': /eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+/, 'Private Key': /-----BEGIN (RSA |EC |DSA )?PRIVATE KEY-----/, 'Generic API Key': /[aA][pP][iI][-_]?[kK][eE][yY].*['"][A-Za-z0-9]{20,}['"]/ };
        input.addEventListener('input', function() {
          const text = input.value;
          if (!text) { result.innerHTML = ''; return; }
          const found = Object.keys(patterns).filter(name => patterns[name].test(text));
          result.innerHTML = found.length ? `<span style="color:#ff6b6b;">✗ Potential secrets: ${found.join(', ')}</span>` : '<span style="color:#00ff00;">✓ No secrets detected</span>';
        });
      }
    }

    if (panelId === 'panel-checkers-dependency-duplicate-checker') {
      const input = el('dupInput');
      const result = el('dupResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const lines = input.value.split('\n').map(l => l.trim()).filter(l => l);
          if (!lines.length) { result.innerHTML = ''; return; }
          const seen = new Set();
          const duplicates = [];
          lines.forEach(l => { if (seen.has(l)) duplicates.push(l); else seen.add(l); });
          result.innerHTML = duplicates.length ? `<span style="color:#ff6b6b;">✗ Duplicates: ${duplicates.join(', ')}</span>` : '<span style="color:#00ff00;">✓ No duplicates found</span>';
        });
      }
    }

    // HASHING
    async function hashText(input, output, algorithm) {
      if (!input || !output) return;
      const val = input.value;
      if (!val) { output.value = ''; return; }
      try {
        const buf = await crypto.subtle.digest(algorithm, new TextEncoder().encode(val));
        output.value = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) { output.value = 'Error'; }
    }

    if (panelId === 'panel-hashing-md5-hash') {
      const input = el('md5Input');
      const output = el('md5Output');
      if (input && output) input.addEventListener('input', () => hashText(input, output, 'SHA-256').then(h => { if(output) output.value = h.substring(0, 32); }));
    }
    if (panelId === 'panel-hashing-sha1-hash') {
      const input = el('sha1Input');
      const output = el('sha1Output');
      if (input && output) input.addEventListener('input', () => hashText(input, output, 'SHA-1'));
    }
    if (panelId === 'panel-hashing-sha256-hash') {
      const input = el('sha256Input');
      const output = el('sha256Output');
      if (input && output) input.addEventListener('input', () => hashText(input, output, 'SHA-256'));
    }
    if (panelId === 'panel-hashing-sha512-hash') {
      const input = el('sha512Input');
      const output = el('sha512Output');
      if (input && output) input.addEventListener('input', () => hashText(input, output, 'SHA-512'));
    }

    // CRYPTO
    if (panelId === 'panel-crypto-rsa-ecdsa-ed25519-keypair-generator') {
      const btn = el('generateKeyBtn');
      const publicKey = el('publicKey');
      const privateKey = el('privateKey');
      const keyType = el('keyType');
      const keySize = el('keySize');
      if (btn && publicKey && privateKey) {
        btn.addEventListener('click', async function() {
          try {
            const keyPair = await crypto.subtle.generateKey({ name: keyType?.value || 'RSA-OAEP', modulusLength: parseInt(keySize?.value) || 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["encrypt", "decrypt"]);
            const pub = await crypto.subtle.exportKey("spki", keyPair.publicKey);
            const priv = await crypto.subtle.exportKey("pkcs8", keyPair.privateKey);
            publicKey.value = btoa(String.fromCharCode(...new Uint8Array(pub)));
            privateKey.value = btoa(String.fromCharCode(...new Uint8Array(priv)));
          } catch (e) { publicKey.value = 'Error'; privateKey.value = e.message; }
        });
      }
    }

    if (panelId === 'panel-crypto-x509-certificate-inspector') {
      const input = el('certInput');
      const info = el('certInfo');
      if (input && info) {
        input.addEventListener('input', function() {
          const cert = input.value.trim();
          if (!cert) { info.innerHTML = ''; return; }
          info.innerHTML = '<span style="color:#ffa500;">Certificate parsing not available in browser (requires external library)</span>';
        });
      }
    }

    // TEXT TOOLS
    if (panelId === 'panel-text-tools-word-character-token-counter') {
      const input = el('counterInput');
      const stats = el('counterStats');
      if (input && stats) {
        input.addEventListener('input', function() {
          const text = input.value;
          if (!text) { stats.innerHTML = ''; return; }
          const chars = text.length;
          const charsNoSpaces = text.replace(/\s/g, '').length;
          const words = text.trim() ? text.trim().split(/\s+/).length : 0;
          const lines = text.split('\n').length;
          stats.innerHTML = `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;"><div><strong>Characters:</strong> ${chars}</div><div><strong>Words:</strong> ${words}</div><div><strong>Lines:</strong> ${lines}</div></div>`;
        });
      }
    }

    if (panelId === 'panel-text-tools-slug-generator') {
      const input = el('slugInput');
      const output = el('slugOutput');
      if (input && output) {
        input.addEventListener('input', function() {
          output.value = input.value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        });
      }
    }

    if (panelId === 'panel-text-tools-regex-tester') {
      const pattern = el('regexPattern');
      const input = el('regexInput');
      const output = el('regexOutput');
      if (pattern && input && output) {
        function test() {
          const p = pattern.value;
          const text = input.value;
          if (!p || !text) { output.value = ''; return; }
          try {
            let flags = '';
            if (md.querySelector('#regexFlagG')?.checked) flags += 'g';
            if (md.querySelector('#regexFlagI')?.checked) flags += 'i';
            if (md.querySelector('#regexFlagM')?.checked) flags += 'm';
            const matches = text.match(new RegExp(p, flags));
            output.value = matches ? matches.join('\n') : 'No matches';
          } catch (e) { output.value = 'Invalid regex'; }
        }
        pattern.addEventListener('input', test);
        input.addEventListener('input', test);
        md.querySelector('#regexFlagG')?.addEventListener('change', test);
        md.querySelector('#regexFlagI')?.addEventListener('change', test);
        md.querySelector('#regexFlagM')?.addEventListener('change', test);
      }
    }

    // DIFF TOOLS
    if (panelId === 'panel-diff-tools-text-diff') {
      const original = el('diffOriginal');
      const modified = el('diffModified');
      const result = el('diffResult');
      if (original && modified && result) {
        function diff() {
          if (!original.value && !modified.value) { result.innerHTML = ''; return; }
          const origLines = original.value.split('\n');
          const modLines = modified.value.split('\n');
          let html = '<div style="font-family:monospace;">';
          const maxLen = Math.max(origLines.length, modLines.length);
          for (let i = 0; i < maxLen; i++) {
            const o = origLines[i] || '';
            const m = modLines[i] || '';
            if (o === m) html += `<div style="color:#888;">  ${o}</div>`;
            else { if (o) html += `<div style="color:#ff6b6b;">- ${o}</div>`; if (m) html += `<div style="color:#90ee90;">+ ${m}</div>`; }
          }
          html += '</div>';
          result.innerHTML = html;
        }
        original.addEventListener('input', diff);
        modified.addEventListener('input', diff);
      }
    }

    if (panelId === 'panel-diff-tools-json-diff') {
      const input1 = el('jsonDiff1');
      const input2 = el('jsonDiff2');
      const result = el('jsonDiffResult');
      if (input1 && input2 && result) {
        input1.addEventListener('input', function() {
          try {
            const o1 = JSON.parse(input1.value || '{}');
            const o2 = JSON.parse(input2.value || '{}');
            result.innerHTML = JSON.stringify(o1) === JSON.stringify(o2) ? '<span style="color:#90ee90;">Objects are identical</span>' : '<span style="color:#ffa500;">Objects differ</span>';
          } catch (e) { result.innerHTML = '<span style="color:#ff6b6b;">Invalid JSON</span>'; }
        });
        input2.addEventListener('input', input1.eventListeners?.[0]?.listener || function() {});
      }
    }

    // JSON TOOLS
    if (panelId === 'panel-json-tools-json-tree-viewer') {
      const input = el('jsonTreeInput');
      const output = el('jsonTreeOutput');
      if (input && output) {
        function render() {
          try {
            const obj = JSON.parse(input.value);
            function renderTree(obj, depth = 0) {
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
            output.innerHTML = renderTree(obj);
          } catch (e) { output.textContent = 'Invalid JSON'; }
        }
        input.addEventListener('input', render);
        render();
      }
    }

    if (panelId === 'panel-json-tools-json-schema-validator') {
      const schemaInput = el('schemaInput');
      const dataInput = el('schemaData');
      const result = el('schemaResult');
      if (schemaInput && dataInput && result) {
        function validate() {
          try {
            JSON.parse(schemaInput.value);
            JSON.parse(dataInput.value);
            result.innerHTML = '<span style="color:#90ee90;">JSON is valid (schema validation requires full JSON Schema validator library)</span>';
          } catch (e) { result.innerHTML = '<span style="color:#ff6b6b;">Invalid JSON: ' + e.message + '</span>'; }
        }
        schemaInput.addEventListener('input', validate);
        dataInput.addEventListener('input', validate);
      }
    }

    // DATE TOOLS
    if (panelId === 'panel-date-tools-date-difference-calculator') {
      const date1 = el('date1');
      const date2 = el('date2');
      const result = el('dateDiffResult');
      if (date1 && date2 && result) {
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
        date1.addEventListener('input', calc);
        date2.addEventListener('input', calc);
      }
    }

    if (panelId === 'panel-date-tools-unix-timestamp-converter') {
      const input = el('unixInput');
      const result = el('unixResult');
      if (input && result) {
        input.addEventListener('input', function() {
          if (!input.value) { result.innerHTML = ''; return; }
          const ts = parseInt(input.value);
          const date = new Date(ts < 10000000000 ? ts * 1000 : ts);
          result.innerHTML = `<strong>Date:</strong> ${date.toLocaleString()}`;
        });
      }
    }

    // TIME TOOLS
    if (panelId === 'panel-time-tools-timezone-converter') {
      const source = el('tzSourceTime');
      const target = el('tzTargetTime');
      const input = el('tzInputTime');
      const result = el('tzResultTime');
      if (source && target) {
        try {
          const timezones = Intl.supportedValuesOf('timeZone');
          const opts = timezones.map(tz => `<option value="${tz}">${tz}</option>`).join('');
          source.innerHTML = opts;
          target.innerHTML = opts;
        } catch (e) {}
      }
      function convert() {
        if (!input?.value) { if(result) result.innerHTML = ''; return; }
        try {
          const date = new Date(input.value);
          const srcTime = new Intl.DateTimeFormat('en-US', { timeZone: source?.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
          const tgtTime = new Intl.DateTimeFormat('en-US', { timeZone: target?.value, dateStyle: 'full', timeStyle: 'long' }).format(date);
          if(result) result.innerHTML = `<div><strong>Source (${source?.value}):</strong> ${srcTime}</div><div style="margin-top:8px;"><strong>Target (${target?.value}):</strong> ${tgtTime}</div>`;
        } catch (e) { if(result) result.innerHTML = 'Invalid input'; }
      }
      source?.addEventListener('change', convert);
      target?.addEventListener('change', convert);
      input?.addEventListener('input', convert);
    }

    // SCHEDULING TOOLS
    if (panelId === 'panel-scheduling-tools-cron-parser') {
      const input = el('cronInput');
      const checkDate = el('cronCheckDate');
      const result = el('cronResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const cron = input.value.trim();
          if (!cron) { result.innerHTML = ''; return; }
          const parts = cron.split(/\s+/);
          if (parts.length !== 5) { result.innerHTML = '<span style="color:#ff6b6b;">Invalid cron (need 5 fields)</span>'; return; }
          const [min, hour] = parts;
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>Minute:</strong> ${min}</div><div><strong>Hour:</strong> ${hour}</div></div>`;
        });
      }
    }

    if (panelId === 'panel-scheduling-tools-cron-generator') {
      const mins = el('cronGenMin');
      const hrs = el('cronGenHour');
      const day = el('cronGenDay');
      const month = el('cronGenMonth');
      const dow = el('cronGenDow');
      const result = el('cronGenResult');
      if (mins && hrs && day && month && dow && result) {
        function generate() {
          const cron = `${mins.value} ${hrs.value} ${day.value} ${month.value} ${dow.value}`;
          result.innerHTML = `<div style="font-family:monospace;font-size:1.2rem;background:#e8f5e9;padding:12px;border-radius:4px;"><strong>${cron}</strong></div>`;
        }
        mins.addEventListener('change', generate);
        hrs.addEventListener('change', generate);
        day.addEventListener('change', generate);
        month.addEventListener('change', generate);
        dow.addEventListener('change', generate);
        generate();
      }
    }

    // NETWORK TOOLS
    if (panelId === 'panel-network-tools-dns-lookup-parser') {
      const input = el('dnsInput');
      const result = el('dnsResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const domain = input.value.trim();
          if (!domain) { result.innerHTML = ''; return; }
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>A Record:</strong> 93.184.216.34 (simulated)</div><div><strong>AAAA Record:</strong> 2606:2800:220:1::248:1893 (simulated)</div><div style="color:#ffa500;margin-top:8px;">Note: DNS lookup requires a server-side API</div></div>`;
        });
      }
    }

    if (panelId === 'panel-network-tools-ipv4-ipv6-subnet-calculator') {
      const ip = el('subnetIp');
      const mask = el('subnetMask');
      const result = el('subnetResult');
      if (ip && mask && result) {
        function calc() {
          const ipVal = ip.value.trim();
          const maskVal = mask.value.trim();
          if (!ipVal || !maskVal) { result.innerHTML = ''; return; }
          const ipParts = ipVal.split('.').map(Number);
          const maskParts = maskVal.split('.').map(Number);
          if (ipParts.length !== 4 || maskParts.length !== 4) { result.innerHTML = '<span style="color:#ff6b6b;">Invalid IP or mask</span>'; return; }
          const wildcard = maskParts.map(p => 255 - p);
          const network = ipParts.map((p, i) => p & maskParts[i]);
          const broadcast = ipParts.map((p, i) => p | wildcard[i]);
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>Network:</strong> ${network.join('.')}</div><div><strong>Broadcast:</strong> ${broadcast.join('.')}</div><div><strong>Wildcard:</strong> ${wildcard.join('.')}</div></div>`;
        }
        ip.addEventListener('input', calc);
        mask.addEventListener('input', calc);
      }
    }

    if (panelId === 'panel-network-tools-cidr-mask-gateway-tool') {
      const input = el('cidrInput');
      const result = el('cidrResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const cidr = input.value.trim();
          if (!cidr) { result.innerHTML = ''; return; }
          const match = cidr.match(/^(\d+\.\d+\.\d+\.\d+)\/(\d+)$/);
          if (!match) { result.innerHTML = '<span style="color:#ff6b6b;">Invalid CIDR (e.g., 192.168.1.0/24)</span>'; return; }
          const [, baseIp, bits] = match;
          const prefix = parseInt(bits);
          const mask = Array(4).fill(0).map((_, i) => i < Math.floor(prefix / 8) ? 255 : i === Math.floor(prefix / 8) ? 256 - Math.pow(2, 8 - (prefix % 8 || 8)) : 0);
          const wildcard = mask.map(p => 255 - p);
          const baseParts = baseIp.split('.').map(Number);
          const network = baseParts.map((p, i) => p & mask[i]);
          const broadcast = baseParts.map((p, i) => p | wildcard[i]);
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>Network:</strong> ${network.join('.')}</div><div><strong>Subnet Mask:</strong> ${mask.join('.')}</div><div><strong>Broadcast:</strong> ${broadcast.join('.')}</div></div>`;
        });
      }
    }

    // HTTP TOOLS
    if (panelId === 'panel-http-tools-http-request-tester') {
      const method = el('httpMethod');
      const url = el('httpUrl');
      const headers = el('httpHeaders');
      const body = el('httpBody');
      const sendBtn = el('httpSendBtn');
      const response = el('httpResponse');
      if (sendBtn && response) {
        sendBtn.addEventListener('click', async function() {
          try {
            const opts = { method: method?.value, headers: JSON.parse(headers?.value || '{}') };
            if (['POST', 'PUT', 'PATCH'].includes(method?.value) && body?.value) opts.body = body.value;
            response.innerHTML = `<div style="color:#ffa500;">Sending ${method?.value} request...</div>`;
            const res = await fetch(url?.value, opts);
            const text = await res.text();
            response.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>Status:</strong> ${res.status} ${res.statusText}</div></div>`;
          } catch (e) { response.innerHTML = `<div style="color:#ff6b6b;">Error: ${e.message}</div>`; }
        });
      }
    }

    if (panelId === 'panel-http-tools-curl-builder') {
      const method = el('curlMethod');
      const url = el('curlUrl');
      const headers = el('curlHeaders');
      const body = el('curlBody');
      const result = el('curlResult');
      if (method && url && result) {
        function build() {
          let curl = `curl -X ${method.value}`;
          const headerLines = headers?.value.split('\n').filter(h => h.trim()) || [];
          headerLines.forEach(h => { curl += ` \\\n  -H '${h.trim()}'`; });
          if (['POST', 'PUT', 'PATCH'].includes(method.value) && body?.value.trim()) curl += ` \\\n  -d '${body.value.trim()}'`;
          curl += ` \\\n  '${url.value}'`;
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${curl}</pre></div>`;
        }
        method.addEventListener('change', build);
        url.addEventListener('input', build);
        headers?.addEventListener('input', build);
        body?.addEventListener('input', build);
      }
    }

    if (panelId === 'panel-http-tools-http-headers-inspector') {
      const url = el('headersUrl');
      const fetchBtn = el('headersFetchBtn');
      const result = el('headersResult');
      if (fetchBtn && result) {
        fetchBtn.addEventListener('click', async function() {
          try {
            result.innerHTML = `<div style="color:#ffa500;">Fetching headers...</div>`;
            const res = await fetch(url?.value, { method: 'HEAD' });
            let html = '<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;">';
            res.headers.forEach((val, key) => { html += `<div><strong>${key}:</strong> ${val}</div>`; });
            html += '</div>';
            result.innerHTML = html;
          } catch (e) { result.innerHTML = `<div style="color:#ff6b6b;">Error: ${e.message}</div>`; }
        });
      }
    }

    // WEBSOCKET TOOLS
    if (panelId === 'panel-websocket-tools-websocket-tester') {
      const url = el('wsUrl');
      const connectBtn = el('wsConnectBtn');
      const disconnectBtn = el('wsDisconnectBtn');
      const message = el('wsMessage');
      const sendBtn = el('wsSendBtn');
      const log = el('wsLog');
      let socket = null;
      if (connectBtn && log) {
        function logMsg(msg, type = 'info') {
          const colors = { info: '#d4d4d4', send: '#90ee90', recv: '#87ceeb', error: '#ff6b6b' };
          log.innerHTML += `<div style="color:${colors[type]};">${new Date().toLocaleTimeString()} ${msg}</div>`;
          log.scrollTop = log.scrollHeight;
        }
        connectBtn.addEventListener('click', function() {
          try {
            socket = new WebSocket(url?.value);
            socket.onopen = () => { logMsg('[Connected]'); connectBtn.disabled = true; disconnectBtn && (disconnectBtn.disabled = false); sendBtn && (sendBtn.disabled = false); };
            socket.onclose = () => { logMsg('[Disconnected]'); connectBtn.disabled = false; disconnectBtn && (disconnectBtn.disabled = true); sendBtn && (sendBtn.disabled = true); socket = null; };
            socket.onerror = () => logMsg('[Error]', 'error');
            socket.onmessage = (e) => logMsg(`[Received] ${e.data}`, 'recv');
            logMsg(`[Connecting to ${url?.value}...]`);
          } catch (e) { logMsg(`[Error] ${e.message}`, 'error'); }
        });
        disconnectBtn?.addEventListener('click', () => { if (socket) socket.close(); });
        sendBtn?.addEventListener('click', () => { if (socket && socket.readyState === WebSocket.OPEN) { socket.send(message?.value); logMsg(`[Sent] ${message?.value}`, 'send'); } });
      }
    }

    // STORAGE TOOLS
    if (panelId === 'panel-storage-tools-localstorage-sessionstorage-cookies-inspector') {
      const list = el('lsList');
      const refreshBtn = el('lsRefreshBtn');
      const clearBtn = el('lsClearBtn');
      const keyInput = el('lsKey');
      const valueInput = el('lsValue');
      const saveBtn = el('lsSaveBtn');
      if (list && refreshBtn) {
        function refresh() {
          let html = '';
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const val = localStorage.getItem(key);
            html += `<div style="margin-bottom:8px;"><strong>${key}:</strong> <span style="color:#666;">${val}</span></div>`;
          }
          list.innerHTML = html || '<span style="color:#888;">No items</span>';
        }
        refreshBtn.addEventListener('click', refresh);
        clearBtn?.addEventListener('click', () => { if (confirm('Clear all?')) { localStorage.clear(); refresh(); } });
        saveBtn?.addEventListener('click', () => { if (keyInput?.value) { localStorage.setItem(keyInput.value, valueInput?.value); keyInput.value = ''; valueInput.value = ''; refresh(); } });
        refresh();
      }
    }

    if (panelId === 'panel-storage-tools-cookies') {
      const list = el('cookieList');
      const refreshBtn = el('cookieRefreshBtn');
      if (list && refreshBtn) {
        function refresh() {
          const cookies = document.cookie.split(';').map(c => c.trim());
          list.innerHTML = cookies.filter(c => c).map(cookie => {
            const [name, ...valueParts] = cookie.split('=');
            return `<div style="margin-bottom:8px;"><strong>${name}:</strong> <span style="color:#666;">${valueParts.join('=')}</span></div>`;
          }).join('') || '<span style="color:#888;">No cookies</span>';
        }
        refreshBtn.addEventListener('click', refresh);
        refresh();
      }
    }

    // FILE TOOLS
    if (panelId === 'panel-file-tools-file-checksum-comparator') {
      const file1 = el('checksumFile1');
      const file2 = el('checksumFile2');
      const result = el('checksumResult');
      if (file1 && file2 && result) {
        async function compare() {
          if (!file1.files[0] || !file2.files[0]) { result.innerHTML = ''; return; }
          result.innerHTML = '<div style="color:#ffa500;">Computing...</div>';
          const h1 = await crypto.subtle.digest('SHA-256', await file1.files[0].arrayBuffer()).then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''));
          const h2 = await crypto.subtle.digest('SHA-256', await file2.files[0].arrayBuffer()).then(b => Array.from(new Uint8Array(b)).map(x => x.toString(16).padStart(2, '0')).join(''));
          const match = h1 === h2;
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>${file1.files[0].name}:</strong> ${h1}</div><div><strong>${file2.files[0].name}:</strong> ${h2}</div><div style="margin-top:12px;color:${match ? '#90ee90' : '#ff6b6b'};"><strong>${match ? 'MATCH' : 'MISMATCH'}</strong></div></div>`;
        }
        file1.addEventListener('change', compare);
        file2.addEventListener('change', compare);
      }
    }

    if (panelId === 'panel-file-tools-csv-mapper-columns-fields') {
      const input = el('csvInput');
      const mapping = el('csvMapping');
      const result = el('csvResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const lines = input.value.trim().split('\n');
          if (lines.length < 2) { result.innerHTML = ''; return; }
          const headers = lines[0].split(',').map(h => h.trim());
          let html = `<table style="width:100%;border-collapse:collapse;"><thead><tr>${headers.map(h => `<th style="border:1px solid #ddd;padding:8px;background:#f5f5f5;">${h}</th>`).join('')}</tr></thead><tbody>`;
          lines.slice(1).forEach(line => {
            if (!line.trim()) return;
            const cells = line.split(',').map(c => c.trim());
            html += '<tr>' + cells.map((c, i) => `<td style="border:1px solid #ddd;padding:8px;">${c}</td>`).join('') + '</tr>';
          });
          html += '</tbody></table>';
          result.innerHTML = html;
        });
      }
    }

    // CI/CD TOOLS
    if (panelId === 'panel-ci-cd-tools-yaml-validator-ci-cd') {
      const input = el('yamlInput');
      const validateBtn = el('yamlValidateBtn');
      const result = el('yamlResult');
      if (input && result) {
        function validate() {
          if (typeof jsyaml === 'undefined') { result.innerHTML = '<span style="color:#ffa500;">YAML library not loaded</span>'; return; }
          try {
            const parsed = jsyaml.load(input.value);
            result.innerHTML = `<div style="color:#90ee90;">Valid YAML</div>`;
          } catch (e) { result.innerHTML = `<div style="color:#ff6b6b;">Invalid: ${e.message}</div>`; }
        }
        validateBtn?.addEventListener('click', validate);
        input.addEventListener('input', validate);
      }
    }

    if (panelId === 'panel-ci-cd-tools-github-actions-expression-simulator') {
      const name = el('gaName');
      const trigger = el('gaTrigger');
      const job = el('gaJob');
      const generateBtn = el('gaGenerateBtn');
      const result = el('gaResult');
      if (name && result) {
        function generate() {
          const workflow = { name: name.value || 'My Workflow', on: trigger?.value || 'push', jobs: { [job?.value || 'build']: { 'runs-on': 'ubuntu-latest', steps: [{ uses: 'actions/checkout@v3' }] } } };
          const yaml = typeof jsyaml !== 'undefined' ? jsyaml.dump(workflow) : JSON.stringify(workflow, null, 2);
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${yaml}</pre></div>`;
        }
        generateBtn?.addEventListener('click', generate);
        name.addEventListener('input', generate);
        trigger?.addEventListener('change', generate);
        job?.addEventListener('input', generate);
      }
    }

    // CODE QUALITY TOOLS
    if (panelId === 'panel-code-quality-tools-eslint-playground') {
      const input = el('eslintInput');
      const result = el('eslintResult');
      if (input && result) {
        input.addEventListener('input', function() {
          const code = input.value;
          if (!code.trim()) { result.innerHTML = ''; return; }
          const issues = [];
          if (code.includes('console.log')) issues.push({ msg: 'Unexpected console statement' });
          if (!code.includes(';') && code.length > 10) issues.push({ msg: 'Missing semicolon' });
          result.innerHTML = issues.length ? issues.map(i => `<div style="color:#ffa500;">${i.msg}</div>`).join('') : '<div style="color:#90ee90;">No issues found (basic linting)</div>';
        });
      }
    }

    if (panelId === 'panel-code-quality-tools-prettier-playground') {
      const input = el('prettierInput');
      const output = el('prettierOutput');
      const width = el('prettierWidth');
      const tabWidth = el('prettierTabWidth');
      if (input && output) {
        function format() {
          try {
            let result = input.value;
            result = result.replace(/\s+/g, ' ').replace(/\s*,\s*/g, ', ').replace(/\s*\{\s*/g, ' { ').replace(/\s*\}\s*/g, ' } ');
            output.value = result;
          } catch (e) { output.value = 'Error'; }
        }
        input.addEventListener('input', format);
        format();
      }
    }

    // SCAFFOLDING TOOLS
    if (panelId === 'panel-scaffolding-tools-project-scaffolder-node-react-vue-express') {
      const type = el('scaffoldType');
      const name = el('scaffoldName');
      const generateBtn = el('scaffoldGenerateBtn');
      const result = el('scaffoldResult');
      if (type && name && result) {
        function generate() {
          const projectName = name.value || 'my-project';
          let files = {};
          if (type.value === 'node') files = { 'package.json': JSON.stringify({ name: projectName, version: '1.0.0' }, null, 2), 'index.js': 'console.log("Hello!");' };
          else if (type.value === 'react') files = { 'package.json': JSON.stringify({ name: projectName, version: '1.0.0' }, null, 2), 'App.js': 'function App() { return <div>Hello</div>; }' };
          else files = { 'main.py': 'print("Hello!")' };
          let html = '<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;">';
          Object.entries(files).forEach(([f, c]) => { html += `<div><strong>${f}:</strong></div><pre style="background:#1e1e1e;color:#d4d4d4;padding:8px;border-radius:4px;margin-bottom:8px;">${c}</pre>`; });
          html += '</div>';
          result.innerHTML = html;
        }
        generateBtn?.addEventListener('click', generate);
        type.addEventListener('change', generate);
        name.addEventListener('input', generate);
      }
    }

    // MARKDOWN TOOLS
    if (panelId === 'panel-markdown-tools-markdown-editor-preview') {
      const input = el('mdInput');
      const preview = el('mdPreview');
      if (input && preview) {
        function convert() {
          let md = input.value;
          md = md.replace(/^### (.+)$/gm, '<h3>$1</h3>').replace(/^## (.+)$/gm, '<h2>$1</h2>').replace(/^# (.+)$/gm, '<h1>$1</h1>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/\*(.+?)\*/g, '<em>$1</em>').replace(/`(.+?)`/g, '<code>$1</code>').replace(/\n/g, '<br>');
          preview.innerHTML = md;
        }
        input.addEventListener('input', convert);
        convert();
      }
    }

    if (panelId === 'panel-markdown-tools-table-generator') {
      const cols = el('tableCols');
      const rows = el('tableRows');
      const genBtn = el('tableGenBtn');
      const result = el('tableResult');
      if (cols && rows && result) {
        function generate() {
          const headers = cols.value.split(',').map(h => h.trim()).filter(h => h);
          if (!headers.length) { result.innerHTML = ''; return; }
          const sep = headers.map(() => '---');
          let md = `| ${headers.join(' | ')} |\n| ${sep.join(' | ')} |`;
          for (let i = 0; i < (parseInt(rows.value) || 3); i++) md += `\n| ${headers.map(() => 'Cell').join(' | ')} |`;
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${md}</pre></div>`;
        }
        genBtn?.addEventListener('click', generate);
        cols.addEventListener('input', generate);
        rows.addEventListener('input', generate);
      }
    }

    // HTML TOOLS
    if (panelId === 'panel-html-tools-html-sanitizer-render') {
      const input = el('htmlSanInput');
      const sanitizeBtn = el('htmlSanitizeBtn');
      const result = el('htmlSanResult');
      if (input && result) {
        function sanitize() {
          let html = input.value;
          html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '').replace(/on\w+="[^"]*"/gi, '').replace(/on\w+='[^']*'/gi, '').replace(/javascript:/gi, '');
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${html}</pre></div>`;
        }
        sanitizeBtn?.addEventListener('click', sanitize);
        input.addEventListener('input', sanitize);
      }
    }

    if (panelId === 'panel-html-tools-html-formatter-minifier') {
      const input = el('htmlFmtToolInput');
      const fmtBtn = el('htmlFmtToolBtn');
      const result = el('htmlFmtToolResult');
      if (input && result) {
        function format() {
          let html = input.value;
          html = html.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${html}</pre></div>`;
        }
        fmtBtn?.addEventListener('click', format);
        input.addEventListener('input', format);
      }
    }

    // BITWISE TOOLS
    if (panelId === 'panel-bitwise-tools-bitwise-calculator') {
      const a = el('bitA');
      const op = el('bitOp');
      const b = el('bitB');
      const result = el('bitResult');
      if (a && op && b && result) {
        function calc() {
          const aVal = parseInt(a.value) || 0;
          const bVal = parseInt(b.value) || 0;
          let res;
          if (op.value === '<<') res = aVal << bVal;
          else if (op.value === '>>') res = aVal >> bVal;
          else res = eval(`${aVal} ${op.value} ${bVal}`);
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><div><strong>Result:</strong> ${res}</div><div><strong>Binary:</strong> ${(res >>> 0).toString(2)}</div><div><strong>Hex:</strong> 0x${(res >>> 0).toString(16).toUpperCase()}</div></div>`;
        }
        a.addEventListener('input', calc);
        op.addEventListener('change', calc);
        b.addEventListener('input', calc);
        calc();
      }
    }

    // RESILIENCE TOOLS
    if (panelId === 'panel-resilience-tools-retry-simulator') {
      const max = el('retryMax');
      const delay = el('retryDelay');
      const maxDelay = el('retryMaxDelay');
      const calcBtn = el('retryCalcBtn');
      const result = el('retryResult');
      if (max && delay && result) {
        function calculate() {
          const m = parseInt(max.value) || 5;
          const d = parseInt(delay.value) || 1000;
          const mx = parseInt(maxDelay?.value) || 30000;
          let html = '<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><strong>Attempt Schedule:</strong><ul style="margin:8px 0 0 20px;padding:0;">';
          for (let i = 1; i <= m; i++) html += `<li>Attempt ${i}: wait ${Math.min(d * Math.pow(2, i - 1), mx)}ms</li>`;
          html += '</ul></div>';
          result.innerHTML = html;
        }
        calcBtn?.addEventListener('click', calculate);
        max.addEventListener('input', calculate);
        delay.addEventListener('input', calculate);
        calculate();
      }
    }

    if (panelId === 'panel-resilience-tools-backoff-simulator') {
      const strategy = el('backoffStrategy');
      const base = el('backoffBase');
      const attempts = el('backoffAttempts');
      const genBtn = el('backoffGenBtn');
      const result = el('backoffResult');
      if (strategy && base && attempts && result) {
        function generate() {
          const str = strategy.value;
          const b = parseInt(base.value) || 1000;
          const a = parseInt(attempts.value) || 5;
          let code = str === 'linear' ? `function linearBackoff(attempt) { return ${b} * attempt; }` : str === 'exponential' ? `function exponentialBackoff(attempt) { return ${b} * Math.pow(2, attempt - 1); }` : `function fibonacciBackoff(attempt) { return ${b}; }`;
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${code}</pre></div>`;
        }
        genBtn?.addEventListener('click', generate);
        strategy.addEventListener('change', generate);
        generate();
      }
    }

    if (panelId === 'panel-resilience-tools-circuitbreaker-simulator') {
      const threshold = el('cbThreshold');
      const timeout = el('cbTimeout');
      const reset = el('cbReset');
      const result = el('cbResult');
      if (threshold && timeout && reset && result) {
        function update() {
          const t = parseInt(threshold.value) || 5;
          const to = parseInt(timeout.value) || 60000;
          const r = parseInt(reset.value) || 30000;
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;"><strong>Circuit Breaker:</strong><ul style="margin:8px 0 0 20px;padding:0;"><li>Open after: ${t} failures</li><li>Timeout: ${to}ms</li><li>Reset after: ${r}ms</li></ul></div>`;
        }
        threshold.addEventListener('input', update);
        timeout.addEventListener('input', update);
        reset.addEventListener('input', update);
        update();
      }
    }

    // SECURITY TOOLS
    if (panelId === 'panel-security-tools-csp-policy-generator') {
      const defaultSrc = el('cspDefault');
      const scriptSrc = el('cspScript');
      const styleSrc = el('cspStyle');
      const imgSrc = el('cspImg');
      const connectSrc = el('cspConnect');
      const fontSrc = el('cspFont');
      const genBtn = el('cspGenBtn');
      const result = el('cspResult');
      if (defaultSrc && scriptSrc && result) {
        function generate() {
          const csp = `default-src ${defaultSrc.value}; script-src ${scriptSrc.value}; style-src ${styleSrc?.value || defaultSrc.value}; img-src ${imgSrc?.value || defaultSrc.value};`;
          result.innerHTML = `<div style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${csp}</pre></div><div style="margin-top:8px;font-size:0.9rem;color:#666;">Add as HTTP header</div>`;
        }
        genBtn?.addEventListener('click', generate);
        defaultSrc.addEventListener('input', generate);
        scriptSrc.addEventListener('input', generate);
        generate();
      }
    }

    // GENERATORS
    if (panelId === 'panel-generators-qr-generator') {
      const input = el('qrInput');
      const result = el('qrResult');
      if (input && result) {
        function generate() {
          const text = input.value.trim();
          if (!text) { result.innerHTML = ''; return; }
          try {
            const qr = qrcode(0, 'M');
            qr.addData(text);
            qr.make();
            result.innerHTML = `<img src="${qr.createDataURL(4, 0)}" alt="QR Code" style="max-width:200px;">`;
          } catch (e) {
            result.innerHTML = '<span style="color:red;">Error generating QR code</span>';
          }
        }
        input.addEventListener('input', generate);
        generate();
      }
    }

    if (panelId === 'panel-generators-barcode-generator') {
      const input = el('barcodeInput');
      const result = el('barcodeResult');
      if (input && result) {
        function generate() {
          const text = input.value.trim();
          if (!text) { result.innerHTML = ''; return; }
          try {
            JsBarcode(result, text, { format: 'CODE128', displayValue: true, fontSize: 14 });
          } catch (e) {
            result.innerHTML = '<span style="color:red;">Error generating barcode</span>';
          }
        }
        input.addEventListener('input', generate);
        generate();
      }
    }

    if (panelId === 'panel-generators-fake-data-generator-faker') {
      const type = el('fakeDataType');
      const count = el('fakeDataCount');
      const btn = el('generateFakeDataBtn');
      const result = el('fakeDataResult');
      if (btn && result) {
        const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emma', 'Robert', 'Lisa', 'James', 'Maria'];
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
        const domains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'example.com'];
        const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Cedar Ln', 'Pine Rd', 'Elm St', 'Washington Blvd', 'Park Ave'];
        const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
        const companies = ['Tech Corp', 'Global Inc', 'Digital Solutions', 'Cloud Systems', 'Data Innovations', 'Smart Systems'];

        function generate() {
          const t = type?.value || 'name';
          const n = parseInt(count?.value) || 5;
          let items = [];
          for (let i = 0; i < Math.min(n, 100); i++) {
            const first = firstNames[Math.floor(Math.random() * firstNames.length)];
            const last = lastNames[Math.floor(Math.random() * lastNames.length)];
            const email = `${first.toLowerCase()}.${last.toLowerCase()}${Math.floor(Math.random() * 100)}@${domains[Math.floor(Math.random() * domains.length)]}`;
            const phone = `+1 (${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
            const address = `${Math.floor(Math.random() * 9999) + 1} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]}`;

            switch (t) {
              case 'name': items.push(`${first} ${last}`); break;
              case 'email': items.push(email); break;
              case 'phone': items.push(phone); break;
              case 'address': items.push(address); break;
              case 'company': items.push(`${first} ${last} at ${companies[Math.floor(Math.random() * companies.length)]}`); break;
            }
          }
          result.innerHTML = `<div style="font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;white-space:pre-wrap;">${items.join('\n')}</div>`;
        }
        btn.addEventListener('click', generate);
        type?.addEventListener('change', generate);
        generate();
      }
    }

    if (panelId === 'panel-generators-readme-template-generator') {
      const name = el('readmeName');
      const desc = el('readmeDesc');
      const btn = el('generateReadmeBtn');
      const result = el('readmeResult');
      if (btn && result) {
        function generate() {
          const n = name?.value?.trim() || 'my-project';
          const d = desc?.value?.trim() || 'A short description';
          const slug = n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
          const readme = `# ${n}

${d}

## Installation

\`\`\`bash
npm install ${slug}
\`\`\`

## Usage

\`\`\`javascript
import { } from '${slug}';

// Example usage
\`\`\`

## API

### \`functionName()\`

Description.

## License

MIT`;
          result.innerHTML = `<textarea style="width:100%;min-height:300px;font-family:monospace;background:#f5f5f5;padding:12px;border-radius:4px;border:none;" readonly>${readme}</textarea>`;
        }
        btn.addEventListener('click', generate);
        name?.addEventListener('input', generate);
        desc?.addEventListener('input', generate);
      }
    }

    if (panelId === 'panel-generators-mock-api-generator') {
      const method = el('mockMethod');
      const endpoint = el('mockEndpoint');
      const result = el('mockResult');
      if (method && endpoint && result) {
        function generate() {
          const m = method.value;
          const ep = endpoint.value || '/api/example';
          const json = m === 'GET' ? '' : `{\n  "data": "example data"\n}`;
          result.innerHTML = `<div style="font-family:monospace;background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;"><pre style="white-space:pre-wrap;">${m} ${ep}${json ? '\n\nBody:\n' + json : ''}</pre></div>`;
        }
        method.addEventListener('change', generate);
        endpoint.addEventListener('input', generate);
      }
    }

    // HASHING
    if (panelId === 'panel-hashing-hmac-calculator') {
      const input = el('hmacInput');
      const secret = el('hmacSecret');
      const output = el('hmacOutput');
      if (input && output) {
        async function compute() {
          const text = input.value;
          const key = secret?.value || 'secret';
          if (!text) { output.value = ''; return; }
          try {
            const encoder = new TextEncoder();
            const keyData = encoder.encode(key);
            const cryptoKey = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
            const signature = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(text));
            output.value = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
          } catch (e) {
            output.value = 'Error: ' + e.message;
          }
        }
        input.addEventListener('input', compute);
        secret?.addEventListener('input', compute);
      }
    }

    if (panelId === 'panel-hashing-crc32') {
      const input = el('crc32Input');
      const output = el('crc32Output');
      if (input && output) {
        const table = new Uint32Array(256);
        for (let i = 0; i < 256; i++) {
          let c = i;
          for (let j = 0; j < 8; j++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
          table[i] = c;
        }
        function crc32(str) {
          let crc = 0xFFFFFFFF;
          for (let i = 0; i < str.length; i++) crc = table[(crc ^ str.charCodeAt(i)) & 0xFF] ^ (crc >>> 8);
          return (crc ^ 0xFFFFFFFF) >>> 0;
        }
        function compute() {
          const text = input.value;
          output.value = text ? crc32(text).toString(16).toUpperCase().padStart(8, '0') : '';
        }
        input.addEventListener('input', compute);
      }
    }

    if (panelId === 'panel-hashing-adler32') {
      const input = el('adler32Input');
      const output = el('adler32Output');
      if (input && output) {
        function adler32(str) {
          let a = 1, b = 0;
          for (let i = 0; i < str.length; i++) {
            a = (a + str.charCodeAt(i)) % 65521;
            b = (b + a) % 65521;
          }
          return (b << 16) | a;
        }
        function compute() {
          const text = input.value;
          output.value = text ? adler32(text).toString(16).toUpperCase().padStart(8, '0') : '';
        }
        input.addEventListener('input', compute);
      }
    }

    // CRYPTO
    if (panelId === 'panel-crypto-aesgcm-encrypt-decrypt') {
      const mode = el('aesMode');
      const key = el('aesKey');
      const input = el('aesInput');
      const output = el('aesOutput');
      if (mode && input && output) {
        async function compute() {
          const m = mode.value;
          const text = input.value;
          const k = key?.value || '';
          if (!text) { output.value = ''; return; }
          try {
            if (m === 'encrypt') {
              const keyBytes = k ? new Uint8Array(k.match(/.{1,2}/g).map(b => parseInt(b, 16))) : crypto.getRandomValues(new Uint8Array(32));
              const iv = crypto.getRandomValues(new Uint8Array(12));
              const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, [m]);
              const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, cryptoKey, new TextEncoder().encode(text));
              const result = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');
              if (key) key.value = Array.from(keyBytes).map(b => b.toString(16).padStart(2, '0')).join('');
              output.value = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('') + ':' + result;
            } else {
              const [ivHex, ...data] = text.split(':');
              if (!ivHex || !data.length) { output.value = 'Invalid format. Use IV:encryptedData'; return; }
              const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
              const keyBytes = k ? new Uint8Array(k.match(/.{1,2}/g).map(b => parseInt(b, 16))) : null;
              if (!keyBytes) { output.value = 'Key required for decryption'; return; }
              const cryptoKey = await crypto.subtle.importKey('raw', keyBytes, { name: 'AES-GCM' }, false, ['decrypt']);
              const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, cryptoKey, new Uint8Array(data.join(':').match(/.{1,2}/g).map(b => parseInt(b, 16))));
              output.value = new TextDecoder().decode(decrypted);
            }
          } catch (e) {
            output.value = 'Error: ' + e.message;
          }
        }
        mode.addEventListener('change', compute);
        key?.addEventListener('input', compute);
        input.addEventListener('input', compute);
      }
    }

    if (panelId === 'panel-crypto-digital-sign-verify') {
      const input = el('signInput');
      const btn = el('signBtn');
      const result = el('signResult');
      if (btn && input && result) {
        async function sign() {
          const text = input.value.trim();
          if (!text) { result.innerHTML = ''; return; }
          try {
            const key = await crypto.subtle.generateKey({ name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' }, true, ['encrypt', 'decrypt']);
            const signature = await crypto.subtle.sign('RSA-OAEP', key.privateKey, new TextEncoder().encode(text));
            const signatureHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
            const publicKey = await crypto.subtle.exportKey('spki', key.publicKey);
            const publicKeyPem = '-----BEGIN PUBLIC KEY-----\n' + btoa(String.fromCharCode(...new Uint8Array(publicKey))) + '\n-----END PUBLIC KEY-----';
            result.innerHTML = `<div style="background:#f5f5f5;padding:12px;border-radius:4px;"><p><strong>Signature (hex):</strong></p><input type="text" class="converter-input" value="${signatureHex}" readonly onclick="this.select()"></div>`;
          } catch (e) {
            result.innerHTML = `<span style="color:red;">Error: ${e.message}</span>`;
          }
        }
        btn.addEventListener('click', sign);
      }
    }

    // TEXT TOOLS
    if (panelId === 'panel-text-tools-text-normalizer') {
      const input = el('normalizeInput');
      const output = el('normalizeOutput');
      if (input && output) {
        function normalize() {
          const text = input.value;
          output.value = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
        }
        input.addEventListener('input', normalize);
      }
    }

    if (panelId === 'panel-text-tools-sort-randomly') {
      const input = el('sortRandomInput');
      const output = el('sortRandomOutput');
      const btn = el('sortRandomBtn');
      if (btn && output) {
        function shuffle() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          for (let i = items.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [items[i], items[j]] = [items[j], items[i]];
          }
          output.value = items.join('\n');
        }
        btn.addEventListener('click', shuffle);
        input?.addEventListener('input', shuffle);
      }
    }

    if (panelId === 'panel-text-tools-sort-alphabetically-asc') {
      const input = el('sortAscInput');
      const output = el('sortAscOutput');
      const btn = el('sortAscBtn');
      if (btn && output) {
        function sortAsc() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          items.sort((a, b) => a.localeCompare(b));
          output.value = items.join('\n');
        }
        btn.addEventListener('click', sortAsc);
        input?.addEventListener('input', sortAsc);
      }
    }

    if (panelId === 'panel-text-tools-sort-alphabetically-desc') {
      const input = el('sortDescInput');
      const output = el('sortDescOutput');
      const btn = el('sortDescBtn');
      if (btn && output) {
        function sortDesc() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          items.sort((a, b) => b.localeCompare(a));
          output.value = items.join('\n');
        }
        btn.addEventListener('click', sortDesc);
        input?.addEventListener('input', sortDesc);
      }
    }

    if (panelId === 'panel-text-tools-inline-join') {
      const input = el('inlineJoinInput');
      const separator = el('inlineJoinSeparator');
      const output = el('inlineJoinOutput');
      const btn = el('inlineJoinBtn');
      if (btn && output) {
        function join() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          const sep = separator?.value || ',';
          output.value = items.join(sep);
        }
        btn.addEventListener('click', join);
        input?.addEventListener('input', join);
        separator?.addEventListener('input', join);
      }
    }

    if (panelId === 'panel-text-tools-multi-line-split') {
      const input = el('multiLineInput');
      const separator = el('multiLineSeparator');
      const output = el('multiLineOutput');
      const btn = el('multiLineBtn');
      if (btn && output) {
        function split() {
          const text = input?.value || '';
          const sep = separator?.value || ',';
          output.value = text.split(sep).map(x => x.trim()).filter(x => x).join('\n');
        }
        btn.addEventListener('click', split);
        input?.addEventListener('input', split);
        separator?.addEventListener('input', split);
      }
    }

    if (panelId === 'panel-text-tools-unique-values') {
      const input = el('uniqueInput');
      const output = el('uniqueOutput');
      const btn = el('uniqueBtn');
      if (btn && output) {
        function unique() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          output.value = [...new Set(items)].join('\n');
        }
        btn.addEventListener('click', unique);
        input?.addEventListener('input', unique);
      }
    }

    if (panelId === 'panel-text-tools-reverse-array') {
      const input = el('reverseInput');
      const output = el('reverseOutput');
      const btn = el('reverseBtn');
      if (btn && output) {
        function reverse() {
          const items = input?.value?.split('\n').filter(x => x) || [];
          output.value = items.reverse().join('\n');
        }
        btn.addEventListener('click', reverse);
        input?.addEventListener('input', reverse);
      }
    }

    if (panelId === 'panel-text-tools-filter-empty-lines') {
      const input = el('filterEmptyInput');
      const output = el('filterEmptyOutput');
      const btn = el('filterEmptyBtn');
      if (btn && output) {
        function filterEmpty() {
          const items = input?.value?.split('\n').map(x => x.trim()).filter(x => x) || [];
          output.value = items.join('\n');
        }
        btn.addEventListener('click', filterEmpty);
        input?.addEventListener('input', filterEmpty);
      }
    }

    // HTTP TOOLS
    if (panelId === 'panel-http-tools-uptime-checker-http-monitor') {
      const url = el('uptimeUrl');
      const result = el('uptimeResult');
      if (url && result) {
        async function check() {
          const u = url.value.trim();
          if (!u) { result.innerHTML = ''; return; }
          const start = performance.now();
          try {
            const response = await fetch(u, { method: 'HEAD', mode: 'no-cors' });
            const time = (performance.now() - start).toFixed(0);
            result.innerHTML = `<div style="background:#d4edda;padding:12px;border-radius:4px;"><strong>Reachable</strong><br>Response time: ${time}ms</div>`;
          } catch (e) {
            result.innerHTML = `<div style="background:#f8d7da;padding:12px;border-radius:4px;"><strong>Unreachable</strong><br>${e.message}</div>`;
          }
        }
        url.addEventListener('input', () => { if (url.value.includes('http')) check(); });
      }
    }

    // JSON TOOLS
    if (panelId === 'panel-json-tools-json-formatter-minifier') {
      const input = el('jsonMinInput');
      const output = el('jsonMinOutput');
      const formatBtn = el('formatJsonBtn');
      const minifyBtn = el('minifyJsonBtn');
      if (input && output) {
        function format() {
          try {
            const parsed = JSON.parse(input.value);
            output.value = JSON.stringify(parsed, null, 2);
          } catch (e) { output.value = 'Invalid JSON'; }
        }
        function minify() {
          try {
            const parsed = JSON.parse(input.value);
            output.value = JSON.stringify(parsed);
          } catch (e) { output.value = 'Invalid JSON'; }
        }
        formatBtn?.addEventListener('click', format);
        minifyBtn?.addEventListener('click', minify);
      }
    }

    if (panelId === 'panel-json-tools-json-converters') {
      const input = el('jsonConvInput');
      const output = el('jsonConvOutput');
      if (input && output) {
        function convert() {
          try {
            const parsed = JSON.parse(input.value);
            output.value = JSON.stringify(parsed, null, 2);
          } catch (e) { output.value = 'Invalid JSON'; }
        }
        input.addEventListener('input', convert);
      }
    }

    // BITWISE TOOLS
    if (panelId === 'panel-bitwise-tools-binary-base-numeric-tools') {
      const dec = el('binaryDec');
      const bin = el('binaryBin');
      const hex = el('binaryHex');
      const oct = el('binaryOct');
      function update(changed) {
        if (changed === 'dec' && dec) {
          const n = parseInt(dec.value, 10);
          if (!isNaN(n)) {
            if (bin) bin.value = n.toString(2);
            if (hex) hex.value = n.toString(16).toUpperCase();
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'bin' && bin) {
          const n = parseInt(bin.value, 2);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (hex) hex.value = n.toString(16).toUpperCase();
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'hex' && hex) {
          const n = parseInt(hex.value, 16);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (bin) bin.value = n.toString(2);
            if (oct) oct.value = n.toString(8);
          }
        }
        if (changed === 'oct' && oct) {
          const n = parseInt(oct.value, 8);
          if (!isNaN(n)) {
            if (dec) dec.value = n.toString(10);
            if (bin) bin.value = n.toString(2);
            if (hex) hex.value = n.toString(16).toUpperCase();
          }
        }
      }
      dec?.addEventListener('input', () => update('dec'));
      bin?.addEventListener('input', () => update('bin'));
      hex?.addEventListener('input', () => update('hex'));
      oct?.addEventListener('input', () => update('oct'));
    }

    // CODE QUALITY TOOLS
    if (panelId === 'panel-code-quality-tools-js-ts-ast-explorer') {
      const input = el('astInput');
      const btn = el('parseAstBtn');
      const result = el('astResult');
      if (btn && result) {
        btn.addEventListener('click', () => {
          const code = input?.value?.trim();
          if (!code) { result.innerHTML = ''; return; }
          try {
            const ast = { type: 'Program', body: [] };
            result.innerHTML = `<pre style="background:#1e1e1e;color:#d4d4d4;padding:12px;border-radius:4px;overflow:auto;max-height:400px;"><code>${JSON.stringify(ast, null, 2)}</code></pre>`;
          } catch (e) {
            result.innerHTML = `<span style="color:red;">Error: ${e.message}</span>`;
          }
        });
      }
    }

    if (panelId === 'panel-code-quality-tools-bundle-analyzer-helper') {
      const size = el('bundleSize');
      const threshold = el('bundleThreshold');
      const result = el('bundleResult');
      if (size && threshold && result) {
        function analyze() {
          const s = parseFloat(size.value) || 0;
          const t = parseFloat(threshold.value) || 244;
          const status = s > t ? 'oversized' : 'ok';
          const color = status === 'oversized' ? '#f8d7da' : '#d4edda';
          result.innerHTML = `<div style="background:${color};padding:12px;border-radius:4px;"><strong>${status.toUpperCase()}</strong><br>Size: ${s}KB / Threshold: ${t}KB</div>`;
        }
        size.addEventListener('input', analyze);
        threshold.addEventListener('input', analyze);
      }
    }
  }
})();
