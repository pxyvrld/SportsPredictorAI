import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Jeśli masz plik index.css, możesz go zaimportować tutaj:
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);