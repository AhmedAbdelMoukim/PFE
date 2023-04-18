const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Contract = sequelize.define(
  'contrat',
  {
    Id_Contrat: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    Ref_Contrat: {
      type: Sequelize.STRING
    },
    Date_Debut: {
      type: Sequelize.DATE
    },
    Date_F: {
      type: Sequelize.DATE
    },
    validite: {
      type: Sequelize.BOOLEAN
    }
  },
  {}
);

// Contract.prototype.addVehicule = async function(vehicule) {
//   await this.addVehicules(vehicule, { through: { /* any additional attributes you want to set on the join table */ } });
// }
 

module.exports = Contract;
