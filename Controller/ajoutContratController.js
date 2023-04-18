const Contract = require('../models/contrat'); // import your Contract and Vehicle models

exports.addContract = async (req, res) => {
  //   try {
    const { Id_Contrat, Ref_Contrat, Date_Debut, Date_F, validite} = req.body; // destructure the contract details and associated vehicles from the request body
    
    // create a new contract in the database
    const contract = await Contract.create({
      Id_Contrat,
      Ref_Contrat,
      Date_Debut,
      Date_F,
      validite,
    });
    
    res.render("ajoutVehiculeaContrat",{contract:contract})

  } 
  
    exports.ajoutContratPage=(req,res)=>{
      
      res.render("ajoutContrat")
    }
    
    exports.addContractVehicule = async (req, res) => {
      const Vehicule  = require('../models/vehicule');
      const contract = await Contract.findOne({ where: { Id_Contrat: req.params.contractId } });
     if (!contract) {
      return res.status(404).send('Contract not found');
     } 
     Vehicule.create(
      {
        Code_Vehicule:req.body.code,
        Matricule:req.body.matricule,
        State:req.body.state,
        Id_Marque:req.body.marque,
        Id_Genre:req.body.genre,
        Code_Str:req.body.codeStr,
        Id_Type_V:req.body.typeV

    }
    )    

   
   vehicule = await Vehicule.findByPk(req.body.code);

   await contract.addVehicule(vehicule);



  
  } 
 


