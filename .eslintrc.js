// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
  },
  globals: {
   'FB': true
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'standard',
    'prettier',
  ],
  // required to lint *.vue files
  plugins: [
    'html',
    'prettier'
  ],
  // add your custom rules here
  'rules': {
    'prettier/prettier': ['warn', {
      'semi': false,
      'singleQuote': true,
      'trailingComma': 'es5',
      'bracketSpacing': true,
    }],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
