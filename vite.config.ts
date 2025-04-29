import { defineConfig, loadEnv } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      react(),
      visualizer({
        open: true,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
    esbuild:{
      logOverride:{
        '@typescript-eslint/no-unused-vars': 'silent',
        'TS6133': 'silent',
        'TS6196': 'silent'
      }
    },
    
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Explicitly define environment variables
    define: {
      'process.env': {
        VITE_SUPABASE_URL: env.VITE_SUPABASE_URL,
        VITE_SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY,
        VITE_RELAY: env.VITE_RELAY,
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      minify: mode === 'production',
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
                return 'react-vendor';
              }
              if (id.includes('@supabase')) {
                return 'supabase';
              }
              if (id.includes('@radix-ui')) {
                return 'ui-components';
              }
              if (id.includes('@tanstack/react-query')) {
                return 'query';
              }
              if (id.includes('@zk-email') || id.includes('@anon-aadhaar')) {
                return 'utils';
              }
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
    optimizeDeps: {
      exclude: ['crypto', 'bufferutil', 'utf-8-validate'],
    },
    server: {
      port: 3000,
      strictPort: true,
    },
  }
})

