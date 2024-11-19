import React, { useState, useEffect } from 'react'; // Importa React e hooks useState e useEffect
import axios from 'axios'; // Importa axios para realizar requisições HTTP
import './App.css'; // Importa o arquivo de estilos CSS

const App = () => {
  const [veiculos, setVeiculos] = useState([]); // Declara o estado inicial para a lista de veículos
  const [formData, setFormData] = useState({ // Declara o estado inicial para os dados do formulário
    placa: '',
    marca: '',
    modelo: '',
    ano: ''
  });
  const [isEditing, setIsEditing] = useState(false); // Declara o estado para controlar se estamos editando um veículo

  useEffect(() => {
    fetchVeiculos(); // Carrega os veículos ao montar o componente
  }, []); // O array vazio indica que isso será executado apenas uma vez

  const fetchVeiculos = async () => {
    // Função para buscar os veículos da API
    try {
      const response = await axios.get('http://localhost:3000/veiculos'); // Faz uma requisição GET para a API
      setVeiculos(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error(error); // Exibe erros no console, caso ocorram
    }
  };

  const handleInputChange = e => {
    // Função para atualizar os campos do formulário conforme o usuário digita
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Atualiza o estado com o valor correspondente ao campo
  };

  const handleCreateVeiculos = async e => {
    // Função para cadastrar um novo veículo
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.post('http://localhost:3000/veiculos', formData); // Envia os dados do formulário via POST
      setFormData({ placa: '', marca: '', modelo: '', ano: '' }); // Limpa o formulário
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Exibe erros no console
    }
  };

  const handleUpdateVeiculos = async e => {
    // Função para atualizar os dados de um veículo existente
    e.preventDefault(); // Previne o comportamento padrão do formulário
    try {
      await axios.put(`http://localhost:3000/veiculos/${formData.placa}`, formData); // Envia os dados atualizados via PUT
      setFormData({ placa: '', marca: '', modelo: '', ano: '' }); // Limpa o formulário
      setIsEditing(false); // Finaliza o modo de edição
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Exibe erros no console
    }
  };

  const handleDeleteVeiculos = async placa => {
    // Função para excluir um veículo
    try {
      await axios.delete(`http://localhost:3000/veiculos/${placa}`); // Faz uma requisição DELETE para a API
      fetchVeiculos(); // Atualiza a lista de veículos
    } catch (error) {
      console.error(error); // Exibe erros no console
    }
  };

  const handleEditVeiculo = veiculo => {
    // Função para carregar os dados de um veículo no formulário para edição
    setFormData({
      placa: veiculo.placa,
      marca: veiculo.marca,
      modelo: veiculo.modelo,
      ano: veiculo.ano
    });
    setIsEditing(true); // Ativa o modo de edição
  };

  return (
    <div>
      <h1>Veículos</h1> {/* Título da aplicação */}
      <form onSubmit={isEditing ? handleUpdateVeiculos : handleCreateVeiculos}> {/* Formulário para cadastrar ou editar */}
        <label>
          Placa:
          <input
            type="text"
            name="placa"
            value={formData.placa} // Liga o campo ao estado
            onChange={handleInputChange} // Atualiza o estado ao digitar
            disabled={isEditing} // Desabilita a edição da placa no modo de edição
          />
        </label>
        <label>
          Marca:
          <input
            type="text"
            name="marca"
            value={formData.marca} // Liga o campo ao estado
            onChange={handleInputChange} // Atualiza o estado ao digitar
          />
        </label>
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo} // Liga o campo ao estado
            onChange={handleInputChange} // Atualiza o estado ao digitar
          />
        </label>
        <label>
          Ano:
          <input
            type="text"
            name="ano"
            value={formData.ano} // Liga o campo ao estado
            onChange={handleInputChange} // Atualiza o estado ao digitar
          />
        </label>
        <button type="submit">{isEditing ? 'Atualizar' : 'Cadastrar'}</button> {/* Botão dinâmico para cadastrar ou atualizar */}
      </form>

      <ul>
        {veiculos.map(veiculo => (
          // Mapeia os veículos e renderiza cada um como um item da lista
          <li key={veiculo.placa}>
            {veiculo.placa} - {veiculo.marca} - {veiculo.modelo} - {veiculo.ano} {/* Exibe os detalhes do veículo */}
            <button onClick={() => handleEditVeiculo(veiculo)}>Editar</button> {/* Botão para editar */}
            <button onClick={() => handleDeleteVeiculos(veiculo.placa)}>Excluir</button> {/* Botão para excluir */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App; // Exporta o componente para ser usado em outros arquivos
