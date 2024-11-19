const express = require('express'); // Importa o módulo express, que é um framework para construir aplicações web em Node.js.
const router = express.Router(); // Cria um novo objeto router, que permite definir rotas de forma modular.

const controller = require('./controller'); // Importa o módulo 'controller', que contém a lógica de controle para as rotas.

 // Rota para a raiz
router.get('/', (req, res) => { // Define uma rota GET para a raiz ('/') da aplicação.
  res.send('Servidor rodando! Acesse /veiculos para mais informações.'); // Envia uma resposta ao cliente informando que o servidor está funcionando e sugere acessar a rota /veiculos.
});

// Rotas para veiculos
router.get('/veiculos', controller.getVeiculos); // Define uma rota GET para '/veiculos' que chama a função getVeiculos do controller para obter a lista de veículos.
router.get('/veiculos/:placa', controller.getVeiculosByPlaca); // Define uma rota GET para '/veiculos/:placa' que chama a função getVeiculosByPlaca do controller, onde ':placa' é um parâmetro dinâmico.
router.post('/veiculos', controller.createVeiculos); // Define uma rota POST para '/veiculos' que chama a função createVeiculos do controller para criar um novo veículo.
router.put('/veiculos/:placa', controller.updateVeiculos); // Define uma rota PUT para '/veiculos/:placa' que chama a função updateVeiculos do controller para atualizar um veículo existente com base na placa.
router.delete('/veiculos/:placa', controller.deleteVeiculos); // Define uma rota DELETE para '/veiculos/:placa' que chama a função deleteVeiculos do controller para remover um veículo com base na placa.

module.exports = router; // Exporta o objeto router para que ele possa ser utilizado em outros arquivos da aplicação.