import rollupReplace from '@rollup/plugin-replace'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import eslint from 'vite-plugin-eslint'
import { VitePluginFonts } from 'vite-plugin-fonts'
import vitePluginImp from 'vite-plugin-imp'
import svgr from 'vite-plugin-svgr'

import hmr from './react-hmr'

const folders = fs.readdirSync(resolve(__dirname, 'node_modules/antd/es/'))
const okFolders = folders.filter((folder) => {
  return fs.existsSync(resolve(__dirname, 'node_modules/antd/es/', folder, 'style'))
})

export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  const VITE_FONT_SANS = process.env.VITE_FONT_SANS

  return defineConfig({
    server: {
      host: true,
      port: process.env.PORT || 3005,
    },

    build: {
      minify: 'esbuild',
      brotliSize: true,
    },
    publicDir: 'public',
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#8b6446',
            'primary-color-hover': '#ffad41',
            'primary-color-active': '#ff9201',
            'primary-color-outline': '#ddcabb',
          },
        },
      },
    },
    json: {
      stringify: true,
    },
    resolve: {
      alias: [
        { find: '@', replacement: resolve(__dirname, 'src') },
        { find: /^~/, replacement: '' },
      ],
    },
    optimizeDeps: {
      include: [
        '@ant-design/icons',
        ...okFolders.map((folder) => `antd/es/${folder}/style`),
        'socket.io-client',
      ],
    },
    plugins: [
      rollupReplace({
        preventAssignment: true,
        values: {
          __DEV__: JSON.stringify(true),
          'process.env.NODE_ENV': JSON.stringify('development'),
        },
      }),
      svgr(),
      eslint(),
      react({
        fastRefresh: true,
      }),
      vitePluginImp({
        libList: [
          {
            libName: 'antd',
            style: (name) => `antd/es/${name}/style`,
          },
        ],
      }),
      hmr(),
      VitePluginFonts({
        google: {
          families: [VITE_FONT_SANS],
        },
      }),
    ],
  })
}
