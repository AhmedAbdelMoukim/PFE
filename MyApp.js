const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const authRoute = require("./Routes/authRoute");
const vehiculeRoute = require("./Routes/vehiculeRoute");
const sequelize = require("./config/db");
const ContratRoute = require("./Routes/contratRoute")
const Contrat = require("./models/contrat");
const Vehicule = require("./models/vehicule")

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
  const ContractVehicle = sequelize.define('ContractVehicle', {});
  Contrat.belongsToMany(Vehicule, { through: ContractVehicle });
  Vehicule.belongsToMany(Contrat, { through: ContractVehicle });
app.get('/',authRoute)
app.use(vehiculeRoute)
app.use(ContratRoute)
 
sequelize.sync().then(app.listen(3000));
