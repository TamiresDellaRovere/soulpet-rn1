const Cliente = require("../database/cliente"); // Após criar o o arquivo Cliente.Js, importar para o index.js, logo abaixo da função de configuração do Database;
const Pet = require("../database/pet"); // Após criar o o arquivo Pet.Js, importar para o index.js, logo abaixo da função de configuração do Database;
const {Router} = require ("express");
const router = Router(); // Criar o grupo de rotas (/pets);


//INICIO ROTAS PETS

//inserir dados pet
router.post("/pets", async (req, res) => {
    const { nome, tipo, porte, data_nasc, clienteId } = req.body;

    try {
        //findbyPk -> Pk -> Primari Key 
        const petCliente = await Cliente.findByPk(clienteId); // findByPk substitui o Cliente.findOne({ where: { id: clienteId }});
        if (petCliente) {
            const pet = await Pet.create({ nome, tipo, porte, data_nasc, clienteId });
            res.status(201).json(pet);
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
    }
    catch (err) {
        console.error(err) // console.error escreve em vermelho no terminal;
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});




//consultar todos os pets existentes
router.get("/pets", async (req, res) => {
    const listaPets = await Pet.findAll();
    res.json(listaPets);
});




//consultar os pets por id
router.get("/pets/:id", async (req, res) => {
    const { id } = req.params;

    const buscarPet = await Pet.findByPk(id);
    if (buscarPet) {
        res.json(buscarPet);
    } else {
        res.status(404).json({ message: "Pet não encontrado." });
    }
});




//atualizar/editar dados dos pets;
router.put("/pets/:id", async (req, res) => {
    const { nome, tipo, porte, data_nasc } = req.body; //dados que virão do Json

    const atualizarPet = await Pet.findByPk(req.params.id);// findByPk -> checa a existencia do pet; // SELECT * FROM pets WHERE id = "req.params.id"

    //se pet é null -> não existe o id digitado na pesquisa;
    try {
        if (atualizarPet) {// se o pet existir executa
            //IMPORTANTE: Indicar qual o pet deve ser atualizado;
            // 1º Arguumento: Dados novos, 2º Arg: Where;
            await Pet.update(
                { nome, tipo, porte, data_nasc },
                { where: { id: req.params.id } } // id: -> nome da coluna na tabela, req.params.id -> numero do id digitado na rota;
            );
            // await pet.update({ nome, tipo, dataNasc, porte }); -> pode ser feito assim também;
            res.json({ message: "O pet foi editado." });
        } else {// se o pet não existir envia o erro
            res.status(404).json({ message: "O pet não foi encontrado." })
        }

    } 
    catch (err) { // se houver algum erro inesperado, recebe esta resposta com o erro especificado no console.
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});




//deletar pet
router.delete("/pets/:id", async (req, res) => {
    // Precisamos checar se o pet existe antes de apagar
    const pet = await Pet.findByPk(req.params.id);

    try {
        if (pet) {
            // pet existe, podemos apagar
            await pet.destroy();
            res.json({ message: "O pet foi removido." });
        } else {
            res.status(404).json({ message: "O pet não foi encontrado" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Um erro aconteceu." });
    }
});

//FINAL ROTAS PETS

module.exports = router;