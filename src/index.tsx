import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new ReactDOM API
import App from './App';
import { StyledEngineProvider } from '@mui/joy/styles';

import './styles/globals.css'; // Import global CSS styles
import '@fontsource/inter';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
  </React.StrictMode>
);
