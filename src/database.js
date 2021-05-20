//Requerimos moogoose para conectarnos
const mongoose = require("mongoose");
(async () => {
    try {
      //Creamos una coneccion usando moogose y lo guardamos en una constante db
      //la url que enviamos lo obtuvimos de nuestro cluster en mongodb atlas
      //Tambien agregamos algunos parametros para la funcionalidad de mongo
      const db = await mongoose.connect(
        "mongodb+srv://diegohr:notepad1245@cluster0.a3scv.mongodb.net/retoJose?retryWrites=true&w=majority",
        {
          useNewUrlParser: true, 
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true,
        } 
      );
      //Enviamos un mensaje por consola en caso funcione todo
      console.log("Mongodb is connected to", db.connection.host);
    } catch (error) { 
      //en caso de error obtenemos el mensaje y lo enviamos por consola
      console.error(error);
    } 
  })();