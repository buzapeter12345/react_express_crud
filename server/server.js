require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const Ember = require("./models/Ember.jsx");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/emberleker", async (req, res) => {
  try {
    const ember = await Ember.find({});
    res.status(200).json({ ember });
  } catch (error) {
    res.status(400).json({ msg: "Valami hiba történt: " + error.message });
  }
});

app.post("/emberhozzaad", async (req, res) => {
  try {
    const { nev, szuletesi_datum, telefonszam, email, kedvencSzin, magassag } =
      req.body;
    const newEmber = new Ember({
      nev,
      szuletesi_datum,
      telefonszam,
      email,
      kedvencSzin,
      magassag,
    });
    await newEmber.save();

    res
      .status(200)
      .json({ msg: "Az adatok sikeresen feltöltésre kerültek az adatbázisba" });
    console.log("sikeres feltöltés");
  } catch (error) {
    res.status(400).json({ msg: "Valami hiba történt: " + error.message });
  }
});

app.delete("/embertorol", async (req, res) => {
  try {
    const body = req.body;
    const toroltAdat = await Ember.findOneAndDelete({ _id: body.item }).exec();
    if (toroltAdat) {
      res.status(200).json({ msg: "Sikeres adat törlés!" });
    } else {
      res.status(404).json({ msg: "A felhasználó nem található!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Valami hiba történt!" });
  }
});

const port = process.env.PORT || 3500;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Sikeres adatbázis csatlakozás");
  })
  .catch((error) => {
    console.log("Valami hiba történt" + error);
  });

app.listen(port, () => {
  console.log(`A szerver itt fut: http://localhost:${port}`);
});
