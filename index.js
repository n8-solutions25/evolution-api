const express = require("express");
const { create } = require("@open-wa/wa-automate");

const app = express();
app.use(express.json());

create().then(client => {
  app.post("/send-message", async (req, res) => {
    const { to, message } = req.body;
    if (!to || !message) {
      return res.status(400).json({ status: false, message: "Missing 'to' or 'message'" });
    }

    try {
      await client.sendText(to, message);
      return res.status(200).json({ status: true, message: "Message sent" });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.toString() });
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
