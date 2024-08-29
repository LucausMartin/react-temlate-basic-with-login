import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@myHooks': join(__dirname, 'src/hooks'),
      '@myComponents': join(__dirname, 'src/components'),
      '@myUtils': join(__dirname, 'src/utils'),
      '@myStore': join(__dirname, 'src/store'),
      '@myTypes': join(__dirname, 'src/types'),
      '@myPages': join(__dirname, 'src/pages'),
      '@myAssets': join(__dirname, 'src/assets'),
      '@myConstants': join(__dirname, 'src/constants'),
    }
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        math: "always",
      },
    },
  }
})
