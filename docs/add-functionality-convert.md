# Converters Feature Documentation

## Feature Purpose and Goals

The Converters feature provides a comprehensive suite of conversion tools organized into 11 tabs, embedded directly in the main dashboard. Users can convert between data formats, time & date, units, number bases, colors, cryptographic key formats, and code formats.

### Goals:
1. Provide 11 functional converter tabs with real-time conversions
2. Compact, efficient UI with all inputs on a single line where possible
3. Support auto-detection of input formats
4. Provide instant feedback as users type
5. Maintain futuristic dark theme design consistency

## Architecture

### Integration Model

Unlike the original separate page approach, converters are now embedded directly in `index.html`:

```
┌─────────────────────────────────────────────────────────┐
│                     Main Dashboard                      │
│                  (index.html)                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │   Sidebar    │  │      Converters Panel        │   │
│  │  (Categories)│  │  (Embedded in dashboard)    │   │
│  └──────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key Files:

| File | Purpose |
|------|---------|
| `index.html` | Main dashboard with embedded converters panel |
| `assets/js/main.js` | Converter logic, render functions, event listeners |
| `tools/converters/converters.css` | Converter-specific styling |
| `tools/converters/converters-data.js` | Converter catalog (tabs metadata) |

## Tabs Organization (11 tabs)

### 1. Dates (data-formats)
- **Purpose**: Convert dates between different formats
- **Input**: Text field with auto-detect format support
- **Output Types**: Unix Timestamp, ISO 8601, UTC String, Local String, Date, Time, Epoch Milliseconds, Relative Time
- **UI Pattern**: Input → "Convert To" dropdown → Result (same row)

### 2. Time (time-date)
- **Purpose**: Convert timestamps and between timezones
- **Input**: Timestamp or datetime string
- **Output Types**: ISO 8601, Local Date, Unix Timestamp, UTC String
- **UI Pattern**: Input → "Convert To" dropdown → Result (same row)

### 3. Number Bases (number-bases)
- **Purpose**: Convert between number bases
- **Formats**: Decimal (10), Binary (2), Hexadecimal (16), Octal (8)
- **UI Pattern**: 4 inputs on same line (converter-inputs-4 grid)
- **Behavior**: Bidirectional - editing any field updates all others

### 4. Colors (colors)
- **Purpose**: Pick a color and see all format conversions
- **Input**: Native color picker
- **Outputs**: HEX, RGB, HSL, HSV
- **UI Pattern**: Color picker + 4 format outputs on same line
- **Behavior**: Updates all formats instantly on color selection

### 5. JSON/YAML (json-yaml)
- **Purpose**: Convert between JSON and YAML formats
- **Input**: JSON or YAML text
- **Behavior**: Auto-detects input format and converts to the other
- **UI Pattern**: Two textareas (input/output) side by side

### 6. JSON/CSV (json-csv)
- **Purpose**: Convert between JSON arrays and CSV
- **Input**: JSON array or CSV text
- **Behavior**: Auto-detects input format (JSON array starts with `[` or `{`, CSV starts with header)
- **UI Pattern**: Two textareas (input/output) side by side

### 7. XML/JSON (xml-json)
- **Purpose**: Convert between XML and JSON formats
- **Input**: XML or JSON text
- **Behavior**: Auto-detects input format (XML starts with `<`)
- **UI Pattern**: Two textareas (input/output) side by side

### 8. TOML/JSON (toml-json)
- **Purpose**: Convert between TOML and JSON formats
- **Input**: TOML or JSON text
- **Behavior**: Auto-detects input format (TOML sections start with `[`)
- **UI Pattern**: Two textareas (input/output) side by side

### 9. Units (units)
- **Purpose**: Convert between units of measurement
- **Categories**:
  - Bytes: B, KB, MB, GB, TB
  - Time: seconds, minutes, hours, days
  - Length: meters, kilometers, miles, feet
  - Weight: kg, grams, lb, oz
- **UI Pattern**: Value input + Category select + "From/To" selects grouped + Result
- **Behavior**: Auto-converts as user types or changes unit selection

### 10. Crypto Keys (crypto-keys)
- **Purpose**: Convert between cryptographic key formats
- **Formats**: PEM, DER, JWK
- **UI Pattern**: Textarea input + format selection + output

### 11. Code (code-formats)
- **Purpose**: Convert between code module formats
- **Conversions**: ESM ↔ CommonJS, TypeScript ↔ JavaScript
- **UI Pattern**: Textarea input + format selection + output

## Implementation Patterns

### Render + Setup Pattern

Each converter tab follows a consistent two-function pattern:

```javascript
// Render function - generates HTML
function renderXxxConverter() {
  const workspace = document.getElementById("converterWorkspace");
  workspace.innerHTML = `...html template...`;
}

// Setup function - attaches event listeners
function setupXxxListeners() {
  const element = document.getElementById("elementId");
  if (!element) return;
  
  element.addEventListener('input', conversionFunction);
}

// Registered in converterTabs object
const converterTabs = {
  'tab-id': { render: renderXxxConverter, setup: setupXxxListeners }
};
```

### Tab Registration

Tabs are registered in the `converterTabs` object in `main.js`:

```javascript
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
```

### Tab Switching

```javascript
function loadConverterContent() {
  const converter = converterTabs[currentConverterTabId];
  if (converter) {
    converter.render();
    converter.setup();
  }
}
```

## UI Layout System

### Grid Classes

| Class | Columns | Use Case |
|-------|---------|----------|
| `.converter-inputs` (default) | `1fr 1fr` | Standard 2-column layout |
| `.converter-inputs-4` | `repeat(4, 1fr)` | Number bases (4 fields) |
| `.converter-inputs-5` | `auto repeat(4, 1fr)` | Colors (picker + 4 formats) |
| `.converter-from-to` | flex container | Groups From/To selects |
| `style="flex:1;"` | flexible | Textareas with equal width |

### Responsive Breakpoints

- **Desktop (>960px)**: Full grid layout
- **Tablet (640-960px)**: 2-column fallback, 2x2 for 4-field grids
- **Mobile (<640px)**: Single column

```css
@media (max-width: 960px) {
  .converter-inputs { grid-template-columns: 1fr 1fr; }
  .converter-inputs-4 { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .converter-inputs { grid-template-columns: 1fr; }
  .converter-inputs-4 { grid-template-columns: 1fr; }
}
```

### Component Sizing

```css
.converter-input, .converter-select {
  height: 32px;
  font-size: 0.85rem;
  border-radius: 6px;
}

.converter-select-fit {
  width: fit-content;
  min-width: 60px;
}
```

## CSS Customization Classes

### Result Field Variations

| Class | Purpose |
|-------|---------|
| `.result-compact` | Narrow result field (max-width: 250px) for simple outputs |

## Current Status

### Implemented:
- ✅ All 11 converter tabs with working logic
- ✅ Tab navigation and content switching
- ✅ Compact horizontal layouts
- ✅ Responsive design for mobile/desktop
- ✅ Real-time conversion updates
- ✅ Futuristic dark theme styling
- ✅ JSON ↔ YAML converter
- ✅ JSON ↔ CSV converter
- ✅ XML ↔ JSON converter
- ✅ TOML ↔ JSON converter
- ✅ Units with Bytes, Time, Length, Weight categories

### Coming Soon:
- Copy to clipboard functionality
- Conversion history
- Enhanced error messages with specific line numbers
- Additional code format converters

## External Dependencies

The converters use CDN-hosted libraries for complex parsing:

| Library | Purpose | CDN |
|---------|---------|-----|
| js-yaml | YAML parsing/stringifying | cdnjs |
| xml2js | XML to JSON conversion | cdnjs |
| @iarna/toml | TOML parsing | jsdelivr |
| Babel standalone | TypeScript transpilation | cdnjs |

All libraries are loaded conditionally - converters work with fallback implementations when libraries are unavailable.

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires JavaScript enabled.
