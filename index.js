//Importações principais e variáveis de ambiente;

// Vai disponibilizar o uso de variaveis de ambiente;
require("dotenv").config();
const express = require("express")




//Configuração do App;
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON;




//Configuração do Banco de Dados;
const {connection, authenticate, autenticacao} = require("./database/database");
autenticacao(connection); // efetivar a conexão;




//Definição de rotas;



//Escuta de eventos (listen);
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
});