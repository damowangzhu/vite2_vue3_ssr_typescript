import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
const vueJsxPlugin = require('@vitejs/plugin-vue-jsx');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsxPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@img': path.resolve(__dirname, 'src/assets/img')
    }
  }
});
