const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const env = require('./env');
const { defaultConfig, defaultPlugins } = require('./defaultConfig');
const paths = require('./paths');
const cssUtils = require('./cssLoaders');

const plugins = [
  ...defaultPlugins,
];

exports.clientConfig = {
  ...defaultConfig,
  mode: 'development',
  entry: {
    'client': './src/client/client.js',
  },
  performance: { hints: false },
  output: {
    path: paths.resolve('public/js'),
    publicPath: '/js/',
    filename: '[name].[chunkhash].js',
    devtoolModuleFilenameTemplate: info => {
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
    ...plugins,
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/client/template/index.html',
      inject: true
    })
  ],

  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      },
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        // include: [paths.resolve('src')],
        exclude: /node_modules/,
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: cssUtils.cssLoaders({
            sourceMap: !env.isProduction
          })
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [paths.resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: paths.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      ...cssUtils.styleLoaders({ sourceMap: !env.isProduction }),
    ]
  }
};
