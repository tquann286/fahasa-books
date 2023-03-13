import React from 'react'

export default function CustomHmr() {
  return {
    name: 'custom-hmr',
    enforce: 'post',
    // HMR
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.json')) {
        console.warn('reloading json file...')

        server.ws.send({ type: 'full-reload', path: '*' })
      }
    },
  }
}
