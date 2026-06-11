import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'pokemonHistoryMf',
      filename: 'remoteEntry.js',
      exposes: {
        './PokemonHistory': './src/exposed/PokemonHistory.tsx',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
  server: {
    port: 3002,
    strictPort: true,
  },
  preview: {
    port: 3002,
    strictPort: true,
  },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});