# RESILIENCE and SECURITY TOOLS Documentation

## Feature Purpose and Goals

These two categories provide tools for implementing resilience patterns (retry, backoff, circuit breaker) and security policies (CSP generation). All tools are embedded directly in the main dashboard.

### Goals:
1. Calculate and visualize retry strategies
2. Generate backoff code for multiple strategies
3. Configure circuit breaker parameters
4. Generate Content Security Policy headers
5. Maintain futuristic dark theme consistency

## RESILIENCE TOOLS

### Purpose
Help implement fault-tolerant patterns in applications.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `retry` | Retry Calculator | Visualize retry attempt schedules |
| `backoff` | Backoff Generator | Generate backoff code for multiple strategies |
| `circuit` | Circuit Breaker | Configure circuit breaker parameters |

### Retry Calculator Implementation

**UI Pattern**: Max attempts, base delay, max delay inputs with schedule visualization.

**Formula**:
```
delay(n) = min(base_delay * 2^(n-1), max_delay)
```

**Example Schedule**:
| Attempt | Delay (base=1000, max=30000) |
|---------|---------------------------|
| 1 | 1000ms |
| 2 | 2000ms |
| 3 | 4000ms |
| 4 | 8000ms |
| 5 | 16000ms |

**Total Wait**: 31000ms

**Visualization**:
```html
<div style="font-family:monospace;">
  <strong>Attempt Schedule:</strong>
  <ul>
    <li>Attempt 1: wait 1000ms</li>
    <li>Attempt 2: wait 2000ms</li>
    ...
  </ul>
  <strong>Total max wait:</strong> 31000ms
</div>
```

### Backoff Generator Implementation

**UI Pattern**: Strategy select, base delay, attempts inputs with generated code.

**Supported Strategies**:

| Strategy | Formula | Description |
|----------|---------|-------------|
| Linear | `base * attempt` | 1x, 2x, 3x, 4x, 5x |
| Exponential | `base * 2^(attempt-1)` | 1x, 2x, 4x, 8x, 16x |
| Fibonacci | `base * fib(attempt)` | 1x, 1x, 2x, 3x, 5x |

**Generated Code (Exponential)**:
```javascript
function exponentialBackoff(attempt) {
  return 1000 * Math.pow(2, attempt - 1);
}

// Delays for 5 attempts:
// Attempt 1: 1000ms
// Attempt 2: 2000ms
// Attempt 3: 4000ms
// Attempt 4: 8000ms
// Attempt 5: 16000ms
```

**Generated Code (Fibonacci)**:
```javascript
function fibonacciBackoff(attempt) {
  const fib = [1, 1];
  for (let i = 2; i < attempt; i++) {
    fib.push(fib[i-1] + fib[i-2]);
  }
  return 1000 * fib[attempt - 1];
}
```

### Circuit Breaker Implementation

**UI Pattern**: Threshold, timeout, reset timeout inputs with state diagram.

**Circuit Breaker States**:

```
┌─────────┐   failure threshold   ┌──────┐
│ CLOSED  │ ──────────────────▶  │ OPEN │
└─────────┘                       └──+───┘
     ▲                                │
     │                           reset timeout
     │                                │
     │     successful test            │
     │ ┌───────────────────────────────┘
     │ ▼
┌───────┐
│ HALF-OPEN │
└───────────┘
```

**Parameters**:
| Parameter | Description | Example |
|-----------|-------------|---------|
| Failure Threshold | Failures before opening | 5 |
| Timeout | Time before half-open | 60000ms |
| Reset Timeout | Half-open test duration | 30000ms |

**State Transitions**:
1. **CLOSED**: Normal operation, requests pass through
2. **OPEN**: All requests fail immediately
3. **HALF-OPEN**: Test request allowed, determines next state

## SECURITY TOOLS

### Purpose
Generate security policy configurations for web applications.

### Tabs

| Tab ID | Tab Name | Purpose |
|--------|----------|---------|
| `csp` | CSP Generator | Generate Content Security Policy headers |

### CSP Generator Implementation

**UI Pattern**: Multiple source inputs with generated CSP header and copy button.

**CSP Directives**:

| Directive | Purpose | Default Value |
|-----------|---------|---------------|
| default-src | Fallback for other directives | 'self' |
| script-src | JavaScript sources | 'self' 'unsafe-inline' |
| style-src | CSS sources | 'self' 'unsafe-inline' |
| img-src | Image sources | 'self' data: |
| connect-src | Fetch/XHR/WebSocket | 'self' |
| font-src | Font sources | 'self' |

