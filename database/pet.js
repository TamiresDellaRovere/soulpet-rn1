const { DataTypes, STRING } = require("sequelize");
const { connection } = require("./database"); // função connection no arquivo database;
const Cliente = require("./cliente");

const Pet = connection.define("pet", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    porte: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    data_nasc: {
        type: DataTypes.DATEONLY
    },
});


//Relacionamento com cliente;
// Associação 1:N -> um para muitos -> existe a possibilidade de um cliente ter muitos pets;
Cliente.hasMany(Pet); // um cliente tem varios pets;
Pet.belongsTo(Cliente); // Um pet pertence a um cliente;

module.exports = Pet;