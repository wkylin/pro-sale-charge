const plugins = [
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    },
    // {
    //   libraryName: '@yh/yh-design',
    //   libraryDirectory: 'es',
    //   camel2DashComponentName: false,
    //   style: true, // *css Customize Theme less
    // },
    // '@yh/yh-design',
  ],
  '@babel/plugin-syntax-dynamic-import',
  '@babel/plugin-proposal-optional-chaining',
  ['@babel/plugin-proposal-decorators', { legacy: true }],
]

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/typescript'],
  compact: false,
  plugins:
    process.env.NODE_ENV === 'production'
      ? [...plugins, 'transform-remove-console', 'transform-remove-debugger']
      : plugins,
}
