const { DataTypes } = require("sequelize");
const db = require("../db/conn");
const user = require("./user");

const postagem = db.define("postagem", {
  comentarios: {
    type: DataTypes.STRING,
  },
  like: {
    type: DataTypes.BOOLEAN,
  },
});

postagem.belongsTo(user);
user.hasMany(postagem);

module.exports = postagem;
