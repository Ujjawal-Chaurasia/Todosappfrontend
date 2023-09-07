import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
(() => {
    console.log('webpack worked')
  })()
root.render(
    <App />
);