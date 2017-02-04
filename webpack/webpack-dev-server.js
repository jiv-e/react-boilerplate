import express from 'express'
import webpack from 'webpack'
import WebpackDevMiddleware from 'webpack-dev-middleware'
import WebpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from './webpack.config.client.babel'

const WEBPACK_DEV_SERVER_PORT = 3001

// http://webpack.github.io/docs/webpack-dev-server.html
const serverOptions = {
  hot: true,
  inline: true,
  //noInfo: true,
  publicPath: webpackConfig.output.publicPath,
  //quiet: true,
  stats: {
    colors: true,
  },
}

const compiler = webpack(webpackConfig)

const server = new express()

server.use(WebpackDevMiddleware(compiler, serverOptions))
server.use(WebpackHotMiddleware(compiler, {
  path: '/',
}))

server.listen(WEBPACK_DEV_SERVER_PORT, (error) => {
  if (error) {
    console.error(error.stack || error)
    throw error
  }

  console.log('[webpack-dev-server] Running')
})
