import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync } from 'fs';
import tailwindcss from '@tailwindcss/vite'

// Custom plugin to copy manifest
function copyManifest() {
  return {
    name: 'copy-manifest',
    closeBundle() {
      copyFileSync(
        resolve(__dirname, 'manifest.json'),
        resolve(__dirname, 'dist', 'manifest.json')
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), copyManifest(),tailwindcss()],
  build:{
    rollupOptions:{
      input:{
        popup:resolve(__dirname,'index.html'),
        content:resolve(__dirname,'content.js')
      },
       output: {
        entryFileNames: '[name].js' // 👈 Prevents hashing
      }
    }
  }
});
