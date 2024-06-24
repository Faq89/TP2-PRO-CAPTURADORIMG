import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react()
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',
      '/api/clientes': 'http://localhost:5173'
    }
  },
  resolve: {
    alias: {
      // Asegúrate de que las alias de Material-UI apunten a las versiones correctas
      '@mui/material': '@mui/material',
      '@mui/icons-material': '@mui/icons-material'
    }
  }
});
