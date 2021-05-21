const express = require("express");
const router = express.Router();
const Participante = require("../models/Participante");
const obtenerId = require("../helper/obtenerId");
const Premio = require("../models/Premio");

router.get("/participante", (req, res) => {
  res.render("participante/participante");
});

router.post("/participante/add", async (req, res) => {
  const { nombre, telefono, referencia, cantidad, grupo } = req.body;
  const errors = [];
  if (!nombre) {
    console.log("nO estas enviando nombre");
    errors.push({ text: "Ingrese un nombre" });
  }
  if (!telefono) {
    errors.push({ text: "Ingrese un telefono" });
  }
  if (!referencia) {
    errors.push({ text: "Ingrese un referencia" });
  }
  if (!cantidad) {
    errors.push({ text: "Ingrese una cantidad" });
  }
  if (grupo == 0) {
    errors.push({ text: "Seleccione un grupo" });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.render("participante/participante", {
      errors,
      nombre,
      referencia,
      telefono,
    });
  } else {
    const estado = "A";
    const codigo = 1500;
    console.log(cantidad, " este es la cantidad ingresada");
    for (let i = 0; i < cantidad; i++) {
      const newParticipante = new Participante({
        codigo,
        nombre,
        telefono,
        referencia,
      });
      await newParticipante.save();
    }
    //obtenerId(n, grupo);
    req.flash("success_msg", `Se registro ${nombre}`);
    res.redirect("/participante");
  }
});

router.get("/sorteo", async (req, res) => {
  const premios = await Premio.find(
    {},
    { codigo: 1, premiouno: 1, premiodos: 1 }
  );
  res.render("sorteo", { premios });
});

router.post("/sorteo/:codigo", async (req, res) => {
  const numeroAleatorio = Math.floor(Math.random() * (1 - 162)) + 162;
  const ganador = await Participante.findOne({ id: numeroAleatorio });
  console.log(ganador);
  const codigo = req.params.codigo;
  console.log(codigo);
  const publicar = {
    nombre: ganador.nombre,
    numerorifa: ganador.codigo,
    codigo: codigo,
  }; 
  const premios = await Premio.find({ codigo: codigo });
  console.log(premios);
  res.render("ganador", { publicar, premios });
});   
      
module.exports = router;
