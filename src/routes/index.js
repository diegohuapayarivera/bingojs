const express = require("express");
//Como este archivo solo sera para rutas, usamos su metodo Router()
const router = express.Router();
//Traigo el modelo
const Participante = require("../models/Participante");
//Traigo el modelo
const Premio = require("../models/Premio");
//Array para ver los participantes su conteo
let conteoParticipante = [];
//este es una copia del de arriba
let bu = [];

//REcuerda que ya tenemos configurado nuestra carpeta view asi que solo escribe el nombre del archivo

//Cuando consulten '/', vamos a renderisar index
router.get("/", async (req, res) => {
  //Buscamos a todos los participantes y le ponemos 0 al id para que no see vea y 1 al nombre para que se vea
  const participantes = await Participante.find({}, { nombre: 1, _id: 0 });
  //Usamos un MAP para crear un nuevo arreglo  de nuestros participantes que traimos de mongo
  //Esto itera por cada arreglo y nos devuelve participante por cada iteracion
  conteoParticipante = participantes.map((participante) => {
    //Creamos un objeto de lo que mostraremos y lo iniciamos en cantidad 1
    const agregarParticipante = {
      nombre: participante.nombre,
      cantidad: 1,
    };
    //Ahora usamos la funcion some que nos devuelve un arreglo de true o false con una validacion
    //En caso cumpla devuelve true
    //Tiene ocmo parametro p que si su nombre es igual al de participante, ya cumple
    const existe = conteoParticipante.some(
      (p) => p.nombre === participante.nombre
    );
    //console.log(existe)
    //Ahora en caso exista el participante
    if (existe) {
      //vamos a utilizar .map para ver que si en caso el nombre es igual
      //aumenta la cantidad y retorna p que es solo un participante para guardarlo
      const validar = conteoParticipante.map((p) => {
        if (p.nombre === participante.nombre) {
          p.cantidad++;
          return p;
          //En caso no sea igual solo devolvemos p
        } else {
          return p;
        }
      });
      // Ahora terminando el IF, recuerda que todo se guarda en validad
      //Asi que hacemos una copia de validad y la guardamos en conteoParticipante
      // para hacer una copia y no mandar el original se usa los tres punto antes del arreglo
      //console.log(validar)
      conteoParticipante = [...validar];
      //Por motivos del mundo no sirve cuando se guarda en conteoparticipante cuando lo guardo
      //Pero si en bu cuando lo guardo
      bu = [...validar];

      //console.log(conteoParticipante)
    } else {
      //Ahora cuando no existe el participante, guardammos una copia de conteoParticipante que es el original
      // y agregamos el objeto agregarParticipante que seria el nuevo participante
      conteoParticipante = [...conteoParticipante, agregarParticipante];
      //Aqui lo mismo no funka conteoParticipante asi que estoy haciendo una copia de conteoParticipante
      bu = [...bu, agregarParticipante];
    }
  });
  //Luego ahora buscamos los premios
  //Cuando tiene 1 es que se vizualisara, si tiene 0 entonces no
  const premios = await Premio.find(
    {},
    { codigo: 1, premiouno: 1, premiodos: 1 }
  );
  //luego renderizo index y envio los objetos, Bu y premios 
  res.render("index", {
    bu,
    premios,
  });
});

//Aqui es una prueba para hacer el sorteo de premios pero en index 
//Fallo y lo mandamos a participantes para manejarlo mejor 
//Aqui recibe un codigo, para recibir un parametro por medio de una URL se utiliza : y luego el nombre del parametro
router.post("/:codigo", (req, res) => {
  //Asi se obtiene un parametro
  //Req, es lo que nos manda la pagina 
  //params es parametro 
  //y codigo es codigo
  const codigo = req.params.codigo;
  //Ahora vemos la cantidad del arreglo Bu que es donde esta todo nuestros participantes
  const cantidad = bu.length;

  //Hago una seleccion de numero aleatorio por la cantidad usando floor y random
  const numeroAleatorio = Math.floor(Math.random() * cantidad);
  // console.log(bu[numeroAleatorio]);
  //const ganador = bu[numeroAleatorio]
  //Renderizamos index y mandamos otra ves el arreglo de Participante
  //Recuerda qye esto no funka porque no se ve los premios porque no los envio
  //Tambien al solo enviar otra ves bu, envias algo vacio
  res.render("index", bu);
});

module.exports = router;
