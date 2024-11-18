import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/redux-todolist/',  
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});
