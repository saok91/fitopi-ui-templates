const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Helper: register design routes for one design number (so relative links like log.html work from /n/)
function designRoutes(num) {
  const designDir = `design${num}`;
  app.get(`/${num}`, (req, res) => res.redirect(301, `/${num}/`));
  app.get(`/${num}/`, (req, res) => res.sendFile(path.join(__dirname, 'public', designDir, 'index.html')));
  app.get(`/${num}/index.html`, (req, res) => res.sendFile(path.join(__dirname, 'public', designDir, 'index.html')));
  app.get(`/${num}/log.html`, (req, res) => res.sendFile(path.join(__dirname, 'public', designDir, 'log.html')));
  app.get(`/${num}/chat.html`, (req, res) => res.sendFile(path.join(__dirname, 'public', designDir, 'chat.html')));
}

// Main navigation – must be before static
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Design routes – before static so /n and /n/log.html are handled correctly
for (let n = 1; n <= 15; n++) designRoutes(n);

// Static files (CSS, images, etc.) – last so design routes take precedence
app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
