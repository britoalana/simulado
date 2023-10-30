const { DataTypes } = require('sequelize')
const db = ('../db/conn')
const Postagem = db.define('Postagem', {
    comentarios: {
        Type: DataTypes.STRING,
    },
    like: {
        Type: DataTypes.BOOLEAN
    },
})

module.exports = Postagem