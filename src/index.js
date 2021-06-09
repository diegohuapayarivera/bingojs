//framework para ayudarnos a crear un servidor en node
const express = require("express");
//para usar peticiones PUT y DELETE 
const methodOverride = require("method-override");
//este sirve para decirle a node donde se encuentra todo nuestros archivos
const path = require("path");
//Framework para nuestra viste, es como para que funke como JSF
const Handlebars = require("handlebars");
//este es una version de express con handlebars 
const exphbs = require("express-handlebars");
//lo usamos para mandar mensajes por todo nuestars vistas a traves de objetos globales
const flash = require("connect-flash");
//[ara crear una session pero que no utilizamos ahora :V]
const session = require("express-session");
//Este es para parchar errores de handlebars
//errores como al mostrar un objeto en la vista cuando la iteramos 
const { 
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Iniciary
const app = express();
//traes la bd
require("./database");

//Configuracion
//esta sona es donde nosotros vamos a especificar donde esta cada cosa para nuestro servidor
//puerto 3000
app.set("port", 3000);
//aqui le decimos donde encontrara la caprte de nuestras vista usando PATH 
//path.__dirname hace referencia a donde estas 
app.set("views", path.join(__dirname, "views"));
//Configuramos para que reconozca handlebars
app.engine(
  ".hbs",
  exphbs({
    //donde esta el principal
    defaultLayout: "main",
    //donde esta layout que es la carpeta para el archivo principal
    layoutDir: path.join(app.get("views"), "layouts"),
    //partials es para componentes
    partialsDir: path.join(app.get("views"), "partials"),
    //aqui le decimos que no termina en .html sino en .hbs
    extname: ".hbs",
    //aqui resolvemos algurnos problemas
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
//aqui luego mandamos todo lo configurado a view engine
app.set("view engine", ".hbs");

//middlewares
//no se que es tmmmr :'V
app.use(express.urlencoded({ extended: false }));
//este es para crear una sesion pero no lo utilizamos xD 
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
//este es para los metodos PUT y DELETE 
app.use(methodOverride("_method"));
//ejecutamos flash
app.use(flash());

//Variables globales
//creamos variables para nuestros mensajes
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
}); 

//Rutas
//usamos nuestras rutas
app.use(require("./routes/index"));
app.use(require("./routes/participante"));

//Archivos fijos
//le decimos donde esta nuestro archivo public pero no utilizamos public
app.use(express.static(path.join(__dirname, "public")));

//Server listening
//iniciamos en el puerto ya establecido
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
