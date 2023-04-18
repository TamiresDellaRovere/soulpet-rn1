//Importações principais e variáveis de ambiente;
require("dotenv").config();// Vai disponibilizar o uso de variaveis de ambiente;
const express = require("express")




//Configuração do App;
const app = express();
app.use(express.json()); //Possibilitar transitar dados usando JSON;





//Configuração do Banco de Dados;
const {connection, authenticate, autenticacao} = require("./database/database");
autenticacao(connection); // efetivar a conexão;
const Cliente = require("./database/cliente"); // Após criar o o arquivo Cliente.Js, importar para o index.js, logo abaixo da função de configuração do Database;
const Endereco = require("./database/endereco"); // Após criar o o arquivo Endereco.Js, importar para o index.js, logo abaixo da função de configuração do Database;





//Definição de rotas;

//ver os clientes cadastrados
app.get("/clientes", async (req, res) => {
    // SELECT * FROM clientes; -> vai ter a mesma função
    const listaClientes = await Cliente.findAll();
    res.json(listaClientes);
}); // "/clientes" -> mesma rota pois essa é apenas leitura. -> app.get



//consultar cliente por id
// /clientes/5 -> cliente no id 5 
app.get ("/clientes/:id", async (req, res) => {
    // SELECT * FROM clientes WHERE id = 5; -> codigo no MySQL
    const cliente = await Cliente.findOne({
        where: {id: req.params.id },
        include: [Endereco], //trás junto os dados de endereço;
    });
    // findOne -> vai achar um cliente dentro de Cliente, where -> onde , id: req.params.id -> id do cliente inserido na rota;

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({message: "Usuário não encontrado."});
    }
});



// inserir dados no cliente.
app.post("/clientes", async(req, res) => {
    // obter dados do corpo da requisição
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
    // tem que ter o try catch para não travar o código, ele para o código e retorna o erro caso não de certo;
}); // "/clientes" -> mesma rota pois essa é para inserir dados. -> app.post



// editar informações dos clientes;
app.put( "/clientes/:id", async (req, res) => {
    const {nome, email, telefone, endereco } = req.body; //vai pegar as informações do cliente no corpo do objeto;
    const {id} = req.params; //usa o params por é o que captura o id apos a barra;
    
    try{
        const cliente = await Cliente.findOne({ where: { id } });
        if(cliente){ // chama o cliente, e executa os if
            if(endereco) { // se endereço existir, atualiza, se não, segue o codigo sem erro;
            await Endereco.update(endereco, { where: { clienteId: id } }); // endereço já é um objeto agrupado, por isso coloca o clienteId: id;
            }
            await Cliente.update({ nome, email, telefone}, { where: { id } }); // vai atualizar as informações passadas do cliente;
            res.status(200).json({ message: "Cliente editado com sucesso!" });
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });// se o id solicitado não existir ele retorna o erro;
        }

    }catch {
        res.status(500).json({message: "Um erro aconteceu."});
    }
}); // "/clientes" -> mesma rota pois essa é para atualizar dados. -> app.put




//exluir o cliente;
app.delete("/clientes/:id", async (req, res) => {
    const { id } = req.params; //Pega o id informado na rota 
    const buscarCliente = await Cliente.findOne({ where: { id } }); // procura se o id informado na rota existe
    try{
        if (buscarCliente) {
            await buscarCliente.destroy(); // exclui o cliente se o id existir e for correspondente a algum cliente, não informou o Id dentro do destroy() pois na variavel buscarCliente ele já é especificado;
            res.status(200).json({ message: "Cliente removido com sucesso!" });
        } 
        else { // se o id não for valido informa essa mensagem;
            res.status(404).json({ message: "Cliente não encontrado." });// se o id solicitado não existir ele retorna o erro;
        }
    }
    catch(err){
        console.error(err); // se der algum erro ele informa o erro e mostra a mensagem;
        res.status(500).json({message: "Um erro aconteceu."});
    };
});





//Escuta de eventos (listen);
app.listen(3000, () => {
    // Force = apaga tudo e recria as tabelas;
    connection.sync({force: true}) // Gerar as tabelas a partir do model;
    console.log("Servidor rodando em http://localhost:3000")
});