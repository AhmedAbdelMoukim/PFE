const router = require("express").Router();
const contratController = require("../Controller/ajoutContratController");
router.get("/addContratPage",contratController.ajoutContratPage)
router.post("/addContrat",contratController.addContract);
router.post("/addvehiculeContrat/:contractId",contratController.addContractVehicule);

module.exports = router;