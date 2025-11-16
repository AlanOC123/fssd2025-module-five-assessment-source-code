import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Vite Configuration extended by .env
export default defineConfig(({ mode }) => {

  // Loads variables from .env
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    // Inject static variables
    define: {
      '__APP_VERSION__': JSON.stringify('1.0.0-beta'),
      'process.env.VITE_API_HOST': JSON.stringify(env.VITE_API_HOST),
    },

    // Server control
    server: {
      port: Number(env.PORT) || 5173
    }
  }
})