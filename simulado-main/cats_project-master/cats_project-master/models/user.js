const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const user = db.define("user", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

module.exports = user;
