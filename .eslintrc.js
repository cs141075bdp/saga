// http://eslint.org/docs/user-guide/configuring
const env = require('./webpack/env');

module.exports = {
  root: true,
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: 'module',
    ecmaVersion: 2019,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:vue-libs/recommended',
    'eslint:recommended',
    'airbnb-base',
    '@vue/typescript',
    'plugin:vue/recommended',
    "@vue/eslint-config-typescript"
  ],
  // required to lint *.vue files
  plugins: [
    "@typescript-eslint",
  ],
  globals: {
    'Iterator': true,
    'Iterable': true,
    window: true,
    google: true,
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
          ".ts",
          ".vue"
        ]
      }
    },
    "import/extensions": [
      ".js",
      ".ts",
      ".vue"
    ]
  },
  // add your custom rules here
  rules: {
    // generic js
    'semi': [2, 'always'],
    'semi-style': 0,
    'prefer-destructuring': 0,
    'function-paren-newline': ['error', 'consistent'],
    'func-names': 0,
    'object-curly-newline': ['error', { 'consistent': true }],
    'no-trailing-spaces': 0,
    'no-undef': 'error',
    'no-new': 0,
    'class-methods-use-this': 0,
    'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
    'no-multiple-empty-lines': ['error', { max: 1 }],
    'padding-line-between-statements': ['error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: '*', next: 'if' }
    ],
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
    "no-param-reassign": ["error", { "props": false }],
    "arrow-parens": [2, "as-needed", { "requireForBlockBody": true }],
    "implicit-arrow-linebreak": "off",
    "no-alert": "off",
    'max-len': 0,
    // "max-len": [2, {"code": 195, "tabWidth": 4, "ignoreStrings": true, "ignoreUrls": true, "ignoreTemplateLiterals": true}],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "never",
        "normal": "always",
        "component": "always"
      },
      "svg": "never",
      "math": "always"
    }],
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'ignorePackages',
      'ts': 'never',
      'json': 'always'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // vue
    'vue/script-indent': ['error', 2, {
      baseIndent: 1,
      switchCase: 1
    }],
    'vue/html-indent': ['error', 2, {
      'attribute': 1,
      'closeBracket': 0,
      'alignAttributesVertically': false,
    }],
    'vue/max-attributes-per-line': [2, {
      'singleline': 5,
      'multiline': {
        'max': 1,
        'allowFirstLine': true,
      }
    }],
    'vue/no-dupe-keys': ['error', {
      "groups": []
    }],
    'vue/require-default-prop': 0,
    'vue/no-duplicate-attributes': ['error', {
      'allowCoexistClass': false,
      'allowCoexistStyle': false
    }],
    // generic js
    'object-shorthand': ['error', 'always', { 'avoidQuotes': false }],
    // allow debugger during development
    'no-debugger': env.isProduction ? 2 : 0,
    'no-console': env.isProduction ? 1 : 0,
    "vue/singleline-html-element-content-newline": "off",
    "vue/multiline-html-element-content-newline": "off",
    "vue/no-v-html": "off",
    // "@typescript-eslint/rule-name": "off",
    'no-unused-vars': env.isProduction ? "error" : "off",
    "@typescript-eslint/no-unused-vars": [env.isProduction ? "error" : "warn", {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": true,
    }]
  },
  'overrides': [
    {
      'files': [ '*.vue' ],
      'rules': {
        'indent': 'off',
        'vue/script-indent': ['error', 2, {
          'baseIndent': 1,
          'switchCase': 1,
        }],
      },
    },
  ],
};
