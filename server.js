const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 4000;

const publicDir = path.resolve(__dirname, 'public');

function sendDesignFile(res, designNum, filename) {
  const designDir = `design${designNum}`;
  const filePath = path.join(publicDir, designDir, filename);
  if (!fs.existsSync(filePath)) {
    res.status(404).send(`File not found: ${designDir}/${filename}`);
    return;
  }
  res.sendFile(filePath);
}

// /n and /n/ → redirect to /n/index.html (same rule for all designs 1..25)
app.use((req, res, next) => {
  if (req.method !== 'GET') return next();
  const m = req.path.match(/^\/(\d+)\/?$/);
  if (m) {
    const num = parseInt(m[1], 10);
    if (num >= 1 && num <= 25) {
      return res.redirect(302, `/${num}/index.html`);
    }
  }
  next();
});

// Main navigation
app.get('/', (req, res) => {
  const indexPath = path.join(publicDir, 'index.html');
  if (!fs.existsSync(indexPath)) return res.status(404).send('index.html not found');
  res.sendFile(indexPath);
});

// Design sub-routes (index.html, log, chat)
for (let n = 1; n <= 25; n++) {
  const num = n;
  app.get(`/${num}/index.html`, (req, res) => sendDesignFile(res, num, 'index.html'));
  app.get(`/${num}/log.html`, (req, res) => sendDesignFile(res, num, 'log.html'));
  app.get(`/${num}/chat.html`, (req, res) => sendDesignFile(res, num, 'chat.html'));
}

// Static files last
app.use(express.static(publicDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
