const { Schema, model } = require("mongoose");

const ParticipanteSchema = new Schema({
  id: { type: "string", require: false},
  codigo: { type: "string", require: false },
  nombre: { type: "string", require: false },
  referencia: { type: "string", require: false },
  telefono: { type: "string", require: false },
  
});

module.exports = model("Participante", ParticipanteSchema);
