# SCHEDULING, NETWORK, HTTP, and WEBSOCKET Tools Documentation

## Feature Purpose and Goals

These four categories provide tools for task scheduling, network utilities, HTTP operations, and WebSocket communication. All tools are embedded directly in the main dashboard.

### Goals:
1. Cron expression parsing and generation
2. Network calculations and lookups
3. HTTP request testing and header inspection
4. WebSocket client functionality
5. Maintain futuristic dark theme consistency

## SCHEDULING TOOLS

### Purpose
Parse and generate cron expressions for task scheduling.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `cron-parser` | Cron Parser | Parse and validate cron expressions |
| `cron-generator` | Cron Generator | Generate cron expressions from options |

### Cron Parser Implementation

**UI Pattern**: Cron input field with field breakdown and execution check.

**Cron Format**: `minute hour day-of-month month day-of-week`

**Fields**:
| Field | Values | Special |
|-------|--------|---------|
| Minute | 0-59 | `*`, `*/n`, `n,n` |
| Hour | 0-23 | `*`, `*/n`, `n,n` |
| Day of Month | 1-31 | `*`, `*/n`, `n,n` |
| Month | 1-12 | `*`, `*/n`, `n,n` |
| Day of Week | 0-6 | `*`, `1-5` (weekdays) |

**Validation Logic**:
```javascript
const parts = cron.split(/\s+/);
if (parts.length !== 5) { /* invalid */ }
const [min, hour, day, month, dow] = parts;
```

### Cron Generator Implementation

**UI Pattern**: Dropdown selects for each field with live cron preview.

**Options**:
- Minute: Every minute, At minute 0, Every 5/10/15/30 minutes
- Hour: Every hour, At midnight, At 9 AM, At noon, At 6 PM
- Day of Month: Every day, 1st, 15th
- Month: Every month, January, June
- Day of Week: Every day, Weekdays, Weekends

## NETWORK TOOLS

### Purpose
Perform DNS lookups, subnet calculations, and CIDR operations.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `dns` | DNS Lookup | Simulated DNS record lookup |
| `subnet` | Subnet Calculator | Calculate network/broadcast addresses |
| `cidr` | CIDR Tool | Analyze CIDR notation |

### DNS Lookup Implementation

**UI Pattern**: Domain input with simulated record display.

**Note**: Actual DNS lookups require a server-side API. This tool provides simulated results.

**Simulated Records**:
- A Record (IPv4)
- AAAA Record (IPv6)
- MX Record

**Limitations Displayed**: Warning that DNS lookup requires server-side API.

### Subnet Calculator Implementation

**UI Pattern**: IP address and subnet mask inputs with calculation results.

**Calculations**:
```javascript
// Network address
network = ip & subnet_mask

// Broadcast address
broadcast = ip | wildcard_mask

// Wildcard mask
wildcard = 255 - subnet_mask

// Total hosts
total_hosts = (2^(32-subnet_bits)) - 2
```

**Example**:
- Input: 192.168.1.100/255.255.255.0
- Network: 192.168.1.0
- Broadcast: 192.168.1.255
- Usable Range: 192.168.1.1 - 192.168.1.254

### CIDR Tool Implementation

**UI Pattern**: CIDR notation input with parsed results.

**Calculations**:
```javascript
const prefix = parseInt(cidr.split('/')[1]);
const mask = Array(4).fill(0).map((_, i) => 
  i < Math.floor(prefix / 8) ? 255 : 
  i === Math.floor(prefix / 8) ? 256 - Math.pow(2, 8 - (prefix % 8 || 8)) : 0
);
const hosts = Math.pow(2, 32 - prefix) - 2;
```

**Common CIDR Blocks**:
| CIDR | Subnet Mask | Hosts |
|------|-------------|-------|
| /24 | 255.255.255.0 | 254 |
| /25 | 255.255.255.128 | 126 |
| /26 | 255.255.255.192 | 62 |
| /27 | 255.255.255.224 | 30 |
| /28 | 255.255.255.240 | 14 |
| /29 | 255.255.255.248 | 6 |
| /30 | 255.255.255.252 | 2 |

