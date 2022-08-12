const path = require('path')
// const webpack = require('webpack')
const paths = require('./paths')
const chalk = require('chalk')
const argv = require('yargs-parser')(process.argv.slice(2))
const themeVars = require('./theme.vars')
// const { getThemeVariables } = require('antd/dist/theme')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const WebpackBar = require('webpackbar')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const ESLintPlugin = require('eslint-webpack-plugin')

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
  case 'online':
    dotEnv = '.env.online'
    break
  case 'dev':
    dotEnv = '.env.dev'
    break
  case 'test':
    dotEnv = '.env.test'
    break
  case 'sit':
    dotEnv = '.env.sit'
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
// console.log(chalk.green(`process.env: ${JSON.stringify(process.env, null, 2)}`))

const config = {
  // entry: {
  //   app: paths.src + '/index.js',
  // },
  output: {
    path: paths.build,
    // publicPath: '/',
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
    // new CleanWebpackPlugin({
    //   root: __dirname,
    //   verbose: true,
    //   dry: false,
    //   exclude: [],
    //   cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist')],
    // }),
    new Dotenv({
      path: path.resolve(__dirname, '..', dotEnv),
    }),

    // new webpack.ProgressPlugin({
    //   activeModules: false,
    //   entries: true,
    //   handler(percentage, message, ...args) {
    //     console.info(`${parseInt(percentage * 100)}%`, message, ...args)
    //   },
    //   modules: true,
    //   modulesCount: 5000,
    //   profile: false,
    //   dependencies: true,
    //   dependenciesCount: 10000,
    //   percentBy: null,
    // }),
    // new AntdDayjsWebpackPlugin(),
    // new CaseSensitivePathsPlugin(),
    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   include: /src/,
    //   failOnError: true,
    //   allowAsyncCycles: false,
    //   cwd: process.cwd(),
    // }),
    // new NodePolyfillPlugin(),
    new WebpackBar(),
    // new ForkTsCheckerWebpackPlugin({
    //   async: false,
    // }),
    // new ESLintPlugin({
    //   extensions: ['js', 'jsx', 'ts', 'tsx'],
    // }),
  ],
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.css$/,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
        exclude: [/node_modules/, /\.dev\./],
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
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader',
      },
      {
        test: /\.ttf$/,
        use: ['file-loader'],
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
