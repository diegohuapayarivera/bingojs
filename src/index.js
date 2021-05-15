const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const flash = require("connect-flash");
const session = require("express-session");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

//Iniciary
const app = express();
require("./database");

//Configuracion
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
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

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "mysecretapp",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(methodOverride("_method"));
app.use(flash());

//Variables globales
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.warning_msg = req.flash("warning_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

//Rutas
app.use(require("./routes/index"));
app.use(require("./routes/participante"));

//Archivos fijos
app.use(express.static(path.join(__dirname, "public")));

//Server listening
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
