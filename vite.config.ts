import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/whos-that-pokemon/',
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
