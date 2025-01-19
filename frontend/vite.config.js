import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  css: {
    postcss: './postcss.config.js', // PostCSS 설정 경로
  },
  build: {
    rollupOptions: {
      external: ["@tinymce/tinymce-react"],
    },
  },
});
