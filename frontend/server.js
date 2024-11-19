const express = require('express'); // Importa o módulo express, que é um framework para construir aplicações web em Node.js.
const bodyParser = require('body-parser'); // Importa o módulo body-parser, que é usado para analisar o corpo das requisições HTTP.
const routes = require('./routes'); // Importa as rotas definidas em um arquivo separado chamado 'routes'.
const cors = require('cors'); // Importa o módulo cors, que permite o compartilhamento de recursos entre diferentes origens (Cross-Origin Resource Sharing).

const app = express(); // Cria uma nova instância da aplicação Express.
    app.use(bodyParser.json()); // Configura o middleware para analisar o corpo das requisições como JSON.
    app.use(cors()); // Habilita o CORS para permitir requisições de diferentes origens.
    app.use('/', routes); // Define as rotas da aplicação, onde todas as requisições para a raiz ('/') serão tratadas pelas rotas importadas.

    const port = 3000; // Define a porta em que o servidor irá escutar as requisições.
    app.listen(port, () => { // Inicia o servidor e faz com que ele escute na porta definida.
    console.log(`Servidor rodando em http://localhost:${port}`); // Exibe uma mensagem no console informando que o servidor está em execução e a URL onde pode ser acessado.
});