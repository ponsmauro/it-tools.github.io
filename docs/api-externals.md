# External APIs - IT Tools Dashboard

## Overview

The IT Tools Dashboard is primarily a client-side application with minimal external dependencies. Most functionality is implemented using vanilla JavaScript running in the browser. External dependencies are limited to CDN-hosted libraries for specific conversion tasks.

## External Libraries

### 1. js-yaml
**Purpose**: YAML parsing and stringifying

**CDN URL**: https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js

**Version**: 4.1.0

**Usage**:
```javascript
// Parse YAML to JSON
const yaml = jsyaml.load(yamlString);

// Dump JSON to YAML
const yamlString = jsyaml.dump(jsonObject, { indent: 2 });
```

**Used By**: JSON ↔ YAML converter

**API Contract**:
- `jsyaml.load(str, options)` - Parse YAML string to JavaScript object
- `jsyaml.dump(obj, options)` - Convert JavaScript object to YAML string

**Options**:
- `indent`: Number of spaces for indentation (default: 2)
- `lineWidth`: Maximum line width (default: 80)
- `noRefs`: Don't use anchors/aliases (default: false)

### 2. xml2js
**Purpose**: XML to JSON conversion and vice versa

**CDN URL**: https://cdnjs.cloudflare.com/ajax/libs/xml2js/0.4.23/xml2js.min.js

**Version**: 0.4.23

**Usage**:
```javascript
// Parse XML to JSON
xml2js.parseString(xmlString, options, (err, result) => {
  if (err) throw err;
  // result is JSON object
});

// Convert JSON to XML
const builder = new xml2js.Builder(options);
const xmlString = builder.buildObject(jsonObject);
```

**Used By**: XML ↔ JSON converter

**API Contract**:
- `xml2js.parseString(str, options, callback)` - Parse XML string to JSON
- `new xml2js.Builder(options)` - Create XML builder
- `builder.buildObject(obj)` - Convert JSON object to XML string

**Options**:
- `explicitArray`: Always wrap elements in arrays (default: false)
- `mergeAttrs`: Merge attributes into properties (default: false)
- `ignoreAttrs`: Ignore all attributes (default: false)
- `trim`: Trim whitespace in text nodes (default: false)

### 3. @iarna/toml
**Purpose**: TOML parsing and stringifying

**CDN URL**: https://cdn.jsdelivr.net/npm/@iarna/toml@2.2.5/dist/toml.min.js

**Version**: 2.2.5

**Usage**:
```javascript
// Parse TOML to JSON
const json = toml.parse(tomlString);

// Convert JSON to TOML
const tomlString = toml.stringify(jsonObject);
```

**Used By**: TOML ↔ JSON converter

**API Contract**:
- `toml.parse(str)` - Parse TOML string to JavaScript object
- `toml.stringify(obj)` - Convert JavaScript object to TOML string

**Limitations**:
- Does not support all TOML 1.0 features
- May have issues with complex nested structures

### 4. Babel Standalone
**Purpose**: TypeScript and JSX transpilation to JavaScript

**CDN URL**: https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.23.5/babel.min.js

**Version**: 7.23.5

**Usage**:
```javascript
// Transpile TypeScript/JSX to JavaScript
const result = Babel.transform(code, {
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
});
const jsCode = result.code;
```

**Used By**: TS/JSX → JS transpiler

**API Contract**:
- `Babel.transform(code, options)` - Transform code string
- `Babel.transformSync(code, options)` - Synchronous version

**Presets**:
- `@babel/preset-env`: Transpile ES6+ to ES5
- `@babel/preset-react`: Transform JSX to JavaScript
- `@babel/preset-typescript`: Strip TypeScript types

**Options**:
- `presets`: Array of Babel presets to use
- `plugins`: Array of Babel plugins
- `filename`: Virtual filename for source maps

## Browser APIs Used

### 1. Intl.DateTimeFormat
**Purpose**: Timezone-aware date formatting

**Usage**:
```javascript
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'short'
});
const formatted = formatter.format(date);
```

**Used By**: Zonas horarias converter

**Browser Support**: All modern browsers

### 2. Web Crypto API (Partial)
**Purpose**: Cryptographic key operations (not fully implemented)

**Status**: Basic PEM/DER conversion implemented using base64 encoding

**Future Enhancement**: Full JWK conversion using `window.crypto.subtle`

## No Server-Side APIs

The application does not use any server-side APIs or external services. All conversions happen client-side in the browser.

## CDN Usage Policy

### CDN Selection Criteria
1. **Reliability**: Use well-established CDNs (cdnjs, jsDelivr)
2. **Performance**: Choose CDNs with good global coverage
3. **Version Pinning**: Always use specific versions (not latest)
4. **HTTPS Only**: All CDNs must support HTTPS

### Fallback Strategy
If CDN libraries fail to load:
- Show user-friendly error message
- Disable affected converters
- Log error to console

## Data Privacy

### No Data Transmission
- All conversions happen in the browser
- No data sent to external servers
- User data never leaves their device

### Local Processing
- All parsing and conversion logic runs locally
- No server-side processing
- No analytics or tracking

## Future External Dependencies

### Potential Additions
1. **Prettier**: Code formatting tools
2. **ESLint**: Code linting playground
3. **JSON Schema Validator**: Schema validation
4. **QR Code Generator**: QR code generation
5. **Diff Libraries**: Text and JSON diffing

### Integration Guidelines
- Always use CDN-hosted libraries
- Pin to specific versions
- Provide fallback for failed loads
- Document API contracts
- Test browser compatibility

## API Version Management

### Current Versions
- js-yaml: 4.1.0
- xml2js: 0.4.23
- @iarna/toml: 2.2.5
- Babel standalone: 7.23.5

### Update Process
1. Test new version in development
2. Check for breaking changes
3. Update CDN URL and version
4. Test all affected converters
5. Update documentation

### Deprecation Policy
- Support current and previous major versions
- Provide migration guide for breaking changes
- Deprecate with at least 3 months notice
