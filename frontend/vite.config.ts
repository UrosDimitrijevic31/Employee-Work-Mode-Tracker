/* eslint-env node */
// @ts-nocheck
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Using JSDoc types to help IDEs even in TS config file
/** @type {import('vite').UserConfig} */

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
