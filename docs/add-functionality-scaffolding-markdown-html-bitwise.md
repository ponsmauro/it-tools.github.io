# SCAFFOLDING, MARKDOWN, HTML, and BITWISE Tools Documentation

## Feature Purpose and Goals

These four categories provide tools for project scaffolding, Markdown editing, HTML sanitization/formatting, and bitwise operations. All tools are embedded directly in the main dashboard.

### Goals:
1. Generate project structure templates
2. Edit and preview Markdown documents
3. Sanitize and format HTML code
4. Perform bitwise calculations
5. Maintain futuristic dark theme consistency

## SCAFFOLDING TOOLS

### Purpose
Generate project structure templates for common project types.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `project` | Project Scaffolder | Generate starter project files |

### Project Scaffolder Implementation

**UI Pattern**: Project type select, name input, generate button, file tree display.

**Supported Project Types**:

| Type | Files Generated |
|------|-----------------|
| Node.js | package.json, index.js, README.md |
| React | package.json, src/App.js, README.md |
| Python | main.py, requirements.txt, README.md |

**Generated package.json (Node.js)**:
```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

**Generated index.js**:
```javascript
console.log("Hello, World!");
```

**Features**:
- Live preview of generated files
- Syntax highlighted code blocks
- Copy-ready output

## MARKDOWN TOOLS

### Purpose
Edit Markdown documents and generate Markdown tables.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `editor` | Editor/Preview | Live Markdown editor with HTML preview |
| `table` | Table Generator | Generate Markdown tables from columns |

### Markdown Editor Implementation

**UI Pattern**: Split view with Markdown input and HTML preview.

**Supported Syntax**:
| Markdown | HTML Output |
|----------|-------------|
| `# H1`, `## H2`, `### H3` | `<h1>`, `<h2>`, `<h3>` |
| `**text**` | `<strong>text</strong>` |
| `*text*` | `<em>text</em>` |
| `` `code` `` | `<code>code</code>` |

**Basic Conversion Logic**:
```javascript
let md = input.value;
md = md.replace(/^### (.+)$/gm, '<h3>$1</h3>');
md = md.replace(/^## (.+)$/gm, '<h2>$1</h2>');
md = md.replace(/^# (.+)$/gm, '<h1>$1</h1>');
md = md.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
md = md.replace(/\*(.+?)\*/g, '<em>$1</em>');
md = md.replace(/`(.+?)`/g, '<code>$1</code>');
md = md.replace(/\n/g, '<br>');
preview.innerHTML = md;
```

**Features**:
- Real-time preview
- Basic syntax support
- Scrollable preview area

**Limitations**:
- Not a full Markdown parser
- No code block support
- No list support

### Table Generator Implementation

**UI Pattern**: Columns input, rows count, generate button, Markdown output.

**Input Format**:
```
Name, Age, City
```

**Generated Output**:
```markdown
| Name | Age | City |
| --- | --- | --- |
| Cell | Cell | Cell |
| Cell | Cell | Cell |
| Cell | Cell | Cell |
```

**Generation Logic**:
```javascript
const headers = cols.value.split(',').map(h => h.trim());
const sep = headers.map(() => '---');
let md = `| ${headers.join(' | ')} |\n| ${sep.join(' | ')} |`;
for (let i = 0; i < parseInt(rows.value); i++) {
  md += `\n| ${headers.map(() => 'Cell').join(' | ')} |`;
}
```

## HTML TOOLS

### Purpose
Sanitize HTML input and format HTML code.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `sanitizer` | Sanitizer | Remove potentially dangerous HTML |
| `formatter` | Formatter | Beautify HTML code |

### HTML Sanitizer Implementation

**UI Pattern**: HTML input textarea, sanitize button, sanitized output.

**Security Threats Blocked**:
| Threat | Pattern | Action |
|--------|---------|--------|
| Script tags | `<script>...</script>` | Removed |
| Event handlers | `onclick="..."` | Removed |
| JavaScript URLs | `javascript:` | Removed |

**Sanitization Logic**:
```javascript
let html = input.value;
html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
html = html.replace(/on\w+="[^"]*"/gi, '');
html = html.replace(/on\w+='[^']*'/gi, '');
html = html.replace(/javascript:/gi, '');
```

**Use Cases**:
- Cleaning user-submitted HTML
- Removing XSS vectors
- Preparing HTML for safe display

### HTML Formatter Implementation

**UI Pattern**: HTML input textarea, format button, formatted output.

