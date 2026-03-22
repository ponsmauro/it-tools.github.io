# STORAGE, FILE, CI/CD, and CODE QUALITY Tools Documentation

## Feature Purpose and Goals

These four categories provide tools for browser storage inspection, file operations, CI/CD workflows, and code quality improvement. All tools are embedded directly in the main dashboard.

### Goals:
1. Inspect and manage browser storage (localStorage, cookies)
2. File checksum comparison and CSV transformation
3. YAML validation and GitHub Actions generation
4. Code linting and formatting playgrounds
5. Maintain futuristic dark theme consistency

## STORAGE TOOLS

### Purpose
Inspect and manage browser storage mechanisms.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `localstorage` | localStorage | View, edit, and delete localStorage items |
| `cookies` | Cookies | View cookies for current domain |

### localStorage Inspector Implementation

**UI Pattern**: Item list with delete buttons, add/edit form below.

**Browser API**:
```javascript
// Read all
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);
}

// Write
localStorage.setItem(key, value);

// Delete
localStorage.removeItem(key);
localStorage.clear();
```

**Features**:
- List all localStorage items
- Delete individual items
- Clear all items (with confirmation)
- Add new items with key/value

**Security Note**: localStorage is origin-specific (same domain/policy).

### Cookies Viewer Implementation

**UI Pattern**: Cookie list display with refresh button.

**Browser API**:
```javascript
document.cookie  // Returns "; key1=value1; key2=value2"
```

**Limitations**:
- Can only read cookies accessible to current domain
- Cannot set cookies via JavaScript (document.cookie only appends)
- HttpOnly cookies are never visible

## FILE TOOLS

### Purpose
Compare file checksums and transform CSV data.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `checksum` | Checksum Comparator | Compare SHA-256 hashes of two files |
| `csv` | CSV Mapper | Transform CSV columns using mapping rules |

### Checksum Comparator Implementation

**UI Pattern**: Two file inputs with hash display and comparison result.

**Browser API**:
```javascript
const buffer = await file.arrayBuffer();
const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
const hash = Array.from(new Uint8Array(hashBuffer))
  .map(b => b.toString(16).padStart(2, '0'))
  .join('');
```

**Features**:
- File upload via `<input type="file">`
- SHA-256 hash computation using Web Crypto API
- Visual match/mismatch indicator
- Large file support (streaming)

### CSV Mapper Implementation

**UI Pattern**: Input CSV textarea, mapping JSON textarea, transform button, result table.

**Input Format**:
```csv
name,age,city
John,30,NYC
Jane,25,LA
```

**Mapping Format** (JSON):
```json
{"name": "Name", "age": "Age", "city": "City"}
```

**Transformation**:
- Parses CSV into headers and rows
- Applies column renaming via mapping
- Renders as HTML table

## CI/CD TOOLS

### Purpose
Validate YAML files and generate GitHub Actions workflows.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `yaml` | YAML Validator | Parse and validate YAML syntax |
| `github-actions` | GitHub Actions | Generate workflow YAML from parameters |

### YAML Validator Implementation

**UI Pattern**: YAML input textarea with validate button and result.

**External Library**: js-yaml (loaded from CDN)

**Browser API**:
```javascript
const parsed = jsyaml.load(yamlString);  // Returns JS object
```

**Features**:
- Syntax validation with error messages
- Pretty-print parsed JSON output
- Real-time validation on input

**Error Display**:
```javascript
try {
  const parsed = jsyaml.load(input.value);
  result.innerHTML = '<span style="color:#90ee90;">Valid YAML</span>';
} catch (e) {
  result.innerHTML = `<span style="color:#ff6b6b;">Invalid YAML: ${e.message}</span>`;
}
```

### GitHub Actions Generator Implementation

**UI Pattern**: Form fields for workflow configuration with generate button.

**Configuration Options**:
| Field | Options |
|-------|---------|
| Workflow Name | Text input |
| Trigger Event | push, pull_request, schedule, workflow_dispatch |
| Job Name | Text input |

**Generated Output**:
```yaml
name: My Workflow
on: push
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: echo "Hello World"
```

**Features**:
- Copy to clipboard
- YAML formatting with proper indentation

## CODE QUALITY TOOLS

### Purpose
Lint JavaScript code and format code with configurable options.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `eslint` | ESLint Playground | Basic JavaScript linting |
| `prettier` | Prettier Playground | Code formatting with options |

### ESLint Playground Implementation

**UI Pattern**: JavaScript code input with lint results below.

**Rules Implemented** (basic):
| Rule | Severity | Description |
|------|----------|-------------|
| `no-console` | warn | Unexpected console statement |
| `semi` | error | Missing semicolon |
| `quotes` | error | Must use single quotes |

**Features**:
- Real-time linting as you type
- Color-coded severity (error: red, warn: orange)
- Rule name and message display

**Limitations**:
- Basic regex-based linting (not full ESLint)
- No configuration options
- Limited rule set

### Prettier Playground Implementation

**UI Pattern**: Input code, output code (readonly), formatting options.

**Options**:
| Option | Default | Description |
|--------|---------|-------------|
| Print Width | 80 | Max line length |
| Tab Width | 2 | Spaces per indentation level |

**Basic Formatting Logic**:
```javascript
let result = input.value;
result = result.replace(/\s+/g, ' ');           // Collapse whitespace
result = result.replace(/\s*,\s*/g, ', ');      // Normalize commas
result = result.replace(/\s*\{\s*/g, ' { ');     // Space around braces
result = result.replace(/\s*\}\s*/g, ' } ');     // Space around braces
result = result.replace(/\s*;\s*/g, ';\n');     // Semicolons + newlines
let lines = result.split('\n');
lines = lines.map(line => ' '.repeat(tw) + line.trim());
output.value = lines.join('\n');
```

**Features**:
- Real-time formatting
- Adjustable indentation
- Readonly output (copy manually)

**Limitations**:
- Basic formatting only (not full Prettier)
- No quote style options
- No semicolon handling

## Implementation Patterns

### Tab Registration

```javascript
const storageToolsTabs = {
  'localstorage': { render: renderLocalStorage, setup: setupLocalStorageListeners },
  'cookies': { render: renderCookies, setup: setupCookiesListeners }
};
```

### Catalog Data

```javascript
window.STORAGE_TOOLS_CATALOG = [
  { tabId: "localstorage", tabName: "localStorage" },
  { tabId: "cookies", tabName: "Cookies" }
];

window.FILE_TOOLS_CATALOG = [
  { tabId: "checksum", tabName: "Checksum Comparator" },
  { tabId: "csv", tabName: "CSV Mapper" }
];
```

## Current Status

### Implemented:
- [x] localStorage inspector with CRUD operations
- [x] Cookies viewer for current domain
- [x] File checksum comparator with SHA-256
- [x] CSV mapper with column renaming
- [x] YAML validator with error display
- [x] GitHub Actions workflow generator
- [x] Basic ESLint playground
- [x] Basic Prettier playground
- [x] All tabs navigation working

### Browser APIs Used:
- `localStorage` - Browser storage
- `document.cookie` - Cookie access
- `crypto.subtle.digest()` - SHA-256 hashing
- `FileReader` - File input handling

### External Dependencies:
- js-yaml (for YAML validation)
- None for other tools (use native browser APIs)

### Limitations:
- Cookies viewer cannot set cookies
- ESLint/Prettier are basic implementations
- SHA-256 requires modern browser (Web Crypto API)
