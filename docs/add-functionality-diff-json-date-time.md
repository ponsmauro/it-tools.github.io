# DIFF, JSON, DATE, and TIME Tools Documentation

## Feature Purpose and Goals

These four categories provide specialized tools for comparing data, working with JSON structures, handling dates, and managing timezones. All tools are embedded directly in the main dashboard.

### Goals:
1. Provide comparison and diffing capabilities
2. JSON tree visualization and schema validation
3. Date arithmetic and Unix timestamp conversion
4. Timezone conversion between world regions
5. Maintain futuristic dark theme consistency

## Architecture

### Integration Model

Each category follows the standard embedded panel pattern:

```
┌─────────────────────────────────────────────────────────┐
│                     Main Dashboard                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────────────────────┐   │
│  │   Sidebar    │  │      Tools Panel             │   │
│  │  (Categories)│  │  (Embedded in dashboard)     │   │
│  └──────────────┘  └──────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Key Files

| File | Purpose |
|------|---------|
| `index.html` | Contains panel divs for all tools |
| `assets/js/main.js` | Render functions, setup listeners, tab registries |
| `tools/converters/converters-data.js` | Catalog metadata (Xxx_CATALOG arrays) |

## DIFF TOOLS

### Purpose
Compare text and JSON objects to identify differences.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `text` | Text Diff | Line-by-line comparison of two text inputs |
| `json` | JSON Diff | Property-by-property comparison of JSON objects |

### Text Diff Implementation

**UI Pattern**: Two side-by-side textareas with diff output below.

**Algorithm**:
1. Split inputs by newlines
2. Compare line-by-line
3. Color-coded output:
   - Green (`#90ee90`): Added lines (`+`)
   - Red (`#ff6b6b`): Removed lines (`-`)
   - Gray (`#888`): Unchanged lines

**Code Structure**:
```javascript
function renderTextDiff() {
  const workspace = document.getElementById("diffToolsWorkspace");
  workspace.innerHTML = `<div class="converter-container">
    <div class="converter-inputs">
      <div class="input-group" style="flex:1;">
        <label>Original</label>
        <textarea id="diffOriginal" class="converter-textarea"></textarea>
      </div>
      <div class="input-group" style="flex:1;">
        <label>Modified</label>
        <textarea id="diffModified" class="converter-textarea"></textarea>
      </div>
    </div>
    <div id="diffResult"></div>
  </div>`;
}
```

### JSON Diff Implementation

**UI Pattern**: Two JSON input areas with diff output.

**Algorithm**:
1. Parse both inputs as JSON
2. Compare keys recursively
3. Display differences by path:
   - `+ key: value` - Added in second object
   - `- key: value` - Removed from first object
   - `~ key: old → new` - Changed value

**Code Structure**:
```javascript
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
```

## JSON TOOLS

### Purpose
Visualize JSON structures and validate against schemas.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `tree` | Tree Viewer | Interactive tree view of JSON structure |
| `schema` | Schema Validator | Validate JSON against JSON Schema |

### Tree Viewer Implementation

**UI Pattern**: JSON input textarea with tree visualization below.

**Features**:
- Parse JSON and render as expandable tree
- Show data types (string, number, boolean, null, object, array)
- Highlight nested structures

### Schema Validator Implementation

**UI Pattern**: Two textareas - one for JSON, one for Schema.

**Implementation**:
- Uses js-yaml library for YAML support
- Validates JSON structure against schema rules
- Reports validation errors with paths

## DATE TOOLS

### Purpose
Calculate date differences and convert Unix timestamps.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `difference` | Difference | Calculate time between two dates |
| `unix` | Unix Converter | Convert between Unix timestamps and dates |

### Date Difference Implementation

**UI Pattern**: Two datetime inputs with difference output.

**Calculations**:
- Years, months, days difference
- Total days difference
- Human-readable format

### Unix Converter Implementation

**UI Pattern**: Input field with multiple format outputs.

**Conversions**:
- Unix timestamp (seconds)
- Unix timestamp (milliseconds)
- ISO 8601 format
- Local datetime
- UTC datetime

## TIME TOOLS

### Purpose
Convert times between different timezones.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `timezone` | Timezone | Convert time between world timezones |

### Timezone Converter Implementation

**UI Pattern**: Source/target timezone selects with datetime input.

**Browser API**:
```javascript
Intl.supportedValuesOf('timeZone')  // Get all supported timezones
Intl.DateTimeFormat('en-US', { timeZone: tz, dateStyle: 'full', timeStyle: 'long' })
```

**Features**:
- Lists all IANA timezones
- Real-time conversion as inputs change
- Full datetime display with timezone name

## Implementation Patterns

### Tab Registration

```javascript
const diffToolsTabs = {
  'text': { render: renderTextDiff, setup: setupTextDiffListeners },
  'json': { render: renderJsonDiff, setup: setupJsonDiffListeners }
};
```

### Catalog Data

```javascript
window.DIFF_TOOLS_CATALOG = [
  { tabId: "text", tabName: "Text Diff" },
  { tabId: "json", tabName: "JSON Diff" }
];
```

## Current Status

### Implemented:
- [x] Text Diff with line-by-line comparison
- [x] JSON Diff with recursive comparison
- [x] JSON Tree Viewer (basic)
- [x] JSON Schema Validator
- [x] Date Difference calculator
- [x] Unix Timestamp converter
- [x] Timezone converter with IANA zones
- [x] All tabs navigation working
- [x] Futuristic dark theme styling

### Browser APIs Used:
- `Intl.DateTimeFormat` - Timezone formatting
- `Intl.supportedValuesOf` - List timezones
- `JSON.parse` - JSON parsing for diffing

### External Dependencies:
- js-yaml (for JSON Schema validation)
