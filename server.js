const express = require('express');
const compression = require('compression');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const dir = (p) => path.join(__dirname, p);

app.disable('x-powered-by');
app.use(compression());
app.use('/lib/pdf-lib', express.static(dir('node_modules/pdf-lib/dist'), { maxAge: '7d' }));
app.use('/lib/cropperjs', express.static(dir('node_modules/cropperjs/dist'), { maxAge: '7d' }));
app.use(express.static(dir('public'), { maxAge: '1h' }));
app.get('/healthz', (_req, res) => res.send('ok'));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Local:   http://localhost:${PORT}`);
  for (const list of Object.values(os.networkInterfaces()))
    for (const n of list || [])
      if (n.family === 'IPv4' && !n.internal) console.log(`Phone:   http://${n.address}:${PORT}  (same Wi-Fi)`);
});
