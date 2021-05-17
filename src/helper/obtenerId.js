const moongoose = require("mongoose");
const Participante = require("../models/Participante");

async function obtenerId(n, grupo) {
  if (grupo === "jesus") {
    /*const participantes = await Participante.find(
      { n: { $lte: 1250 } },
      { _id: 0, n: 1 }
    )
      .sort({ n: "desc" })
      .limit(1);*/
    const participantes = await Participante.find(
      { n: 1 },
      {
        $max: { n: 1250 },
      }
    );
    //const idMayor = await participantes.find({$max: {n}}).limit(1)

    console.log(participantes);
    //console.log(idMayor);
  }
  if (grupo === "giancarlo") {
    console.log("estas enviando giancarlo ocn ese n ", n);
  }
}

module.exports = obtenerId;
