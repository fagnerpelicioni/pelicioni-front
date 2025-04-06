import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM API
import App from './App';
import './styles/globals.css'; // Import global CSS styles

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
