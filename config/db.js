const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("gesion-de-stock", "root", "10112000", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
