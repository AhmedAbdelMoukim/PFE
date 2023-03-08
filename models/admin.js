const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Admin = sequelize.define(
  "admin",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

//create function to create admin , it resives admin, and return in then resut if sucessful or , in catch error
const create = (admin) => {
  return Admin.create(admin);
};

//findOne:
const findOne = (email) => {
  return Admin.findOne({
    where: {
      email: email,
    },
  });
};

//findAll:
const findAll = () => {
  return Admin.findAll();
};

//findOneAndUpdate:
const findOneAndUpdate = (email, admin) => {
  return Admin.update(admin, {
    where: {
      email: email,
    },
  });
};

//findOneAndDelete:
const findOneAndDelete = (email) => {
  return Admin.destroy({
    where: {
      email: email,
    },
  });
};

//exporting the functions
module.exports = {
  Admin,
  create,
  findOne,
  findAll,
  findOneAndUpdate,
  findOneAndDelete,
};
