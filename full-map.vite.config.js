import { defineConfig } from 'vite'
import glsl from 'vite-plugin-glsl'

export default defineConfig({
    root: 'full-map-source',
    base: './',
    publicDir: '../full-map-static',
    server: {
        host: '127.0.0.1',
        port: 5173,
        open: false
    },
    build: {
        outDir: '../dist',
        emptyOutDir: true,
        sourcemap: false
    },
    plugins: [glsl()]
})
