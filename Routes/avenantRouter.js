const router = require("express").Router();
const avenantController = require("../Controller/avenantController");

router.get("/ajoutAvenantPage",avenantController.pageAvenant)
// page de recherche Contrat 
router.post("/AvenantOptionPage",avenantController.AvenantOptionPage)
// page choisi option 
router.get("/ajoutAvenantprologoation",avenantController.ajoutAvenantPrologationPage)
router.post("/submitDate",avenantController.SubmitDate)

router.get("/ajoutAvenantVehicule",avenantController.AvenantVehiculePage)
router.post("/ReplaceVehiculePage",avenantController.avenantvehiculeremplacePAge)
router.post("/addVehicule",avenantController.avenantremplacementvehicule)

module.exports = router;