**Source Values**:
| Value | Meaning |
|-------|---------|
| 'self' | Same origin only |
| 'none' | Block all |
| 'unsafe-inline' | Allow inline scripts/styles |
| 'unsafe-eval' | Allow eval() |
| data: | Data URIs |
| https: | All HTTPS URLs |
| domain.com | Specific domain |

**Generated Output**:
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; font-src 'self';
```

**Copy Feature**:
```javascript
navigator.clipboard.writeText(cspHeader);
```

### Common CSP Configurations

**Strict (Recommended)**:
```
default-src 'self'; script-src 'self'; style-src 'self'; object-src 'none';
```

**Permissive (Development)**:
```
default-src 'self' 'unsafe-inline' 'unsafe-eval'; script-src *; style-src *
```

**Production with CDN**:
```
default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' https://cdn.example.com; img-src 'self' data: https:;
```

### XSS Prevention

CSP helps prevent XSS attacks by:
1. Blocking inline scripts (`'unsafe-inline'`)
2. Blocking eval() (`'unsafe-eval'`)
3. Restricting script sources
4. Preventing data: URIs in script contexts

## Implementation Patterns

### Tab Registration

```javascript
const resilienceToolsTabs = {
  'retry': { render: renderRetryCalculator, setup: setupRetryCalculatorListeners },
  'backoff': { render: renderBackoffGenerator, setup: setupBackoffGeneratorListeners },
  'circuit': { render: renderCircuitBreaker, setup: setupCircuitBreakerListeners }
};

const securityToolsTabs = {
  'csp': { render: renderCspGenerator, setup: setupCspGeneratorListeners }
};
```

### Catalog Data

```javascript
window.RESILIENCE_TOOLS_CATALOG = [
  { tabId: "retry", tabName: "Retry Calculator" },
  { tabId: "backoff", tabName: "Backoff Generator" },
  { tabId: "circuit", tabName: "Circuit Breaker" }
];

window.SECURITY_TOOLS_CATALOG = [
  { tabId: "csp", tabName: "CSP Generator" }
];
```

## Resilience Patterns Reference

### Retry Pattern

**When to Use**:
- Transient failures (network timeout, server busy)
- Idempotent operations
- Read operations

**Best Practices**:
1. Limit retry attempts
2. Use exponential backoff
3. Add jitter to prevent thundering herd
4. Log each retry attempt

### Backoff Strategies

**Linear Backoff**:
```javascript
function linearBackoff(attempt, base = 1000) {
  return base * attempt;
}
// 1s, 2s, 3s, 4s, 5s
```

**Exponential Backoff** (Recommended):
```javascript
function exponentialBackoff(attempt, base = 1000) {
  return base * Math.pow(2, attempt - 1);
}
// 1s, 2s, 4s, 8s, 16s
```

**Exponential Backoff with Jitter**:
```javascript
function exponentialBackoffWithJitter(attempt, base = 1000) {
  const delay = base * Math.pow(2, attempt - 1);
  const jitter = Math.random() * delay * 0.1; // 10% jitter
  return delay + jitter;
}
```

**Fibonacci Backoff**:
```javascript
function fibonacciBackoff(attempt, base = 1000) {
  const fib = [1, 1, 2, 3, 5, 8, 13];
  return base * fib[attempt - 1];
}
// 1s, 1s, 2s, 3s, 5s, 8s, 13s
```

### Circuit Breaker Pattern

**Implementation States**:
```javascript
const CircuitBreakerState = {
  CLOSED: 'CLOSED',      // Normal operation
  OPEN: 'OPEN',          // Failing fast
  HALF_OPEN: 'HALF_OPEN' // Testing recovery
};
```

**Configuration Guidelines**:
| Parameter | Development | Production |
|-----------|-------------|------------|
| Failure Threshold | 3 | 5-10 |
| Timeout | 30s | 60s |
| Reset Timeout | 5s | 30s |

## Current Status

### Implemented:
- [x] Retry calculator with visual schedule
- [x] Backoff generator for 3 strategies
- [x] Circuit breaker parameter configurator
- [x] CSP generator with common directives
- [x] Copy to clipboard for generated code
- [x] State diagram visualization for circuit breaker

### Browser APIs Used:
- `navigator.clipboard.writeText()` - Copy functionality

### External Dependencies:
- None

### Limitations:
- Retry calculator shows schedule but doesn't execute retries
- Circuit breaker is visualization only (not functional)
- CSP generator provides header format but doesn't enforce policy

## Security Best Practices

### When Using These Tools:

1. **Retry Calculator**: Use for understanding delays, not as actual retry implementation
2. **Backoff Generator**: Copy generated code into your application
3. **Circuit Breaker**: Use as configuration reference for libraries like Hystrix, Polly
4. **CSP Generator**: Test thoroughly before deploying; 'unsafe-inline' reduces security