## HTTP TOOLS

### Purpose
Test HTTP endpoints, build cURL commands, and inspect HTTP headers.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `request` | Request Tester | Send HTTP requests and view responses |
| `curl` | cURL Builder | Generate cURL commands from parameters |
| `headers` | Headers | Fetch and display HTTP headers |

### Request Tester Implementation

**UI Pattern**: Method/URL/Headers/Body inputs with Send button and response display.

**Browser API**:
```javascript
const res = await fetch(url, {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
const text = await res.text();
```

**Features**:
- Multiple HTTP methods
- Custom headers (JSON format)
- Request body for POST/PUT/PATCH
- Response status and body display

### cURL Builder Implementation

**UI Pattern**: Method/URL/Headers/Body inputs with generated cURL output.

**Generation Pattern**:
```javascript
let curl = `curl -X ${method.value}`;
headerLines.forEach(h => { curl += ` \\\n  -H '${h.trim()}'`; });
if (['POST', 'PUT', 'PATCH'].includes(method.value)) {
  curl += ` \\\n  -d '${body.value.trim()}'`;
}
curl += ` \\\n  '${url.value}'`;
```

**Features**:
- One-click copy to clipboard
- Proper escaping of headers and data
- Line continuation for readability

### Headers Fetcher Implementation

**UI Pattern**: URL input with Fetch button and headers table.

**Browser API**:
```javascript
const res = await fetch(url, { method: 'HEAD' });
res.headers.forEach((val, key) => { /* display */ });
```

**Features**:
- Lists all response headers
- Alphabetically sorted
- Copy individual headers

## WEBSOCKET TOOLS

### Purpose
Connect to WebSocket servers and test bidirectional communication.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `tester` | WebSocket Tester | Connect, send, and receive WebSocket messages |

### WebSocket Tester Implementation

**UI Pattern**: URL input, Connect/Disconnect buttons, message textarea, send button, and message log.

**Browser API**:
```javascript
const socket = new WebSocket(url);

socket.onopen = () => { /* connected */ };
socket.onclose = () => { /* disconnected */ };
socket.onerror = (e) => { /* error */ };
socket.onmessage = (e) => { /* received */ };

socket.send(message);
socket.close();
```

**Features**:
- Real-time connection status
- Message log with color coding:
  - Info (gray): Connection events
  - Sent (green): Outgoing messages
  - Received (blue): Incoming messages
  - Error (red): Error events
- Auto-scroll log
- Toggle button states based on connection

**Connection States**:
| State | Value | Description |
|-------|-------|-------------|
| CONNECTING | 0 | Connection being established |
| OPEN | 1 | Connection open |
| CLOSING | 2 | Connection closing |
| CLOSED | 3 | Connection closed |

## Implementation Patterns

### Tab Registration

```javascript
const httpToolsTabs = {
  'request': { render: renderHttpRequest, setup: setupHttpRequestListeners },
  'curl': { render: renderCurlBuilder, setup: setupCurlBuilderListeners },
  'headers': { render: renderHttpHeaders, setup: setupHttpHeadersListeners }
};
```

### Catalog Data

```javascript
window.HTTP_TOOLS_CATALOG = [
  { tabId: "request", tabName: "Request Tester" },
  { tabId: "curl", tabName: "cURL Builder" },
  { tabId: "headers", tabName: "Headers" }
];
```

## Current Status

### Implemented:
- [x] Cron expression parser with field breakdown
- [x] Cron expression generator from dropdowns
- [x] DNS lookup (simulated)
- [x] Subnet calculator with all calculations
- [x] CIDR notation analyzer
- [x] HTTP request tester with Fetch API
- [x] cURL command builder with copy
- [x] HTTP headers fetcher
- [x] WebSocket client with full lifecycle
- [x] Message log with color coding

### Browser APIs Used:
- `fetch()` - HTTP requests
- `WebSocket` - WebSocket communication

### Limitations:
- DNS lookup is simulated (requires server-side API)
- CORS may block requests to some origins
- WebSocket requires server support

### External Dependencies:
- None (uses native browser APIs)
