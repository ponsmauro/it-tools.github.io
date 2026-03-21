# Data Models - IT Tools Dashboard

## Overview

The IT Tools Dashboard uses simple JavaScript objects and arrays to manage data. No complex databases or ORM systems are used. All data is stored in JavaScript files and loaded at runtime.

## Core Data Structures

### 1. Tools Catalog (`assets/js/tools-data.js`)

#### Structure
```javascript
window.TOOLS_CATALOG = [
  {
    category: "CONVERTERS",
    tools: [
      "JSON ↔ YAML",
      "JSON ↔ CSV",
      // ... more tools
    ]
  },
  // ... more categories
];
```

#### Fields
- `category` (string): Name of the tool category
- `tools` (array of strings): List of tool names in this category

#### Usage
```javascript
// Access all categories
const catalog = window.TOOLS_CATALOG;

// Find specific category
const converters = catalog.find(c => c.category === "CONVERTERS");

// Get tool names
const toolNames = converters.tools;
```

### 2. Converters Catalog (`tools/converters/converters-data.js`)

#### Structure
```javascript
window.CONVERTERS_CATALOG = [
  {
    tabId: "data-formats",
    tabName: "Data Formats",
    converters: [
      {
        id: "json-yaml",
        name: "JSON ↔ YAML",
        description: "Convert between JSON and YAML formats"
      },
      // ... more converters
    ]
  },
  // ... more tabs
];
```

#### Fields
- `tabId` (string): Unique identifier for the tab (used in URLs and IDs)
- `tabName` (string): Display name of the tab
- `converters` (array of objects): List of converters in this tab
  - `id` (string): Unique converter identifier
  - `name` (string): Display name of the converter
  - `description` (string): Brief description of converter functionality

#### Usage
```javascript
// Access all tabs
const tabs = window.CONVERTERS_CATALOG;

// Find specific tab
const dataFormatsTab = tabs.find(t => t.tabId === "data-formats");

// Get converter by ID
const jsonYaml = dataFormatsTab.converters.find(c => c.id === "json-yaml");
```

## Converter Data Models

### 1. JSON ↔ YAML Converter

#### Input Format (JSON)
```json
{
  "name": "John Doe",
  "age": 30,
  "active": true,
  "hobbies": ["reading", "coding"]
}
```

#### Output Format (YAML)
```yaml
name: John Doe
age: 30
active: true
hobbies:
  - reading
  - coding
```

### 2. JSON ↔ CSV Converter

#### Input Format (JSON Array)
```json
[
  {
    "name": "John",
    "age": 30,
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": 25,
    "city": "London"
  }
]
```

#### Output Format (CSV)
```csv
name,age,city
John,30,New York
Jane,25,London
```

### 3. XML ↔ JSON Converter

#### Input Format (XML)
```xml
<root>
  <person>
    <name>John Doe</name>
    <age>30</age>
  </person>
</root>
```

#### Output Format (JSON)
```json
{
  "root": {
    "person": {
      "name": "John Doe",
      "age": "30"
    }
  }
}
```

### 4. Unix Timestamp Converter

#### Input Formats
```javascript
// Unix timestamp (seconds)
1234567890

// Date/Time (ISO 8601)
"2024-01-15T10:30:00.000Z"

// Date/Time (local)
"2024-01-15T10:30"
```

#### Output Formats
```javascript
{
  timestamp: 1234567890,
  iso8601: "2024-01-15T10:30:00.000Z",
  utc: "Fri, 15 Jan 2024 10:30:00 GMT",
  local: "1/15/2024, 10:30:00 AM"
}
```

### 5. Color Converter

#### Input Formats
```javascript
// HEX
"#FF5733"
"#F53"

// RGB
"rgb(255, 87, 51)"
"rgba(255, 87, 51, 0.5)"

// HSL
"hsl(11, 100%, 60%)"
"hsla(11, 100%, 60%, 0.5)"

// HSV
"hsv(11, 80%, 100%)"
```

#### Output Model
```javascript
{
  hex: "#FF5733",
  rgb: { r: 255, g: 87, b: 51 },
  hsl: { h: 11, s: 100, l: 60 },
  hsv: { h: 11, s: 80, v: 100 }
}
```

### 6. Units Converter

#### Input Model
```javascript
{
  type: "bytes",  // or "time", "length", "weight"
  from: 0,        // index in unit options array
  to: 2,          // index in unit options array
  value: 1024     // numeric value to convert
}
```

#### Unit Options
```javascript
{
  bytes: ['Bytes (B)', 'Kilobytes (KB)', 'Megabytes (MB)', 'Gigabytes (GB)', 'Terabytes (TB)'],
  time: ['Seconds (s)', 'Minutes (min)', 'Hours (h)', 'Days (d)'],
  length: ['Meters (m)', 'Kilometers (km)', 'Miles (mi)', 'Feet (ft)'],
  weight: ['Kilograms (kg)', 'Grams (g)', 'Pounds (lb)', 'Ounces (oz)']
}
```

