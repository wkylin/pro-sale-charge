const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const prodWebpackConfig = merge(common, {
  mode: 'production',
  devtool: false,
  entry: {
    main: path.resolve(__dirname, '../src/main.js'),
  },
  externals: {
    'react': 'react',
    'react-dom': 'react-dom'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: 'pro-sale-charge',
    libraryTarget: 'umd',
    libraryExport: 'default',
    umdNamedDefine: true
  },
  optimization: {
    minimize: true,
  },
})

module.exports = prodWebpackConfig
