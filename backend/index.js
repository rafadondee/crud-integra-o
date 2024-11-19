// Importando os módulos necessários
const express = require('express'); // Framework para construir aplicações web
const bodyParser = require('body-parser'); // Middleware para analisar o corpo das requisições
const cors = require('cors');  // Importando o pacote CORS - é um mecanismo para integrar aplicações

// Inicializando a aplicação Express
const app = express();

// Habilita CORS para todas as origens
app.use(cors());  // Permite que requisições de qualquer origem sejam aceitas. Para restringir, você pode especificar uma origem.

// Usando body-parser para entender o corpo das requisições em JSON
app.use(bodyParser.json());

// Array para armazenar os veículos
const veiculos = [];

// Rota para obter todos os veículos
app.get('/veiculos', (req, res) => {
    res.json(veiculos); // Retorna todos os veículos em formato JSON
});

// Rota para obter um veículo específico por placa
app.get('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Obtém a placa da URL
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo pela placa
    if (veiculo) {
        res.json(veiculo); // Se encontrado, retorna o veículo
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Se não encontrado, retorna erro 404
    }
});

// Rota para cadastrar um novo veículo
app.post('/veiculos', (req, res) => {
    const { placa, marca, modelo, ano } = req.body; // Obtém os dados do veículo do corpo da requisição
    const veiculo = { placa, marca, modelo, ano }; // Cria um novo objeto de veículo
    veiculos.push(veiculo); // Adiciona o veículo ao array
    res.status(201).json({ message: 'Veículo cadastrado com sucesso.' }); // Retorna sucesso com status 201
});

// Rota para atualizar as informações de um veículo
app.put('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Obtém a placa da URL
    const { marca, modelo, ano } = req.body; // Obtém os dados a serem atualizados do corpo da requisição
    const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo pela placa
    if (veiculo) {
        // Atualiza os dados do veículo se ele for encontrado
        veiculo.marca = marca || veiculo.marca;
        veiculo.modelo = modelo || veiculo.modelo;
        veiculo.ano = ano || veiculo.ano;
        res.json({ message: 'Informações do veículo atualizadas com sucesso.' }); // Retorna sucesso
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Se não encontrado, retorna erro 404
    }
});

// Rota para excluir um veículo
app.delete('/veiculos/:placa', (req, res) => {
    const { placa } = req.params; // Obtém a placa da URL
    const veiculoIndex = veiculos.findIndex(v => v.placa === placa); // Busca o índice do veículo pela placa
    if (veiculoIndex !== -1) {
        veiculos.splice(veiculoIndex, 1); // Remove o veículo do array
        res.json({ message: 'Veículo excluído com sucesso.' }); // Retorna sucesso
    } else {
        res.status(404).json({ message: 'Veículo não encontrado.' }); // Se não encontrado, retorna erro 404
    }
});

// Define a porta do servidor
const port = 3000;
// Inicia o servidor na porta especificada
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`); // Log para indicar que o servidor está rodando
});