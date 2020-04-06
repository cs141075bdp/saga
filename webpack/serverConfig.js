const webpack = require('webpack');
const externals = require('webpack-node-externals');

const { defaultConfig } = require('./defaultConfig');
const paths = require('./paths');
const env = require('./env');
const readJSONFromFile = require('../src/utils/readJSONFromFile');

exports.serverConfig = {
  ...defaultConfig,
  mode: 'none',
  node: {
    fs: 'empty',
    net: 'empty',
    __filename: false,
    __dirname: false,
  },
  target: 'node',
  externals: [externals({
    whitelist: ['assign-deep', 'axios'],
  })],
  entry: {
    server: './src/server/server.ts',
  },
  output: {
    path: paths.resolve('dist'),
    publicPath: '/',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: (info) => {
      let $filename;

      if (info.resource.match(/\.vue$/)) {
        $filename = info.allLoaders.match(/type=script/)
          ? info.resourcePath : 'generated';
      } else {
        $filename = info.resourcePath;
      }

      return $filename;
    },
  },

  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitError: env.isProduction,
          failOnError: env.isProduction,
          failOnWarning: env.isProduction,
          emitWarning: env.isProduction,
        },
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: readJSONFromFile(paths.resolve('./.babelrc')),
        },
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        include: [paths.resolve('src')],
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
    ],
  },
};
