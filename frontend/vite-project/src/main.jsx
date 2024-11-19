import { StrictMode } from 'react'; // Importa o StrictMode do React, que ativa verificações adicionais e avisos durante o desenvolvimento.
import { createRoot } from 'react-dom/client'; // Importa a função createRoot do pacote react-dom/client para renderizar o aplicativo React no DOM.
import './index.css'; // Importa o arquivo de estilos globais (index.css) para aplicar o CSS no aplicativo.
import App from './App.jsx'; // Importa o componente principal "App" de outro arquivo (App.jsx).

createRoot(document.getElementById('root')).render( // Cria o root do React, buscando o elemento DOM com o ID 'root' para renderizar o aplicativo.
  <StrictMode> {/* Envolvem o componente "App" com StrictMode, que ajuda a detectar problemas no desenvolvimento. */}
    <App /> {/* Renderiza o componente "App" dentro do StrictMode. */}
  </StrictMode>,
);
