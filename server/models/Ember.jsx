const mongoose = require("mongoose");

const emberSchema = new mongoose.Schema({
  nev: {
    type: String,
  },
  szuletesi_datum: {
    type: Date,
  },
  telefonszam: {
    type: Number,
  },
  email: {
    type: String,
  },
  kedvencSzin: {
    type: String,
  },
  magassag: {
    type: Number,
  },
});

module.exports = mongoose.model("ember", emberSchema);
