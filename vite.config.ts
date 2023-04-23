import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import visualizer from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';

const path = require('path');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
    svgr(),
    visualizer({
      open: true, //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://8.219.8.4:1005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
