import federation from '@originjs/vite-plugin-federation';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      federation({
        name: 'shell',
        remotes: {
          pokemonDetailMf:
            env.VITE_DETAIL_REMOTE_URL ??
            'http://localhost:3001/assets/remoteEntry.js',
          pokemonHistoryMf:
            env.VITE_HISTORY_REMOTE_URL ??
            'http://localhost:3002/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
    server: {
      port: 3000,
      strictPort: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
    build: {
      target: 'esnext',
    },
  };
});