const express = require("express");
const router = express.Router();
//obtenemos el modelo para usarlo
const Participante = require("../models/Participante");
//Este no sirve porque era una prueba 
const obtenerId = require("../helper/obtenerId");
//traemos modelo
const Premio = require("../models/Premio");

//ruta para ver los participantes
router.get("/participante", (req, res) => {
  //Renderizamos de la carpeta participante, luego al archivo participante
  res.render("participante/participante");
});

//esta es una ruta post o sea que no se obtiene si no que recibe 
//por lo general post se utuliza cuando tiene un formulario enviando datos 
//usamos async porque tenemos muchas funciones asincronas 
//async se pone en la funcion y await en cada cosa que tu sabes que va a demorar porque es una peticion asincrona
router.post("/participante/add", async (req, res) => {
  //obtenemos todo los datos de nuestro formulario 
  //req es lo que obtenemos, osea todo el HTML
  const { nombre, telefono, referencia, cantidad, grupo } = req.body;
  //creamos una arreglo para los errores
  const errors = [];
  //aqui ahora son validaciones en caso no ingrese un campo
  if (!nombre) {
    // console.log("nO estas enviando nombre");
    //Aqui ahora hacemos un push para agregar un contenido en el arreglo
    //el contenido sera un objeto para ver 
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
  //verificamos si tenemos errores 
  if (errors.length > 0) {
    // console.log(errors);
    //si tenemos errores, renderizamos participantes
    //tambien mandamos los errores, nobmre, referencia, o sea todo p 
    res.render("participante/participante", {
      errors,
      nombre,
      referencia,
      telefono,
    });
  } else {
    //en caso no tengas errores
    //esto es prueba
    // const estado = "A";
    // const codigo = 1500;
    // console.log(cantidad, " este es la cantidad ingresada");
    //Hacemos un arreglo de cantidad, que es la cantidad que agrego en un formulario
    for (let i = 0; i < cantidad; i++) {
      // cremaos una arreglo con los datos obtenido 
      const newParticipante = new Participante({
        codigo,
        nombre,
        telefono,
        referencia,
      });
      //lo guardamos en mongo 
      await newParticipante.save();
    }
    //obtenerId(n, grupo);
    //enviamos un mensaje usando flash
    req.flash("success_msg", `Se registro ${nombre}`);
    //lugeo de redigimos a participantes
    //render mandar un archivo que tenags en tu proyecto que sea una vista
    //redirect es para redireccionar por url 
    res.redirect("/participante");
  }
});

router.get("/sorteo", async (req, res) => {
  //Ahora este es para sorteo 
  //obtenemos el sorte
  const premios = await Premio.find(
    {},
    { codigo: 1, premiouno: 1, premiodos: 1 }
  );
  res.render("sorteo", { premios });
});

//Ahora este es para cuando hacemos un sorteo por medio de un codigo
router.post("/sorteo/:codigo", async (req, res) => {
  //creamos un numeor aleatorio
  const numeroAleatorio = Math.floor(Math.random() * (1 - 162)) + 162;
  //buscamos un ganador por medio del numero aleatorio
  const ganador = await Participante.findOne({ id: numeroAleatorio });

  // console.log(ganador);
  //obtenemos el codigo del parametro
  const codigo = req.params.codigo;
  // console.log(codigo);
  //creamos un obejto para publicar el ganador
  const publicar = {
    nombre: ganador.nombre,
    numerorifa: ganador.codigo,
    codigo: codigo,
  }; 
  //buscamos el premio ganador
  const premios = await Premio.find({ codigo: codigo });
  //quitamos el ganador 
  await Participante.remove({id: ganador.id}) 
  console.log(premios);
  //renderizamos a ganador
  res.render("ganador", { publicar, premios });
});   
       
module.exports = router;   
