import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // Add esbuild loader configuration
  esbuild: {
    // Add or modify the loader configuration to handle JSX files
    loader: {
      '.js': 'jsx',
    },
  },
});
