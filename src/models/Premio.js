const { Schema, model } = require("mongoose");

const PremioSchema = new Schema({
  codigo: { type: "string", require: false },
  premiouno: { type: "string", require: false },
  premiodos: { type: "string", require: false },
});

module.exports = model("Premio", PremioSchema);
