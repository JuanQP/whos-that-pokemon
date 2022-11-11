import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    base: process.env.BASE_URL ?? '/',
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src')},
        { find: '@assets', replacement: path.resolve(__dirname, './src/assets')},
        { find: '@components', replacement: path.resolve(__dirname, './src/components')},
        { find: '@hooks', replacement: path.resolve(__dirname, './src/hooks')},
        { find: '@pages', replacement: path.resolve(__dirname, './src/pages')},
      ]
    },
    plugins: [react()],
  })
}
