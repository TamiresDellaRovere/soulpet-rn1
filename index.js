//Importações principais e variáveis de ambiente;
require("dotenv").config();// Vai disponibilizar o uso de variaveis de ambiente;
const express = require("express")



//Configuração do App;
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON;




//Configuração do Banco de Dados;
const { connection, authenticate, autenticacao } = require("./database/database");
autenticacao(connection); // efetivar a conexão;




//Definição de rotas; Vai trazer as rotas para que funcione no express;
const rotasClientes = require("./routes/clientes"); // -> importa as rotas colocadas em clientes.js em routes
const rotasPets = require("./routes/pets"); // -> importa as rotas colocadas em pets.js em routes

app.use(rotasClientes); // -> informa ao express que é para utilizar as rotas dos aquivos clientes.js em routes
app.use(rotasPets); // -> informa ao express que é para utilizar as rotas dos aquivos pets.js em routes



//Escuta de eventos (listen);
app.listen(3000, () => {
    // Force = apaga tudo e recria as tabelas;
    connection.sync({ force: true }) // Gerar as tabelas a partir do model;
    console.log("Servidor rodando em http://localhost:3000")
});