// This is the base Webpack configuration file

var path = require('path')
var webpack = require('webpack')
var DashboardPlugin = require('webpack-dashboard/plugin')

var context = path.resolve(__dirname, '..')

var config = {
  context: context,
  entry: [
    'react-hot-loader/patch',
    'babel-polyfill',
    './src/index.js',
    './src/global.css',
  ],
  output: {
    path: path.resolve(context, 'build/assets'),
    publicPath: '/assets/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: [
          'style-loader',
          'css-loader?modules=true&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        ],
      },
      {
        test: /\.(jpg|png)$/,
        use: [
          'url-loader?limit=10000', // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new DashboardPlugin(),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    quiet: true,
    inline: true,
    port: 3001,
    stats: false,
    watchOptions: {
      poll: 1000,
      ignored: /node_modules/,
    },
  },
}

config.plugins.push(
  new webpack.LoaderOptionsPlugin({
    test: /\.css$/,
    debug: true,
    options: {
      // A temporary workaround for `scss-loader`
      // https://github.com/jtangelder/sass-loader/issues/298
      output: {
        path: config.output.path,
      },
      // A temporary workaround for `css-loader`.
      // Can also supply `query.context` parameter.
      context: config.context,
    },
  })
)

module.exports = config
