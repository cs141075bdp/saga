const env = require('./env');
const paths = require('./paths');

const ExtractTextPlugin = require('mini-css-extract-plugin');

const cssLoaders = (options) => {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: env.isProduction,
      sourceMap: !env.isProduction,
      extract: env.isProduction
    }
  };

  // generate loader string to be used with extract text plugin
  const generateLoaders = (loader, loaderOptions) => {
    const loaders = [cssLoader];

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: !env.isProduction,
          include: [paths.resolve('assets/js')],
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    }

    return ['vue-style-loader'].concat(loaders);
  };

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
};
exports.cssLoaders = cssLoaders;
// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = (options) => {
  const output = [];
  const loaders = cssLoaders(options);

  for (const extension in loaders) {
    const loader = loaders[extension];
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output;
};
