import {serverConfiguration} from 'universal-webpack'
import settings from './universal-webpack-settings'
import webpackConfig from './webpack.config'

const WEBPACK_DEV_SERVER_PORT = 3001

const config = serverConfiguration(webpackConfig, settings)

config.output.publicPath = `http://localhost:${WEBPACK_DEV_SERVER_PORT}${config.output.publicPath}`

export default config
