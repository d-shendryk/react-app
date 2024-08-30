import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const rootPath = resolve(__dirname, 'src');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@api': resolve(rootPath, 'api'),
      '@app': resolve(rootPath, 'app'),
      '@assets': resolve(rootPath, 'assets'),
      '@components': resolve(rootPath, 'components'),
      '@hooks': resolve(rootPath, 'hooks'),
      '@layouts': resolve(rootPath, 'layouts'),
      '@pages': resolve(rootPath, 'pages'),
      '@stores': resolve(rootPath, 'stores'),
      '@utils': resolve(rootPath, 'utils'),
    },
  },
});
