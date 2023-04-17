// database.js = arquivo de conexão com o banco de dados; (é padrão, pode usar em outro trabalho);
// ele vai ler as variáveis do ambiente e tentar conectar ao MySQL;




//importando a biblioteca que permite a conexão;
const {Sequelize} = require("sequelize");





//Criamos o objeto de conexão;
const connection = new Sequelize(
    process.env.DB_NAME, //nome puxado do arquivo ENV reservado para tabela no database;
    process.env.DB_USER, //puxa do arquivo ENV o nome do usuário responsável pelo banco;
    process.env.DB_PASSWORD, // puxa do arquivo ENV a senha para entrar no bando de dados;
    //por padrão passa o nome do banco criado, usuario e senha;

    // as configuração é passada em objeto, que foi colocado entre {} abaixo, são informações adicionais;
    {
        host: process.env.DB_HOST, //endereço (banco local);
        dialect: "mysql", //qual o banco de dados estamos utilizando, no nosso caso o MySQL;
    }
);




//Estabelexer conexão usando o objeto criado a cima;
async function autenticacao(connection){
    try {
        //Tentar estabelecer conexão
        await connection.authenticate();
        console.log("conexão estabelecida com sucesso!")
    } catch (err){
        // err = objeto que guarda detalhes sobre o erro que aconteceu;
        console.log("Um erro inesperado acontece", err);
    }
};


// exportando para usar em outros arquivos;
module.exports = {connection, autenticacao};


/*
    Não precisa importar o arquivo .env aqui, pois, iremos utilizar essas funções no
    index.js, com isso, vamos importar o arquivo .env somente no index.js
*/