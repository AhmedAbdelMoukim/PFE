const router = require("express").Router();
const vehiculeController = require("../Controller/vehiculeController")
router.get("/getVehicule",vehiculeController.getVehicule)
router.get("/ajoutVehiculePage",vehiculeController.ajoutvehiculepage)
router.post("/addVehicle",vehiculeController.addVehicule)
module.exports = router;