const { Schema, model } = require("mongoose");

const ParticipanteSchema = new Schema({
  n: { type: "number", require: true },
  nombre: { type: "string", require: true },
  referencia: { type: "string", require: false },
  telefono: { type: "number", require: false },
  estado: { type: "string", require: true },
});

module.exports = model("Participante", ParticipanteSchema);
