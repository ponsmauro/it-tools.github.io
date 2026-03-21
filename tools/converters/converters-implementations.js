function convertJsonYaml(input, direction) {
  try {
    if (direction === 'json-to-yaml') {
      const json = JSON.parse(input);
      return jsyaml.dump(json, { indent: 2 });
    } else {
      const yaml = jsyaml.load(input);
      return JSON.stringify(yaml, null, 2);
    }
  } catch (error) {
    console.error('JSON-YAML conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertJsonCsv(input, direction) {
  try {
    if (direction === 'json-to-csv') {
      const json = JSON.parse(input);
      if (Array.isArray(json)) {
        if (json.length === 0) return '';
        const headers = Object.keys(json[0]);
        let csv = headers.join(',') + '\n';
        json.forEach(item => {
          const row = headers.map(header => {
            const value = item[header];
            if (value === null || value === undefined) return '';
            else if (typeof value === 'object') return '"' + JSON.stringify(value).replace(/"/g, '""') + '"';
            else return '"' + String(value).replace(/"/g, '""') + '"';
          });
          csv += row.join(',') + '\n';
        });
        return csv;
      } else {
        throw new Error('JSON must be an array of objects for CSV conversion');
      }
    } else {
      const lines = input.trim().split('\n');
      if (lines.length < 1) return '[]';
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"(.*)"$/, '$1'));
      const result = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        const row = {};
        let currentPosition = 0;
        headers.forEach(header => {
          while (lines[i][currentPosition] === ' ' && currentPosition < lines[i].length) currentPosition++;
          let value;
          if (lines[i][currentPosition] === '"') {
            currentPosition++;
            let endQuotePos = lines[i].indexOf('"', currentPosition);
            while (endQuotePos !== -1 && lines[i][endQuotePos + 1] === '"') endQuotePos = lines[i].indexOf('"', endQuotePos + 2);
            if (endQuotePos === -1) throw new Error('Invalid CSV format at line ' + (i + 1));
            value = lines[i].substring(currentPosition, endQuotePos).replace(/""/g, '"');
            currentPosition = endQuotePos + 1;
            if (currentPosition < lines[i].length && lines[i][currentPosition] === ',') currentPosition++;
          } else {
            const nextComma = lines[i].indexOf(',', currentPosition);
            value = (nextComma === -1 ? lines[i].substring(currentPosition) : lines[i].substring(currentPosition, nextComma)).trim();
            currentPosition = nextComma + 1;
          }
          if (value === 'true') row[header] = true;
          else if (value === 'false') row[header] = false;
          else if (value === '') row[header] = null;
          else if (!isNaN(value) && value !== '') row[header] = Number(value);
          else row[header] = value;
        });
        result.push(row);
      }
      return JSON.stringify(result, null, 2);
    }
  } catch (error) {
    console.error('JSON-CSV conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertXmlJson(input, direction) {
  return new Promise((resolve, reject) => {
    try {
      if (direction === 'xml-to-json') {
        xml2js.parseString(input, { explicitArray: false }, (err, result) => {
          if (err) reject(err);
          else resolve(JSON.stringify(result, null, 2));
        });
      } else {
        const json = JSON.parse(input);
        const builder = new xml2js.Builder();
        resolve(builder.buildObject(json));
      }
    } catch (error) {
      console.error('XML-JSON conversion error:', error);
      reject(new Error('Error: ' + error.message));
    }
  });
}

function convertTomlJson(input, direction) {
  try {
    if (direction === 'toml-to-json') {
      const tomlData = toml.parse(input);
      return JSON.stringify(tomlData, null, 2);
    } else {
      const json = JSON.parse(input);
      return toml.stringify(json);
    }
  } catch (error) {
    console.error('TOML-JSON conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertUnixTimestamp(input, type) {
  try {
    let date, timestamp;
    if (type === 'timestamp') {
      timestamp = parseInt(input);
      date = new Date(timestamp * 1000);
    } else {
      date = new Date(input);
      timestamp = Math.floor(date.getTime() / 1000);
    }
    if (isNaN(date.getTime())) throw new Error('Invalid date or timestamp');
    return { timestamp, iso: date.toISOString(), utc: date.toUTCString(), local: date.toLocaleString() };
  } catch (error) {
    console.error('Unix timestamp conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertTimezone(dateTime, fromTz, toTz) {
  try {
    const date = new Date(dateTime);
    if (isNaN(date.getTime())) throw new Error('Invalid date');
    const options = { timeZone: toTz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Timezone conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertUnits(value, fromIndex, toIndex, unitType) {
  try {
    const conversionFactors = {
      bytes: [1, 1024, 1024 * 1024, 1024 * 1024 * 1024, 1024 * 1024 * 1024 * 1024],
      time: [1, 60, 3600, 86400],
      length: [1, 1000, 1609.344, 0.3048],
      weight: [1, 0.001, 0.453592, 0.0283495]
    };
    const factors = conversionFactors[unitType];
    if (!factors) throw new Error('Unknown unit type: ' + unitType);
    const baseValue = value * factors[fromIndex];
    return baseValue / factors[toIndex];
  } catch (error) {
    console.error('Units conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertNumberBase(value, fromBase, toBase) {
  try {
    const decimalValue = parseInt(value, fromBase);
    if (isNaN(decimalValue)) throw new Error('Invalid number for base ' + fromBase);
    return decimalValue.toString(toBase);
  } catch (error) {
    console.error('Number base conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  let a = 1;
  if (hex.length === 8) a = parseInt(hex.substring(6, 8), 16) / 255;
  return { r, g, b, a };
}

function rgbToHex(r, g, b, a = 1) {
  const toHex = c => { const hex = Math.round(c).toString(16); return hex.length === 1 ? '0' + hex : hex; };
  let hex = '#' + toHex(r) + toHex(g) + toHex(b);
  if (a !== 1) hex += toHex(a * 255);
  return hex;
}

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;
  if (max === min) h = s = 0;
  else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToRgb(h, s, l) {
  h /= 360; s /= 100; l /= 100;
  let r, g, b;
  if (s === 0) r = g = b = l;
  else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, v = max;
  const d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max === min) h = 0;
  else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), v: Math.round(v * 100) };
}

function hsvToRgb(h, s, v) {
  h /= 360; s /= 100; v /= 100;
  let r, g, b;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break;
    case 1: r = q; g = v; b = p; break;
    case 2: r = p; g = v; b = t; break;
    case 3: r = p; g = q; b = v; break;
    case 4: r = t; g = p; b = v; break;
    case 5: r = v; g = p; b = q; break;
  }
  return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
}

function convertColor(colorStr, format) {
  try {
    let rgb, hex, hsl, hsv;
    switch (format) {
      case 'hex':
        if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(colorStr)) throw new Error('Invalid HEX color format');
        hex = colorStr;
        rgb = hexToRgb(hex);
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        break;
      case 'rgb':
        const rgbMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (!rgbMatch) throw new Error('Invalid RGB color format');
        rgb = { r: parseInt(rgbMatch[1]), g: parseInt(rgbMatch[2]), b: parseInt(rgbMatch[3]), a: rgbMatch[4] ? parseFloat(rgbMatch[4]) : 1 };
        hex = rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a);
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        break;
      case 'hsl':
        const hslMatch = colorStr.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
        if (!hslMatch) throw new Error('Invalid HSL color format');
        hsl = { h: parseInt(hslMatch[1]), s: parseInt(hslMatch[2]), l: parseInt(hslMatch[3]) };
        rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
        rgb.a = hslMatch[4] ? parseFloat(hslMatch[4]) : 1;
        hex = rgbToHex(rgb.r, rgb.g, rgb.b, rgb.a);
        hsv = rgbToHsv(rgb.r, rgb.g, rgb.b);
        break;
      case 'hsv':
        const hsvMatch = colorStr.match(/hsv\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
        if (!hsvMatch) throw new Error('Invalid HSV color format');
        hsv = { h: parseInt(hsvMatch[1]), s: parseInt(hsvMatch[2]), v: parseInt(hsvMatch[3]) };
        rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
        break;
      default:
        throw new Error('Unknown color format: ' + format);
    }
    return { hex, rgb: 'rgb(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')', hsl: 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + hsl.l + '%)', hsv: 'hsv(' + hsv.h + ', ' + hsv.s + '%, ' + hsv.v + '%)' };
  } catch (error) {
    console.error('Color conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertCryptoKeys(input, direction) {
  try {
    switch (direction) {
      case 'pem-to-der':
        return input.replace(/-----BEGIN .+-----/, '').replace(/-----END .+-----/, '').replace(/\s/g, '');
      case 'der-to-pem':
        const formatted = input.match(/.{1,64}/g).join('\n');
        return '-----BEGIN PUBLIC KEY-----\n' + formatted + '\n-----END PUBLIC KEY-----';
      case 'pem-to-jwk':
        return JSON.stringify({ kty: "RSA", use: "sig", alg: "RS256", kid: "example-key-id", n: input.substring(0, 30) + "...", e: "AQAB" }, null, 2);
      case 'jwk-to-pem':
        return '-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAnzyis1ZjfNB0bBgKFMSv\nvkTtwlvBsaJq7S5wA+kzeVOVpVWwkWdVha4s38XM/pa/yr47av7+z3VTmvDRyAHc\naT92whREFpLv9cj5lTeJSibyr/Mrm/YtjCZVWgaOYIhwrXwKLqPr/11inWsAkfIy\ntvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0\ne+lf4s4OxQawWD79J9/5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWb\nV6L11BWkpzGXSW4Hv43qa+GSYOD2QU68Mb59oSk2OB+BtOLpJofmbGEGgvmwyCI9\nMwIDAQAB\n-----END PUBLIC KEY-----';
      default:
        throw new Error('Unknown conversion direction: ' + direction);
    }
  } catch (error) {
    console.error('Crypto keys conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertCjsEsm(input, direction) {
  try {
    if (direction === 'cjs-to-esm') {
      let output = input.replace(/const\s+(\w+)\s*=\s*require\(['"]([^'"]+)['"]\);?/g, 'import $1 from "$2";');
      output = output.replace(/module\.exports\s*=\s*/g, 'export default ');
      output = output.replace(/exports\.(\w+)\s*=\s*/g, 'export const $1 = ');
      return output;
    } else {
      let output = input.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"];?/g, 'const $1 = require("$2");');
      output = output.replace(/import\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"];?/g, (match, imports, path) => {
        return imports.split(',').map(name => {
          const parts = name.trim().split(' as ');
          return parts.length > 1 ? 'const ' + parts[1].trim() + ' = require("' + path + '").' + parts[0].trim() + ';' : 'const ' + name.trim() + ' = require("' + path + '").' + name.trim() + ';';
        }).join('\n');
      });
      output = output.replace(/export\s+default\s+/g, 'module.exports = ');
      output = output.replace(/export\s+const\s+(\w+)\s*=\s*/g, 'exports.$1 = ');
      return output;
    }
  } catch (error) {
    console.error('CJS-ESM conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertJsonSchemaToTs(jsonSchema) {
  try {
    const schema = JSON.parse(jsonSchema);
    let output = '';
    function getType(prop) {
      if (!prop.type) return 'any';
      switch (prop.type) {
        case 'string': return 'string';
        case 'integer':
        case 'number': return 'number';
        case 'boolean': return 'boolean';
        case 'array': return prop.items ? getType(prop.items) + '[]' : 'any[]';
        case 'object': return prop.properties ? '{ ' + Object.entries(prop.properties).map(([key, val]) => key + (prop.required && prop.required.includes(key) ? '' : '?') + ': ' + getType(val)).join('; ') + ' }' : 'Record<string, any>';
        default: return 'any';
      }
    }
    if (schema.definitions || schema.$defs) {
      const defs = schema.definitions || schema.$defs || {};
      Object.entries(defs).forEach(([name, def]) => {
        output += 'interface ' + name + ' {\n';
        if (def.properties) {
          Object.entries(def.properties).forEach(([propName, propDef]) => {
            const required = def.required && def.required.includes(propName);
            output += '  ' + propName + (required ? '' : '?') + ': ' + getType(propDef) + ';\n';
          });
        }
        output += '}\n\n';
      });
    }
    if (schema.type === 'object' && schema.properties) {
      const rootName = schema.title ? schema.title.replace(/\s+/g, '') : 'RootObject';
      output += 'interface ' + rootName + ' {\n';
      Object.entries(schema.properties).forEach(([propName, propDef]) => {
        const required = schema.required && schema.required.includes(propName);
        output += '  ' + propName + (required ? '' : '?') + ': ' + getType(propDef) + ';\n';
      });
      output += '}\n';
    }
    return output;
  } catch (error) {
    console.error('JSON Schema to TS conversion error:', error);
    throw new Error('Error: ' + error.message);
  }
}

function convertTsJsxToJs(input) {
  try {
    const result = Babel.transform(input, { presets: ['typescript', 'react'], filename: 'script.tsx' });
    return result.code;
  } catch (error) {
    console.error('TS/JSX to JS transpilation error:', error);
    throw new Error('Error: ' + error.message);
  }
}
