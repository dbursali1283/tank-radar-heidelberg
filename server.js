const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 3000;

// 🔐 Hier später deinen Tankerkönig API Key eintragen
const API_KEY = process.env.API_KEY 

// statische Webseite aus /public laden
app.use(express.static(path.join(__dirname, "public")));

// Test Route
app.get("/test", (req, res) => {
  res.json({ message: "server Funktionirt Dergah!" });
});

// Tankstellen im Radius laden
app.get("/api/stations", async (req, res) => {
  try {

    const lat = 49.426;
    const lng = 8.748;
    const rad = 10;

    const url =
      `https://creativecommons.tankerkoenig.de/json/list.php?lat=${lat}&lng=${lng}&rad=${rad}&sort=dist&type=all&apikey=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      ok: false,
      message: "Fehler beim Laden der Tankstellen"
    });

  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});