const express = require("express");
const { create } = require("@open-wa/wa-automate");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let clientInstance;

// Démarrer WhatsApp
create({
  sessionId: "session-evolution",
  multiDevice: true,
  headless: true,
  qrTimeout: 0, // affiche le QR sans timeout
}).then((client) => {
  clientInstance = client;
  console.log("✅ WhatsApp client démarré");
});

// Accueil
app.get("/", (_, res) => {
  res.send("✅ Evolution API Lite fonctionne !");
});

// Endpoint pour envoyer un message
app.post("/send", async (req, res) => {
  if (!clientInstance) return res.status(500).send("Client non initialisé");

  const { to, message } = req.body;
  if (!to || !message) return res.status(400).send("Paramètres manquants");

  try {
    await clientInstance.sendText(to, message);
    res.send({ status: "envoyé", to, message });
  } catch (err) {
    res.status(500).send({ erreur: err.message });
  }
});

app.listen(port, () =>
  console.log(`🚀 Serveur prêt sur http://localhost:${port}`)
);
