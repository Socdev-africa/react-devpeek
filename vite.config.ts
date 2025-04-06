import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: 'src' })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'ReactDevPeek',
      fileName: (format) => `react-devpeek.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'framer-motion', 'zustand'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'framer-motion': 'FramerMotion',
          'zustand': 'Zustand',
        },
      },
    },
  },
})