# FORMATTERS Feature Documentation

## Feature Purpose and Goals

The FORMATTERS feature provides a suite of code formatting tools organized into 6 tabs, embedded directly in the main dashboard. Users can format JSON, XML, HTML, CSS, JavaScript, and SQL with beautify/minify options.

### Goals:
1. Provide 6 functional formatter tabs with beautify/minify modes
2. Editable output textareas for manual tweaking
3. Real-time formatting as users type
4. Maintain futuristic dark theme design consistency
5. Follow existing CONVERTERS patterns

## Architecture

### Integration Model

Formatters are embedded directly in `index.html`, following the same pattern as CONVERTERS:

```
┌─────────────────────────────────────────────────────────┐
│                     Main Dashboard                      │
│                  (index.html)                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │   Sidebar    │  │      Formatters Panel       │   │
│  │  (Categories)│  │  (Embedded in dashboard)    │   │
│  └──────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key Files:

| File | Purpose |
|------|---------|
| `index.html` | Main dashboard with embedded formatters panel |
| `assets/js/main.js` | Formatter logic, render functions, event listeners |
| `tools/converters/converters.css` | Formatter-specific styling |
| `tools/converters/converters-data.js` | FORMATTERS_CATALOG data |

## Tabs Organization (6 tabs)

### 1. JSON Formatter (json)
- **Purpose**: Format JSON data
- **Input**: JSON text
- **Output**: Formatted JSON (editable)
- **Modes**: Beautify (2-space indent), Minify (single line)
- **Implementation**: Native JSON.stringify

### 2. XML Formatter (xml)
- **Purpose**: Format XML documents
- **Input**: XML text
- **Output**: Formatted XML (editable)
- **Modes**: Beautify (proper indentation), Minify (strip whitespace)
- **Implementation**: Native DOMParser + XMLSerializer

### 3. HTML Formatter (html)
- **Purpose**: Format HTML markup
- **Input**: HTML text
- **Output**: Formatted HTML (editable)
- **Modes**: Beautify (using js-beautify), Minify (strip comments/whitespace)
- **Implementation**: js-beautify library

### 4. CSS Formatter (css)
- **Purpose**: Format CSS stylesheets
- **Input**: CSS text
- **Output**: Formatted CSS (editable)
- **Modes**: Beautify (using js-beautify), Minify (compress)
- **Implementation**: js-beautify library

### 5. JavaScript Formatter (js)
- **Purpose**: Format JavaScript code
- **Input**: JavaScript text
- **Output**: Formatted JavaScript (editable)
- **Modes**: Beautify (using js-beautify), Minify (basic compression)
- **Implementation**: js-beautify library

### 6. SQL Formatter (sql)
- **Purpose**: Format SQL queries
- **Input**: SQL text
- **Output**: Formatted SQL (editable)
- **Modes**: Beautify (uppercase keywords, proper indentation), Minify
- **Implementation**: Custom regex-based formatter

## Implementation Patterns

### Render + Setup Pattern

Each formatter follows the same pattern as converters:

```javascript
function renderXxxFormatter() {
  const workspace = document.getElementById("formatterWorkspace");
  workspace.innerHTML = `...html template with direction buttons and textareas...`;
}

function setupXxxFormatterListeners() {
  const input = document.getElementById("xxxInput");
  const output = document.getElementById("xxxOutput");
  const beautifyBtn = document.querySelector('[data-mode="beautify"]');
  const minifyBtn = document.querySelector('[data-mode="minify"]');
  if (!input || !output || !beautifyBtn || !minifyBtn) return;

  let currentMode = 'beautify';

  function formatXxx() {
    const val = input.value.trim();
    if (!val) { output.value = ''; return; }
    try {
      if (currentMode === 'beautify') {
        output.value = beautifyFn(val);
      } else {
        output.value = minifyFn(val);
      }
    } catch (e) {
      output.value = '';
    }
  }

  function setMode(mode) {
    currentMode = mode;
    beautifyBtn.classList.toggle('active', mode === 'beautify');
    minifyBtn.classList.toggle('active', mode === 'minify');
    formatXxx();
  }

  beautifyBtn.addEventListener('click', () => setMode('beautify'));
  minifyBtn.addEventListener('click', () => setMode('minify'));
  input.addEventListener('input', formatXxx);
  formatXxx();
}
```

### Tab Registration

Formatters are registered in the `formatterTabs` object in `main.js`:

```javascript
const formatterTabs = {
  'json': { render: renderJsonFormatter, setup: setupJsonFormatterListeners },
  'xml': { render: renderXmlFormatter, setup: setupXmlFormatterListeners },
  'html': { render: renderHtmlFormatter, setup: setupHtmlFormatterListeners },
  'css': { render: renderCssFormatter, setup: setupCssFormatterListeners },
  'js': { render: renderJsFormatter, setup: setupJsFormatterListeners },
  'sql': { render: renderSqlFormatter, setup: setupSqlFormatterListeners }
};
```

### Tab Switching

```javascript
function loadFormatterContent() {
  const formatter = formatterTabs[currentFormatterTabId];
  if (formatter) {
    formatter.render();
    formatter.setup();
  }
}
```

## UI Layout

### Direction Buttons

Each formatter has a toggle between Beautify and Minify modes:

```css
.formatter-direction {
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
  flex-wrap: wrap;
}

.direction-btn {
  padding: 10px 16px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #0f162a;
  color: var(--text);
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.direction-btn.active {
  border-color: var(--accent-2);
  box-shadow: inset 0 0 0 1px rgba(124, 140, 255, 0.35);
}
```

### Textarea Layout

Two side-by-side textareas (input/output):

```css
.converter-inputs {
  display: grid;
  gap: 10px;
  margin-bottom: 12px;
}
```

## External Dependencies

| Library | Purpose | CDN |
|---------|---------|-----|
| js-beautify | HTML/CSS/JS formatting | cdnjs |
| js-beautify (css) | CSS formatting | cdnjs |
| js-beautify (html) | HTML formatting | cdnjs |

JSON uses native JSON.stringify (no library needed).
XML uses native DOMParser (no library needed).
SQL uses custom regex-based formatter (no library needed).

## Current Status

### Implemented:
- ✅ All 6 formatter tabs with working logic
- ✅ Tab navigation and content switching
- ✅ Beautify/Minify toggle buttons
- ✅ Editable output textareas
- ✅ Real-time formatting on input
- ✅ Dark theme styling
- ✅ FORMATTERS category enabled in sidebar
- ✅ Privacy-first (all formatting client-side)

### Coming Soon:
- Copy to clipboard functionality
- Additional SQL formatting options
- SQL syntax validation
- Error highlighting with line numbers

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires JavaScript enabled.
