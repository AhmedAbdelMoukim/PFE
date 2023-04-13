const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Vehicule = sequelize.define('Vehicule ',
{

    Code_Vehicule:
    {
        type:Sequelize.STRING,
        primaryKey: true,
    },
    
    Matricule:
    {
        type : Sequelize.INTEGER
    },
    State:
    {
        type : Sequelize.STRING
    },
    
    Id_Marque:
    {
        type:Sequelize.STRING
    },
    
    Id_Genre:{
        type:Sequelize.STRING
    },
    
    Code_Str:{

        type:Sequelize.STRING
    },
    
    Id_Type_V:{

        type:Sequelize.STRING
    }



// name:{
// type: Sequelize.STRING,
// primaryKey: true,
// },
// price : {
// type:Sequelize.DOUBLE,
// }

}
)
module.exports=Vehicule;






