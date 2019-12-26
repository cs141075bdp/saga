// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaVersion: 2017,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    'flowtype',
  ],
  globals: {
    "window": true,
    "google": true,
    "__webpack_public_path__": true,
  },
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      webpack: {
        'config': 'webpack.config.js'
      },
      node: {
        "extensions": [
          ".js",
          ".vue"
        ]
      }
    },
    "import/extensions": [
      ".js",
      ".vue"
    ]
  },
  // add your custom rules here
  'rules': {
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1
    }],
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
    'import/extensions': [
      'error',
      'always',
      {
        'js': 'never',
        'vue': 'never'
      }
    ],
    // allow optionalDependencies
    "import/no-extraneous-dependencies": [
      "warn",
      {
        'optionalDependencies': ['test/unit/index.js'],
      },
    ],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-console': process.env.NODE_ENV === 'production' ? 1 : 0
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off'
      }
    }
  ]
};
