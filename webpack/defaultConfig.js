const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');

const env = require('./env');
const paths = require('./paths');

const minimizer = [];

if (env.isProduction) {
  minimizer.push(
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
      sourceMap: false,
    }),
  );
}

exports.defaultConfig = {
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
    modules: [
      paths.resolve('./node_modules'),
      paths.resolve('./src'),
    ],
  },
  optimization: {
    minimizer,
  },
  devtool: env.isProduction ? false : '#source-map',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500,
  },
};
exports.defaultPlugins = [
  new ExtractTextPlugin({
    filename: paths.assetsPath('/[name].[chunkhash].css'),
  }),
  new CleanWebpackPlugin({
    dry: false,
    cleanStaleWebpackAssets: false,
    protectWebpackAssets: true,
    dangerouslyAllowCleanPatternsOutsideProject: true,
  }),
  new WebpackManifestPlugin({
    basePath: '/js/',
    publicPath: '/js/',
  }),
];
