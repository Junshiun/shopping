import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import Contex from "./context/Context.js"

ReactDOM.render(
  <React.StrictMode>
    <Contex>
      <App />
    </Contex>
  </React.StrictMode>,
  document.getElementById('root')
);