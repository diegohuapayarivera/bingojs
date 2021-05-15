const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Iniciary
const app = express();
require("./database");

//Configuracion
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", ".hbs");

//Variables globales 

//Rutas
app.use(require("./routes/index"));

//Archivos fijos
app.use(express.static(path.join(__dirname, "public")));

//Server listening
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
