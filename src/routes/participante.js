const express = require("express");
const router = express.Router();
const Participante = require("../models/Participante");

router.get("/participante", (req, res) => {
  res.render("participante/participante");
});

router.post("/participante/add", async (req, res) => {
  const { nombre, telefono, referencia, cantidad, grupo } = req.body;
  const error = [];
  if (!nombre) {
    error.push({ text: "Ingrese un nombre" });
  }
  if (!telefono) {
    error.push({ text: "Ingrese un telefono" });
  }
  if (!referencia) {
    error.push({ text: "Ingrese un referencia" });
  }
  if (!cantidad) {
    error.push({ text: "Ingrese una cantidad" });
  }
  if (grupo == 0) {
    error.push({ text: "Seleccione un grupo" });
  }
  if (error.length > 0) {
    res.render(
      "participante/participante",
      error,
      nombre,
      telefono,
      referencia,
      cantidad,
      grupo
    );
  } else {
    const estado = "A";
    const n = 1000;
    console.log(cantidad, ' este es la cantidad ingresada')
    for (let i = 0; i < cantidad; i++) {
      const newParticipante = new Participante({
        nombre,
        telefono,
        referencia,
        estado,
        n,
      });
      await newParticipante.save();
    }
    req.flash("success_msg", `Se registro ${nombre}`);
    res.redirect("/participante");
  }
});

module.exports = router;
