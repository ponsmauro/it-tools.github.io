window.TOOLS_IMPLEMENTATIONS = {
  'JSON ↔ YAML': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder='{"name": "John"}'></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `try {
      const val = input.value.trim();
      if (!val) { output.value = ''; return; }
      if (typeof jsyaml === 'undefined') { output.value = 'YAML library loading...'; return; }
      if (val.startsWith('{') || val.startsWith('[')) {
        output.value = jsyaml.dump(JSON.parse(val), { indent: 2, lineWidth: -1 });
      } else {
        output.value = JSON.stringify(jsyaml.load(val), null, 2);
      }
    } catch (e) { output.value = 'Error: ' + e.message; }`,
    lib: 'https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js'
  },

  'JSON ↔ CSV': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder='[{"name": "John", "age": 30}]'></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `try {
      const val = input.value.trim();
      if (!val) { output.value = ''; return; }
      const isJson = val.startsWith('[') || val.startsWith('{');
      if (isJson) {
        const arr = JSON.parse(val);
        if (!Array.isArray(arr)) { output.value = 'Error: JSON must be array'; return; }
        if (arr.length === 0) { output.value = ''; return; }
        const headers = Object.keys(arr[0]);
        let csv = headers.join(',') + '\\n';
        arr.forEach(item => {
          csv += headers.map(h => '"' + (item[h] ?? '').toString().replace(/"/g, '""') + '"').join(',') + '\\n';
        });
        output.value = csv;
      } else {
        const lines = val.trim().split('\\n');
        if (lines.length < 2) { output.value = '[]'; return; }
        const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''));
        const result = [];
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          const vals = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
          const obj = {}; headers.forEach((h, j) => obj[h] = vals[j] || '');
          result.push(obj);
        }
        output.value = JSON.stringify(result, null, 2);
      }
    } catch (e) { output.value = 'Error: ' + e.message; }`
  },

  'Base64 encode': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder="Enter text..."></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `try {
      const val = input.value;
      if (!val) { output.value = ''; return; }
      output.value = btoa(val);
    } catch (e) { output.value = 'Error: ' + e.message; }`
  },

  'Base64 decode': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder="SGVsbG8gV29ybGQ="></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `try {
      const val = input.value.trim();
      if (!val) { output.value = ''; return; }
      output.value = atob(val);
    } catch (e) { output.value = 'Error: Invalid Base64'; }`
  },

  'URL encode': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder="Hello World!"></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `output.value = encodeURIComponent(input.value)`
  },

  'URL decode': {
    html: `<div class="converter-container">
      <div class="converter-inputs">
        <div class="input-group" style="flex:1;">
          <label>Input</label>
          <textarea id="toolInput" class="converter-textarea" placeholder="Hello%20World%21"></textarea>
        </div>
        <div class="input-group" style="flex:1;">
          <label>Output</label>
          <textarea id="toolOutput" class="converter-textarea" readonly></textarea>
        </div>
      </div>
    </div>`,
    script: `try { output.value = decodeURIComponent(input.value); } catch(e) { output.value = 'Error'; }`
  },

  'Colores (HEX/RGB/HSL/HSV)': {
    html: `<div class="converter-container">
      <div class="converter-inputs converter-inputs-5">
        <div class="input-group"><label>Pick</label><input type="color" id="colorPicker" value="#59d4ff" style="height:46px;"></div>
        <div class="input-group"><label>HEX</label><input type="text" id="outHex" class="converter-input" readonly></div>
        <div class="input-group"><label>RGB</label><input type="text" id="outRgb" class="converter-input" readonly></div>
        <div class="input-group"><label>HSL</label><input type="text" id="outHsl" class="converter-input" readonly></div>
        <div class="input-group"><label>HSV</label><input type="text" id="outHsv" class="converter-input" readonly></div>
      </div>
      <div id="colorPreview" style="margin-top:16px;height:60px;border-radius:8px;background:#59d4ff;"></div>
    </div>`,
    script: `const c=document.getElementById('colorPicker');const prev=document.getElementById('colorPreview');function hexToRgb(h){const r=/^#?([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(h);return r?{r:parseInt(r[1],16),g:parseInt(r[2],16),b:parseInt(r[3],16)}:null;}function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;const max=Math.max(r,g,b),min=Math.min(r,g,b);let h,s,l=(max+min)/2;if(max===min){h=s=0;}else{const d=max-min;s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=((g-b)/d+(g<b?6:0))/6;break;case g:h=((b-r)/d+2)/6;break;case b:h=((r-g)/d+4)/6;break;}}document.getElementById('outHex').value=c.value.toUpperCase();const rgb=hexToRgb(c.value);document.getElementById('outRgb').value='rgb('+rgb.r+', '+rgb.g+', '+rgb.b+')';document.getElementById('outHsl').value='hsl('+Math.round(h*360)+', '+Math.round(s*100)+'%, '+Math.round(l*100)+'%)';document.getElementById('outHsv').value='hsv('+Math.round(h*360)+', '+Math.round(s*100)+'%, '+Math.round(l*100)+'%)';prev.style.background=c.value;}c.addEventListener('input',rgbToHsl);rgbToHsl();`
  }
};
