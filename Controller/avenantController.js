
exports.pageAvenant=(req,res)=>{
    res.render("ajoutAvenant")

  }
  exports.AvenantOptionPage=(req,res)=>{
    res.render("AvenantOption",{contratID:req.body.contract_id})
    console.log(req.body.contract_id);
    }
 

    exports.ajoutAvenantPrologationPage = (req, res) => {
        console.log(req.query.value);
        const contract_id = req.query.value;
        res.render("AvenantPrologation",{Contrat:contract_id })
        // rest of your code here
      }

   
      
    exports.SubmitDate= async (req,res)=>{
       const Contract = require('../models/contrat');
       const Avenant = require('../models/avenant')
     try {
        const contractId = req.query.value; // get the contract ID from the request parameters
        const newDateF = req.body.endDate; // get the new value for Date_F from the request body
        console.log(req.body.endDate,req.query.value)
        // find the contract by ID
        const contract = await Contract.findOne({
      where: {
        Id_Contrat: contractId
      }
         });

     if (!contract) {
      // if the contract is not found, return an error response
      return res.status(404).json({ error: 'Contract not found' });
     }

        // update the Date_F field with the new value
        contract.Date_F = newDateF;

     // save the changes to the database
        await contract.save();
        const now = new Date();

        const avenant2 = await Avenant.create({
          date: now,
          ContractId: contract.id
        });

        // return a success response
        return res.json({ message: 'Contract updated successfully' });
        } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error' });
    }

};
// ----------------------Avenant Vehicule -----------------------------
exports.AvenantVehiculePage= async (req,res)=>{
  contrat = req.query.value; 
  console.log(contrat);
  const Contrat = require('../models/contrat');
  const VehiculeContrat = require('../models/contratVehicule');
  const Vehicule = require('../models/vehicule');

  try {
    // find the Vehicule_IDs from VehiculeContrat that are linked to the Contract_ID
    const vehiculeContrats = await VehiculeContrat.findAll({
      attributes: ['VehiculeCodeVehicule'],
      where: {
        contratIdContrat: contrat
      }
    });

    // map the Vehicule_IDs to an array
    const vehiculeIDs = vehiculeContrats.map(vc => vc.Vehicule_ID);

    // find the Vehicules that correspond to the Vehicule_IDs
    const vehicules = await Vehicule.findAll({
      where: {
        Code_Vehicule: vehiculeIDs
      }
    });
    // map the Vehicules to an array of their IDs
    const vehiculeIDs2 = vehicules.map(v => v.Id_Vehicule);
    
    // return the Vehicule_IDs
    
    res.render("contratVehicule", { vehiculeIDs2: vehiculeIDs2 });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
exports.avenantvehiculeremplacePAge = (req,res)=>{
  const Vehicule = req.body.vehicle

  res.render("ReplaceVehicule",{Vehicule})

}

exports.avenantremplacementvehicule = async (req,res)=> {
 
   const id = req.query.value; // get the ID from the request query
  const { code, matricule, state, marque, genre, codeStr, typeV } = req.body; // get the vehicle information from the request body

  try {
    // find the vehicle by its ID
    const vehicle = await Vehicule.findOne({ where: { Code_Vehicule: id } });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    // update the vehicle information
    vehicle.Code_Vehicule = code;
    vehicle.Matricule = matricule;
    vehicle.State = state;
    vehicle.Id_Marque = marque;
    vehicle.Id_Genre = genre;
    vehicle.Code_Str = codeStr;
    vehicle.Id_Type_V = typeV;

    // save the updated vehicle to the database
    await vehicle.save();

    return res.json({ message: 'Vehicle updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};








    