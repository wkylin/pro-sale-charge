const path = require('path')
const paths = require('./paths')
const chalk = require('chalk')
const argv = require('yargs-parser')(process.argv.slice(2))
const themeVars = require('./theme.vars')
// const { getThemeVariables } = require('antd/dist/theme')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Dotenv = require('dotenv-webpack')
const WebpackBar = require('webpackbar')
const isDev = process.env.NODE_ENV === 'development'

const UNABLE_ANALYZE = 0
const USE_ANALYZE = process.env.USE_ANALYZE || UNABLE_ANALYZE

let dotEnv = ''
switch (process.env.BUILD_GOAL) {
  case 'development':
    dotEnv = '.env.development'
    break
  case 'production':
    dotEnv = '.env.production'
    break
  default:
    dotEnv = '.env.development'
}

const root = process.cwd()
console.log(chalk.blue(`root: ${root}`))
console.log(chalk.green(`argv.env: ${argv.env}`))
console.log(chalk.green(`process.env.NODE_ENV: ${process.env.NODE_ENV}`))
console.log(chalk.green(`process.env.BUILD_GOAL: ${process.env.BUILD_GOAL}`))
console.log(chalk.green(`dotEnv: ${dotEnv}`))

const config = {
  // entry: {
  //   app: paths.src + '/index.js',
  // },
  output: {
    path: paths.build,
    // publicPath: '/', // 打包时注释一下
  },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
  //   alias: {
  //     '@src': path.resolve('./src'),
  //     '@stateless': path.resolve('./src/components/stateless'),
  //     '@stateful': path.resolve('./src/components/stateful'),
  //     '@hooks': path.resolve('./src/components/hooks'),
  //     '@container': path.resolve('./src/components/container'),
  //     '@assets': path.resolve('./src/assets'),
  //     '@pages': path.resolve('./src/pages'),
  //     '@routers': path.resolve('./src/routers'),
  //     '@utils': path.resolve('./src/utils'),
  //   },
  // },
  // target: process.env.NODE_ENV === 'development' ? 'web' : 'browserslist',
  plugins: [
    new CleanWebpackPlugin({
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: [],
      cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    }),
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),

    new WebpackBar(),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                namedExport: true,
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: {
                // compileType: 'module',
                mode: 'local',
                auto: true,
                exportGlobals: true,
                localIdentName: isDev ? '[path][name]__[local]--[hash:base64:5]' : '[local]--[hash:base64:5]',
                localIdentContext: paths.src,
                namedExport: false,
                exportLocalsConvention: 'camelCase',
              },
              importLoaders: 2,
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 3,
                    },
                  ],
                  'postcss-normalize',
                ],
              },
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: themeVars,
                // modifyVars: getThemeVariables({
                //   dark: false, // 开启暗黑模式
                //   compact: false, // 开启紧凑模式
                // }),
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: [/node_modules/],
        use: [
          'thread-loader',
          {
            loader: 'babel-loader?cacheDirectory',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime'],
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          // Conditions for converting to base64
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: '@svgr/webpack',
            options: {
              babel: false,
              icon: true,
            },
          },
        ],
      },
    ],
  },
}

USE_ANALYZE && config.plugins.push(new BundleAnalyzerPlugin())

module.exports = config
