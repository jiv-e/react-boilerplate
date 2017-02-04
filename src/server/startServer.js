import 'babel-polyfill'
import {server} from 'universal-webpack'
import universalWebpackSettings from '../../webpack/universal-webpack-settings'
import webpackConfig  from '../../webpack/webpack.config'

server(webpackConfig, universalWebpackSettings)
