const express = require("express");
//Como este archivo solo sera para rutas, usamos su metodo Router()
const router = express.Router();
const Participante = require("../models/Participante");
const Premio = require("../models/Premio");
let conteoParticipante = [];
let bu = [];

//REcuerda que ya tenemos configurado nuestra carpeta view asi que solo escribe el nombre del archivo

//Cuando consulten '/', vamos a renderisar index
router.get("/", async (req, res) => {
  const participantes = await Participante.find({}, { nombre: 1, _id: 0 });
  conteoParticipante = participantes.map((participante) => {
    const agregarParticipante = {
      nombre: participante.nombre,
      cantidad: 1,
    };
    const existe = conteoParticipante.some(
      (p) => p.nombre === participante.nombre
    );
    //console.log(existe)
    if (existe) {
      const validar = conteoParticipante.map((p) => {
        if (p.nombre === participante.nombre) {
          p.cantidad++;
          return p;
        } else {
          return p;
        }
      });
      //console.log(validar)
      conteoParticipante = [...validar];
      bu = [...validar];

      //console.log(conteoParticipante)
    } else {
      conteoParticipante = [...conteoParticipante, agregarParticipante];
      bu = [...bu, agregarParticipante];
    }
  }); 
  const premios = await Premio.find(
    {},
    { codigo: 1, premiouno: 1, premiodos: 1 }
  );

  res.render("index", { 
    bu,
    premios,
  }); 
});

router.post('/premio/:codigo')


module.exports = router;
