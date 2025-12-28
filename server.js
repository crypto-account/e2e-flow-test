const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const env = process.env.APP_ENV || 'local';

app.get('/', (req, res) => {
  res.send(`<h1>Witaj na środowisku ${env.toUpperCase()}</h1><p id="status">Działa!</p>`);
});

app.listen(port, () => {
  console.log(`Serwer działa na porcie ${port}`);  
});