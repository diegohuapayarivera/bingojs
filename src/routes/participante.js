const express = require("express");
const router = express.Router();
const Participante = require("../models/Participante");
const obtenerId = require("../helper/obtenerId");

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
    const n = 1010;
    /*console.log(cantidad, ' este es la cantidad ingresada')
    for (let i = 0; i < cantidad; i++) {
      const newParticipante = new Participante({
        nombre,
        telefono,
        referencia,
        estado,
        n,
      });
      await newParticipante.save();
    }*/
    obtenerId(n, grupo);
    req.flash("success_msg", `Se registro ${nombre}`);
    res.redirect("/participante");
  }
});

module.exports = router;
