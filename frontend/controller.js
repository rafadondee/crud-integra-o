const veiculos = []; // Array global para armazenar os veículos

function getVeiculos(req, res) { // Função para obter a lista de todos os veículos
  res.json(veiculos); // Retorna a lista completa de veículos em formato JSON
}

function getVeiculosByPlaca(req, res) { // Função para obter um veículo específico pelo número da placa
  const { placa } = req.params; // Extrai o parâmetro 'placa' da requisição
  const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo na lista pelo número da placa
  if (veiculo) { // Se o veículo for encontrado
    res.json(veiculo); // Retorna o veículo encontrado em formato JSON
  } else { // Se o veículo não for encontrado
    res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna um status 404 com uma mensagem de erro
  }
}

function createVeiculos(req, res) { // Função para criar um novo veículo
  const { placa, marca, modelo, ano } = req.body; // Extrai os dados do veículo do corpo da requisição

  // Verifica se já existe um veículo com a mesma placa
  if (veiculos.find(v => v.placa === placa)) { // Se já existir um veículo com a mesma placa
    return res.status(400).json({ message: 'Veículo com essa placa já existe.' }); // Retorna um status 400 com uma mensagem de erro
  }

  const veiculo = { placa, marca, modelo, ano }; // Cria um novo objeto veículo com os dados fornecidos
  veiculos.push(veiculo); // Adiciona o veículo à lista global de veículos
  res.status(201).json({ message: 'Veículo cadastrado com sucesso.', veiculo }); // Retorna um status 201 e uma mensagem de sucesso com os dados do veículo
}

function updateVeiculos(req, res) { // Função para atualizar os dados de um veículo existente
  const { placa } = req.params; // Extrai o parâmetro 'placa' da requisição
  const { marca, modelo, ano } = req.body; // Extrai os dados que podem ser atualizados do corpo da requisição
  const veiculo = veiculos.find(v => v.placa === placa); // Busca o veículo na lista pelo número da placa
  if (veiculo) { // Se o veículo for encontrado
    // Atualiza as propriedades do veículo, se fornecidas
    veiculo.marca = marca || veiculo.marca; // Atualiza a marca, se fornecida; caso contrário, mantém a atual
    veiculo.modelo = modelo || veiculo.modelo; // Atualiza o modelo, se fornecido; caso contrário, mantém o atual
    veiculo.ano = ano || veiculo.ano; // Atualiza o ano, se fornecido; caso contrário, mantém o atual
    res.json({ message: 'Informações do veículo atualizadas com sucesso.', veiculo }); // Retorna uma mensagem de sucesso e os dados atualizados do veículo
  } else { // Se o veículo não for encontrado
    res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna um status 404 com uma mensagem de erro
  }
}

function deleteVeiculos(req, res) { // Função para excluir um veículo
  const { placa } = req.params; // Extrai o parâmetro 'placa' da requisição
  const veiculoIndex = veiculos.findIndex(v => v.placa === placa); // Encontra o índice do veículo na lista pelo número da placa
  if (veiculoIndex !== -1) { // Se o veículo for encontrado
    veiculos.splice(veiculoIndex, 1); // Remove o veículo da lista pelo índice encontrado
    res.json({ message: 'Veículo excluído com sucesso.' }); // Retorna uma mensagem de sucesso
  } else { // Se o veículo não for encontrado
    res.status(404).json({ message: 'Veículo não encontrado.' }); // Retorna um status 404 com uma mensagem de erro
  }
}

module.exports = { // Exporta as funções para que possam ser utilizadas em outros arquivos
  getVeiculos,
  getVeiculosByPlaca,
  createVeiculos,
  updateVeiculos,
  deleteVeiculos,
};