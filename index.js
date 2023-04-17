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
const Cliente = require("./database/cliente"); // Após criar o o arquivo Cliente.Js, importar para o index.js, logo abaixo da função de configuração do Database;
const Endereco = require("./database/endereco");




//Definição de rotas;
app.post("/clientes", async(req, res) => {
    const {nome, email, telefone, endereco } = req.body; //Coletar os dados do req.body;

    try{ //se dar certo adiciona na tabela;
        const novoCliente = await Cliente.create(
            {nome, email, telefone, endereco},
            {include: [Endereco]} // permite inserir cliente e endereço num comando -> pega os dados adicionado no objeto endereco do postman e adiciona na tabela Endereco do MySQL;
            );
        res.status(201).json(novoCliente);

    } catch (err) { // se der erro aciona o catch e informa o erro;
        console.log(err);
        res.status(500).json({message: "um erro aconteceu."});
    }
}); // tem que ter o try catch para não travar o código, ele para o código e retorna o erro caso não de certo;




//Escuta de eventos (listen);
app.listen(3000, () => {
    // Force = apaga tudo e recria as tabelas;
    connection.sync({force: true}) // Gerar as tabelas a partir do model;
    console.log("Servidor rodando em http://localhost:3000")
});