**Basic Formatting Logic**:
```javascript
let html = input.value;
html = html.replace(/>\s+</g, '><');  // Remove whitespace between tags
html = html.replace(/\s+/g, ' ');      // Collapse whitespace
html = html.trim();
```

**Features**:
- Single-click formatting
- Copy to clipboard
- Syntax highlighting in output

**Limitations**:
- Basic formatting only
- No proper indentation
- No attribute sorting

## BITWISE TOOLS

### Purpose
Perform bitwise operations between numbers.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `calculator` | Calculator | Execute bitwise operations |

### Bitwise Calculator Implementation

**UI Pattern**: Two number inputs, operation select, result display.

**Supported Operations**:

| Operator | Symbol | Description | Example |
|----------|--------|-------------|---------|
| AND | `&` | Bitwise AND | 5 & 3 = 1 |
| OR | `\|` | Bitwise OR | 5 \| 3 = 7 |
| XOR | `^` | Bitwise XOR | 5 ^ 3 = 6 |
| Left Shift | `<<` | Shift left | 5 << 1 = 10 |
| Right Shift | `>>` | Shift right | 5 >> 1 = 2 |
| NOT | `~` | Bitwise NOT | ~5 = -6 |

**Operation Logic**:
```javascript
const aVal = parseInt(a.value) || 0;
const bVal = parseInt(b.value) || 0;

if (op.value === '~') {
  res = ~aVal;           // Unary NOT
} else if (op.value === '<<') {
  res = aVal << bVal;    // Left shift
} else if (op.value === '>>') {
  res = aVal >> bVal;    // Right shift
} else {
  res = eval(`${aVal} ${op.value} ${bVal}`);  // AND, OR, XOR
}
```

**Result Display**:
| Format | Example |
|--------|---------|
| Decimal | 5 |
| Binary | 101 |
| Hexadecimal | 0x5 |

**Binary Conversion**:
```javascript
(res >>> 0).toString(2)   // Binary
(res >>> 0).toString(16)  // Hexadecimal
```

**Note**: `>>> 0` ensures unsigned 32-bit representation.

## Bitwise Reference

### Truth Tables

**AND (&)**:
| A | B | A & B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

**OR (|)**:
| A | B | A \| B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

**XOR (^)**:
| A | B | A ^ B |
|---|---|-------|
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

### Common Use Cases

| Operation | Use Case |
|-----------|----------|
| `x & 1` | Check if odd |
| `x & (x-1)` | Clear lowest set bit |
| `x \| ~0` | Sign extension |
| `x ^ x` | Clear register |
| `x << n` | Multiply by 2^n |
| `x >> n` | Divide by 2^n |

## Implementation Patterns

### Tab Registration

```javascript
const markdownToolsTabs = {
  'editor': { render: renderMarkdownEditor, setup: setupMarkdownEditorListeners },
  'table': { render: renderMarkdownTable, setup: setupMarkdownTableListeners }
};

const htmlToolsTabs = {
  'sanitizer': { render: renderHtmlSanitizer, setup: setupHtmlSanitizerListeners },
  'formatter': { render: renderHtmlFormatterTool, setup: setupHtmlFormatterToolListeners }
};

const bitwiseToolsTabs = {
  'calculator': { render: renderBitwiseCalculator, setup: setupBitwiseCalculatorListeners }
};
```

### Catalog Data

```javascript
window.MARKDOWN_TOOLS_CATALOG = [
  { tabId: "editor", tabName: "Editor/Preview" },
  { tabId: "table", tabName: "Table Generator" }
];

window.HTML_TOOLS_CATALOG = [
  { tabId: "sanitizer", tabName: "Sanitizer" },
  { tabId: "formatter", tabName: "Formatter" }
];

window.BITWISE_TOOLS_CATALOG = [
  { tabId: "calculator", tabName: "Calculator" }
];
```

## Current Status

### Implemented:
- [x] Project scaffolder for Node.js, React, Python
- [x] Markdown editor with live preview
- [x] Markdown table generator
- [x] HTML sanitizer removing XSS vectors
- [x] HTML formatter
- [x] Bitwise calculator with 6 operations
- [x] Binary/Hex output display
- [x] All tabs navigation working

### Browser APIs Used:
- None (pure JavaScript calculations)

### External Dependencies:
- None

### Limitations:
- Markdown editor is basic (no full parser)
- HTML formatter lacks proper indentation
- Project scaffolder is template-based only
