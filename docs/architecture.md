# Architecture - IT Tools Dashboard

## System Design

The IT Tools Dashboard is a static frontend application built with vanilla HTML, CSS, and JavaScript. The architecture follows a component-based, data-driven approach with minimal dependencies.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Main Dashboard                      │
│                  (index.html)                          │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │   Sidebar    │  │      Content Area            │   │
│  │  (Categories)│  │  ┌────────────────────────┐ │   │
│  └──────────────┘  │  │   Converters Panel     │ │   │
│                    │  │   (Embedded)           │ │   │
│                    │  │  ┌──────────────────┐  │ │   │
│                    │  │  │  Tabs + Workspace│  │ │   │
│                    │  │  └──────────────────┘  │ │   │
│                    │  └────────────────────────┘ │   │
│                    └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Main Components

### 1. Main Dashboard (`index.html`)
**Purpose**: Landing page with category navigation and tool selection

**Responsibilities**:
- Display tool categories in sidebar
- Show tools within selected category
- Provide navigation links to individual tool pages
- Maintain futuristic dark theme

**Key Files**:
- `index.html` - Main layout structure
- `assets/js/main.js` - Dashboard navigation logic
- `assets/js/tools-data.js` - Centralized tools catalog
- `assets/css/styles.css` - Global styling

### 2. Converters Panel (Embedded in main dashboard)
**Purpose**: All-in-one converter interface with tabbed categories

**Responsibilities**:
- Display 7 converter category tabs
- Render converter workspaces dynamically
- Handle real-time conversion updates
- Provide compact horizontal layouts

**Key Files**:
- `index.html` - Contains embedded converters panel HTML
- `assets/js/main.js` - Converter logic, render functions, event listeners
- `tools/converters/converters-data.js` - Converter catalog (tabs metadata)
- `tools/converters/converters.css` - Converter-specific styling

## Data Flow

### 1. Dashboard Navigation Flow
```
User clicks category
    ↓
main.js updates active category
    ↓
Renders category buttons (active state)
    ↓
Renders tools in dropdown
    ↓
User selects tool
    ↓
Updates "Open tool" link href
```

### 2. Converter Tab Flow
```
User clicks tab
    ↓
main.js updates currentConverterTabId
    ↓
Renders tab buttons (active state)
    ↓
loadConverterContent() called
    ↓
renderXxxConverter() generates HTML
    ↓
setupXxxListeners() attaches events
```

### 3. Real-Time Conversion Flow
```
User types in input
    ↓
Event listener (input/change) fires
    ↓
Conversion function processes data
    ↓
Output displayed instantly in result field
```

## Component Relationships

### Dashboard Components
```
index.html
├── assets/css/styles.css (global styles)
├── assets/js/tools-data.js (data source)
└── assets/js/main.js (navigation + converters logic)
    ├── Reads: TOOLS_CATALOG, CONVERTERS_CATALOG
    ├── Contains: converterTabs object with render/setup functions
    └── Updates: DOM elements
```

### Converter Components
```
index.html (embedded)
├── Converters panel HTML
├── converterTabs object in main.js
├── tools/converters/converters-data.js (data source)
└── tools/converters/converters.css (styling)
    ├── Reads: CONVERTERS_CATALOG
    ├── Uses: Vanilla JavaScript (no external libs)
    └── Updates: converterWorkspace DOM element
```

## State Management

### Dashboard State
```javascript
// assets/js/main.js
let active = catalog[0]?.category || ""; // Current category
let currentConverterTabId = 'data-formats'; // Current converter tab
```

### Converter State
```javascript
// assets/js/main.js (within Dashboard namespace)
const converterTabs = {
  'data-formats': { render, setup },
  'time-date': { render, setup },
  // ... all 7 tabs
};
```

## Styling Architecture

### CSS Variables (Global)
```css
:root {
  --bg: #0b1020;           /* Background */
  --bg-2: #121a31;         /* Secondary background */
  --panel: #11182b;         /* Panel background */
  --panel-2: #0f1526;      /* Secondary panel */
  --line: #283556;         /* Border color */
  --text: #e8eeff;         /* Text color */
  --muted: #9fb0d8;        /* Muted text */
  --accent: #59d4ff;       /* Primary accent */
  --accent-2: #7c8cff;     /* Secondary accent */
  --ok: #2dd4bf;           /* Success color */
}
```

### Component Styling Hierarchy
1. Global styles (`assets/css/styles.css`)
2. Converter-specific styles (`tools/converters/converters.css`)
3. Inline styles (rare, only for dynamic values)

## External Libraries Integration

### Current Implementation
- **No external libraries** - All conversions use vanilla JavaScript
- Benefits: Privacy (no data sent), Performance (instant), Simplicity

### Planned Libraries (for future converters)
- **js-yaml**: YAML parsing/stringifying
- **xml2js**: XML to JSON conversion
- **@iarna/toml**: TOML parsing
- **Babel standalone**: TypeScript/JSX transpilation

### Integration Pattern (for future use)
```html
<!-- Load libraries before main script -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>
<script src="assets/js/main.js"></script>
```

## Responsive Design

### Breakpoints
- Desktop: > 960px (full layouts)
- Tablet: 640-960px (2-column fallback)
- Mobile: < 640px (single column)

### Converter Grid System
```css
.converter-inputs { grid-template-columns: 1fr 1fr; }       /* default 2-col */
.converter-inputs-4 { grid-template-columns: repeat(4, 1fr); } /* 4 fields */
.converter-inputs-5 { grid-template-columns: auto repeat(4, 1fr); } /* color picker + 4 */

@media (max-width: 960px) {
  .converter-inputs-4 { grid-template-columns: repeat(2, 1fr); } /* 2x2 */
  .converter-inputs-5 { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 640px) {
  .converter-inputs, .converter-inputs-4, .converter-inputs-5 {
    grid-template-columns: 1fr; /* single column */
  }
}
```

## Error Handling Strategy

### Error Logging Policy
- **Log only errors**: Never log successful operations
- **Full context**: Include error details and relevant data
- **User feedback**: Display user-friendly error messages in UI

### Error Handling Pattern
```javascript
try {
  // Conversion logic
  output.value = convert(input);
} catch (error) {
  console.error('Conversion error:', error); // Log to console
  output.value = 'Error: ' + error.message; // Show to user
}
```

## Security Considerations

### Input Sanitization
- All user inputs are treated as untrusted
- No direct HTML injection from user input
- Text content only (no innerHTML with user data)

### XSS Prevention
- Use `textContent` instead of `innerHTML` for user data
- Escape special characters in CSV/JSON outputs
- Validate color format inputs with regex

### No Secrets
- No API keys or credentials in code
- No server-side processing
- All conversions client-side

## Performance Considerations

### Current Implementation
- Real-time conversions without debouncing (instant feedback)
- No external library dependencies
- Lightweight vanilla JavaScript

### Optimization Opportunities
1. **Debouncing**: Add for expensive conversions
2. **Lazy Loading**: Load complex converters on demand
3. **Web Workers**: Offload heavy processing to background

## Future Architecture Improvements

### Potential Enhancements
1. **Module System**: Use ES modules for better code organization
2. **State Management**: Implement simple state store
3. **Component Framework**: Consider Vue/React for complex UIs
4. **Build Process**: Add bundling and minification
5. **Testing**: Add unit and integration tests
6. **TypeScript**: Migrate to TypeScript for type safety

### Scalability Considerations
- Current architecture supports ~50 tools comfortably
- Beyond 100 tools, consider virtual scrolling
- For complex tools, separate into standalone pages
