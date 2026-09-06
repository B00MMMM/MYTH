const fs = require('fs');
let c = fs.readFileSync('src/Ragnarok.jsx', 'utf8');
c = c.replace(/\\`/g, '`').replace(/\\\$/g, '$');
fs.writeFileSync('src/Ragnarok.jsx', c);
