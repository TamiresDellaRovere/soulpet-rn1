// Modelo para gerar tabela de clientes no MySQL;
// Mapeamento: cada propriedade vira uma coluna da tabela;

//DataTypes = servir para definir tipo da coluna;
const {DataTypes} = require("sequelize"); // traz as opções de tipos de coluna existentes no MySQL; Ex: STRING(VARCHAR), INT, CHAR;
const {connection} = require("./database"); // traz a conecctions do arquivo database.js


const Cliente = connection.define("cliente", {
    // a coluna vai ser nome: abre o {} para definir as caracteristicas da coluna;
    nome: {
        type: DataTypes.STRING(130), //define tipo varchar com limite de 130 caracteres;
        allowNull: false, //aplica o NOT NULL na coluna, o campo se torna obrigatório.
    }, // essas configurações corresponde: nome VARCHAR(130) NOT NULL no MySQL;
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true //Define que não pode ter outro valor igual, é unico;
    }, // email VARCHAR UNIQUE NOT NULL
    telefone: {
        type: DataTypes.STRING, //quando deixa o STRING vazio sem definição de caractere, ele mantem o maximo que é 255;
        allowNull: false,
    },// telefone VARCHAR NOT NULL;
});


// Associação 1:1 (One-to-One);
const Endereco = require("./endereco");

//ligação entre as tabelas de Cliente e Endereco:
// cliente tem um Endereço
// Endereço ganha uma chave estrangeira (nome do model + id) -> aqui no caso é "cliente_id"
// Chave estrangeira = clienteId
Cliente.hasOne(Endereco); // cliente tem um Endereço
Endereco.belongsTo(Cliente); // endereço pertence a um Client

//has é a chave que vai ser importada -> ex:(id)
//belongs é o que vai receber a chave estrangeira -> ex:(ClienteId)


module.exports = Cliente;




// const cliente = {
//     // coluna: "valor"
//     nome: "Tamires Sanchez", //VARCHAR no MySQL
//     email: "tamires@gmail.com", //VARCHAR no MySQL
//     telefone: "(17) 9-9999-9999" //VARCHAR no MySQL
// }