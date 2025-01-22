import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ContextPro from './components/context/ContextPro';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextPro>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ContextPro>
  </React.StrictMode>
);


