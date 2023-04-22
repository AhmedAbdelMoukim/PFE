const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./Routes/authRoute");
const vehiculeRoute = require("./Routes/vehiculeRoute");
const sequelize = require("./config/db");
const ContratRoute = require("./Routes/contratRoute")
const avenantRouter = require("./Routes/avenantRouter")
const Contrat = require("./models/contrat");
const Vehicule = require("./models/vehicule");
const Avenant = require("./models/avenant")
const ContractVehicle = require("./models/contratVehicule");

app.set('view engine','ejs');
app.set('views','views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("cache-control", "no-cache");
    res.setHeader("charset", "utf-8");
   
    next();
  });


  // --------------------------------------------------------
  Avenant.belongsTo(Contrat, {  onDelete: 'cascade' });
  Contrat.hasMany(Avenant),

 


  app.get('/',authRoute)
app.use(vehiculeRoute)
app.use(ContratRoute)
app.use(avenantRouter)
sequelize.sync().then(app.listen(3000));