import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3001',// URL de tu servidor 
      '/api/clientes':'http://localhost:5173'
    }
  }
});
