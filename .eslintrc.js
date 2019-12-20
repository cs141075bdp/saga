// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    "window": true,
    "google": true,
    "__webpack_public_path__": true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'webpack.config.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    "no-cond-assign": 0,
    "no-plusplus": 0,
    "no-restricted-syntax": 0,
    "global-require": 0,
    "no-continue": 0,
    "no-multi-assign": 0,
    "no-empty": 0,
    "guard-for-in": 0,
    "camelcase": 0,
    "consistent-return": 0,
    "no-confusing-arrow": 0,
    "no-extra-boolean-cast": 0,
    "no-lonely-if": 0,
    "no-underscore-dangle": 0,
    "no-param-reassign": ["error", { "props": false }],
    "max-len": [2, {"code": 145, "tabWidth": 4, "ignoreUrls": true}],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0
  }
};
