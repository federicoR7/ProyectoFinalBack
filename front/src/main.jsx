import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ServicioProvider } from './contexto/ServicioContext.jsx';
import 'bootstrap/dist/css/bootstrap.min.css'; 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ServicioProvider>
    <App />
    </ServicioProvider>
  </React.StrictMode>,
)