#### Conversion Factors
```javascript
{
  bytes: [1, 1024, 1024*1024, 1024*1024*1024, 1024*1024*1024*1024],
  time: [1, 60, 3600, 86400],
  length: [1, 1000, 1609.344, 0.3048],
  weight: [1, 0.001, 0.453592, 0.0283495]
}
```

### 7. Number Bases Converter

#### Input Model
```javascript
{
  decimal: "255",
  binary: "11111111",
  hex: "FF",
  octal: "377"
}
```

#### Conversion Logic
```javascript
// Decimal to others
parseInt("255", 10).toString(2)  // "11111111"
parseInt("255", 10).toString(16) // "ff"
parseInt("255", 10).toString(8)  // "377"

// Binary to others
parseInt("11111111", 2).toString(10) // "255"
parseInt("11111111", 2).toString(16) // "ff"
parseInt("11111111", 2).toString(8)  // "377"
```

### 8. CommonJS ↔ ESM Converter

#### Input Format (CommonJS)
```javascript
const express = require('express');
const { Router } = require('express');
const app = express();

module.exports = app;
exports.router = Router;
```

#### Output Format (ESM)
```javascript
import express from 'express';
import { Router } from 'express';
const app = express();

export default app;
export const router = Router;
```

### 9. JSON Schema → TypeScript Interfaces

#### Input Format (JSON Schema)
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "age": {
      "type": "integer"
    },
    "email": {
      "type": "string"
    }
  },
  "required": ["name", "email"]
}
```

#### Output Format (TypeScript Interfaces)
```typescript
interface Root {
  name: string;
  age?: number;
  email: string;
}
```

### 10. TS/JSX → JS Transpiler

#### Input Format (TypeScript/JSX)
```typescript
interface User {
  name: string;
  age: number;
}

const user: User = { name: "John", age: 30 };

function Greeting({ name }: User) {
  return <h1>Hello, {name}!</h1>;
}
```

#### Output Format (JavaScript)
```javascript
"use strict";

const user = { name: "John", age: 30 };

function Greeting(_ref) {
  let name = _ref.name;
  return /*#__PURE__*/React.createElement("h1", null, "Hello, ", name, "!");
}
```

## State Management Models

### Dashboard State
```javascript
{
  activeCategory: "CONVERTERS"  // Currently selected category
}
```

### Converter State
```javascript
{
  currentTabId: "data-formats",     // Currently selected tab
  currentConverterId: "json-yaml",   // Currently selected converter
  direction: "json-to-yaml"         // Conversion direction (for bidirectional)
}
```

## Error Data Models

### Error Response
```javascript
{
  success: false,
  error: {
    message: "Invalid JSON syntax",
    details: "Unexpected token at line 5, column 12"
  }
}
```

### Error Display
```javascript
// User-facing error message
"Error: Invalid JSON syntax"

// Console error (with full context)
console.error('Conversion error:', error);
```

## Slug Generation Model

### Slugify Function
```javascript
function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")  // Remove diacritics
    .replace(/[^a-z0-9]+/g, "-")       // Replace non-alphanumeric with dash
    .replace(/^-+|-+$/g, "");          // Remove leading/trailing dashes
}
```

### Examples
```javascript
slugify("JSON ↔ YAML")        // "json-yaml"
slugify("Unix timestamp ↔ fecha")  // "unix-timestamp-fecha"
slugify("TS/JSX → JS transpiler")  // "ts-jsx-js-transpiler"
```

## URL Structure Models

### Tool Page URLs
```
/tools/{tool-slug}/index.html
```

### Examples
```
/tools/json-yaml/index.html
/tools/unix-timestamp/index.html
/tools/colors/index.html
```

## Data Validation Models

### Color Format Validation
```javascript
// HEX validation
/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/

// RGB validation
/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/

// HSL validation
/^hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)$/

// HSV validation
/^hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)$/
```

### Number Base Validation
```javascript
// Decimal
/^[0-9]+$/

// Binary
/^[01]+$/

// Hexadecimal
/^[0-9A-Fa-f]+$/

// Octal
/^[0-7]+$/
```

## Storage Models

### Local Storage (Future Enhancement)
```javascript
// Save user preferences
localStorage.setItem('converter-preferences', JSON.stringify({
  defaultTab: 'data-formats',
  defaultConverter: 'json-yaml',
  theme: 'dark'
}));

// Load user preferences
const prefs = JSON.parse(localStorage.getItem('converter-preferences'));
```

## Performance Data Models

### Conversion Metrics (Future Enhancement)
```javascript
{
  converterId: "json-yaml",
  inputSize: 1024,        // bytes
  outputSize: 856,         // bytes
  conversionTime: 12,      // milliseconds
  timestamp: 1705334400000  // Unix timestamp
}
```

## Data Flow Models

### User Input → Conversion → Output
```
User Input
    ↓
Validation
    ↓
Conversion Logic
    ↓
Error Handling
    ↓
Output Display
```

### Tab Selection → Converter Loading
```
User clicks tab
    ↓
Update currentTabId
    ↓
Render converter list
    ↓
User selects converter
    ↓
Update currentConverterId
    ↓
Render converter workspace
    ↓
Attach event listeners
