# IT Tools Dashboard

A collection of useful tools for developers and IT professionals, featuring converters, formatters, and utilities with a futuristic dark theme interface.

## Features

### Converters
A comprehensive suite of conversion tools organized into 11 tabs:
- **Dates**: Date format conversions with auto-detect
- **Time**: Timestamp and timezone conversions
- **Number Bases**: Binary, Decimal, Hexadecimal, Octal conversions
- **Colors**: Color picker with HEX, RGB, HSL, HSV formats
- **JSON/YAML**: Convert between JSON and YAML formats
- **JSON/CSV**: Convert between JSON arrays and CSV
- **XML/JSON**: Convert between XML and JSON formats
- **TOML/JSON**: Convert between TOML and JSON formats
- **Units**: Bytes, Time, Length, Weight conversions
- **Crypto Keys**: Cryptographic key format conversions
- **Code**: ESM/CommonJS, TypeScript/JavaScript conversions

All converters feature real-time updates with compact, efficient interfaces.

## Virtues

### Privacy First
- All conversions happen locally in your browser
- No data is sent to any server
- Your input never leaves your device

### Fast & Responsive
- Real-time conversion updates
- Instant feedback as you type
- No loading times or network requests

### Modern Design
- Futuristic dark theme with accent colors
- Clean, minimalist interface
- Fully responsive for mobile, tablet, and desktop

### Zero Dependencies (Core)
- Built with vanilla HTML, CSS, and JavaScript
- Optional CDN libraries for advanced parsing (YAML, XML, TOML, TypeScript)
- Lightweight and fast loading

### Easy to Use
- Intuitive tab-based navigation
- Consistent UI patterns across all tools
- Auto-detect input formats when possible

## Tech Stack

- **HTML5**: Semantic markup
- **CSS3**: Custom properties, Grid, Flexbox, Responsive design
- **JavaScript (ES6+)**: Vanilla JS, no frameworks

## Project Structure

```
├── index.html                 # Main dashboard
├── assets/
│   ├── css/
│   │   └── styles.css        # Global styles
│   └── js/
│       ├── main.js           # Dashboard logic & converters
│       └── tools-data.js     # Tools catalog
├── tools/
│   └── converters/
│       ├── converters.css    # Converter-specific styles
│       └── converters-data.js # Converter tabs catalog
├── docs/                      # Documentation
│   ├── architecture.md       # System architecture
│   ├── add-functionality-convert.md # Converters feature docs
│   └── ...
└── README.md
```

## Documentation

- [Architecture Overview](docs/architecture.md)
- [Dependencies](docs/dependencies.md)
- [Data Models](docs/data-models.md)
- [External APIs](docs/api-externals.md)

## Getting Started

Simply open `index.html` in any modern browser. No build process or installation required.

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Requires JavaScript enabled.
