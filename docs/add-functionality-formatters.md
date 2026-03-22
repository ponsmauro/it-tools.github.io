# Formatters Feature Documentation

## Feature Purpose and Goals

The Formatters feature provides a comprehensive suite of code formatting tools organized into 6 tabs, embedded directly in the main dashboard. Users can format JSON, XML, HTML, CSS, JavaScript, and SQL with beautify/minify options.

### Goals:
1. Provide 6 functional formatter tabs with beautify/minify modes
2. Editable output textareas for manual tweaking
3. Real-time formatting as users type
4. Maintain futuristic dark theme design consistency
5. Follow existing CONVERTERS patterns and architecture

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
| `tools/converters/converters-data.js` | Formatters catalog (tabs metadata) |

## Tabs Organization (6 tabs)

### 1. JSON (json)
- **Purpose**: Format JSON data
- **Input**: JSON text
- **Modes**:
  - Beautify: `JSON.stringify(parsed, null, 2)` - 2-space indentation
  - Minify: `JSON.stringify(parsed)` - single line
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: Native JSON API (no library needed)

### 2. XML (xml)
- **Purpose**: Format XML documents
- **Input**: XML text
- **Modes**:
  - Beautify: Proper indentation with custom formatter
  - Minify: Strip whitespace between tags
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: Native DOMParser + XMLSerializer

### 3. HTML (html)
- **Purpose**: Format HTML markup
- **Input**: HTML text
- **Modes**:
  - Beautify: Uses js-beautify with 2-space indentation
  - Minify: Strip comments and extra whitespace
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: js-beautify library

### 4. CSS (css)
- **Purpose**: Format CSS stylesheets
- **Input**: CSS text
- **Modes**:
  - Beautify: Uses css_beautify with 2-space indentation
  - Minify: Compress rules (remove spaces, newlines)
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: js-beautify library

### 5. JavaScript (js)
- **Purpose**: Format JavaScript code
- **Input**: JavaScript text
- **Modes**:
  - Beautify: Uses js_beautify with 2-space indentation
  - Minify: Basic compression (remove comments, extra spaces)
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: js-beautify library

### 6. SQL (sql)
- **Purpose**: Format SQL queries
- **Input**: SQL text
- **Modes**:
  - Beautify: Uppercase keywords + proper indentation for clauses
  - Minify: Remove extra whitespace
- **UI Pattern**: Direction buttons + Two textareas (input/output)
- **Implementation**: Custom regex-based formatter
- **Supported Keywords**: SELECT, FROM, WHERE, AND, OR, JOIN, GROUP BY, ORDER BY, etc.

## Implementation Patterns

### Render + Setup Pattern

Each formatter follows a consistent two-function pattern:

```javascript
// Render function - generates HTML
function renderXxxFormatter() {
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
          <textarea id="xxxInput" class="converter-textarea" placeholder="..."></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="xxxOutput" class="converter-textarea" placeholder="..."></textarea>
        </div>
      </div>
    </div>
  `;
}

// Setup function - attaches event listeners
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

## UI Layout System

### Direction Buttons

Each formatter has toggle buttons for beautify/minify modes:

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

.direction-btn:hover,
.direction-btn:focus-visible {
  border-color: var(--accent);
}

.direction-btn.active {
  border-color: var(--accent-2);
  box-shadow: inset 0 0 0 1px rgba(124, 140, 255, 0.35);
}
```

### Grid Classes

| Class | Columns | Use Case |
|-------|---------|----------|
| `.converter-inputs` (default) | `1fr 1fr` | Standard 2-column layout |
| `style="flex:1;"` | flexible | Textareas with equal width |

### Responsive Breakpoints

- **Desktop (>960px)**: Full grid layout
- **Tablet (640-960px)**: 2-column fallback
- **Mobile (<640px)**: Single column

```css
@media (max-width: 960px) {
  .converter-inputs { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .converter-inputs { grid-template-columns: 1fr; }
}
```

## Catalog Data

The formatters catalog is defined in `tools/converters/converters-data.js`:

```javascript
window.FORMATTERS_CATALOG = [
  { tabId: "json", tabName: "JSON" },
  { tabId: "xml", tabName: "XML" },
  { tabId: "html", tabName: "HTML" },
  { tabId: "css", tabName: "CSS" },
  { tabId: "js", tabName: "JS" },
  { tabId: "sql", tabName: "SQL" }
];
```

## SQL Formatting Details

The SQL formatter uses custom regex-based logic with the following features:

### Supported Keywords
- **Queries**: SELECT, FROM, WHERE, AND, OR, NOT, IN, IS, NULL, AS
- **Joins**: JOIN, LEFT JOIN, RIGHT JOIN, INNER JOIN, OUTER JOIN, FULL JOIN, CROSS JOIN, ON
- **Aggregation**: GROUP BY, ORDER BY, ASC, DESC, LIMIT, HAVING
- **Modification**: INSERT INTO, VALUES, UPDATE, SET, DELETE
- **DDL**: CREATE, TABLE, ALTER, DROP, INDEX, VIEW
- **Constraints**: PRIMARY KEY, FOREIGN KEY, REFERENCES, UNIQUE, CONSTRAINT
- **Set Operations**: UNION, UNION ALL, EXCEPT, INTERSECT
- **Conditional**: CASE, WHEN, THEN, ELSE, END
- **Functions**: COUNT, SUM, AVG, MIN, MAX, COALESCE, DISTINCT
- **Other**: BETWEEN, LIKE, ESCAPE, EXISTS

### Beautify Behavior
1. All keywords are converted to uppercase
2. SELECT clause gets 2-space indentation for columns
3. Major clauses (FROM, WHERE, JOIN, GROUP BY, ORDER BY) start on new lines
4. AND/OR conditions are indented on new lines
5. Proper spacing around commas in column lists

### Minify Behavior
1. Multiple whitespace characters collapsed to single space
2. Extra spaces around parentheses removed
3. Leading/trailing whitespace trimmed

## Current Status

### Implemented:
- ✅ All 6 formatter tabs with working logic
- ✅ Tab navigation and content switching
- ✅ Beautify/Minify toggle buttons
- ✅ Editable output textareas
- ✅ Real-time formatting on input
- ✅ Responsive design for mobile/desktop
- ✅ Futuristic dark theme styling
- ✅ JSON formatter (native)
- ✅ XML formatter (native)
- ✅ HTML formatter (js-beautify)
- ✅ CSS formatter (js-beautify)
- ✅ JavaScript formatter (js-beautify)
- ✅ SQL formatter (custom regex)

### Coming Soon:
- Copy to clipboard functionality
- Additional SQL formatting options (capitalize keywords toggle)
- SQL syntax validation
- Error highlighting with line numbers

## External Dependencies

The formatters use CDN-hosted libraries for complex formatting:

| Library | Purpose | CDN |
|---------|---------|-----|
| js-beautify | HTML/CSS/JS formatting | cdnjs |
| js-beautify (beautify.min.js) | JavaScript beautifier | cdnjs |
| js-beautify (beautify-css.min.js) | CSS beautifier | cdnjs |
| js-beautify (beautify-html.min.js) | HTML beautifier | cdnjs |

### Native APIs Used (No Dependencies)
- JSON: Native `JSON.parse` and `JSON.stringify`
- XML: Native `DOMParser` and `XMLSerializer`

### Fallback Behavior
- If js-beautify library fails to load, HTML/CSS/JS formatters return input unchanged
- If DOMParser is unavailable, XML formatter returns input unchanged

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires JavaScript enabled.
