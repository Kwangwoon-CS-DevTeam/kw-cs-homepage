import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build', // 빌드 결과물이 저장될 폴더
  },
  css: {
    postcss: './postcss.config.js', // PostCSS 설정 경로
  },
});
