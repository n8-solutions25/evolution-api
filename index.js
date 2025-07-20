const express = require('express');
const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('✅ Evolution API fonctionne sur Render !');
});

app.listen(port, () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
