import {clientConfiguration} from 'universal-webpack'
import settings from './universal-webpack-settings'
import webpackConfig from './webpack.config'

const WEBPACK_DEV_SERVER_PORT = 3001

const config = clientConfiguration(webpackConfig, settings, {
  development: true,
  // css_bundle: true,
})

config.output.publicPath = `http://localhost:${WEBPACK_DEV_SERVER_PORT}${config.output.publicPath}`

export default config
