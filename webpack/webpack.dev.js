const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const serverProxy = require('./serverProxy')

const devWebpackConfig = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: 'static/js/[name].js',
    chunkFilename: 'static/js/[name].js',
  },
  cache: { type: 'memory' },
  devServer: {
    allowedHosts: 'all',
    historyApiFallback: true,
    compress: true,
    open: true,
    hot: true,
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        warnings: true,
      },
    },
    proxy: serverProxy,
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    new HtmlWebpackPlugin({
      title: 'NPM部署组件',
      template: paths.public + '/index.ejs',
      filename: 'index.html',
      inject: 'body',
      hash: true,
      cache: false,
      minify: false
    }),
    // new DashboardPlugin()
  ].filter(Boolean),
  optimization: {
    providedExports: true,
    usedExports: true,
  },
})

module.exports = new Promise((resolve, reject) => {
  portfinder.getPort(
    {
      port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535, // maximum port
    },
    (err, port) => {
      if (err) {
        reject(err)
        return
      }
      devWebpackConfig.devServer.port = port
      resolve(devWebpackConfig)
    }
  )
})
