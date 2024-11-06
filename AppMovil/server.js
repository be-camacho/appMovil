const express = require('express');
const request = require('request');
const app = express();
const port = 3000;

app.get('/api/random', (req, res) => {
  request(
    { url: 'https://zenquotes.io/api/random' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));