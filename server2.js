// server2.js
const express = require('express');
const path = require('path');
const multer  = require('multer');
const { PythonShell } = require('python-shell');
const app = express();
const port = 80;

const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index5.html'));
});

app.post('/upload-csv', upload.single('csvfile'), (req, res) => {
  const options = {
    args: [req.file.path, req.body.selectedColumns],
  };
  PythonShell.run('generate_map.py', options, function (err, result) {
    if (err) throw err;
    res.json({ fileUrl: '/heatmap11.html' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://203.234.55.127:${port}/`);
});
