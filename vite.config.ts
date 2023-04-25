import { defineConfig } from 'vite';
import visualizer from 'rollup-plugin-visualizer';
import svgr from 'vite-plugin-svgr';
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
      open: process.argv.includes('analyzer'), //注意这里要设置为true，否则无效
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'static/[name]-[hash].[ext]',
        manualChunks: {
          react: [
            'axios',
            'react',
            'react-dom',
            'react-router-dom',
            'react-toastify',
            'react-use-clipboard',
            'foca',
          ],
          i18n: ['react-i18next', 'i18next'],
          web3: ['wagmi', 'ethers', 'bignumber.js'],
          uikit: [
            '@mantine/core',
            '@mantine/form',
            '@mantine/hooks',
            '@emotion/css',
            '@emotion/react',
            '@emotion/styled',
          ],
        },
      },
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
