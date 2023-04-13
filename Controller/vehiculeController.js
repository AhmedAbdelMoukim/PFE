const Vehicule = require('../models/vehicule');
exports.getVehicule = (req , res ) =>{
    Vehicule.findAll().then(product => {res.render("Show" , {vehicule:Vehicule}); console.log(Vehicule)}).catch(err => console.log(err));
    res.redirect("/")
};
exports.ajoutvehiculepage = (req , res ) => {
    res.render("ajoutVehicule")
};
exports.addVehicule = (req , res ) => {
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
   
    res.redirect("/")
} 