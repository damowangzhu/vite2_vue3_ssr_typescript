import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsxPlugin from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_ASSET_URL,
    plugins: [vue(), vueJsxPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@img': path.resolve(__dirname, 'src/assets/img')
      }
    }
  };
});
