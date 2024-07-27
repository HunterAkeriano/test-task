import { defineConfig } from 'vite'
import handlebars from 'vite-plugin-handlebars'
import { resolve } from 'path'
import FullReload from 'vite-plugin-full-reload'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import viteCompression from 'vite-plugin-compression'
import injectHTML from 'vite-plugin-html-inject'
import pages from './pages.config.js'

const pagesInput = {}

pages.forEach((page) => {
   pagesInput[page.name] = page.path
})

export default defineConfig({
   build: {
      target: 'es2022',
      outDir: 'build',
      minify: 'terser',
      terserOptions: {
         compress: {
            drop_console: true
         }
      },
      cssCodeSplit: true,
      rollupOptions: {
         input: {
            ...pagesInput
         }
      }
   },

   server: {
      port: 3025,
      host: '0.0.0.0',
      hmr: true,
      plugins: [
         viteCompression({
            algorithm: 'brotli',
            level: 11,
            threshold: 10240,
            deleteOriginFile: false
         })
      ]
   },
   plugins: [
      injectHTML(),
      handlebars({
         reloadOnPartialChange: true,
         partialDirectory: resolve(__dirname, 'src/html-partials')
      }),

      FullReload('src/html-partials/**/*', { delay: 0 }),

      viteCompression({
         algorithm: 'brotli',
         level: 11,
         threshold: 10240,
         deleteOriginFile: false
      }),

      viteStaticCopy({
         targets: []
      })
   ]
})
