import path from 'path'
import express from 'express'
import renderMiddleware from './renderMiddleware'

export default ({chunks}) => {
  const server = new express()

  server.use(express.static(path.resolve(__dirname, '../build/assets')))

  server.use(renderMiddleware(chunks()))

  server.listen(3000, (error) => {
    if (error) {
      console.error(error.stack || error)
      throw error
    }

    console.log('[rendering-server] Running')
  })
}
